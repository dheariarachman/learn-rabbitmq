const amqplib = require('amqplib');
const { QUEUE } = require('./constants');

const rabbitUrl = 'amqp://dhearia:p4ssw0rd@localhost:5672';

const publish = async () => {
	try {
		const connection = await amqplib.connect(rabbitUrl, 'heartbeat=60');
		const channel = await connection.createChannel();

		console.info('Rabbitmq Connected');

		await channel.assertQueue(QUEUE.QUEUE_NAME, { durable: false });

		await channel.consume(QUEUE.QUEUE_NAME, (msg) => {
			if (msg) {
				console.log(
					`Message received from ${
						QUEUE.QUEUE_NAME
					} : ${msg.content.toString()}`
				);

				channel.ack(msg);
			}
		});
	} catch (error) {
		console.error('Rabbitmq Disconnected');
		throw error;
	}
};

publish();
