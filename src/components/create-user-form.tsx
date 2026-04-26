import { useEffect, useRef, useState } from "react";
import { useGetUsers } from "../api-methods/get-user";
import { useCreateUser } from "../api-methods/create-user";
import type {
  CheckBoxField,
  CreateUserInput,
  NumberField,
  TextField,
  UserModel,
} from "../lib/types";
import { Container } from "../shared/container";
import { TextInput } from "../shared/text=input";
import { NumberInput } from "../shared/number=input";
import { CheckBoxInput } from "../shared/checkBox-input";
import { Row } from "../shared/row";
import { Column } from "../shared/column";
import { PhoneInput } from "../shared/phone-input";

interface CreateFormProps {
  editUser: UserModel | null;
  onClick: () => void;
}

const DEFAULT_FIRST_NAME = {
  text: "",
  isTouched: false,
  isValid: false,
} as TextField;

const DEFAULT_LAST_NAME = {
  text: "",
  isTouched: false,
  isValid: false,
} as TextField;

const DEFAULT_AGE = {
  number: null,
  isTouched: false,
  isValid: false,
} as NumberField;

const DEFAULT_CITIZEN = {
  status: false,
  isTouched: false,
  isValid: false,
} as CheckBoxField;

const DEFAULT_PHONE = {
  text: "",
  isTouched: false,
  isValid: false,
} as TextField;



export const CreateUserForm = ({ editUser, onClick }: CreateFormProps) => {
  const [firstName, setFirstName] = useState<TextField>(DEFAULT_FIRST_NAME);
  const [lastName, setLastName] = useState<TextField>(DEFAULT_LAST_NAME);
  const [age, setAge] = useState<NumberField>(DEFAULT_AGE);
  const [isCitizen, setIsCitizen] = useState<CheckBoxField>(DEFAULT_CITIZEN);

  const [phone, setPhone] = useState<TextField>(DEFAULT_PHONE);
  

  const inputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<string | null>(null);
  const [isResumwValid, setIsResumeValid] = useState<boolean>(false);
  const [isResumeTouched, setIsResumeTouched] = useState<boolean>(false);
  const { refetch: refetchUsers } = useGetUsers();

  const { mutate: createUser, isPending: isUserCreating } = useCreateUser();

  const hadnleCreate = () => {
    const input = {
      id: editUser?.id ?? -1,
      firstName: firstName.text,
      lastName: lastName.text,
      age: age.number,
      phone: "+7" + phone.text,
      isCitizen: isCitizen.status,
      resume: resume,
    } as CreateUserInput;

    createUser(input, { onSuccess: onCreateSuccess });
  };

  const onCreateSuccess = () => {
    resetForm();
    refetchUsers();
    onClick();
  };

  const resetForm = () => {
    setFirstName(DEFAULT_FIRST_NAME);
    setLastName(DEFAULT_LAST_NAME);

    setPhone(DEFAULT_PHONE);
    setAge(DEFAULT_AGE);
    setIsCitizen(DEFAULT_CITIZEN);

    setIsResumeValid(false);
    setIsResumeTouched(false);
    setResume(null);

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!editUser) {
      resetForm();
      return;
    }

    setFirstName({
      text: editUser?.firstName ?? "",
      isTouched: true,
      isValid: true,
    } as TextField);

    setLastName({
      text: editUser?.lastName ?? "",
      isTouched: true,
      isValid: true,
    } as TextField);

    setAge({
      number: editUser?.age,
      isTouched: true,
      isValid: true,
    } as NumberField);

    setIsCitizen({
      status: editUser?.isCitizen,
      isTouched: true,
      isValid: true,
    } as CheckBoxField);

    setPhone({
      text: editUser?.phone ?? "",
      isTouched: true, 
      isValid: true
      
    }as TextField);
    setResume(editUser?.resume);
   

    setIsResumeValid(true);
    setIsResumeTouched(true);
  }, [editUser?.id]);

  const handleOnNameChange = (text: string) => {
    const errorsMsgs = [] as string[];

    const p1 = text.length >= 2;
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text);
    const p3 = text !== "";
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase();

    if (!p1) {
      errorsMsgs.push("Имя не может быть меньше двух символов");
    }

    if (!p2) {
      errorsMsgs.push("Имя не должно содержать спецсимволы");
    }

    if (!p3) {
      errorsMsgs.push("Имя не может быть пустым");
    }

    if (!p4) {
      errorsMsgs.push("Имя должно начинаться с заглавной буквы");
    }

    setFirstName({
      text: text,
      isTouched: true,
      isValid: p1 && p2 && p3 && p4,
      errors: errorsMsgs,
    } as TextField);
  };

  const handleOnLastNameChange = (text: string) => {
    const errorsMsgs = [] as string[];

    const p1 = text.length >= 2;
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text);
    const p3 = text !== "";
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase();

    if (!p1) {
      errorsMsgs.push("Фамилия не может быть меньше двух символов");
    }

    if (!p2) {
      errorsMsgs.push("Фамилия не должна содержать спецсимволы");
    }

    if (!p3) {
      errorsMsgs.push("Фамилия не может быть пустым");
    }

    if (!p4) {
      errorsMsgs.push("Фамилия должно начинаться с заглавной буквы");
    }

    setLastName({
      text: text,
      isTouched: true,
      isValid: p1 && p2 && p3 && p4,
      errors: errorsMsgs,
    } as TextField);
  };

  const handleAgeChange = (age: number | null) => {
    const p2 = age !== null;
    const p1 = age !== null && age >= 18 && age <= 99;

    const errorsMsgs = [] as string[];

    if (!p2) {
      errorsMsgs.push("Возраст указать обязательно");
    }

    if (!p1 && p2) {
      errorsMsgs.push("Возраст должен быть в диапазоне 18 - 99 лет");
    }

    setAge({
      number: age,
      isValid: p1 && p2,
      isTouched: true,
      errors: errorsMsgs,
    } as NumberField);
  };

  const handleOnPhoneChange = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");

    const p1 = (/^\d{10}$/.test(cleanPhone));
    const errorsMsgs = [] as string[];

    if(!p1) {
      errorsMsgs.push("Некорректный номер");
    }

     setPhone({
      text: cleanPhone,
      isTouched: true,
      isValid: p1,
      errors: errorsMsgs,
    } as TextField);
  };

  const handleOnCitizenChange = (status: boolean) => {
    setIsCitizen({
      status: status,
      isTouched: true,
      isValid: true,
    } as CheckBoxField);
  };

  const handleDownloadFile = (f: File | null) => {
    setIsResumeTouched(true);

    if (f?.type !== "application/pdf") {
      setIsResumeValid(false);
      return;
    }

    if (!f.name.toLowerCase().endsWith(".pdf")) {
      setIsResumeValid(false);
      return;
    }

    setResume(f.name);
    setIsResumeValid(true);
  };

  const handleDeleteResume = () => {
    setResume(null);
    setIsResumeValid(false);
    setIsResumeTouched(false);
  };

  return (
    <Container>
      <Column>
        <TextInput
          field={firstName}
          placeholder="Имя"
          onChange={handleOnNameChange}
          isDisabled={isUserCreating}
        />

        <TextInput
          field={lastName}
          placeholder="Фамилия"
          onChange={handleOnLastNameChange}
          isDisabled={isUserCreating}
        />

        <Row>
          <NumberInput
            field={age}
            placeholder="Возраст"
            onChange={handleAgeChange}
            isDisabled={isUserCreating}
            width={100}
          />

          <CheckBoxInput
            field={isCitizen}
            onChange={handleOnCitizenChange}
            isDisabled={isUserCreating}
            label="Гражданин РФ"
            width={150}
          />
        </Row>

        <PhoneInput
        field={phone}
        placeholder="900 000 00 00"
        onChange={handleOnPhoneChange}  
        isDisabled={isUserCreating}   
        />
       
        {resume && resume !== "" && (
          <div
            style={{ backgroundColor: "rgb(231, 231, 231" }}
            className="w-100 p-2 rounded-2 d-flex flex-row aliign-items-center justify-content-between"
          >
            <span>{resume}</span>
            <button
              onClick={handleDeleteResume}
              className="btn btn-close"
            ></button>
          </div>
        )}

        {!resume && (
          <>
            <span className="my-3">Прикрепите резюме файл в формате pdf</span>
            <input
              ref={inputRef}
              accept=".pdf"
              type="file"
              className={`form-control ${isResumeTouched ? (isResumwValid ? "is-valid" : "is-invalid") : ""}`}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleDownloadFile(e.target.files[0]);
                }
              }}
            />
          </>
        )}

        {isResumeTouched && !isResumwValid && (
          <span className="text-danger"> Файл не в формате pdf</span>
        )}

        <button
          disabled={
            isUserCreating ||
            !firstName.isValid ||
            !lastName.isValid ||
            !age.isValid ||
            !phone.isValid ||
            !isResumwValid ||
            resume === null
          }
          onClick={hadnleCreate}
          className={`btn btn-${editUser ? "primary" : "success"}`}
        >
          {isUserCreating
            ? `${editUser ? "Cохранение" : "Добавление"}`
            : `${editUser ? "Сохранить" : "Добавить"}`}
        </button>

        {editUser && (
          <button
            onClick={onClick}
            disabled={isUserCreating}
            className="btn btn-danger"
          >
            Отмена
          </button>
        )}
      </Column>
    </Container>
  );
};
