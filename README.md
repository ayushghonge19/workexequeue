WorkQueue

WorkQueue is a distributed background task processing system written in Node.js, using Redis for job queuing. It decouples task submission from execution to improve application performance.
Installation

Use the package manager npm to install the dependencies.
Bash

npm install

Start the Redis server (Required). Using Docker is recommended:
Bash

# Start Redis container
docker run --name redis -p 6379:6379 -d redis

Usage

To use the system, you need to start the worker and producer services in separate terminals.

1. Start the Worker
Bash

npm run worker
# Output: Worker connected to Redis... Worker-0 started

2. Start the Producer
Bash

npm run producer
# Output: Producer connected to Redis... Producer running on port 8080

3. Enqueue a Job

You can send a job to the queue using curl or any HTTP client.
Bash

curl -X POST http://localhost:8080/enqueue \
-H "Content-Type: application/json" \
-d "{\"type\":\"send_email\",\"payload\":{\"to\":\"example@test.com\"}}"

The worker terminal will output:
Plaintext

Processing task: send_email

Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
