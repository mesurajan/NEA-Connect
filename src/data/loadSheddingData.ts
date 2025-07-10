import { Outage, ScheduleItem, Areas } from '@/types/loadShedding';

export const districts = [
  'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar', 
  'Butwal', 'Dharan', 'Janakpur', 'Nepalgunj', 'Chitwan'
];

export const areas: Areas = {
  'Kathmandu': ['Baneshwor', 'Thamel', 'New Road', 'Maharajgunj', 'Balaju', 'Koteshwor'],
  'Lalitpur': ['Patan', 'Jawalakhel', 'Sanepa', 'Kumaripati', 'Satdobato'],
  'Bhaktapur': ['Durbar Square', 'Madhyapur', 'Suryabinayak', 'Changunarayan']
};

export const currentOutages: Outage[] = [
  {
    area: 'Baneshwor, Kathmandu',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    duration: '2 hours',
    reason: 'Scheduled Maintenance',
    status: 'ongoing',
    affectedCustomers: '~2,500'
  },
  {
    area: 'Thamel, Kathmandu',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    duration: '2 hours',
    reason: 'Technical Fault',
    status: 'resolved',
    affectedCustomers: '~1,200'
  },
  {
    area: 'Patan, Lalitpur',
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    duration: '2 hours',
    reason: 'Load Management',
    status: 'scheduled',
    affectedCustomers: '~3,000'
  }
];

export const weeklySchedule: ScheduleItem[] = [
  { day: 'Monday', time: '6:00 AM - 8:00 AM', areas: ['Baneshwor', 'Koteshwor'] },
  { day: 'Monday', time: '2:00 PM - 4:00 PM', areas: ['Thamel', 'New Road'] },
  { day: 'Tuesday', time: '8:00 AM - 10:00 AM', areas: ['Maharajgunj', 'Balaju'] },
  { day: 'Tuesday', time: '4:00 PM - 6:00 PM', areas: ['Patan', 'Jawalakhel'] },
  { day: 'Wednesday', time: '10:00 AM - 12:00 PM', areas: ['Sanepa', 'Kumaripati'] },
  { day: 'Thursday', time: '1:00 PM - 3:00 PM', areas: ['Durbar Square', 'Madhyapur'] },
  { day: 'Friday', time: '7:00 AM - 9:00 AM', areas: ['Baneshwor', 'Koteshwor'] },
];
