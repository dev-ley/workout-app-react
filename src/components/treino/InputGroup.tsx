import "./InputGroup.css";

type InputGroupProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
};

export function InputGroup({
  label,
  value,
  onChange,
  type = "text",
}: InputGroupProps) {
  return (
    <div className="input-group glass">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
