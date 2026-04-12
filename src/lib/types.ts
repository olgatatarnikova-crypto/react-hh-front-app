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

export interface TextValidation {
  isLengthValid: boolean;
  isSpecialSymbolValid: boolean;
  isTextEmptyValid: boolean;
  isFiesrUpperCaswValid: boolean;
  isValid: boolean;
  isTouched: boolean;
}

interface BaseField {
  isValid: boolean;
  isTouched: boolean;
  errorText: string | null;

}

export interface TextField extends BaseField {
  text: string;     
}

export interface NumberField extends BaseField {
   number: number | null;   
}