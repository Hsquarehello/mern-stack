const sendEmail = require("../helper/sendEmail");
const Queue = require("bull");

// Create a new Bull queue
const emailQueue = new Queue("email-queue", {
  redis: {
    port: 6379,
    host: "localhost",
  },
});

emailQueue.process(async (job) => {
  await sendEmail(job.data);
});

// Export the emailQueue object
module.exports = emailQueue;