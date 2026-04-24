import { Hotel } from "../types/hotel";
export const supplierBHotels = () :Hotel[] => {
  return [
    { hotelId: "b1", name: "Holtin", price: 5340, city: "delhi", commissionPct: 20 },
    { hotelId: "b2", name: "Taj", price: 7000, city: "delhi", commissionPct: 15 }
  ];
};