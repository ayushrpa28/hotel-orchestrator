import { Worker, NativeConnection } from "@temporalio/worker";
import * as activities from "./activities/hotelActivities";

async function connectWithRetry() {
  let retries = 10;

  while (retries) {
    try {
      const connection = await NativeConnection.connect({
        address: "temporal:7233",
      });

      console.log("✅ Worker connected to Temporal");
      return connection;
    } catch (err) {
      console.log("⏳ Worker waiting for Temporal...");
      retries--;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  throw new Error("❌ Worker could not connect to Temporal");
}

async function run() {
  const connection = await connectWithRetry();

  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve("./workflows/hotelWorkflow"),
    activities,
    taskQueue: "hotel-task-queue",
  });

  console.log("🚀 Worker started");

  await worker.run();
}

run();