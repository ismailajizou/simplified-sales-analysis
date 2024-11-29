export default class Product {
  constructor(
    private id: number,
    private name: string,
    private category: string,
    private price: number,
  ) {}

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(category: string): void {
    this.category = category;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public toString(): string {
    return `Product: { id: ${this.id}, name: ${this.name}, category: ${this.category}, price: ${this.price} }`;
  }
}
