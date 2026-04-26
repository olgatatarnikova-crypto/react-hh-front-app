import { INPUT_WIDTH } from "../lib/data";
import type { TextField } from "../lib/types";

interface PhoneInputProps {
  field: TextField;
  placeholder?: string;
  isDisabled?: boolean;
  width?: number;
  onChange: (t: string) => void;
}

export const PhoneInput = ({
  field,
  placeholder,
  isDisabled,
  width = INPUT_WIDTH,
  onChange,
}: PhoneInputProps) => {
  return (
    <div className="d-flex flex-column gap-1" style={{ width: width + "px" }}>
      <div className="input-group">
        <span className="input-group-text">+7</span>

        <input
          value={field.text}
          onChange={(e) => onChange(e.target.value)}
          className={`form-control ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""}`}
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
        />
      </div>
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
