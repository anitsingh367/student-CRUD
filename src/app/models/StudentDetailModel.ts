export interface StudentDetail {
  id?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  gender: string;
}
export class Student {
  static _id = 0;
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  constructor(
    name: string,
    email: string,
    username: string,
    password: string,
    gender: string
  ) {
    this.id = Student._id++;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.gender = gender;
  }
}
