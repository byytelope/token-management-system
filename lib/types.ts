export interface Service {
  id: string;
  name: {
    [lang: string]: string;
  };
  childrenIds: string[];
  tokenPrefix: string;
  level: number;
}

export interface Counter {
  id: string;
  counterNumber: number;
  isOpen: boolean;
  queueHistory: { queueNumber: string; serviceName: string }[];
  categoryIds: string[];
}

export interface QueueItem {
  id: string;
  categoryId: string;
  serviceName: string;
  queueNumber: string;
  createdAt: string;
}
