const BlockBee = require('./index')
const test = require('node:test')

const apiKey = '' // <- Insert your API Key here to run tests.
test('Test generating a payment link', async (t) => {
    const bb = new BlockBee(apiKey, {
        order_id: 12345
    },  '')

    const paymentLink = await bb.paymentRequest('https://webhook.site/19a994f1-54eb-47dc-8516-4107851f9a5f', 10)
    
    if (paymentLink === null) throw new Error('fail')
    
    return paymentLink
})

test('Test generating a deposit link', async (t) => {
    const bb = new BlockBee(apiKey, {
        order_id: 12345
    },  '')
    
    const depositLink = await bb.depositRequest('https://webhook.site/19a994f1-54eb-47dc-8516-4107851f9a5f')
    
    if (depositLink === null) throw new Error('fail')
    
    return depositLink
})
