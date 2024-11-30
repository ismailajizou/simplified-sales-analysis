import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';

const csvToJson = async (filePath) => {
  const data = await fs.readFile(filePath, { encoding: 'utf-8' });
  const rows = data.split('\n');
  const headers = rows[0].replace('\r', '').split(',');
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    const currentRow = rows[i].replace('\r', '').split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentRow[j];
    }
    result.push(obj);
  }
  return result;
};

export const migrate = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to database: ', conn.connection.name);
  // Your migration code here
  const products = await csvToJson(path.resolve('data/products.csv'));
  console.log('Products loaded', products.slice(0, 5));

  const sales = await csvToJson(path.resolve('data/sales.csv'));
  console.log('Sales loaded', sales.slice(0, 5));

  console.log('Data loaded');

  // Load the models

  await mongoose.connection.db.collection('products').insertMany(
    products.map((p) => ({
      _id: parseInt(p.ProductID),
      name: p.ProductName,
      category: p.Category,
      price: parseFloat(p.Price),
    })),
  );

  await mongoose.connection.db.collection('sales').insertMany(
    sales.map((s) => ({
      _id: parseInt(s.SaleID),
      product: parseInt(s.ProductID),
      quantity: parseInt(s.Quantity),
      date: s.Date,
      totalAmount: parseFloat(s.TotalAmount),
    })),
  );

  mongoose.connection.close();
  console.log('Migration complete');
};

migrate().then(() => process.exit(0));
