import { BabyIcon, BrainIcon, HeartbeatIcon, ToothIcon } from 'phosphor-react-native';



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
        imagem: require("@/src/assets/doutor.jpg"),
        about: "Dr. Leonel José é um cardiologista experiente com mais de 15 anos de prática clínica. Formado pela Universidade de São Paulo, ele se especializou em doenças cardiovasculares e tem um histórico comprovado de sucesso no tratamento de pacientes com condições cardíacas complexas. Dr. José é conhecido por sua abordagem compassiva e centrada no paciente, garantindo que cada indivíduo receba um plano de tratamento personalizado que atenda às suas necessidades específicas. Ele está comprometido em fornecer cuidados de alta qualidade e em educar seus pacientes sobre a importância da saúde do coração.",
        yaersOfExperience: 15,
        numberOfPatients: 1200,
        rating: 4.9,
        reviews: 250,
        location: "Hospital Josina Machel",
        contact: "(244) 923 456 789",
        workingHours: [
            { day: 'Segunda-feira', hours: '08:00 - 17:00' },
            { day: 'Terça-feira', hours: '08:00 - 17:00' },
            { day: 'Quarta-feira', hours: '08:00 - 17:00' },
            { day: 'Quinta-feira', hours: '08:00 - 17:00' },
            { day: 'Sexta-feira', hours: '08:00 - 17:00' },
            { day: 'Sábado', hours: '09:00 - 12:00' },
            { day: 'Domingo', hours: 'Fechado' },
        ],
        services: [
            { id: '1', name: 'Consulta Cardiológica', price: '2000,00 AO' },
            { id: '2', name: 'Eletrocardiograma (ECG)', price: '1500,00 AO' },
            { id: '3', name: 'Teste Ergométrico', price: '2500,00 AO' },
            { id: '4', name: 'Ecocardiograma', price: '3000,00 AO' },
            { id: '5', name: 'Monitorização da Pressão Arterial (MPA)', price: '1800,00 AO' },
            { id: '6', name: 'Holter de 24 horas', price: '2200,00 AO' },
            { id: '7', name: 'Consulta Cardiológica de Seguimento', price: '1800,00 AO' },
            { id: '8', name: 'Avaliação de Risco Cardiovascular', price: '1600,00 AO' },
            { id: '9', name: 'Consulta para Doenças Cardíacas Congênitas', price: '2100,00 AO' },
            { id: '10', name: 'Consulta para Hipertensão Arterial', price: '1900,00 AO' },
        ],
    },
    {
        id: 2,
        nome: "Dra. Maura Dias",
        especialidade: "Pediatra",
        imagem: require("@/src/assets/doutor-woman.jpg"),
        about: "Dra. Maura Dias é uma pediatra dedicada com mais de 10 anos de experiência no cuidado de crianças e adolescentes. Graduada pela Universidade Federal do Rio de Janeiro, ela se especializou em pediatria e tem um compromisso profundo com a saúde e o bem-estar dos seus pacientes jovens. Dra. Dias é conhecida por sua abordagem gentil e atenciosa, criando um ambiente acolhedor para as crianças e suas famílias. Ela oferece cuidados abrangentes, desde consultas de rotina até o manejo de condições crônicas, sempre focando na prevenção e na educação dos pais sobre a saúde infantil.",
        yaersOfExperience: 10,
        numberOfPatients: 500,
        rating: 4.8,
        reviews: 120,
        location: "Hospital Geral de Luanda",
        contact: "(244) 940 123 456",
        workingHours: [
            { day: 'Segunda-feira', hours: '09:00 - 18:00' },
            { day: 'Terça-feira', hours: '09:00 - 18:00' },
            { day: 'Quarta-feira', hours: '09:00 - 18:00' },
            { day: 'Quinta-feira', hours: '09:00 - 18:00' },
            { day: 'Sexta-feira', hours: '09:00 - 18:00' },
            { day: 'Sábado', hours: '10:00 - 14:00' },
            { day: 'Domingo', hours: 'Fechado' },
        ],
        services: [
            { id: '1', name: 'Consulta Pediátrica', price: '1500,00' },
            { id: '2', name: 'Vacinação', price: '5000,00 AO' },
            // { id: '3', name: 'Avaliação do Desenvolvimento Infantil', price: '1200,00' },
            { id: '4', name: 'Tratamento de Doenças Infantis', price: '1300,00' },
            { id: '5', name: 'Consulta de Seguimento', price: '1000,00 AO' },
            { id: '6', name: 'Orientação Nutricional /Crianças', price: '800,00' },
            { id: '7', name: 'Exam. Laboratoriais Pediátricos', price: '700,00' },
            { id: '8', name: 'Consulta para Alergias e Asma', price: '1400,00' },
            { id: '9', name: 'Problemas de Sono Infantil', price: '1100,00' },
            { id: '10', name: 'Transtorno do Comport. Infantil', price: '1600,00' },
        ],

    },
    {
        id: 3,
        nome: "Dra. Julia Azevedo",
        especialidade: "Dermatologista",
        imagem: require("@/src/assets/doutor-woman-2.jpg"),
        about: "Dra. Julia Azevedo é uma dermatologista renomada com mais de 12 anos de experiência no tratamento de condições da pele, cabelo e unhas. Formada pela Universidade de São Paulo, ela se especializou em dermatologia clínica e estética, oferecendo uma ampla gama de serviços para seus pacientes. Dra. Azevedo é conhecida por sua abordagem personalizada e atenciosa, garantindo que cada paciente receba um plano de tratamento adaptado às suas necessidades específicas. Ela está comprometida em fornecer cuidados de alta qualidade e em educar seus pacientes sobre a importância da saúde da pele.,",
        yaersOfExperience: 12,
        numberOfPatients: 650,
        rating: 4.9,
        reviews: 150,
        location: "Clínica Girasol",
        contact: "(244) 912 345 678",
        workingHours: [
            { day: 'Segunda-feira', hours: '10:00 - 19:00' },
            { day: 'Terça-feira', hours: '10:00 - 19:00' },
            { day: 'Quarta-feira', hours: '10:00 - 19:00' },
            { day: 'Quinta-feira', hours: '10:00 - 19:00' },
            { day: 'Sexta-feira', hours: '10:00 - 19:00' },
            { day: 'Sábado', hours: '10:00 - 15:00' },
            { day: 'Domingo', hours: 'Fechado' },
        ],
        services: [
            { id: '1', name: 'Consulta Dermatológica', price: '1800,00' },
            { id: '2', name: 'Tratamento de Acne', price: '2500,00' },
            { id: '3', name: 'Peeling Químico', price: '3000,00' },
            { id: '4', name: 'Microdermoabrasão', price: '2800,00' },
            { id: '5', name: 'Tratamento para Psoríase', price: '2200,00' },
            { id: '6', name: 'Tratamento para Eczema', price: '2000,00' },
            { id: '7', name: 'Consulta de Seguimento', price: '1500,00' },
            { id: '8', name: 'Avaliação de Lesões Cutâneas', price: '1700,00' },
            { id: '9', name: 'Tratamento para Queda de Cabelo', price: '2600,00' },
            { id: '10', name: 'Consulta para Alergias Cutâneas', price: '2100,00' },
        ],
    },
    {
        id: 4,
        nome: "Dr. Ricardo Silva",
        especialidade: "Neurologista",
        imagem: require("@/src/assets/doutor.jpg"),
        about: "Dr. Ricardo Silva é um neurologista experiente com mais de 20 anos de prática clínica. Formado pela Universidade Federal de Minas Gerais, ele se especializou em neurologia e tem um histórico comprovado de sucesso no tratamento de pacientes com condições neurológicas complexas. Dr. Silva é conhecido por sua abordagem compassiva e centrada no paciente, garantindo que cada indivíduo receba um plano de tratamento personalizado que atenda às suas necessidades específicas. Ele está comprometido em fornecer cuidados de alta qualidade e em educar seus pacientes sobre a importância da saúde neurológica.",
        yaersOfExperience: 20,
        numberOfPatients: 1500,
        rating: 4.7,
        reviews: 300,
        location: "Hospital Clinica Sagrada Esperança",
        contact: "(244) 934 567 890",
        workingHours: [
            { day: 'Segunda-feira', hours: '08:00 - 17:00' },
            { day: 'Terça-feira', hours: '08:00 - 17:00' },
            { day: 'Quarta-feira', hours: '08:00 - 17:00' },
            { day: 'Quinta-feira', hours: '08:00 - 17:00' },
            { day: 'Sexta-feira', hours: '08:00 - 17:00' },
            { day: 'Sábado', hours: '09:00 - 12:00' },
            { day: 'Domingo', hours: 'Fechado' },
        ],
        services: [
            { id: '1', name: 'Consulta Neurológica', price: '2200,00' },
            { id: '2', name: 'Eletroencefalograma (EEG)', price: '2000,00' },
            { id: '3', name: 'Potenciais Evocados', price: '2500,00' },
            { id: '4', name: 'Monitorização Ambulatorial da Pressão Intracraniana', price: '3000,00' },
            { id: '5', name: 'Consulta para Doenças Neurodegenerativas', price: '2400,00' },
            { id: '6', name: 'Consulta para Epilepsia', price: '2300,00' },
            { id: '7', name: 'Consulta para Cefaleias', price: '2100,00' },
            { id: '8', name: 'Consulta para Transtornos do Movimento', price: '2600,00' },
            { id: '9', name: 'Consulta para Doenças Neuromusculares', price: '2700,00' },
            { id: '10', name: 'Consulta para Distúrbios do Sono', price: '2800,00' },
        ],
    },
    
]

export const hours = [
    { id: '1', hour: '08:00' }, 
    { id: '2', hour: '09:00' },
    { id: '3', hour: '10:00' },
    { id: '4', hour: '11:00' },
    { id: '5', hour: '12:00' },
    { id: '6', hour: '13:00' },
    { id: '7', hour: '14:00' },
    { id: '8', hour: '15:00' },
    { id: '9', hour: '16:00' },
    { id: '10',hour: '17:00' },
]
