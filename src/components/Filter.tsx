import { useState } from "react";
import Button from "./utilities/Button";
import FormInput from "./utilities/FormInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchData } from "../redux/slices/dataSlice";

const Filter = () => {
  const [age, setAge] = useState(null);
  const [state, setState] = useState(null);
  const [level, setLevel] = useState(null);
  const [gender, setGender] = useState(null);

  const data = useSelector((state: RootState) => state.studentData.data);
  const dispatch = useDispatch();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!age && !state && !level && !gender) return;
    var data = {};
    if (age) {
      //@ts-ignore
      data.age = age;
    }
    if (state) {
      //@ts-ignore
      data.state = state;
    }
    if (level) {
      //@ts-ignore
      data.level = level;
    }
    if (gender) {
      //@ts-ignore
      data.gender = gender;
    }

    console.log(data);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.omniswift.com.ng/api/filterData",
      headers: {
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(fetchData(response.data.data.students));
      })
      .catch(function (error) {
        console.log(error);
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
