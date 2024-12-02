import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center m-auto">
      <LoaderCircle size={32} className="m-auto" />
    </div>
  );
};

export default Loader;
