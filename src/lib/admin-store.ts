/** Browser-only storage for the admin panel (no server needed). */

export type ContactInfo = {
  doctor: string;
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
};
export type Service = { id: string; name: string; description: string };
export type Faq = { id: string; question: string; answer: string };
export type AppointmentRequest = {
  id: string;
  name: string;
  phone: string;
  date: string;
  message: string;
  page: string;
  createdAt: number;
  read: boolean;
};
export type Account = { username: string; password: string };

export const KEYS = {
  contact: "site_admin_contact_v2",
  services: "site_admin_services_v2",
  faqs: "site_admin_faqs_v2",
  requests: "site_admin_requests_v2",
  account: "site_admin_account_v2",
} as const;

export const DEFAULT_CONTACT: ContactInfo = {
  doctor: "Dr. Lama Ghassan",
  title: "Cosmetic Dentist",
  phone: "+968 7992 2259",
  whatsapp: "+968 9774 5838",
  email: "info@naelalhazeem.com",
  address: "NHC — Dr. Nael Al Hazeem Medical Center, 113 Sultan Qaboos St, Al Ghubra North, Muscat, Oman",
  hours: "Saturday – Thursday, 9:00 AM – 9:00 PM · Friday closed",
  instagram: "https://www.instagram.com/dr.lama_gassan/",
  facebook: "",
};

const SERVICE_NAMES = [
  "Porcelain Veneers",
  "Hollywood Smile",
  "Digital Smile Design",
  "No-Prep Veneers (Lumineers)",
  "Composite Bonding",
  "Gap Closure (Diastema)",
  "Teeth Whitening",
  "Zirconia & E.max Crowns",
  "Gum Contouring",
  "Full-Mouth Rehabilitation",
];
export const DEFAULT_SERVICES: Service[] = SERVICE_NAMES.map((name, i) => ({
  id: `s${i + 1}`,
  name,
  description: "",
}));

export const DEFAULT_FAQS: Faq[] = [
  {
    id: "f1",
    question: "How do I book a consultation with Dr. Lama Ghassan?",
    answer: "Send a WhatsApp message to +968 9774 5838 or call NHC Medical Center on +968 7992 2259 and we will confirm a time.",
  },
  {
    id: "f2",
    question: "What happens during the first consultation?",
    answer: "Dr. Lama listens to your goals, examines your teeth and gums and explains your options clearly.",
  },
  {
    id: "f3",
    question: "How long do veneers take?",
    answer: "It depends on your plan; Dr. Lama explains the number of visits at your consultation.",
  },
];

export const DEFAULT_ACCOUNT: Account = { username: "admin", password: "admin123" };

export function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
