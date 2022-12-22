type User = {
  id?: string; //id string as we use uuid not serial
  email: string;
  username: string;
  firs_name: string;
  last_name: string;
  password: string;
};

export default User;
