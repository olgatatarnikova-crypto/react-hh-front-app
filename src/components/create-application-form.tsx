import { useState } from "react";
import { Container } from "../shared/container";

import { TextInput } from "../shared/text=input";
import type { NumberField, TextField } from "../lib/types";
import { NumberInput } from "../shared/number=input";

export const CreateApplicationForm = () => {

  const [title, setTitle] = useState<TextField>({
    text: "",
    isTouched: false,
    isValid: false,
  } as TextField);

  const [city, setCity] = useState<TextField>({
    text: "",
    isTouched: false,
    isValid: false,
  } as TextField);

  const [salary, setSalary] = useState<NumberField> ({
     number: null,
    isTouched: false,
    isValid: false,
  } as NumberField);


  const handleOnTitleChange = (inputText: string) => {
    const isTitleValid = inputText.length > 5;

    setTitle({
      text: inputText,
      isTouched: true,
      isValid: isTitleValid,
      errorText: isTitleValid ? null : "Слишком короткое наименование вакансии",
    } as TextField);
  };

  const handleOnCityChange = (inputText: string) => {   
    const isCityValid = inputText.length > 2; 

    setCity({
      text: inputText,
      isTouched: true,
      isValid: isCityValid,
      errorText: isCityValid ? null : "Слишком короткое название города",

    })
  }

  const handleOnSalaryChange = (inputNumber : number | null) => {

    const hasSalary = inputNumber !== null;
    const isSalaryValid = hasSalary && inputNumber < 9_999_999;

    const errorMsg = 
    hasSalary  && !isSalaryValid ? "Слишком большое значение" : "Укажите размер зарплаты";
    

     setSalary({
      number: inputNumber,
      isTouched: true,
      isValid: isSalaryValid,
      errorText: isSalaryValid ? null : errorMsg

    } as NumberField)
  }

  const isApplicationgCreating = false;
  return (
    <Container>
      <TextInput
        field={title}
        onChange={handleOnTitleChange}
        placeholder="Наименование"
        isDisabled={isApplicationgCreating}
        width={400}
      />
            <TextInput
        field={city}
        onChange={handleOnCityChange}
        placeholder="Город"
        isDisabled={isApplicationgCreating}
        width={400}
      />

           <NumberInput
        field={salary}
        onChange={handleOnSalaryChange}
        placeholder="Заработная плата"
        isDisabled={isApplicationgCreating}
        width={400}
      />      

    </Container>
  );
};
