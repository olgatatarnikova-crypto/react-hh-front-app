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

//интерфейс для резюме
export interface VacancyModel {
  id: number;
  title: string;
  city: string;
  salary: number;
  isOnlyRussian: boolean;
}