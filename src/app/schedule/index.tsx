import { Button } from '@/src/components/button/Button';
import { PT } from '@/src/constants/calendar';
import { useDoctorAvailabilityQuery } from '@/src/hooks/queries/useDoctorAvailabilityQuery';
import { AppointmentServices } from '@/src/services/appointments/AppoitmentsService';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon } from 'phosphor-react-native';
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/src/services/queries/queryKeys";
import { Alert, Modal, Pressable, StatusBar, Text, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from "react-native-safe-area-context";

LocaleConfig.locales['pt'] = PT;
LocaleConfig.defaultLocale = "pt";

const TIME_ZONE = "Africa/Luanda";

function getLuandaDateKey(date = new Date()): string {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);
    const value = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? "";
    return `${value("year")}-${value("month")}-${value("day")}`;
}

// Datas de disponibilidade e excepções são datas de calendário (YYYY-MM-DD),
// não instantes que devam ser convertidos para o fuso horário do dispositivo.
function dateKey(value: string | Date): string {
    if (typeof value === "string") return value.slice(0, 10);
    return value.toISOString().slice(0, 10);
}

// hourStart/hourEnd chegam como instantes ISO que o backend constrói a partir
// da hora local de Luanda. Intl aplica o fuso IANA sem somar offsets manualmente.
function localMinutes(value: string | Date): number {
    const date = value instanceof Date ? value : new Date(value);
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
    return hour * 60 + minute;
}

const hourLabel = (minutes: number) => {
    const normalized = ((minutes % 1440) + 1440) % 1440;
    return `${String(Math.floor(normalized / 60)).padStart(2, '0')}:${String(normalized % 60).padStart(2, '0')}`;
};

function addCalendarDays(dateString: string, days: number): string {
    const date = new Date(`${dateString}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
}

export default function Schedule() {
    const { idService, doctorId, idAppointment } = useLocalSearchParams<{ doctorId: string, idService: string, idAppointment: string }>();
    const queryClient = useQueryClient();
    const today = useMemo(() => getLuandaDateKey(), []);
    const rangeEnd = useMemo(() => addCalendarDays(today, 90), [today]);
    const { data, isLoading, isError, refetch } = useDoctorAvailabilityQuery(doctorId, today, rangeEnd);
    const [seletedHour, setSeletedHour] = useState('');
    const [seletedDate, setSeletedDate] = useState('');
    const [loarding, setLoarding] = useState(false);
    const [visible, setVisible] = useState(false);
    const periods = data?.availabilities ?? [];
    const availableDates = useMemo(
        () => new Set(periods.filter(period => !period.isBlocked).map(period => dateKey(period.date))),
        [periods]
    );

    const markedDates = useMemo(() => {
        const marks: Record<string, any> = {};
        availableDates.forEach(date => marks[date] = { marked: true, dotColor: '#16a34a' });
        if (seletedDate) marks[seletedDate] = { ...(marks[seletedDate] ?? {}), selected: true, selectedColor: '#3b82f6' };
        return marks;
    }, [availableDates, seletedDate]);

    const selectedHours = useMemo(() => {
        if (!seletedDate) return [];
        const slots = new Set<string>();
        periods.forEach(period => {
            if (dateKey(period.date) !== seletedDate || period.isBlocked) return;
            const start = localMinutes(period.hourStart);
            const end = localMinutes(period.hourEnd);

            // A API devolve períodos de trabalho, não slots de consulta.
            // Mantemos a grelha actual de 30 min; a duração real do serviço
            // continua a ser validada pelo backend no momento da reserva.
            for (let minute = start; minute + 30 <= end; minute += 30) {
                const blocked = (data?.exceptions ?? []).some(exception =>
                    dateKey(exception.date) === seletedDate &&
                    exception.type === 'BLOCK_PERIOD' &&
                    exception.startMinute != null &&
                    exception.endMinute != null &&
                    minute < exception.endMinute &&
                    minute + 30 > exception.startMinute
                );
                if (!blocked) slots.add(hourLabel(minute));
            }
        });
        return Array.from(slots).sort();
    }, [seletedDate, periods, data?.exceptions]);

    const handleSchedule = async () => {
        if (loarding) return;
        if (!seletedHour || !seletedDate) {
            Alert.alert("Atenção!", "Por favor, selecione uma data e horário.");
            return;
        }
        setLoarding(true);
        try {
            if (idAppointment) {
                await AppointmentServices.Reschedule(idAppointment, { bookingDate: seletedDate, bookingHour: seletedHour });
                await queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
                await queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
                router.replace("/(dashboard)/bookings");
            } else {
                await AppointmentServices.Create({ doctorId, serviceId: idService, bookingDate: seletedDate, bookingHour: seletedHour });
                await queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
                setVisible(true);
            }
        } catch (error: any) {
            setVisible(false);
            Alert.alert("Não foi possível agendar", error?.message ?? "Tente novamente.");
        } finally {
            setLoarding(false);
        }
    };

    return <SafeAreaView className="flex-1 bg-white p-6">
        <StatusBar barStyle="dark-content" />

        {isLoading ? <Text className="text-gray-600 py-4">A carregar disponibilidade...</Text> : null}
        {isError ? <View className="py-3"><Text className="text-red-600 mb-2">Não foi possível carregar os horários.</Text><Button loading={false} text="Tentar novamente" onPress={() => refetch()} /></View> : null}
        {!isLoading && !isError && availableDates.size === 0 ? <View className="py-4"><Text className="text-gray-600 mb-3">{idAppointment ? "Não existem horários disponíveis nos próximos 90 dias. O teu agendamento actual mantém-se como está. Podes voltar e cancelá-lo se a data já não for conveniente." : "Sem disponibilidade nos próximos 90 dias."}</Text>{idAppointment ? <Button loading={false} text="Voltar aos meus agendamentos" onPress={() => router.replace("/(dashboard)/bookings")} /> : null}</View> : null}

        <Calendar
            minDate={today}
            maxDate={rangeEnd}
            onDayPress={day => {
                if (availableDates.has(day.dateString)) {
                    setSeletedDate(day.dateString);
                    setSeletedHour('');
                }
            }}
            markedDates={markedDates}
            dayComponent={({ date, state }) => {
                const dateString = date?.dateString ?? '';
                const available = availableDates.has(dateString);
                const selected = dateString === seletedDate;
                return <Pressable
                    disabled={!available || state === 'disabled'}
                    onPress={() => { setSeletedDate(dateString); setSeletedHour(''); }}
                    className="items-center justify-center w-9 h-9 rounded-full"
                    style={{ backgroundColor: selected ? '#3b82f6' : 'transparent' }}
                >
                    <Text style={{ color: selected ? 'white' : available ? '#15803d' : state === 'disabled' ? '#d1d5db' : '#9ca3af', fontWeight: available ? '600' : '400' }}>{date?.day}</Text>
                </Pressable>;
            }}
        />

        <View className="w-full h-[1px] bg-gray-300 my-3" />
        <Text className="text-lg font-medium text-gray-800 mt-2">Selecione o horário</Text>
        {!seletedDate ? <Text className="text-gray-500 py-2">Escolha um dia assinalado no calendário.</Text> : selectedHours.length === 0 ? <Text className="text-gray-500 py-2">Sem horários disponíveis para este dia.</Text> : null}
        <Picker selectedValue={seletedHour} onValueChange={value => setSeletedHour(value)}>
            <Picker.Item label="Selecione um horário" value="" />
            {selectedHours.map(hour => <Picker.Item key={hour} label={hour} value={hour} />)}
        </Picker>

        <Button
            loading={loarding}
            disabled={!seletedDate || !seletedHour}
            text={idAppointment ? "Actualizar data e horário" : "Finalizar marcação"}
            onPress={handleSchedule}
        />

        <Modal visible={visible} onRequestClose={() => setVisible(false)} animationType='slide' transparent>
            <View className="flex-1 justify-center items-center bg-black/50 p-6">
                <View className="bg-white rounded-2xl p-6 w-full max-w-md items-center">
                    <CheckCircleIcon size={64} color="#4ade80" weight="fill" />
                    <Text className="text-lg font-medium text-gray-800 mb-4">Agendamento realizado!</Text>
                    <Text className="text-gray-600 mb-4 text-center">Seu agendamento para <Text className='text-blue-500'>{seletedDate}</Text> às <Text className='text-blue-500'>{seletedHour}</Text> foi realizado com sucesso.</Text>
                    <Pressable onPress={() => { setVisible(false); router.replace("/(dashboard)/bookings"); }} className="w-32 h-12 bg-blue-500 rounded-full my-4 justify-center items-center">
                        <Text className="text-white font-semibold text-center">Ver consultas</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </SafeAreaView>;
}
