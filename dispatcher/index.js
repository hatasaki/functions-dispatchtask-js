const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

module.exports = async function (context, message) {

    try {
        context.log('JavaScript queue trigger function processed work item', message);

        const connectionString = process.env.StorageConnection;

        // Create a unique name for the queue
        const queueName = "task" + message.task +"-queue";
        context.log('Target queue name', queueName);

        const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
        const queueClient = queueServiceClient.getQueueClient(queueName);
        context.log('Connected to', queueName);

        await queueClient.sendMessage(JSON.stringify(message));

    } catch (err) {
        context.log(err);
        return;
    }

};