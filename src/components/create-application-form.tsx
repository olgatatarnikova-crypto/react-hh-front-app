import { useState } from "react";
import { Container } from "../shared/container";

import { TextInput } from "../shared/text=input";
import type { CheckBoxField, NumberField, TextField } from "../lib/types";
import { NumberInput } from "../shared/number=input";
import { CheckBoxInput } from "../shared/checkBox-input";
import { CITIES } from "../lib/data";
import { SelectInput } from "../shared/select-input";
import { SwitchInput } from "../shared/switch-input";

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

  const [salary, setSalary] = useState<NumberField>({
    number: null,
    isTouched: false,
    isValid: false,
  } as NumberField);

  const [isCitizen, setCitizen] = useState<CheckBoxField>({
    status: false,
    isTouched: false,
    isValid: false,
  } as CheckBoxField);

  const [isCitySelect, setCitySelect] = useState<boolean>(false);

  const handleOnTitleChange = (inputText: string) => {
    const isTitleValid = inputText.length > 5;

    const errorsMsgs = [] as string[];

    if (!isTitleValid) {
      errorsMsgs.push("Слишком короткое наименование вакансии");
    }

    setTitle({
      text: inputText,
      isTouched: true,
      isValid: isTitleValid,
      errors: errorsMsgs,
    } as TextField);
  };

  const handleOnCityChange = (inputText: string) => {
    const isCityValid = inputText.length > 2;
    const isFirstLetterValid =
      inputText.length > 0 &&
      inputText.charAt(0) !== inputText.charAt(0).toLowerCase();

    const errorsMsgs = [] as string[];

    if (!isCityValid) {
      errorsMsgs.push("Слишком короткое название города");
    }

    if (inputText !== "" && !isFirstLetterValid) {
      errorsMsgs.push("Название города должно начинаться с заглавной буквы");
    }

    setCity({
      text: inputText,
      isTouched: true,
      isValid: isCityValid && isFirstLetterValid,
      errors: errorsMsgs,
    } as TextField);
  };

  const handleOnSalaryChange = (inputNumber: number | null) => {
    const hasSalary = inputNumber !== null;
    const isSalaryValid = inputNumber !== null && inputNumber < 9_999_999;

    const errorsMsgs = [] as string[];

    if (!hasSalary) {
      errorsMsgs.push("Укажите размер зарплаты");
    }
    if (hasSalary && !isSalaryValid) {
      errorsMsgs.push("Слишком большое значение");
    }

    setSalary({
      number: inputNumber,
      isTouched: true,
      isValid: isSalaryValid,
      errors: errorsMsgs,
    } as NumberField);
  };

  const handleOnCitizenChange = (s: boolean) => {
    setCitizen({
      status: s,
      isTouched: false,
      isValid: true,
      errors: [] as string[],
    } as CheckBoxField);
  };

  const handleOnCitySelectChange = (inputCity: string) => {
    setCity({
      text: inputCity,
      isTouched: true,
      isValid: true,
      errors: [] as string[],
    } as TextField);
  };

  const handleOnSwitchChange = (v: boolean) => {

    
      setCity({
      text: "",
      isTouched: false,
      isValid: false,
      errors: [] as string [],
    } as TextField);
   
    setCitySelect(v);
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

      {!isCitySelect && (
        <TextInput
          field={city}
          onChange={handleOnCityChange}
          placeholder="Город"
          isDisabled={isApplicationgCreating}
          width={400}
        />
      )}

      {isCitySelect && (
        <SelectInput
        value={city.text}
        list={CITIES}
        text="Выберите город"
        onSelect={handleOnCitySelectChange}
        />

      )}

      <SwitchInput
      text="Выбрать город из списка"
      isChecked={isCitySelect}
      onChange={handleOnSwitchChange}
      />
    
      <NumberInput
        field={salary}
        onChange={handleOnSalaryChange}
        placeholder="Заработная плата"
        isDisabled={isApplicationgCreating}
        width={400}
      />

      <CheckBoxInput
        field={isCitizen}
        onChange={handleOnCitizenChange}
        isDisabled={isApplicationgCreating}
        label="Только для граждан РФ"
      />
    </Container>
  );
};
