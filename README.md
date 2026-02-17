WorkExequeue
============

A Distributed Background Task Processing System written in **Node.js**, using **Redis** for job queuing.

📂 Project Structure
--------------------

<img width="606" height="317" alt="image" src="https://github.com/user-attachments/assets/0e7ba51a-e932-4947-8af8-d96cba566273" />


🚀 High Level Overview
----------------------

### What's the need for this?

This system handles the processing and execution of background tasks asynchronously to improve user experience. It decouples task submission from execution using the **Producer-Consumer** pattern.

**Example:** Instead of making a user wait for a "Welcome Email" to be sent during login, the system adds a send\_email task to the queue. The **Worker** picks it up and processes it in the background, allowing the user to proceed immediately.

<img width="489" height="965" alt="image" src="https://github.com/user-attachments/assets/74056481-a636-4c0f-8f94-05e2dad2c2c1" />

🛠️ Getting Started
-------------------

Follow these steps to set up and run the system locally.

### 1️⃣ Prerequisites

*   Node.js (v14+)
    
*   Docker (Recommended for Redis)
    

### 2️⃣ Install Dependencies

Navigate to the project root and install the required packages:

`   npm install   `

### 3️⃣ Start Redis

**Option A – Using Docker (Recommended)**Make sure Docker Desktop is running, then execute:


`   docker run --name redis -p 6379:6379 -d redis   `

If the container is already created but stopped:


`   docker start redis   `

### 4️⃣ Start Worker

Open a new terminal window and run:


`   npm run worker   `

**Expected Output:**


`   Worker connected to Redis  Worker-0 started   `

### 5️⃣ Start Producer

Open another terminal window and run:


`   npm run producer   `

**Expected Output:**

`   Producer connected to Redis  Producer running on port 8080   `

### 6️⃣ Enqueue a Job

You can test the system by sending a job using curl.

**Command:**



`   curl -X POST http://localhost:8080/enqueue \  -H "Content-Type: application/json" \  -d "{\"type\":\"send_email\",\"payload\":{\"to\":\"example@test.com\"}}"   `

**Verify Output:**Check your **Worker terminal**, you should see:


`   Processing task: send_email   `

📡 Services & API
-----------------

### Producer Service

*   **Location:** producer/server.js
    
*   **Port:** 8080
    
*   **Route:** POST /enqueue
    
*   JSON{ "type": "send\_email", "retries": 3, "payload": { "to": "user@example.com", "subject": "Hello World" }}
    

### Worker Service

*   **Location:** worker/worker.js
    
*   **Functionality:** Consumes tasks from Redis (BLPOP) and processes them based on type.
    
*   **Supported Tasks:**
    
    *   send\_email: Simulates sending an email.
        
    *   resize\_image: Simulates image resizing logic.
        
    *   generate\_pdf: Simulates PDF generation.
        

📊 Observability
----------------

*   **Logs:** Execution details are saved to success.log and failure.log in the root directory.
    
*   **Metrics:** The worker exposes a simple metrics endpoint (default port 4000) at /metrics to track jobs\_done and jobs\_failed.

Built By Ayush Ghonge

Contributing:

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

