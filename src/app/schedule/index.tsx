import { Button } from '@/src/components/button/Button';
import { PT } from '@/src/constants/calendar';
import { AppointmentServices } from '@/src/services/appointments/AppoitmentsService';
import { useDoctorAvailabilityQuery } from '@/src/hooks/queries/useDoctorAvailabilityQuery';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon } from 'phosphor-react-native';
import { useMemo, useState } from "react";
import { Alert, Modal, Pressable, StatusBar, Text, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from "react-native-safe-area-context";

LocaleConfig.locales['pt'] = PT;
LocaleConfig.defaultLocale = "pt";

const dateKey = (date: Date) => date.toISOString().slice(0, 10);
const localMinutes = (value: string | Date) => { const d = new Date(value); return d.getUTCHours() * 60 + d.getUTCMinutes() + 60; };
const hourLabel = (minutes: number) => { const m = ((minutes % 1440) + 1440) % 1440; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };

export default function Schedule() {
    const { idService, doctorId, idAppointment } = useLocalSearchParams<{ doctorId: string, idService: string, idAppointment: string }>();
    const today = dateKey(new Date());
    const rangeEnd = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 90); return dateKey(d); }, []);
    const { data, isLoading, isError, refetch } = useDoctorAvailabilityQuery(doctorId, today, rangeEnd);
    const [seletedHour, setSeletedHour] = useState('');
    const [seletedDate, setSeletedDate] = useState('');
    const [loarding, setLoarding] = useState(false);
    const [visible, setVisible] = useState(false);
    const periods = data?.availabilities ?? [];
    const availableDates = useMemo(() => new Set(periods.map(p => dateKey(new Date(p.date)))), [periods]);
    const markedDates = useMemo(() => {
        const marks: Record<string, any> = {};
        availableDates.forEach(d => marks[d] = { marked: true, dotColor: '#16a34a' });
        if (seletedDate) marks[seletedDate] = { ...(marks[seletedDate] ?? {}), selected: true, selectedColor: '#3b82f6' };
        return marks;
    }, [availableDates, seletedDate]);
    const selectedHours = useMemo(() => {
        if (!seletedDate) return [];
        const slots = new Set<string>();
        periods.forEach(p => {
            if (dateKey(new Date(p.date)) !== seletedDate || p.isBlocked) return;
            const start = localMinutes(p.hourStart), end = localMinutes(p.hourEnd);
            for (let m = start; m + 60 <= end; m += 60) {
                const blocked = (data?.exceptions ?? []).some(e => dateKey(new Date(e.date)) === seletedDate && e.type === 'BLOCK_PERIOD' && e.startMinute != null && e.endMinute != null && m < e.endMinute && m + 60 > e.startMinute);
                if (!blocked) slots.add(hourLabel(m));
            }
        });
        return Array.from(slots).sort();
    }, [seletedDate, periods, data?.exceptions]);

    const handleSchedule = async () => {
        if (!seletedHour || !seletedDate) { Alert.alert("Atenção!", "Por favor, selecione uma data e horário."); return; }
        setLoarding(true);
        try {
            setVisible(true);
            if (idAppointment) {
                await AppointmentServices.Reschedule(idAppointment, { bookingDate: new Date(seletedDate), bookingHour: seletedHour });
                setVisible(false); router.replace("/(dashboard)/bookings");
            } else {
                await AppointmentServices.Create({ doctorId, serviceId: idService, bookingDate: new Date(seletedDate), bookingHour: seletedHour });
                setVisible(false); router.replace("/(dashboard)/home");
            }
        } catch (error: any) {
            setVisible(false); Alert.alert("Não foi possível agendar", error?.message ?? "Tente novamente.");
        } finally { setLoarding(false); }
    };

    return <SafeAreaView className="flex-1 bg-white p-6">
        <StatusBar barStyle="dark-content" />
        {isLoading ? <Text className="text-gray-600 py-4">A carregar disponibilidade...</Text> : null}
        {isError ? <View className="py-3"><Text className="text-red-600 mb-2">Não foi possível carregar os horários.</Text><Button loading={false} text="Tentar novamente" onPress={() => refetch()} /></View> : null}
        {!isLoading && !isError && availableDates.size === 0 ? <Text className="text-gray-600 py-4">Sem disponibilidade nos próximos 90 dias.</Text> : null}
        <Calendar minDate={today} maxDate={rangeEnd} onDayPress={day => { if (availableDates.has(day.dateString)) { setSeletedDate(day.dateString); setSeletedHour(''); } }} markedDates={markedDates}
            dayComponent={({ date, state }) => {
                const ds = date?.dateString ?? '', available = availableDates.has(ds), selected = ds === seletedDate;
                return <Pressable disabled={!available || state === 'disabled'} onPress={() => { setSeletedDate(ds); setSeletedHour(''); }} className="items-center justify-center w-9 h-9 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : 'transparent' }}>
                    <Text style={{ color: selected ? 'white' : available ? '#15803d' : state === 'disabled' ? '#d1d5db' : '#9ca3af', fontWeight: available ? '600' : '400' }}>{date?.day}</Text>
                </Pressable>;
            }} />
        <View className="w-full h-[1px] bg-gray-300 my-3" />
        <Text className="text-lg font-medium text-gray-800 mt-2">Selecione o horário</Text>
        {!seletedDate ? <Text className="text-gray-500 py-2">Escolha um dia assinalado no calendário.</Text> : selectedHours.length === 0 ? <Text className="text-gray-500 py-2">Sem horários disponíveis para este dia.</Text> : null}
        <Picker selectedValue={seletedHour} onValueChange={value => setSeletedHour(value)}><Picker.Item label="Selecione um horário" value="" />{selectedHours.map(h => <Picker.Item key={h} label={h} value={h} />)}</Picker>
        <Button loading={loarding} text={'Finalizar marcação'} onPress={handleSchedule} />
        <Modal visible={visible} onRequestClose={() => setVisible(false)} animationType='slide' transparent><View className="flex-1 justify-center items-center bg-black/50 p-6"><View className="bg-white rounded-2xl p-6 w-full max-w-md items-center">
            <CheckCircleIcon size={64} color="#4ade80" weight="fill" /><Text className="text-lg font-medium text-gray-800 mb-4">Agendamento realizado!</Text>
            <Text className="text-gray-600 mb-4 text-center">Seu agendamento para <Text className='text-blue-500'>{seletedDate}</Text> às <Text className='text-blue-500'>{seletedHour}</Text> foi realizado com sucesso.</Text>
            <Pressable onPress={() => setVisible(false)} className="w-32 h-12 bg-blue-500 rounded-full my-4 justify-center items-center"><Text className="text-white font-semibold text-center">OK</Text></Pressable>
        </View></View></Modal>
    </SafeAreaView>;
}