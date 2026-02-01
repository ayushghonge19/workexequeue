import fs from "fs";

export function logSuccess(task) {
    const text = `\nSuccess | ${new Date().toISOString()} | Type: ${task.type} | Payload: ${JSON.stringify(task.payload)} | Retries: ${task.retries}\n`;
    fs.appendFileSync('success.log', text);
}
export function logFailure(task,err){
    const text = `\nFailure | ${new Date().toISOString()} | Type: ${task.type} | Payload: ${JSON.stringify(task.payload)} | Retries: ${task.retries} | Error: ${err.message}\n`;
    fs.appendFileSync('failure.log', text);
}