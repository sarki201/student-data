import { PDFDownloadLink } from "@react-pdf/renderer";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ResultPDF } from "../pdf/Result";

interface StudentResult {
  profile_picture: string;
  data: {
    surname: string;
    firstname: string;
    level: string;
    reg_no: string;
    session: string;
    result: {
      coursecode: string;
      title: string;
      credit_unit: number;
      grade: string;
      total_point: number;
    }[];
    cummulative: {
      unts: number;
      untd: number;
      gpts: number;
      gptd: number;
      gpats: number;
      gpatd: number;
      remarks: string;
    };
  };
}

interface Student {
  id: number;
  surname: string;
  firstname: string;
  age: number;
  gender: string;
  level: string;
  state: string;
}

interface TableRowProps {
  student: Student;
}

const TableRow: React.FC<TableRowProps> = ({ student }) => {
  const [dData, setData] = useState<StudentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config: AxiosRequestConfig = {
          method: "post",
          maxBodyLength: Infinity,
          url: `https://test.omniswift.com.ng/api/viewResult/${student.id}`,
          headers: {
            Accept: "application/json",
          },
        };

        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student.id]);

  return (
    <div className="grid grid-cols-8 px-5 py-3 items-center border-solid border-t-0 border-r-0 border-l-0 border-b border-[#ECECEC]">
      <p className="text-[#343434] text-sm">{student.id}</p>
      <p className="text-[#343434] text-sm">{student.surname}</p>
      <p className="text-[#343434] text-sm">{student.firstname}</p>
      <p className="text-[#343434] text-sm">{student.age}</p>
      <p className="text-[#343434] text-sm">{student.gender}</p>
      <p className="text-[#343434] text-sm">{student.level}</p>
      <p className="text-[#343434] text-sm">{student.state}</p>
      {!loading && dData && (
        <PDFDownloadLink
          //@ts-ignore
          document={<ResultPDF data={dData} />}
          fileName="result.pdf"
          className=""
        >
          <button className="text-sm bg-[#46C35F] hover:bg-[#42b258] text-white cursor-pointer block p-2">
            Download Result
          </button>
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default TableRow;
