import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';


const consumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092'
}, {});

consumer.connect();

consumer.on('ready', () => {
    console.log('consumer ready ...');
    consumer.subscribe(['message']);
    consumer.consume();
}).on('data', (data) => {
    console.log(`receive message: ${eventType.fromBuffer(data.value)}`)
});