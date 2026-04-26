
interface SelectInputProps {
    value: string;    
    list: string[];
    text: string;
    onSelect: (v: string) => void;

}

export const SelectInput = ({value, list, text, onSelect} : SelectInputProps) => {

    return (
           <select
                  onChange={(e) => onSelect(e.target.value)}
                  value={value}
                  className="form-select"
                >
                  <option value="" disabled hidden>
                    {text}
                  </option>
        
                  {list.map((c, i) => (
                    <option key={c + i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
    );
    
};