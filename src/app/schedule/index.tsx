import { Button } from '@/src/components/button/Button';
import { PT } from '@/src/constants/calendar';
import { hours } from '@/src/constants/data';
import { AppointmentServices } from '@/src/services/appointments/AppoitmentsService';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon } from 'phosphor-react-native';
import { useState } from "react";
import { Alert, Modal, Pressable, StatusBar, Text, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from "react-native-safe-area-context";


LocaleConfig.locales['pt'] = PT;
LocaleConfig.defaultLocale = "pt";






export default function Schedule() {
    const { idService, doctorId, idAppointment } = useLocalSearchParams<{ doctorId: string, idService: string, idAppointment: string }>();
    const [seletedHour, setSeletedHour] = useState<string>('');
    const [seletedDate, setSeletedDate] = useState<string>('');
    const [loarding, setLoarding] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const agenda = {
        "2025-08-25": { disabled: true },
        "2025-08-29": { disabled: true },
        "2025-08-30": { disabled: true },
        "2025-08-31": { disabled: true },
        "2025-09-01": { disabled: true },
        "2025-09-02": { disabled: true },
        "2025-09-05": { disabled: true },
        "Dom": { disabled: true },
    };

    const handleSchedule = async () => {

        if (!seletedHour || !seletedDate) {
            Alert.alert("Atenção!", "Por favor, selecione uma data e horário.");
            return;
        }
        setLoarding(true);

        if (idAppointment) {
            try {
                setVisible(true);
                await AppointmentServices.Reschedule(idAppointment,
                    {
                        bookingDate: new Date(seletedDate),
                        bookingHour: seletedHour
                    })
                setVisible(false);
                router.replace("/(dashboard)/bookings")

            } catch (error: any) {
                console.log(`Erro ao agendar: ${error.message}`);

            } finally {
                setLoarding(false);
            }
        }
        else {
            try {
                setVisible(true);
                await AppointmentServices.Create({
                    doctorId,
                    serviceId: idService,
                    bookingDate: new Date(seletedDate),
                    bookingHour: seletedHour
                })
                setVisible(false);
                router.replace("/(dashboard)/home")

            } catch (error: any) {
                console.log(`Erro ao agendar: ${error.message}`);

            } finally {
                setLoarding(false);
            }
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white p-6 flex flex-col justify-between">
            <StatusBar barStyle="dark-content" />
            <Calendar
                minDate={new Date().toISOString().split('T')[0]}
                onDayPress={(day) => { setSeletedDate(day.dateString) }}
                markedDates={{ ...agenda, [seletedDate]: { selected: true, selectedColor: '#3b82f6' } }}

            />
            <View className="w-full h-[1px] bg-gray-300" />

            <Text className="text-lg font-medium text-gray-800 mt-2">Selecione o horário</Text>

            <Picker selectedValue={seletedHour} onValueChange={(itemValue, itemIdex) => {
                setSeletedHour(itemValue);
            }} >
                {
                    hours.map((hour) => (
                        <Picker.Item key={hour.id} label={hour.hour} value={hour.hour} />
                    ))
                }

            </Picker>

            <Button loading={loarding} text={'Finalizar marcação'} onPress={handleSchedule} />

            <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                onRequestClose={() => setVisible(false)}
                animationType='slide'
                transparent={true}
                className="flex-1 justify-center items-center"
            >
                <View className="flex-1 justify-center items-center bg-black/50 bg-opacity-50 p-6">
                    <View className="bg-white rounded-2xl p-6 w-full max-w-md items-center">
                        <CheckCircleIcon size={64} color="#4ade80" weight="fill" />
                        <Text className="text-lg font-medium text-gray-800 mb-4">Agendamento realizado!</Text>
                        <Text className="text-gray-600 mb-4 text-center">
                            Seu agendamento para
                            <Text className='text-blue-500'>{seletedDate}</Text>
                            às <Text className='text-blue-500'>{seletedHour}</Text>
                            foi realizado com sucesso.
                        </Text>
                        <Pressable
                            onPress={() => setVisible(false)}
                            className="w-32 h-12 bg-blue-500 rounded-full my-4 justify-center items-center"
                        >
                            <Text className="text-white font-semibold text-center">OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}


