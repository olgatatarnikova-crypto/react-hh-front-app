import { useState } from "react";
import type { VacancyModel } from "./types";

const [title, setTitle] = useState<string>("");
const [city, setCity] = useState<string>("");
const [salary, setSalary] = useState<number>(0);
const [isOnlyRussian, setIsOnlyRussian] = useState<boolean>(false); 

const hadnleCreate = () => {
    const input = {
        title: title,
        city: city,
        salary: salary,
        isOnlyRussian: isOnlyRussian,
    } as CreateVacancyInput;

    createVacansy(input, {onSuccess: onCreateSuccess});
};

const onCreateSuccess = () => {
    setTitle("");
    setCity("");
    setSalary(0);
    setIsOnlyRussian(false);

    onclick();
}

 const handleOnTitleChange = (text: string) => {
   
    setTitle(text);
  };

  const handleOnCityChange = (text: string) => {
    setCity(text);
  };

  const handleOnSalaryChange = (salary: number) {
    setSalary(salary);
  };

  return (
    <div
      style={{ width: "400px" }}
      className="d-flex flex-column gap-2 p-3 bg-light shadow rounded-3"
      >

        <input
        value={title}
        onChange={(e) => handleOnTitleChange(e.target.value)}        
        type="text"
        placeholder="Название вакансии"        
      />

       <input
        value={city}
        onChange={(e) => handleOnCityChange(e.target.value)}        
        type="text"
        placeholder="Город"        
      />

      <input 
      value={salary}
      onChange={(e) => handleOnSalaryChange(Number(e.target.value))}
       />

        <span className="text-nowrap">Только гражданине РФ</span>
        <input
          className="form-check-input"
          type="checkbox"
          checked={isOnlyRussian}
          onChange={(e) => setIsOnlyRussian(e.target.checked)}         
        />

      

    </div>
  )