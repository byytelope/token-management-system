export interface Service {
  id?: string;
  name: {
    [lang: string]: string;
  };
  children: Service[];
}

export interface Counter {
  id: string;
  counterNumber: number;
  isOpen: boolean;
  queueHistory: string[];
  serviceIds: string[];
}
