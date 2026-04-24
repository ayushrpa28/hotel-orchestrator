import { Hotel } from "../types/hotel";
export const supplierAHotels = (): Hotel[] => {
  return [
    { hotelId: "a1", name: "Holtin", price: 6000, city: "delhi", commissionPct: 10 },
    { hotelId: "a2", name: "Radison", price: 5900, city: "delhi", commissionPct: 13 }
  ];
};