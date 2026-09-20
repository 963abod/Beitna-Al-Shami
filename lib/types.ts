export type Language = 'ar' | 'en';

export interface Table {
  id: string;
  tableNumber: number;
  nameAr: string;
  nameEn: string;
  section: 'courtyard' | 'balcony' | 'vip';
  sectionAr: string;
  sectionEn: string;
  capacity: number;
  status: 'available' | 'reserved' | 'occupied';
  position: { x: number; y: number }; // Percentage position on map
}

export interface MenuItem {
  id: string;
  categoryId: 'mezze' | 'grills' | 'fatteh_kibbeh' | 'desserts_drinks';
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  currency: string;
  image: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0 = mild, 1 = light, 2 = medium, 3 = hot
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  ingredientsAr: string[];
  ingredientsEn: string[];
  calories?: number;
}

export interface Reservation {
  id: string;
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "19:00"
  guestsCount: number;
  tableId: string;
  tableNumber: number;
  sectionAr: string;
  sectionEn: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'cancelled';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
