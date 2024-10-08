
export type NotificationType =
  | "WELCOME"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};


export type ParamsShape = {
  params: {id: string}
}

export type datasetShape = {
  carsFound: number;
  createdAt: string;
}

export type Options = {
  _id: string; 
  email: string;
  location: string;
  date: string | null | Date; 
  updatedAt: string | null | Date;
}

export type CarShape = { 
  manufacturer: string;
  model: string;
  fuelType: string;
  transmission: string;
  yearOfProduction: number | string;
  carDrive: string;  
  carType: string;
  generation: number | string;
  placesCount: number | string;
  doorsCount: number | string;
  uniqueKey?: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type SearchResult = {
  manufacturer: string;
  model: string;
  fuelType: string;
  transmission: string;
  yearOfProduction: string;
  carDrive: string;  
  carType: string;
  generation: string;
  placesCount: string;
  doorsCount: string;
  carLink: string;
  time?: string;
  _id?: string;
}

export type SearchResultsShape = {
  cars: SearchResult[];
  read: boolean;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;

}

export type GraphDataShape = {
  graphData: number;
  createdAt: Date;
  updatedAt?: Date;
  _id: string;
  __v?: number;
}

export type NotifyData = {
  isOpen: boolean;
  message: string;
  type: string | any;
}

export type DialogConformation = {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm?: ()=> void;
}

export type ThemeContextShape = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notify: NotifyData;
  setNotify: React.Dispatch<React.SetStateAction<NotifyData>>;
}

       


