import Kafka from "node-rdkafka";
import eventType from "../eventType.js";

const stream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "message" }
);

function getRandomAnimal() {
    const categories = ['CAT', 'DOG'];
    return categories[Math.floor(Math.random() * categories.length)]
}

function getRandomNoise(animal) {

    if (animal === 'CAT') {
        const noises = ['purr', 'meow'];
        return noises[Math.floor(Math.random() * noises.length)]
    } else if (animal === 'DOG') {
        const noises = ['woof', 'bark'];
        return noises[Math.floor(Math.random() * noises.length)]
    }
}

function queueMessage() {
  const category = getRandomAnimal();
  const noise = getRandomNoise(category)
  const event = { category, noise};
  const result = stream.write(eventType.toBuffer(event));
  if (result) {
    console.log("message write");
  } else {
    console.log("something wrong");
  }
}

setInterval(() => {
  queueMessage();
}, 3000);
