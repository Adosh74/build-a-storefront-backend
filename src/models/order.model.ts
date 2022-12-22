import Order from '../types/order.type';
import db from '../database';

class OrderModel {
  // +[1] create order
  async create(o: Order): Promise<Order> {
    try {
      // db conn
      const connection = await db.connect();

      // sql query to insert
      const sql = `INSERT INTO orders (product_id, quantity, user_email)
                   VALUES ($1, $2, $3) returning *`;

      // run query in db
      const result = await connection.query(sql, [
        o.product_id,
        o.quantity,
        o.user_email,
      ]);

      // release connection
      connection.release();

      // return the order that created
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, you cant create order');
    }
  }

  // +[2] get all orders for this user
  async getAll(user_email: string): Promise<Order[]> {
    try {
      // open conn
      const connection = await db.connect();

      // sql query
      const sql = `SELECT product_id, quantity, user_email FROM orders
                    WHERE user_email=$1`;

      // run sql
      const result = await connection.query(sql, [user_email]);

      // release conn
      connection.release();

      // return orders
      return result.rows;
    } catch (error) {
      throw new Error(
        'sorry, some issue happened please check your information'
      );
    }
  }

  // +[3] get specific order by orderId
  async getOne(orderId: number): Promise<Order> {
    try {
      // start connection
      const connection = await db.connect();

      // sql query
      const sql = `SELECT products.name, products.price, products.category
                    FROM orders
                    INNER JOIN products ON orders.product_id=products.id
                    WHERE orders.id=($1)`;

      // run query
      const result = await connection.query(sql, [orderId]);

      // release conn
      connection.release();

      // return result
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, no information found about this id');
    }
  }
  //
  // +[4] update order
  async updateOne(o: Order): Promise<Order> {
    try {
      // start conn
      const connection = await db.connect();

      // sql query
      const sql = `UPDATE orders
                   SET product_id=$1, quantity=$2
                   WHERE id=$3
                   RETURNING product_id, quantity, user_email`;

      // run sql
      const result = await connection.query(sql, [
        o.product_id,
        o.quantity,
        o.id,
      ]);

      // release conn
      connection.release();

      // return result
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, cant update this order');
    }
  }

  // +[5] delete one order
  async deleteOne(id: number): Promise<Order> {
    try {
      // start conn
      const connection = await db.connect();

      // sql query
      const sql = `DELETE FROM orders 
                    WHERE id=$1
                    RETURNING product_id, quantity, user_email`;

      // run sql
      const result = await connection.query(sql, [id]);

      // release conn
      connection.release();

      // return the order that deleted
      return result.rows[0];
    } catch (error) {
      throw new Error('sorry, cant delete this order');
    }
  }
}

export default OrderModel;
