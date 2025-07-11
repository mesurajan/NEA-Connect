import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, Search, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const OfficeLocator = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  

const handleDistrictChange = (newDistrict) => {
  setSelectedDistrict(newDistrict);
  setSearchTerm('');  // Reset search when district filter changes
};

console.log("Selected District:", selectedDistrict);
console.log("Search Term:", searchTerm);



const districts = [
  'Achham', 'Arghakhanchi', 'Baglung', 'Baitadi', 'Bajhang', 
  'Bajura', 'Banke', 'Bara', 'Bardiya', 'Bhaktapur', 
  'Bhojpur', 'Chitwan', 'Dadeldhura', 'Dhanusa', 'Dhankuta', 
  'Dholkha', 'Dolakha', 'Dang', 'Gorkha', 'Gulmi', 
  'Humla', 'Ilam', 'Jajarkot', 'Jhapa', 'Jumla', 
  'Kailali', 'Kaski', 'Kathmandu', 'Kavrepalanchok', 'Khotang', 
  'Lalitpur', 'Lamjung', 'Makwanpur', 'Manang', 'Morang', 
  'Mugu', 'Mustang', 'Nawalparasi', 'Nuwakot', 'Okhaldhunga', 
  'Palpa', 'Parsa', 'Parbat', 'Ramechhap', 'Rasuwa', 
  'Rolpa', 'Rupandehi', 'Salyan', 'Sankhuwasabha', 'Sarlahi', 
  'Sindhuli', 'Sindhupalchok', 'Siraaha', 'Solukhumbu', 'Sunsari', 
  'Surkhet', 'Syangja', 'Tanahun', 'Taplejung', 'Terhathum', 
  'Udayapur'
];
const offices = [
  {
    name: 'NEA Achham Office',
    district: 'Achham',
    address: 'Sanphebagar, Achham',
    phone: '097-000000',
    email: 'achham@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.4321, lng: 81.6143 }
  },
  {
    name: 'NEA Arghakhanchi Office',
    district: 'Arghakhanchi',
    address: 'Sandhikharka, Arghakhanchi',
    phone: '078-500200',
    email: 'arghakhanchi@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.7982, lng: 83.4593 }
  },
  {
    name: 'NEA Baglung Office',
    district: 'Baglung',
    address: 'Baglung Bazar, Baglung',
    phone: '068-520175',
    email: 'baglung@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.2124, lng: 83.5689 }
  },
  {
    name: 'NEA Baitadi Office',
    district: 'Baitadi',
    address: 'Dasharathchand, Baitadi',
    phone: '093-460153',
    email: 'baitadi@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.3732, lng: 81.7076 }
  },
  {
    name: 'NEA Bajhang Office',
    district: 'Bajhang',
    address: 'Chainpur, Bajhang',
    phone: '097-520475',
    email: 'bajhang@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.1510, lng: 81.6374 }
  },
  {
    name: 'NEA Bajura Office',
    district: 'Bajura',
    address: 'Martadi, Bajura',
    phone: '096-533019',
    email: 'bajura@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.3319, lng: 81.7912 }
  },
  {
    name: 'NEA Banke Office',
    district: 'Banke',
    address: 'Nepalgunj, Banke',
    phone: '081-525654',
    email: 'banke@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.0020, lng: 81.5923 }
  },
  {
    name: 'NEA Bara Office',
    district: 'Bara',
    address: 'Kalaiya, Bara',
    phone: '051-522105',
    email: 'bara@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.0305, lng: 84.9461 }
  },
  {
    name: 'NEA Bardiya Office',
    district: 'Bardiya',
    address: 'Gulariya, Bardiya',
    phone: '084-520823',
    email: 'bardiya@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.0955, lng: 81.4817 }
  },
  {
    name: 'NEA Bhaktapur Office',
    district: 'Bhaktapur',
    address: 'Bhaktapur Durbar Square, Bhaktapur',
    phone: '01-6610348',
    email: 'bhaktapur@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.6722, lng: 85.4276 }
  },
  {
    name: 'NEA Bhojpur Office',
    district: 'Bhojpur',
    address: 'Bhojpur Bazar, Bhojpur',
    phone: '029-520504',
    email: 'bhojpur@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.3206, lng: 87.6717 }
  },
  {
    name: 'NEA Chitwan Office',
    district: 'Chitwan',
    address: 'Bharatpur, Chitwan-11',
    phone: '056-591119',
    email: 'chitwan@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'New Connection', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.6984, lng: 84.3549 }
  },
  {
    name: 'NEA Dadeldhura Office',
    district: 'Dadeldhura',
    address: 'Dadeldhura Bazar, Dadeldhura',
    phone: '096-531051',
    email: 'dadeldhura@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.3046, lng: 80.9057 }
  },
  {
    name: 'NEA Dhanusa Office',
    district: 'Dhanusa',
    address: 'Janakpur, Dhanusa-3',
    phone: '041-522687',
    email: 'dhanusa@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 26.7266, lng: 85.9345 }
  },
  {
    name: 'NEA Dhankuta Office',
    district: 'Dhankuta',
    address: 'Dhankuta Bazar, Dhankuta',
    phone: '025-520137',
    email: 'dhankuta@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 26.9883, lng: 87.3232 }
  },
  {
    name: 'NEA Dholkha Office',
    district: 'Dholkha',
    address: 'Dholkha Bazar, Dholkha',
    phone: '029-470060',
    email: 'dholkha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.6098, lng: 86.0691 }
  },
  {
    name: 'NEA Dolakha Office',
    district: 'Dolakha',
    address: 'Charikot, Dolakha',
    phone: '029-470145',
    email: 'dolakha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.9927, lng: 86.1657 }
  },
  {
    name: 'NEA Dang Office',
    district: 'Dang',
    address: 'Ghorahi, Dang',
    phone: '082-560145',
    email: 'dang@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'New Connection', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.4026, lng: 82.5880 }
  },
  {
    name: 'NEA Gorkha Office',
    district: 'Gorkha',
    address: 'Gorkha Bazar, Gorkha',
    phone: '064-520473',
    email: 'gorkha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.2096, lng: 84.6412 }
  },
  {
    name: 'NEA Gulmi Office',
    district: 'Gulmi',
    address: 'Tamghas, Gulmi',
    phone: '078-500489',
    email: 'gulmi@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.9261, lng: 83.4314 }
  },
   {
    name: 'NEA Humla Office',
    district: 'Humla',
    address: 'Simkot, Humla',
    phone: '092-420009',
    email: 'humla@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 30.0246, lng: 81.7941 }
  },
  {
    name: 'NEA Ilam Office',
    district: 'Ilam',
    address: 'Ilam Bazar, Ilam',
    phone: '027-520234',
    email: 'ilam@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.2381, lng: 87.9335 }
  },
  {
    name: 'NEA Jajarkot Office',
    district: 'Jajarkot',
    address: 'Chhatiwan, Jajarkot',
    phone: '082-560145',
    email: 'jajarkot@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.1992, lng: 82.2549 }
  },
  {
    name: 'NEA Jhapa Office',
    district: 'Jhapa',
    address: 'Bhadrapur, Jhapa',
    phone: '023-570223',
    email: 'jhapa@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 26.6202, lng: 87.9257 }
  },
  {
    name: 'NEA Jumla Office',
    district: 'Jumla',
    address: 'Jumla Bazar, Jumla',
    phone: '097-420130',
    email: 'jumla@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.2745, lng: 82.1733 }
  },
  {
    name: 'NEA Kailali Office',
    district: 'Kailali',
    address: 'Dhangadhi, Kailali',
    phone: '091-522307',
    email: 'kailali@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'New Connection'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.6943, lng: 80.6034 }
  },
  {
    name: 'NEA Kaski Office',
    district: 'Kaski',
    address: 'Pokhara, Kaski',
    phone: '061-460811',
    email: 'kaski@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.2096, lng: 83.9856 }
  },
  {
    name: 'NEA Kathmandu Office',
    district: 'Kathmandu',
    address: 'Durbar Marg, Kathmandu-1',
    phone: '01-4414314',
    email: 'info@nea.org.np',
    type: 'Head Office',
    services: ['Bill Payment', 'New Connection', 'Complaints', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.7103, lng: 85.3222 }
  },
  {
    name: 'NEA Kavrepalanchok Office',
    district: 'Kavrepalanchok',
    address: 'Banepa, Kavrepalanchok',
    phone: '011-523001',
    email: 'kavre@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.6080, lng: 85.6429 }
  },
  {
    name: 'NEA Khotang Office',
    district: 'Khotang',
    address: 'Diktel, Khotang',
    phone: '031-460251',
    email: 'khotang@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.4044, lng: 86.2020 }
  },
  {
    name: 'NEA Lalitpur Office',
    district: 'Lalitpur',
    address: 'Patan, Lalitpur-2',
    phone: '01-5521452',
    email: 'patan@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'New Connection', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.6734, lng: 85.3250 }
  },
  {
    name: 'NEA Lamjung Office',
    district: 'Lamjung',
    address: 'Besisahar, Lamjung',
    phone: '064-420125',
    email: 'lamjung@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.2098, lng: 84.3645 }
  },
  {
    name: 'NEA Makwanpur Office',
    district: 'Makwanpur',
    address: 'Hetauda, Makwanpur',
    phone: '057-520360',
    email: 'makwanpur@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.4299, lng: 84.9291 }
  },
  {
    name: 'NEA Manang Office',
    district: 'Manang',
    address: 'Chame, Manang',
    phone: '061-520317',
    email: 'manang@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.6016, lng: 84.1096 }
  },
  {
    name: 'NEA Morang Office',
    district: 'Morang',
    address: 'Biratnagar, Morang-11',
    phone: '021-526970',
    email: 'morang@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'New Connection', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 26.4584, lng: 87.2830 }
  },
  {
    name: 'NEA Mugu Office',
    district: 'Mugu',
    address: 'Gamgadi, Mugu',
    phone: '096-501012',
    email: 'mugu@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.2492, lng: 81.4575 }
  },
  {
    name: 'NEA Mustang Office',
    district: 'Mustang',
    address: 'Jomsom, Mustang',
    phone: '061-460321',
    email: 'mustang@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.5883, lng: 83.7315 }
  },
  {
    name: 'NEA Nawalparasi Office',
    district: 'Nawalparasi',
    address: 'Parasi, Nawalparasi',
    phone: '078-540202',
    email: 'nawalparasi@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.6997, lng: 83.6502 }
  },
  {
    name: 'NEA Nuwakot Office',
    district: 'Nuwakot',
    address: 'Bidur, Nuwakot',
    phone: '010-522210',
    email: 'nuwakot@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.9381, lng: 84.4213 }
  },
  {
    name: 'NEA Okhaldhunga Office',
    district: 'Okhaldhunga',
    address: 'Okhaldhunga Bazar, Okhaldhunga',
    phone: '035-520377',
    email: 'okhaldhunga@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.3991, lng: 86.2135 }
  },
    {
    name: 'NEA Palpa Office',
    district: 'Palpa',
    address: 'Tansen, Palpa',
    phone: '071-540132',
    email: 'palpa@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.9874, lng: 83.4511 }
  },
  {
    name: 'NEA Parsa Office',
    district: 'Parsa',
    address: 'Birgunj, Parsa',
    phone: '051-524808',
    email: 'parsa@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'New Connection', 'Complaints'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.0019, lng: 84.8733 }
  },
  {
    name: 'NEA Parbat Office',
    district: 'Parbat',
    address: 'Kusma, Parbat',
    phone: '065-520123',
    email: 'parbat@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.4173, lng: 83.6054 }
  },
  {
    name: 'NEA Ramechhap Office',
    district: 'Ramechhap',
    address: 'Manthali, Ramechhap',
    phone: '036-520350',
    email: 'ramechhap@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.3010, lng: 86.1741 }
  },
  {
    name: 'NEA Rasuwa Office',
    district: 'Rasuwa',
    address: 'Dhunche, Rasuwa',
    phone: '010-541234',
    email: 'rasuwa@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.1284, lng: 85.3163 }
  },
  {
    name: 'NEA Rolpa Office',
    district: 'Rolpa',
    address: 'Rolpa Bazar, Rolpa',
    phone: '085-540246',
    email: 'rolpa@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.5245, lng: 82.6003 }
  },
  {
    name: 'NEA Rupandehi Office',
    district: 'Rupandehi',
    address: 'Bhairahawa, Rupandehi',
    phone: '071-520159',
    email: 'rupandehi@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.6711, lng: 83.4192 }
  },
  {
    name: 'NEA Salyan Office',
    district: 'Salyan',
    address: 'Salyan Bazar, Salyan',
    phone: '085-570101',
    email: 'salyan@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.2061, lng: 82.2907 }
  },
  {
    name: 'NEA Sankhuwasabha Office',
    district: 'Sankhuwasabha',
    address: 'Khandbari, Sankhuwasabha',
    phone: '029-550204',
    email: 'sankhuwasabha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.3205, lng: 87.4504 }
  },
  {
    name: 'NEA Sarlahi Office',
    district: 'Sarlahi',
    address: 'Malangawa, Sarlahi',
    phone: '046-540315',
    email: 'sarlahi@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 26.7334, lng: 85.8609 }
  },
  {
    name: 'NEA Sindhuli Office',
    district: 'Sindhuli',
    address: 'Sindhuli Bazar, Sindhuli',
    phone: '038-520230',
    email: 'sindhuli@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.0506, lng: 85.8484 }
  },
  {
    name: 'NEA Sindhupalchok Office',
    district: 'Sindhupalchok',
    address: 'Chautara, Sindhupalchok',
    phone: '010-550163',
    email: 'sindhupalchok@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.5331, lng: 85.7396 }
  },
  {
    name: 'NEA Siraaha Office',
    district: 'Siraaha',
    address: 'Siraaha Bazar, Siraaha',
    phone: '033-560128',
    email: 'siraaha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 26.7564, lng: 86.1757 }
  },
  {
    name: 'NEA Solukhumbu Office',
    district: 'Solukhumbu',
    address: 'Salleri, Solukhumbu',
    phone: '036-550162',
    email: 'solukhumbu@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.5892, lng: 86.6230 }
  },
  {
    name: 'NEA Sunsari Office',
    district: 'Sunsari',
    address: 'Inaruwa, Sunsari',
    phone: '025-524171',
    email: 'sunsari@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'New Connection'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 26.6731, lng: 87.3063 }
  },
  {
    name: 'NEA Surkhet Office',
    district: 'Surkhet',
    address: 'Birendranagar, Surkhet',
    phone: '084-520211',
    email: 'surkhet@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Technical Support'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.6022, lng: 81.6118 }
  },
  {
    name: 'NEA Syangja Office',
    district: 'Syangja',
    address: 'Syangja Bazar, Syangja',
    phone: '063-520105',
    email: 'syangja@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.1698, lng: 83.5563 }
  },
  {
    name: 'NEA Tanahun Office',
    district: 'Tanahun',
    address: 'Damauli, Tanahun',
    phone: '065-530271',
    email: 'tanahun@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.9835, lng: 84.3092 }
  },
  {
    name: 'NEA Taplejung Office',
    district: 'Taplejung',
    address: 'Taplejung Bazar, Taplejung',
    phone: '027-520100',
    email: 'taplejung@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.3891, lng: 87.9474 }
  },
  {
    name: 'NEA Terhathum Office',
    district: 'Terhathum',
    address: 'Dhankuta, Terhathum',
    phone: '027-540120',
    email: 'terhathum@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.3347, lng: 87.3804 }
  },
  {
    name: 'NEA Udayapur Office',
    district: 'Udayapur',
    address: 'Gaighat, Udayapur',
    phone: '035-520444',
    email: 'udayapur@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 26.9829, lng: 87.2686 }
  },
    {
    name: 'NEA Bajhang Office',
    district: 'Bajhang',
    address: 'Bajhang Bazar, Bajhang',
    phone: '094-550217',
    email: 'bajhang@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.3701, lng: 81.7878 }
  },
  {
    name: 'NEA Bajura Office',
    district: 'Bajura',
    address: 'Martadi, Bajura',
    phone: '096-540134',
    email: 'bajura@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.3793, lng: 81.6097 }
  },
  {
    name: 'NEA Banke Office',
    district: 'Banke',
    address: 'Nepalgunj, Banke',
    phone: '081-523091',
    email: 'banke@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'New Connection', 'Complaints'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.1216, lng: 81.6164 }
  },
  {
    name: 'NEA Bara Office',
    district: 'Bara',
    address: 'Parwanipur, Bara',
    phone: '051-540234',
    email: 'bara@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.0410, lng: 84.9663 }
  },
  {
    name: 'NEA Bardiya Office',
    district: 'Bardiya',
    address: 'Gulariya, Bardiya',
    phone: '085-540001',
    email: 'bardiya@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 28.2682, lng: 81.5429 }
  },
  {
    name: 'NEA Bhaktapur Office',
    district: 'Bhaktapur',
    address: 'Bhaktapur Durbar Square, Bhaktapur',
    phone: '01-6610348',
    email: 'bhaktapur@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.6722, lng: 85.4276 }
  },
  {
    name: 'NEA Bhojpur Office',
    district: 'Bhojpur',
    address: 'Bhojpur Bazar, Bhojpur',
    phone: '029-520149',
    email: 'bhojpur@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.2634, lng: 87.4806 }
  },
  {
    name: 'NEA Chitwan Office',
    district: 'Chitwan',
    address: 'Bharatpur, Chitwan',
    phone: '056-520710',
    email: 'chitwan@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'New Connection', 'Complaints'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 27.6575, lng: 84.3560 }
  },
  {
    name: 'NEA Dadeldhura Office',
    district: 'Dadeldhura',
    address: 'Dadeldhura Bazar, Dadeldhura',
    phone: '091-520129',
    email: 'dadeldhura@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 29.2964, lng: 81.4310 }
  },
  {
    name: 'NEA Dhanusa Office',
    district: 'Dhanusa',
    address: 'Janakpur, Dhanusa',
    phone: '041-523358',
    email: 'dhanusa@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'New Connection'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 26.7267, lng: 85.9162 }
  },
  {
    name: 'NEA Dhankuta Office',
    district: 'Dhankuta',
    address: 'Dhankuta Bazar, Dhankuta',
    phone: '027-540245',
    email: 'dhankuta@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.0344, lng: 87.2745 }
  },
  {
    name: 'NEA Dholkha Office',
    district: 'Dholkha',
    address: 'Dholkha Bazar, Dholkha',
    phone: '036-540310',
    email: 'dholkha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.6007, lng: 85.8063 }
  },
  {
    name: 'NEA Dolakha Office',
    district: 'Dolakha',
    address: 'Charikot, Dolakha',
    phone: '036-540225',
    email: 'dolakha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.6402, lng: 86.1444 }
  },
  {
    name: 'NEA Dang Office',
    district: 'Dang',
    address: 'Ghorahi, Dang',
    phone: '082-520115',
    email: 'dang@nea.org.np',
    type: 'Regional Office',
    services: ['Bill Payment', 'Complaints', 'Meter Reading'],
    workingHours: '10:00 AM - 5:00 PM',
    coordinates: { lat: 28.1449, lng: 82.3210 }
  },
  {
    name: 'NEA Gorkha Office',
    district: 'Gorkha',
    address: 'Gorkha Bazar, Gorkha',
    phone: '064-540101',
    email: 'gorkha@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.8966, lng: 84.7474 }
  },
  {
    name: 'NEA Gulmi Office',
    district: 'Gulmi',
    address: 'Tamghas, Gulmi',
    phone: '071-520162',
    email: 'gulmi@nea.org.np',
    type: 'Branch Office',
    services: ['Bill Payment', 'Complaints'],
    workingHours: '10:00 AM - 4:00 PM',
    coordinates: { lat: 27.9644, lng: 83.4425 }
  }
];


  
const filteredOffices = offices.filter(office => {
  // Normalize district comparison to lowercase for case insensitivity
  const matchesDistrict = selectedDistrict === "All" || office.district.toLowerCase().includes(selectedDistrict.toLowerCase());
  console.log("District filter matches:", matchesDistrict);
  // Normalize search term and match against office name, address, or district
  const matchesSearch = !searchTerm || 
    office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.district.toLowerCase().includes(searchTerm.toLowerCase());
    console.log("Search filter matches:", matchesSearch); 
  return matchesDistrict && matchesSearch;
});

console.log("Filtered Offices:", filteredOffices);

/* 
   const filteredOffices = offices.filter(office => {
    const matchesDistrict = selectedDistrict === "all" || office.district === selectedDistrict;
    const matchesSearch = !searchTerm || 
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDistrict && matchesSearch;
  });
*/

 
  const getOfficeColor = (type) => {
    switch(type) {
      case 'Head Office': return 'bg-red-600';
      case 'Regional Office': return 'bg-blue-600';
      case 'Branch Office': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NEA Connect</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NEA Office Locator</h2>
          <p className="text-lg text-gray-600">
            Find Nepal Electricity Authority offices near you
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Find NEA Office
            </CardTitle>
            <CardDescription>
              Search by district, office name, or address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <Input
                  placeholder="Search by name, address, or district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by District</label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="All districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Districts</SelectItem>
                    
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <strong>{filteredOffices.length}</strong> office{filteredOffices.length !== 1 ? 's' : ''} 
            {selectedDistrict && selectedDistrict !== "All" && ` in ${selectedDistrict}`}

            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Office List */}
        <div className="grid gap-6">
          {filteredOffices.map((office, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{office.name}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                  </div>
                  <Badge className={`${getOfficeColor(office.type)} text-white`}>
                    {office.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">
                        <strong>Phone:</strong> {office.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm">
                        <strong>Hours:</strong> {office.workingHours}
                      </span>
                    </div>
                    <div className="text-sm">
                      <strong>Email:</strong> {office.email}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Available Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://maps.google.com/?q=${office.coordinates.lat},${office.coordinates.lng}`, '_blank')}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`tel:${office.phone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call Office
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffices.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No offices found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or check back later.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contact */}
        <Card className="mt-8 bg-gradient-to-r from-red-600 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">24/7 Helpline</h4>
                <p className="text-lg font-bold">1660-01-10001</p>
                <p className="text-sm opacity-90">For power outages and emergencies</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customer Service</h4>
                <p className="text-lg font-bold">01-4414314</p>
                <p className="text-sm opacity-90">For general inquiries (10 AM - 5 PM)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficeLocator;