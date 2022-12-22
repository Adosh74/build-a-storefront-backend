import Product from '../types/product.type';
import db from '../database';

// class Product

class productModel {
  // +[1] create product
  async create(p: Product): Promise<Product> {
    try {
      // first conn with db
      const connection = await db.connect();

      // sql query create new product
      const sql = `INSERT INTO products (name, price, category, quantity)
      VALUES ($1, $2, $3, $4)  returning *`;

      // run query
      const result = await connection.query(sql, [
        p.name,
        p.price,
        p.category,
        p.quantity,
      ]);

      // release db conn
      connection.release();

      // return what created
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, can not create this product');
    }
  }

  // +[2] get all products
  async getAll(): Promise<Product[]> {
    try {
      // connection
      const connection = await db.connect();

      // sql query to find all products
      const sql = 'SELECT name, price, category, quantity FROM products';

      // run query
      const result = await connection.query(sql);

      // release connection
      connection.release();

      // return result
      return result.rows;
    } catch (error) {
      throw new Error('cant see products, or no product found');
    }
  }

  // +[3] get specific product by id
  async getOne(id: number): Promise<Product> {
    try {
      // db con
      const connection = await db.connect();

      // sql query
      const sql = `SELECT name, price, category, quantity FROM products
                    WHERE id=$1`;

      // run query
      const result = await connection.query(sql, [id]);

      // release connection
      connection.release();

      // return product
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, no product found');
    }
  }

  // +[4] update product
  async updateOne(p: Product): Promise<Product> {
    try {
      // db conn
      const connection = await db.connect();

      // sql query
      const sql = `UPDATE products
                    SET name=$1, price=$2, category=$3, quantity=$4
                    WHERE id=$5
                    RETURNING name, price, category, quantity`;

      // run query
      const result = await connection.query(sql, [
        p.name,
        p.price,
        p.category,
        p.quantity,
        p.id,
      ]);

      // release con
      connection.release();

      // return result
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, cant update this product');
    }
  }

  // +[5] delete product
  async deleteOne(id: number): Promise<Product> {
    try {
      // db conn
      const connection = await db.connect();

      // sql query
      const sql = `DELETE FROM products
                    WHERE id=$1
                    RETURNING name, price, category, quantity`;

      // run sql query
      const result = await connection.query(sql, [id]);

      // release conn
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, cant delete this product');
    }
  }
}

export default productModel;
