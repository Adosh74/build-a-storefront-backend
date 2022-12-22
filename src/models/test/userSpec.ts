import UserModel from '../user.model';
import User from '../../types/user.type';
import db from '../../database';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test Methods Exists', () => {
    it('Should have Create User Method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('Should have Get All Users Method', () => {
      expect(userModel.getMany).toBeDefined();
    });

    it('Should have Get One Users Method', () => {
      expect(userModel.getOne).toBeDefined();
    });

    it('Should have Update User Method', () => {
      expect(userModel.updateOne).toBeDefined();
    });

    it('Should have Delete User Method', () => {
      expect(userModel.deleteOne).toBeDefined();
    });

    it('Should have Users Authentication Method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test User Model Logic', () => {
    const user = {
      email: 'testUser@test.com',
      username: 'testUs',
      firs_name: 'testUs',
      last_name: 'userUs',
      password: 'testUs',
    } as User;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();

      const sql = 'DELETE FROM users';

      await connection.query(sql);

      connection.release();
    });

    it('Create Method Should Return New User', async () => {
      const usCreateTest = {
        email: 'postman@post.com',
        username: 'postman',
        firs_name: 'post',
        last_name: 'man',
        password: '1234',
      } as User;

      const CreateUser = await userModel.create(usCreateTest);
      const userId = CreateUser.id;

      expect(CreateUser.id).toEqual(userId);
      expect(CreateUser.email).toEqual(usCreateTest.email);
      expect(CreateUser.username).toEqual(usCreateTest.username);
      expect(CreateUser.last_name).toEqual(usCreateTest.last_name);
    });

    it('Get All Users Should Return All Users', async () => {
      const users = await userModel.getMany();
      expect(users.length).toBe(2);
    });
  });
});
