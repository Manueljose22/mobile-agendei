import { BabyIcon, BandaidsIcon, BoneIcon, BrainIcon, CarrotIcon, EarIcon, EyeIcon, GenderFemaleIcon, HeartbeatIcon, PillIcon, StethoscopeIcon, SyringeIcon, ToothIcon } from 'phosphor-react-native';
import { JSX } from 'react';
import { Colors } from '../styles/colors';


export const specialtyIcons: Record<string, JSX.Element> = {
    "Dermatologia": <BandaidsIcon size={32} color={Colors.gray[300]} />,
    "Psiquiatra": <BrainIcon size={32} color={Colors.gray[300]} />,
    "Neurologista": <BrainIcon size={32} color={Colors.gray[300]} />,
    "Cardiologista": <HeartbeatIcon size={32} color={Colors.gray[300]} />,
    "Clínico Geral": <StethoscopeIcon size={32} color={Colors.gray[300]} />,
    "Ortopedia": <SyringeIcon size={32} color={Colors.gray[300]} />,
    "Farmacologia": <PillIcon size={32} color={Colors.gray[300]} />,
    "Estomatologia": <ToothIcon size={32} color={Colors.gray[300]} />,
    "Pediatria": <BabyIcon size={32} color={Colors.gray[300]} />,
    "Ginecologia": <GenderFemaleIcon size={32} color={Colors.gray[300]} />,
    "Ortopedista": <BoneIcon size={32} color={Colors.gray[300]} />,
    "Oftalmologia": <EyeIcon size={32} color={Colors.gray[300]} />,
    "Nutricionista": <CarrotIcon size={32} color={Colors.gray[300]} />,
    "Otorrino": <EarIcon size={32} color={Colors.gray[300]} />,
};
