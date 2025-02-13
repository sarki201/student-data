import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";
import { ResultPDF } from "../pdf/Result";

//@ts-ignore
const TableRow = ({ student }) => {
  const [dData, setData] = useState<object[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
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
  }, []);
  return (
    <div className="grid grid-cols-8 px-5 py-3 items-center border-solid border-t-0 border-r-0 border-l-0 border-b border-[#ECECEC]">
      <p className="text-[#343434] text-sm">{student.id}</p>
      <p className="text-[#343434] text-sm">{student.surname}</p>
      <p className="text-[#343434] text-sm">{student.firstname}</p>
      <p className="text-[#343434] text-sm">{student.age}</p>
      <p className="text-[#343434] text-sm">{student.gender}</p>
      <p className="text-[#343434] text-sm">{student.level}</p>
      <p className="text-[#343434] text-sm">{student.state}</p>
      {!loading && (
        <PDFDownloadLink
          document={<ResultPDF data={dData!} />}
          fileName="result.pdf"
          className=""
        >
          <button className="text-sm bg-[#46C35F] hover:bg-[#42b258] text-white  cursor-pointer block p-2">
            Download Result
          </button>
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default TableRow;
