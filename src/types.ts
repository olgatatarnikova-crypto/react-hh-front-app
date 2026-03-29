export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  isCitizen: boolean;
  createDate: string;
  resume : string;
}

export interface CreateUserInput {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  isCitizen: boolean;
  resume : string;
}