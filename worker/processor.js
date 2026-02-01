export async function processorTask(task) {
  if (!task.payload) {
    throw new Error("Payload is empty");
  }
  switch (task.type) {

    case "send_email":
      await sleep(2000);
      console.log(
        "Sending email to",
        task.payload.to,
        "With subject",
        task.payload.subject,
      );
      return;

    case "resize_image":
      console.log("Resizing image to", task.payload.new_x, task.payload.new_y);
      return;

    case "generate_pdf":
      console.log("Generating PDF...");
      return;

    default:
      throw new Error("unsupported task");
  }
}

function sleep(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms));
}