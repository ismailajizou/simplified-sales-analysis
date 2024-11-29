export default class Sale {
  // SaleID,ProductID,Quantity,Date,TotalAmount

  constructor(
    private id: number,
    private productId: number,
    private quantity: number,
    private date: string,
    private totalAmount: number,
  ) {}

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getProductId(): number {
    return this.productId;
  }

  public setProductId(productId: number): void {
    this.productId = productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getDate(): string {
    return this.date;
  }

  public setDate(date: string): void {
    this.date = date;
  }

  public getTotalAmount(): number {
    return this.totalAmount;
  }

  public setTotalAmount(totalAmount: number): void {
    this.totalAmount = totalAmount;
  }

  public toString(): string {
    return `Sale: { id: ${this.id}, productId: ${this.productId}, quantity: ${this.quantity}, date: ${this.date}, totalAmount: ${this.totalAmount} }`;
  }
}
