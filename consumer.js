const { kafka } = require("./client.js");
const group = process.argv[2];

async function init() {
    const consumer = kafka.consumer({ groupId: group });

    console.log("Connecting consumer...");
    await consumer.connect();
    console.log("Consumer connected ✅");

    console.log("Subscribing to topic: rider-updates...");
    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
    console.log("Subscribed to topic ✅");

    console.log("Running consumer...");
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${group} [${topic}]: PART:${partition}: ${message.value.toString()}`);
        },
    });
}

init().catch((err) => {
    console.error("Error in consumer:", err);
});
