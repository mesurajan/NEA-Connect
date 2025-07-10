export interface Outage {
  area: string;
  startTime: string;
  endTime: string;
  duration: string;
  reason: string;
  status: 'ongoing' | 'resolved' | 'scheduled';
  affectedCustomers: string;
}

export interface ScheduleItem {
  day: string;
  time: string;
  areas: string[];
}

export interface Areas {
  [key: string]: string[];
}
