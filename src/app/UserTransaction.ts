export class UserTransaction {
    transactionId:number;
    senderId: number;
    recieverId: number;
    amount: number;
    type: string;
    message: string;
    timestamp: number;

    public createTransaction(transactionId:number, senderId: number,recieverId: number,amount: number,type: string,message: string,timestamp: number) {
        this.transactionId = transactionId;
        this.senderId = senderId;
        this.recieverId = recieverId;
        this.amount = amount;
        this.type = type;
        this.message = message;
        this.timestamp = timestamp;

        return this;
    }
}