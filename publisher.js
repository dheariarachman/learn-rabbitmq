const amqplib = require('amqplib');
const { QUEUE } = require('./constants');

const rabbitUrl = 'amqp://dhearia:p4ssw0rd@localhost:5672';

const publish = async () => {
	try {
		const connection = await amqplib.connect(rabbitUrl, 'heartbeat=60');
		const channel = await connection.createChannel();

		console.info('Rabbitmq Connected');

		await channel.assertQueue(QUEUE.QUEUE_NAME, { durable: false });

		channel.sendToQueue(
			QUEUE.QUEUE_NAME,
			Buffer.from('Hello from the Publisher ...')
		);

		setTimeout(function () {
			connection.close();
			process.exit(0);
		}, 500);
	} catch (error) {
		console.error('Rabbitmq Disconnected');
		throw error;
	}
};

publish();
