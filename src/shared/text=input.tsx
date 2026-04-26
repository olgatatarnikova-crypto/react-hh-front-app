import { INPUT_WIDTH } from "../lib/data";
import type { TextField } from "../lib/types";

interface TextInputProps {
  field: TextField;
  placeholder?: string;
  isDisabled?: boolean;
  width?: number;
  onChange: (t: string) => void;
}

export const TextInput = ({
  field,
  placeholder,
  isDisabled,
  width,
  onChange,
}: TextInputProps) => {
  return (
    <div className="d-flex flex-column gap-1 allign-items-start"
    style={{ width: width ?? INPUT_WIDTH }}>
      <input
        value={field.text}
        onChange={(e) => onChange(e.target.value)}
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
