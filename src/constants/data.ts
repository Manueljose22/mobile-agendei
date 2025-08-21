import { BabyIcon, BrainIcon, HeartbeatIcon, ToothIcon } from 'phosphor-react-native'



export const categories = [
    {
        id: 1,
        name: "Cardiologista",
        icon: HeartbeatIcon
    },
    {
        id: 2,
        name: "Estomatologista",
        icon: ToothIcon
    },
    {
        id: 3,
        name: "Neurologista",
        icon: BrainIcon
    },
    {
        id: 4,
        name: "Dermatologista",
        icon: BrainIcon
    },
    {
        id: 5,
        name: "Pediatra",
        icon: BabyIcon
    },
]


export const doctors = [
    {
        id: 1,
        nome: "Dr. Leonel José",
        especialidade: "Cardiologista",
        imagem: require("@/src/assets/doutor.jpg")
    },
    {
        id: 2,
        nome: "Dra. Maura Dias",
        especialidade: "Pediatra",
        imagem: require("@/src/assets/doutor-woman.jpg")
    },
    {
        id: 3,
        nome: "Dra. Julia Azevedo",
        especialidade: "Dermatologista",
        imagem: require("@/src/assets/doutor-woman-2.jpg")
    },
]