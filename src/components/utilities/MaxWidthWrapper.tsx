import React from "react";

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full mx-auto w-full max-w-[1440px] px-2.5 md:px-20">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
