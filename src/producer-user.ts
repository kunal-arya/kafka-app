import { Kafka } from "kafkajs";


const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer();

(async () => {
    await producer.connect();

    producer.send({
        topic: "payment-done",
        messages: [
            {
                value: "hi there user1",
                key: "user1"
            }
        ]
    })
})()