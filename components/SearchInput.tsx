import { ChangeEvent } from "react";

interface SearchInputProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}
// custom reusable searchInput component
export const SearchInput = ({
  type,
  value,
  placeholder,
  onChange,
  className,
}: SearchInputProps): JSX.Element => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
    />
  );
};
