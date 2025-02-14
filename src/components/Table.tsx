import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { fetchData } from "../redux/slices/dataSlice";
import TableRow from "./TableRow";
import { AppDispatch } from "../store/store";

const Table = () => {
  const data = useSelector((state: RootState) => state.studentData.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.omniswift.com.ng/api/viewAllData",
      headers: {
        Accept: "application/json",
      },
    };

    axios(config)
      .then((response) => {
        dispatch(fetchData(response.data.data.students));
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [dispatch]);

  return (
    <div className="py-11 pl-7 pr-14 bg-white mb-20 overflow-x-auto">
      <div className="min-w-[1100px]">
        <div className="bg-[#f9f9fa] grid grid-cols-8 px-5 py-3.5 items-center mr-10">
          <h5 className="text-sm font-semibold">S/N</h5>
          <h5 className="text-sm font-semibold">Surname</h5>
          <h5 className="text-sm font-semibold">Firstname</h5>
          <h5 className="text-sm font-semibold">Age</h5>
          <h5 className="text-sm font-semibold">Gender</h5>
          <h5 className="text-sm font-semibold">Level</h5>
          <h5 className="text-sm font-semibold">State</h5>
          <h5 className="text-sm font-semibold">Action</h5>
        </div>
        <div className="tablecol overflow-y-scroll max-h-[500px] pr-10">
          {data?.map((student, index) => (
            <TableRow student={student} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
