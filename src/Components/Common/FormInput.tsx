import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "4px",
          borderRadius: "6px",
          border: error ? "1px solid red" : "1px solid #ccc",
        }}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </div>
  );
};

export default FormInput;
