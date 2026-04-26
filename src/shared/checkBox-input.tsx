import { INPUT_WIDTH } from "../lib/data";
import type { CheckBoxField } from "../lib/types";

interface CheckBoxInputProps {
  field: CheckBoxField;
  isDisabled: boolean;
  label: string;
  width?: number;
  isReverse?: boolean;
  onChange: (s: boolean) => void;
}

export const CheckBoxInput = ({
  field,
  isDisabled,
  label,
  width,
  isReverse,
  onChange,
}: CheckBoxInputProps) => {
  return (
    <div
      className="d-flex flex-column gap-1 allign-items-start"
      style={{ width: width ?? INPUT_WIDTH }}
    >
      <div
        className="d-flex flex-row gap-2 allign-items-center"
        style={{ width: width ?? INPUT_WIDTH }}
      >
        {isReverse && <span>{label}</span>}

        <input
          className={`form-check-input ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""}`}
          type="checkbox"
          checked={field.status}
          onChange={(e) => onChange(e.target.checked)}
          disabled={isDisabled}
        />

        {!isReverse && <span>{label}</span>}
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
