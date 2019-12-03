export class Transaction {
    transactionId: number;
    senderId: number;
    recieverId: number;
    amount: number;
    type: string;
    message: string;
    accountBalanceBeforeTransaction: number;
    accountBalanceAfterTransaction: number;
    timestamp: number;
}
