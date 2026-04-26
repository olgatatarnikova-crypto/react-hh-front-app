import { INPUT_WIDTH } from "../lib/data";
import type { NumberField, TextField } from "../lib/types";

interface NumberInputProps {
  field: NumberField;
  placeholder?: string;
  isDisabled?: boolean;
  width?: number;
  onChange: (n: number | null) => void;
}


export const NumberInput = ({ field, placeholder, isDisabled, width, onChange }: NumberInputProps) => {
  
  const handleSanytizeText = (text: string) => {

    const numberOnly = text.replace(/\D/g, "");

    if(numberOnly === "") {
      onChange(null);
      return;
    }

  onChange(Number(numberOnly));
}
  return (
    <div className="d-flex flex-column gap-1 allign-items-start"
    style={{width: width ?? INPUT_WIDTH}}>
      <input
        value={field.number?? ""}
        onChange={(e) => handleSanytizeText(e.target.value)}
        className={`form-control ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""}`}
        type="text"
        placeholder={placeholder}
        disabled={isDisabled}
      />
      <div className="d-flex flex-column">
        {field.errors &&
          field.errors.length > 0 &&
          field.errors.map((e, i) => (
            <span className="text-danger" key={i}>
              {e}
            </span>
          ))}
      </div>
    </div>
  );
};
