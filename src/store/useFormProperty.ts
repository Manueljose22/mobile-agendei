import { create } from 'zustand'

type Form = {
    tipoPropriedade?: string;
    tipoTransacao?: string;
    provincia?: string;
    municipio?: string;
    bairro?: string;
    numeroCasa?: string;
    enderecoCompleto?: string;
    area?: number;
    areaTerreno?: number;
    anoConstrucao?: number;
    quartos?: number;
    banheiros?: number;
    garagem?: number;
    caracteristicas?: string[];
    precoVenda?: number;
    precoMensal?: number;
    tituloAnuncio?: string;
    descricao?: string;
    fotos?: string[] | null;
}

type FormPropertyStore = {
    data: Form;
    setDataForm: (values: Partial<Form>) => void;
    resetForm: () => void;
}

export const useFormProperty = create<FormPropertyStore>((set) => ({
    data: {},
    setDataForm: (values) =>
        set((state) => ({
            data: { ...state.data, ...values } 
        })),
    resetForm: () => set({ data: {} })
}));
