export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      counters: {
        Row: {
          counterNumber: number;
          createdAt: string;
          id: string;
          isOpen: boolean;
          queueHistory: string[];
        };
        Insert: {
          counterNumber: number;
          createdAt?: string;
          id?: string;
          isOpen?: boolean;
          queueHistory?: string[];
        };
        Update: {
          counterNumber?: number;
          createdAt?: string;
          id?: string;
          isOpen?: boolean;
          queueHistory?: string[];
        };
        Relationships: [];
      };
      queueItems: {
        Row: {
          created_at: string;
          id: string;
          queueNumber: number;
          serviceId: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          queueNumber: number;
          serviceId?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          queueNumber?: number;
          serviceId?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          children: Json[];
          created_at: string;
          id: string;
          name: Json;
        };
        Insert: {
          children?: Json[];
          created_at?: string;
          id?: string;
          name?: Json;
        };
        Update: {
          children?: Json[];
          created_at?: string;
          id?: string;
          name?: Json;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Schema: public
// Tables
export type Counters = Database["public"]["Tables"]["counters"]["Row"];
export type InsertCounters = Database["public"]["Tables"]["counters"]["Insert"];
export type UpdateCounters = Database["public"]["Tables"]["counters"]["Update"];

export type QueueItems = Database["public"]["Tables"]["queueItems"]["Row"];
export type InsertQueueItems =
  Database["public"]["Tables"]["queueItems"]["Insert"];
export type UpdateQueueItems =
  Database["public"]["Tables"]["queueItems"]["Update"];

export type Services = Database["public"]["Tables"]["services"]["Row"];
export type InsertServices = Database["public"]["Tables"]["services"]["Insert"];
export type UpdateServices = Database["public"]["Tables"]["services"]["Update"];
