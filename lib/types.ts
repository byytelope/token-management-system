export interface Service {
  id?: string;
  name: {
    [lang: string]: string;
  };
  children: Service[];
  tokenPrefix: string;
}

export interface Counter {
  id: string;
  counterNumber: number;
  isOpen: boolean;
  queueHistory: string[];
  serviceIds: string[];
}

export interface QueueItem {
  id: string;
  serviceId: string;
  queueNumber: number;
  createdAt: string;
}
