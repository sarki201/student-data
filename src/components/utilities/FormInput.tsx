import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface FormInputProps {
  name: string;
  optionsRoute: string;
  setInput: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  optionsRoute,
  setInput,
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get<{ data: Record<string, any>[] }>(
          `https://test.omniswift.com.ng/api/${optionsRoute}`,
        );

        const data = response.data.data;
        const smt = data.map(
          (opt: Record<string, any>): string => opt[name] || opt["name"],
        );

        setOptions(smt);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [optionsRoute, name]); // Dependencies added to useEffect

  return (
    <div className="relative">
      <select
        ref={selectRef}
        className="w-full border border-[#ADB7BE] border-solid rounded-sm pt-3 p-2 text-[#343434] text-sm outline-0"
        onChange={() => {
          if (selectRef.current) {
            setInput(selectRef.current.value);
          }
        }}
        defaultValue=""
      >
        <option value="">Select {name}</option>
        {options.map((option, inx) => (
          <option key={inx} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="absolute top-[-10px] left-2 text-sm text-[#343434] bg-white px-1 capitalize">
        {name}
      </p>
    </div>
  );
};

export default FormInput;
