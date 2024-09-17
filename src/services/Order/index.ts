import { Socket } from "socket.io";
import MongoCRUD from "../../CRUD/mongo";
import { Preperation } from "../Preperation";
import pc from "picocolors";

export default class Order {
    private mongo: MongoCRUD
    constructor() {
        this.mongo = new MongoCRUD()
    }
    // public async getPreperationTime(orderId: string) {
    //     const order = await this.mongo.aggregate('Order', { ORDER_ID: { $ne: orderId } }, 'getOrderItems')
    //     if (!order.length && order[0].ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
    //     const time = await new Preperation().getFoodprepTime(order[0])
    //     return { status: 200, data: time }
    // }
    public async orderConfirmation(socket: any, orderId: string) {
        const io = socket
        const order = await this.mongo.aggregate('Order', { ORDER_ID: orderId  }, 'getOrderItems')
        if (!order.length && order[0].ORDER_ID) return { status: 201, data: { message: 'something went wrong' } }
        const time = await new Preperation().getFoodprepTime(order[0])
        const emit = io.emit('ORDER_PLACED', { payload: {...order[0],PREP_TIME: time} })
        if (emit) console.log('Event emitted :Order placed');
        else console.log(pc.red('event emit Error') + ' :Order placed');
        return { status: 200, data: { prep_time: time } }
    }
}