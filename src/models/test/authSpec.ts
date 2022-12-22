import UserModel from '../user.model';
import User from '../../types/user.type';
import db from '../../database';
// import e from 'express';

const userModel = new UserModel();

// test authentication function
describe('Authentication Module', () => {
  describe('Test method exists', () => {
    it('should have a authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test Authenticate logic', () => {
    const user = {
      email: 'test@test.com',
      username: 'test',
      firs_name: 'test',
      last_name: 'user',
      password: 'test',
    } as User;

    beforeAll(async () => {
      const createUser = await userModel.create(user);
      user.id = createUser.id;
    });

    afterAll(async () => {
      const conn = await db.connect();

      const sql = 'DELETE FROM users;';
      await conn.query(sql);
      conn.release();
    });

    it('Authenticate method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.email,
        user.password as string
      );
      const sqlReturn = 'SELECT * FROM users WHERE id=$1;';
      const connection = await db.connect();
      const result = await connection.query(sqlReturn, [user.id]);

      const userInfo = result.rows[0];

      //   expect(userInfo?.email).toBe(user.email);
      //   expect(userInfo?.username).toBe(user.username);

      //
      expect(authenticatedUser?.email).toBe(user.email);
      expect(authenticatedUser?.username).toBe(user.username);
    });

    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate(
        'wrong@wrong.com',
        'wrongPassword'
      );
      expect(authenticatedUser).toBeNull();
    });
  });
});
