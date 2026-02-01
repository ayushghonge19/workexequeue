import express from 'express';
import dotenv from 'dotenv';
import {createclient} from 'redis';

dotenv.config();

const app = express();

//middleware 
app.use(express.json());

const QUEUE = 'task_queue'; //name of the queue in redis
console.log('Using Redis URL:', process.env.REDIS_URL);

const redis = createClient({
    url:process.env.REDIS_URL
});

redis.on("error",(err)=>{
    console.error("Redis error (producer: ", err);
})

await redis.connect();
console.log("Producer Connected to Redis");

app.post("/enqueue",async (req,res)=>{
    const task = req.body;

    if(!task.type){
        return res.status(400).json({error:"task.type required"});    
    }
    await redis.rPush(QUEUE,JSON.stringify(task));
    console.log("Task pushed to Redis: ",task);

    const len =  await redis.lLen(QUEUE);
    console.log("Queue length after push: ",len);

    res.json({status:"queued",task});
});

app.listen(process.env.PORT_PRODUCER,()=>{
    console.log("Producer running on port",process.env.PORT_PRODUCER);
   });

