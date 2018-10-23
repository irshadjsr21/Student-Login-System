export class Message {
    msg: string[];
    type: string;
    time: number;

    constructor(msg, type, time) {
        this.msg = msg;
        this.type = type;
        this.time = time;
    }
}
