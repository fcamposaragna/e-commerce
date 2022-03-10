import twilio from 'twilio';

import config from '../config/config.js'

const clientSID = config.twilio.SID;
const authToken = config.twilio.TOKEN;
// const number = +1 415 523 8886

const client = twilio(clientSID,authToken);

export const sendWhatsapp = (order)=>{
    let body = `
    ${order.first_name} ${order.last_name}
    Acabas de ordenar ${JSON.stringify(order.products)}.
    En algunos días te llegará a tu casa.`
    return client.messages.create({
        from: `whatsapp:${config.twilio.NUMBER_FROM}`,
        to:`whatsapp:${config.twilio.NUMBER_TO}`,
        body:body
    })
}
