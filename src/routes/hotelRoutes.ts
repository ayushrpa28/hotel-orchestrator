import { Router } from "express";
import { Connection, Client } from "@temporalio/client";
import redis from "../redis/client";
import { supplierAHotels } from "../suppliers/supplierA";
import { supplierBHotels } from "../suppliers/supplierB";

const router = Router();
router.get("/hotels", async (req, res) => {
  const { city, minPrice, maxPrice } = req.query;

async function connectTemporal() {
  let retries = 5;

  while (retries) {
    try {
      const connection = await Connection.connect({
        address: "temporal:7233",
      });

      console.log("✅ Connected to Temporal");
      return new Client({ connection });
    } catch (err) {
      console.log("⏳ Waiting for Temporal...");
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  throw new Error("❌ Could not connect to Temporal");
}

  const client = await connectTemporal();

  const handle = await client.workflow.start("hotelWorkflow", {
    args: [city],
    taskQueue: "hotel-task-queue",
    workflowId: "hotel-" + Date.now(),
  });

  let result: any = await handle.result();

  // Save in Redis
  await redis.set(city as string, JSON.stringify(result));

  // Filter using Redis
  let filtered = result;

  if (minPrice && maxPrice) {
    filtered = result.filter((h: any) =>
      h.price >= Number(minPrice) && h.price <= Number(maxPrice)
    );
  }

  res.json(filtered);
});

router.get("/health", async (req, res) => {
  try {
    // Simulate supplier checks (replace with real API calls if needed)
    const supplierAStatus = supplierAHotels().length > 0 ? "UP" : "DOWN";
    const supplierBStatus = supplierBHotels().length > 0 ? "UP" : "DOWN";

    const overallStatus =
      supplierAStatus === "UP" && supplierBStatus === "UP"
        ? "UP"
        : "DEGRADED";

    res.json({
      status: overallStatus,
      suppliers: {
        supplierA: supplierAStatus,
        supplierB: supplierBStatus,
      },
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      status: "DOWN",
      message: "Health check failed",
    });
  }
});

export default router;