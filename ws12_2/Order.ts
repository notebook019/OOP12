export class Order {
    constructor(private id: number, private producName: string, private quantity: number, private totalPrice: number) {}

    public getId(): number {return this.id};
    public getProductName(): string {return this.producName};
    public getQuantity(): number {return this.quantity};
    public getTotalPrice(): number {return this.totalPrice};
}