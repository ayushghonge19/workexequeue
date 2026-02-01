import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import { processTask } from "./processor.js";
import { logSuccess, logFailure } from "../internal/logger.js";

dotenv.config();

const QUEUE = "task_queue";

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on("error", (err) => {
  console.error("Redis error (worker):", err);
});

await redis.connect();
console.log("Worker connected to Redis");

let jobsDone = 0;
let jobsFailed = 0;

const WORKER_COUNT = Number(process.env.WORKER_COUNT || 3);

for (let i = 0; i < WORKER_COUNT; i++) {
  startWorker(i);
}

async function startWorker(id) {
  console.log(`🧵 Worker-${id} started`);

  while (true) {
      const res = await redis.blPop("task_queue", 0);

      console.log(`Worker-${id} picked raw job:`, res.element);
      //redis stores values in json string's format
      const task = JSON.parse(res.element);

      console.log(`Worker-${id} processing task:`, task.type);

    console.log(`➡️ Worker-${id} got task:`, task);

    try {
      await processTask(task);
      jobsDone++;
      console.log(`Worker-${id} finished task:`, task.type);
      logSuccess(task);
    } catch (err) {
      jobsFailed++;
      logFailure(task, err);
      console.error(`❌ Worker-${id} failed task`, err.message);
    }
  }
}

/* Metrics */
const app = express();
app.get("/metrics", (req, res) => {
  res.json({ jobsDone, jobsFailed });
});

app.listen(process.env.WORKER_PORT, () => {
  console.log("Metrics server running on", process.env.WORKER_PORT);
});
