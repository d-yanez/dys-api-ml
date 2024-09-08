

const {PubSub} = require('@google-cloud/pubsub')
const {SA_CLIENT_EMAIL,SA_PRIVATE_KEY} = process.env
// fuente: https://github.com/googleapis/nodejs-pubsub
//fuente2: https://medium.com/@cloudandnodejstutorials/how-to-use-google-pub-sub-with-node-js-fc7691536c20
//https://github.com/cloudandnodejstutorials/gcp-pubsub
exports.notification = async (req, res) => {

    //const pubsub = new PubSub({projectId});
    // const pubsub = gcloud.pubsub({
    
    console.log(`registrando pub/sub`)
    const pubsub = new PubSub({
        projectId: 'inventory-396402',
        credentials: {
            private_key: SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: SA_CLIENT_EMAIL
        }
    })
    
     // Creates a new topic
    //const [topic] = await pubsub.createTopic('topic-msg');
    //console.log(`Topic ${topic.name} created.`);

    // Creates a subscription on that new topic
    //const [subscription] = await topic.createSubscription('topic-msg-sub');

    const [subscription] = await pubsub.subscription('topic-msg-sub').get();

     // Receive callbacks for new messages on the subscription
    subscription.on('message', message => {
        console.log('Received message:', message.data.toString());
        //process.exit(0);
    });

    // Receive callbacks for errors on the subscription
    subscription.on('error', error => {
        console.error('Received error:', error);
        //process.exit(1);
    });

    // Send a message to the topic
    pubsub.topic('topic-msg').publishMessage({data: Buffer.from('Test message!')});

    res.send({staus:'ok'})
}
