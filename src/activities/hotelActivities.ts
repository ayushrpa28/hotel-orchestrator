import { supplierAHotels } from "../suppliers/supplierA";
import { supplierBHotels } from "../suppliers/supplierB";
import { Hotel } from "../types/hotel";

export async function getSupplierA(city: string) {
  try {
    console.log("📡 Calling Supplier A for:", city);

    const data = supplierAHotels().filter((h: Hotel) => h.city === city);

    console.log("✅ Supplier A success:", data.length);

    return data;
  } catch (error) {
    console.error("❌ Supplier A failed:", error);
    throw error; // important for Temporal retry
  }
}

export async function getSupplierB(city: string) {
  try {
    console.log("📡 Calling Supplier B for:", city);

    const data = supplierBHotels().filter((h: Hotel) => h.city === city);

    console.log("✅ Supplier B success:", data.length);

    return data;
  } catch (error) {
    console.error("❌ Supplier B failed:", error);
    throw error;
  }
}