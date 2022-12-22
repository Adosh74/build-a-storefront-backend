import User from '../types/user.type';
import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  // +[1]create
  async create(u: User): Promise<User> {
    try {
      // first open connection
      const connection = await db.connect();

      // second run query
      const sql = `INSERT INTO users (email, username, first_name, last_name, password)
      VALUES ($1, $2, $3, $4, $5)   returning *`;

      const result = await connection.query(sql, [
        u.email,
        u.username,
        u.firs_name,
        u.last_name,
        hashPassword(u.password),
      ]);
      // release the connection
      connection.release();
      // return new user
      return result.rows[0];
    } catch (error) {
      throw new Error('con not create a new user');
    }
  }

  // +[2]get all users
  async getMany(): Promise<User[]> {
    try {
      // open connection with database
      const conn = await db.connect();

      // query for postgres
      const sql = 'SELECT email, username, first_name, last_name from users';

      // run sql query
      const result = await conn.query(sql);

      // release database connection
      conn.release();

      // return users
      return result.rows;
    } catch (error) {
      throw new Error('can not display users');
    }
  }

  // +[3] get specific user
  async getOne(id: string): Promise<User> {
    try {
      // database connection
      const conn = await db.connect();

      // sql query
      const sql = `SELECT email, username, first_name, last_name from users 
        WHERE id=($1)
        RETURNING id, email, username, first_name,last_name`;

      // run sql query
      const result = await conn.query(sql, [id]);

      // release database connection
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('can not find this user');
    }
  }

  // +[4] update user
  async updateOne(u: User): Promise<User> {
    try {
      // connection
      const conn = await db.connect();

      // sql query
      const sql = `UPDATE users
                    SET email=$1, username=$2, first_name=$3, last_name=$4, password=$5
                    WHERE id=$6
                    RETURNING id, email, username, first_name,last_name`;

      // run query in database
      const result = await conn.query(sql, [
        u.email,
        u.username,
        u.firs_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ]);

      // release connection
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('can not update this user');
    }
  }

  // +[5] delete user
  async deleteOne(id: string): Promise<User> {
    try {
      // connection
      const conn = await db.connect();

      // sql query
      const sql = `DELETE FROM users
                  WHERE id=($1)
                  RETURNING id, email, username, first_name, last_name`;

      // run query
      const result = await conn.query(sql, [id]);

      // release connection
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('sorry can not delete this user');
    }
  }

  // +[6] authentication function for user
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      // open connection with database
      const conn = await db.connect();

      // sql query
      const sql = 'SELECT password from users WHERE email=$1';

      // run query in database
      const result = await conn.query(sql, [email]);

      // check password validation
      if (result.rows.length) {
        // result el gya mn el database
        const { password: hashPassword } = result.rows[0];

        // compare passwords
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        // retrieve userinfo if pass valid
        if (isPasswordValid) {
          const userInfo = await conn.query(
            'SELECT id, email, username, first_name, last_name FROM users WHERE email=$1',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      // release database connection
      conn.release();

      // return null if password doesn't match
      return null;
    } catch (error) {
      throw new Error('user not found');
    }
  }
}

export default UserModel;
