interface User {
  name: string;
  email: string;
  password: string;
  generateToken: () => string;
}

export default User;
