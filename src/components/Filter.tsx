import { FormEvent, useState } from "react";
import Button from "./utilities/Button";
import FormInput from "./utilities/FormInput";
import axios, { AxiosRequestConfig } from "axios";
import { useDispatch } from "react-redux";
import { clearData, fetchData } from "../redux/slices/dataSlice";

const Filter = () => {
  const [age, setAge] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!age && !state && !level && !gender) return;
    dispatch(clearData());
    const data: Partial<Record<string, string>> = {};
    if (age) data.age = age;
    if (state) data.state = state;
    if (level) data.level = level;
    if (gender) data.gender = gender;

    console.log(data);

    const config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.omniswift.com.ng/api/filterData",
      headers: {
        Accept: "application/json",
      },
      data,
    };

    axios(config)
      .then((response) => {
        dispatch(fetchData(response.data.data.students));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  };

  return (
    <div className="py-11 px-7 lg:pl-7 lg:pr-14 bg-white mb-11">
      <h3 className="text-2xl text-[#616161] font-normal pb-11">
        Filter Student Table By:
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        <FormInput name="age" optionsRoute="viewAllAges" setInput={setAge} />
        <FormInput
          name="state"
          optionsRoute="viewAllStates"
          setInput={setState}
        />
        <FormInput
          name="level"
          optionsRoute="viewAllLevels"
          setInput={setLevel}
        />
        <FormInput
          name="gender"
          optionsRoute="viewAllGender"
          setInput={setGender}
        />
        <Button />
      </form>
    </div>
  );
};

export default Filter;
