import Kafka from 'node-rdkafka';

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {topic: 'message'});

function queueMessage() {
    const result = stream.write(Buffer.from('hi kafka'))

    if (result) {
        console.log('message write')
    } else {
        console.log('something wrong')
    }

}

setInterval(() => {
    queueMessage();
}, 3000)