const amqplib = require('amqplib');

const rabbitUrl = 'amqp://dhearia:p4ssw0rd@localhost:5672';

const publish = async () => {
	try {
		const connection = await amqplib.connect(rabbitUrl, 'heartbeat=60');
		const channel = await connection.createChannel();
		console.info('Rabbitmq Connected');

		await channel.assertExchange('');
	} catch (error) {
		console.error('Rabbitmq Disconnected');
		throw error;
	}
};

publish();
