export type IHospitalImage = {
  urlImagem: string;
};

export type IHospital = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  email: string | null;
  nif: string;
  role: "admin" | "owner" | "doctor";
  status: "ACTIVE" | "SUSPENDED";
  images: IHospitalImage[];
  createdAt: string;
  updatedAt: string;
};
