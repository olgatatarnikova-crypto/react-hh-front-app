import { useEffect, useRef, useState } from "react";
import { useGetUsers } from "../api-methods/get-user";
import { useCreateUser } from "../api-methods/create-user";
import type { CreateUserInput, UserModel } from "../lib/types";


interface TextValidation {
  isLengthValid: boolean;
  isSpecialSymbolValid: boolean;
  isTextEmptyValid: boolean;
  isFiesrUpperCaswValid: boolean;
  isValid: boolean;
  isTouched: boolean;
}

interface CreateFormProps {
  editUser: UserModel | null;
  onClick: () => void;
}

const isFirstNameValidationDefailt = {
  isLengthValid: false,
  isSpecialSymbolValid: false,
  isTextEmptyValid: false,
  isFiesrUpperCaswValid: false,
  isValid: false,
  isTouched: false,
} as TextValidation;

const isLastNameValidationDefailt = {
  isLengthValid: false,
  isSpecialSymbolValid: false,
  isTextEmptyValid: false,
  isFiesrUpperCaswValid: false,
  isValid: false,
  isTouched: false,
} as TextValidation;

export const CreateUserForm = ({ editUser, onClick }: CreateFormProps) => {
  const { refetch: refetchUsers } = useGetUsers();

  const { mutate: createUser, isPending: isUserCreating } = useCreateUser();

  const hadnleCreate = () => {
    const input = {
      id: editUser?.id ?? -1,
      firstName: firstName,
      lastName: lastName,
      age: age,
      phone: "+7" + phone,
      isCitizen: isCitizen,
      resume: resume,
    } as CreateUserInput;

    createUser(input, { onSuccess: onCreateSuccess });
  };

  const onCreateSuccess = () => {
    refetchUsers();

    setFirstName("");
    setLastName("");
    setPhone("");
    setAge(18);
    setIsCitizen(false);

    setFirstNameValid(isFirstNameValidationDefailt);
    setLastNameValid(isLastNameValidationDefailt);
    setAgeTouched(false);
    setAgeValid(true);
    setPhoneValid(false);
    setIsPhoneTouched(false);

    setIsResumeValid(false);
    setIsResumeTouched(false);
    setResume(null);

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    onClick();
  };

  const [firstName, setFirstName] = useState<string>(editUser?.firstName ?? "");
  const [isFirstNameValid, setFirstNameValid] = useState<TextValidation>(
    isFirstNameValidationDefailt,
  );

  const [lastName, setLastName] = useState<string>(editUser?.lastName ?? "");
  const [isLastNameValid, setLastNameValid] = useState<TextValidation>(
    isLastNameValidationDefailt,
  );

  const [age, setAge] = useState<number>(editUser?.age ?? 18);
  const [isAgeValid, setAgeValid] = useState<boolean>(false);
  const [isAgeTouched, setAgeTouched] = useState<boolean>(false);

  const [isCitizen, setIsCitizen] = useState<boolean>(
    editUser?.isCitizen ?? false,
  );

  const [phone, setPhone] = useState<string>(editUser?.phone ?? "");
  const [isPhoneValid, setPhoneValid] = useState<boolean>(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<string | null>(null);
  const [isResumwValid, setIsResumeValid] = useState<boolean>(false);
  const [isResumeTouched, setIsResumeTouched] = useState<boolean>(false);

  useEffect(() => {
    if (!editUser) {
      setFirstName("");
      setLastName("");
      setPhone("");
      setAge(18);
      setIsCitizen(false);

      setFirstNameValid(isFirstNameValidationDefailt);
      setLastNameValid(isLastNameValidationDefailt);
      setAgeTouched(false);
      setAgeValid(true);
      setPhoneValid(false);
      setIsPhoneTouched(false);

      setIsResumeValid(false);
      setIsResumeTouched(false);
      setResume(null);

      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    setFirstName(editUser?.firstName ?? "");
    setLastName(editUser?.lastName ?? "");
    setAge(editUser?.age ?? 18);
    setIsCitizen(editUser?.isCitizen ?? false);
    setPhone(editUser?.phone.substring(2) ?? "");
    setResume(editUser?.resume);

    const isValid = {
      isLengthValid: true,
      isSpecialSymbolValid: true,
      isTextEmptyValid: true,
      isFiesrUpperCaswValid: true,
      isValid: true,
      isTouched: true,
    } as TextValidation;

    setFirstNameValid(isValid);
    setLastNameValid(isValid);

    setAgeTouched(true);
    setAgeValid(true);
    setPhoneValid(true);
    setIsPhoneTouched(true);

    setIsResumeValid(true);
    setIsResumeTouched(true);
  }, [editUser]);

  const handleOnNameChange = (text: string) => {
    const p1 = text.length >= 2;
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text);
    const p3 = text !== "";
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase();

    const isNameValid = {
      isLengthValid: p1,
      isSpecialSymbolValid: p2,
      isTextEmptyValid: p3,
      isFiesrUpperCaswValid: p4,

      isValid: p1 && p2 && p3 && p4,
      isTouched: true,
    } as TextValidation;

    setFirstNameValid(isNameValid);

    setFirstName(text);
  };

  const handleOnLastNameChange = (text: string) => {
    const p1 = text.length >= 2;
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text);
    const p3 = text !== "";
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase();

    const isLastNameValid = {
      isLengthValid: p1,
      isSpecialSymbolValid: p2,
      isTextEmptyValid: p3,
      isFiesrUpperCaswValid: p4,

      isValid: p1 && p2 && p3 && p4,
      isTouched: true,
    } as TextValidation;

    setLastNameValid(isLastNameValid);

    setLastName(text);
  };

  const handleAgeChange = (age: number) => {
    setAgeValid(age >= 18 && age <= 99);
    setAgeTouched(true);
    setAge(age);
  };

  const handleOnPhoneChange = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");

    setPhoneValid(/^\d{10}$/.test(phone));

    setIsPhoneTouched(true);

    setPhone(cleanPhone);
  };

  const hasFirstName = firstName !== undefined && firstName.length > 0;
  //isFirstNameValid.isValid ? "is-valid" : "is-invalid"

  const hasLastName = lastName !== undefined && lastName.length > 0;

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
  }

  return (
    <div
      style={{ width: "400px" }}
      className="d-flex flex-column gap-2 p-3 bg-light shadow rounded-3"
    >
      <input
        value={firstName}
        onChange={(e) => handleOnNameChange(e.target.value)}
        className={`form-control ${isFirstNameValid.isTouched ? (isFirstNameValid.isValid ? "is-valid" : "is-invalid") : ""}`}
        type="text"
        placeholder="Имя"
        disabled={isUserCreating}
      />

      {isFirstNameValid.isTouched && !isFirstNameValid.isTextEmptyValid && (
        <span className="text-danger">Имя не может быть пустым</span>
      )}

      {hasFirstName &&
        isFirstNameValid.isTouched &&
        !isFirstNameValid.isLengthValid && (
          <span className="text-danger">
            Имя не может быть меньше друх символов
          </span>
        )}

      {hasFirstName &&
        hasFirstName &&
        isFirstNameValid.isTouched &&
        !isFirstNameValid.isFiesrUpperCaswValid && (
          <span className="text-danger">
            Имя должно начинаться с заглавной буквы
          </span>
        )}

      {hasFirstName &&
        isFirstNameValid.isTouched &&
        !isFirstNameValid.isSpecialSymbolValid && (
          <span className="text-danger">
            Имя не может содержать специальные символы и цифры
          </span>
        )}

      <input
        value={lastName}
        onChange={(e) => handleOnLastNameChange(e.target.value)}
        className={`form-control ${isLastNameValid.isTouched ? (isLastNameValid.isValid ? "is-valid" : "is-invalid") : ""}`}
        type="text"
        placeholder="Фамилия"
        disabled={isUserCreating}
      />

      {isLastNameValid.isTouched && !isLastNameValid.isTextEmptyValid && (
        <span className="text-danger">Поле фамилия не может быть пустым</span>
      )}

      {hasLastName &&
        isLastNameValid.isTouched &&
        !isLastNameValid.isLengthValid && (
          <span className="text-danger">
            Фамилия не может быть меньше двух символов
          </span>
        )}

      {hasLastName &&
        isLastNameValid.isTouched &&
        !isLastNameValid.isFiesrUpperCaswValid && (
          <span className="text-danger">
            Фамилия должна начинаться с заглавной буквы
          </span>
        )}

      {hasLastName &&
        isLastNameValid.isTouched &&
        !isLastNameValid.isSpecialSymbolValid && (
          <span className="text-danger">
            Фамилия не может содержать специальные символы
          </span>
        )}

      <div className="d-flex flex-row align-items-center gap-3 justify-content-between">
        <input
          className={`form-control w-50" ${isAgeTouched ? (isAgeValid ? "is-valid" : "is-invalid") : ""}`}
          type="number"
          value={age}
          onChange={(e) => handleAgeChange(Number(e.target.value))}
          min={18}
          max={99}
          placeholder="Возраст"
          disabled={isUserCreating}
        />
        <span className="text-nowrap">Гражданин РФ</span>
        <input
          className="form-check-input"
          type="checkbox"
          checked={isCitizen}
          onChange={(e) => setIsCitizen(e.target.checked)}
          disabled={isUserCreating}
        />
      </div>

      <div className="input-group">
        <span className="input-group-text">+7</span>

        <input
          value={phone}
          onChange={(e) => handleOnPhoneChange(e.target.value)}
          className={`form-control ${isPhoneTouched ? (isPhoneValid ? "is-valid" : "is-invalid") : ""}`}
          type="text"
          placeholder="900 000 00 00"
          disabled={isUserCreating}
        />
      </div>

      {resume && resume !== "" && (
        <div
          style={{ backgroundColor: "rgb(231, 231, 231" }}
          className="w-100 p-2 rounded-2 d-flex flex-row aliign-items-center justify-content-between"
        >
          <span>{resume}</span>
          <button onClick={handleDeleteResume} className="btn btn-close"></button>
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
          !isFirstNameValid.isValid ||
          !isLastNameValid.isValid ||
          !isAgeValid ||
          !isPhoneValid ||
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
    </div>
  );
};
