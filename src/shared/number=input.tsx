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
    <div style={{width: width ?? INPUT_WIDTH}}>
      <input
        value={field.number?? ""}
        onChange={(e) => handleSanytizeText(e.target.value)}
        className={`form-control ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""}`}
        type="text"
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {field.errorText && (
        <span className="text-danger">{field.errorText}</span>
      )}
    </div>
  );
};
