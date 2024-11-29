import { readFile } from 'fs/promises';
import { join } from 'path';
import Product from '../models/Product';

export default class ProductRepository {
  constructor() {
    throw new Error('Cannot create an instance of a static class');
  }

  /**
   * Reads the products file and returns an array of products
   * @returns {Promise<Product[]>} Returns an array of products
   * */
  private static async readProductFile(): Promise<Product[]> {
    const file = await readFile(
      join(process.cwd(), 'data', 'products.csv'),
      'utf-8',
    );

    const products = file
      .split('\n')
      .slice(1)
      .map((line) => {
        const [id, name, category, price] = line.split(',');
        return new Product(parseInt(id), name, category, parseFloat(price));
      });
    return products;
  }
  /**
   * Returns all products
   * @returns {Product[]} Returns all products
   */
  public static async findAll(): Promise<Product[]> {
    return this.readProductFile();
  }

  /**
   * Returns a product by id
   * @param {number} id - The id of the product
   * @returns {Product} Returns the product with the specified id
   */
  public static async findById(id: number): Promise<Product | null> {
    const products = await this.readProductFile();
    return products.find((product) => product.getId() === id);
  }
}
