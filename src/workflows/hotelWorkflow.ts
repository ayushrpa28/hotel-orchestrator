import { proxyActivities } from "@temporalio/workflow";

const { getSupplierA, getSupplierB } = proxyActivities<any>({
  startToCloseTimeout: "5s",
});

export async function hotelWorkflow(city: string) {
  let aHotels: any[] = [];
  let bHotels: any[] = [];

  try {
    aHotels = await getSupplierA(city);
  } catch (e) {
    console.log("⚠️ Supplier A failed, continuing...");
  }

  try {
    bHotels = await getSupplierB(city);
  } catch (e) {
    console.log("⚠️ Supplier B failed, continuing...");
  }

  const map = new Map();

  [...aHotels, ...bHotels].forEach((hotel: any) => {
    if (!map.has(hotel.name) || map.get(hotel.name).price > hotel.price) {
      map.set(hotel.name, hotel);
    }
  });

  return Array.from(map.values());
}