export interface Service {
  id?: string;
  name: {
    [lang: string]: string;
  };
  children: Service[];
}

export interface Counter {
  id: string;
  name: string;
  isOpen: boolean;
  queueHistory: string[];
  serviceIds: string[];
}
