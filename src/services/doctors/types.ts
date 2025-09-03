
export type IDoctorsRequest = {
  name: string;
  photo: string | null;
  email: string
  password: string | null
  phone: string | null
  bio: string | null
  address: string | null
  yaersOfExperience: number | null
  numberOfPatients: number | null
  rating: number | null
  specialtyId: string
  hospitalId: string | null
}

export type IDoctorsSave = {
  id: string;
  name: string;
  photo: string | null;
  email: string
  password: string | null
  phone: string | null
  bio: string | null
  address: string | null
  yaersOfExperience: number | null
  numberOfPatients: number | null
  rating: number | null
  Specialty: {
    id: string;
    name: string;
  } | null; 
  Hospital:{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    images: {
      id: string;
      urlImagem: string;
    }[];
    createdAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export type IDoctorsService = {
  idService: string;
  title: string;
  price: number;
}
