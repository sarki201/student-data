import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 px-5 py-3 items-center border-solid border-t-0 border-r-0 border-l-0 border-b border-[#ECECEC] gap-8 h-16">
      <Skeleton />
    </div>
  );
};

export default ListSkeleton;
