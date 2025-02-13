import axios from "axios";
import { SetStateAction, useEffect, useRef, useState } from "react";

const FormInput = ({
  name,
  setInput,
  optionsRoute,
}: {
  name: string;
  optionsRoute: string;
  //@ts-ignore
  setInput: SetStateAction;
}) => {
  const selectRef = useRef(null);

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://test.omniswift.com.ng/api/${optionsRoute}`,
      headers: {
        Accept: "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        const data = response.data.data;
        const smt = data.map((opt: object): string => {
          return opt[name] || opt["name"];
        });
        setOptions(smt);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="relative">
      <select
        ref={selectRef}
        name=""
        id=""
        className="w-full border border-[#ADB7BE] border-solid rounded-sm pt-3 p-2 text-[#343434] text-sm outline-0"
        onChange={() => {
          setInput(selectRef.current!.value);
        }}
      >
        <option value="" selected>
          Select {name}
        </option>
        {options.map((option: string, inx: number) => {
          return (
            <option key={inx} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <p className="absolute top-[-10px] left-2 text-sm text-[#343434] bg-white px-1 capitalize">
        {name}
      </p>
    </div>
  );
};

export default FormInput;
