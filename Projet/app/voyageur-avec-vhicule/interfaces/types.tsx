import { Dayjs } from "dayjs";

export interface formError {
  endDate : string
  startDate : string
}

export interface Event {
    id: number;
    title: string;
    startDateTime: string;
    endDateTime: string;
    departure : string;
    arrival : string
    nbPlace : number;
    categorie : string
    marque : string
    
}

export interface EventType {
    id: number;
    title: string;
    start: Dayjs;
    end: Dayjs;
}

export interface MonthEvent {
    id: number;
    title: string;
    startDateTime: string;
    endDateTime: string;
    departure : string;
    arrival : string
    nbPlace : number;
    categorie : string
    marque : string
  }

export interface ContextWrapperProps {
    children: any;
  }

export type CalEventAction = {
    type: string;
    payload?: any;
  };