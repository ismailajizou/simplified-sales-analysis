import { readFile } from 'fs/promises';
import { join } from 'path';
import Sale from '../models/Sale';
import Product from 'src/product/models/Product';

export default class SaleRepository {
  constructor() {
    throw new Error('Cannot create an instance of a static class');
  }

  /**
   * Reads the sales file and returns an array of sales
   * @returns {Promise<Sale[]>} Returns an array of sales
   * */
  private static async readSaleFile(): Promise<Sale[]> {
    const file = await readFile(
      join(process.cwd(), 'data', 'sales.csv'),
      'utf-8',
    );

    const sales = file
      .split('\n')
      .slice(1)
      .map((line) => {
        const [id, productId, quantity, date, totalAmount] = line.split(',');
        return new Sale(
          parseInt(id),
          parseInt(productId),
          parseInt(quantity),
          date,
          parseFloat(totalAmount),
        );
      });
    return sales;
  }

  /**
   * Returns all sales
   * @returns {Sale[]} Returns all sales
   */
  public static async findAll(): Promise<Sale[]> {
    return this.readSaleFile();
  }

  /**
   * Returns a sale by id
   * @param {number} id - The id of the sale
   * @returns {Sale} Returns the sale with the specified id
   */
  public static async findById(id: number): Promise<Sale | null> {
    const sales = await this.readSaleFile();
    return sales.find((product) => product.getId() === id);
  }

  /**
   * Returns all sales by product id
   * @param {number} productId - The id of the product
   * @returns {Sale[]} Returns all sales with the specified product id
   */
  public static async findAllGroupedByProductId(): Promise<{
    [key: Product['id']]: Sale[];
  }> {
    const sales = await this.readSaleFile();
    return sales.reduce(
      (acc, sale) => {
        if (!acc[sale.getProductId()]) {
          acc[sale.getProductId()] = [];
        }
        acc[sale.getProductId()].push(sale);
        return acc;
      },
      {} as { [key: number]: Sale[] },
    );
  }
}
