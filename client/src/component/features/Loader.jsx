import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center m-auto">
      <LoaderCircle size={64} className="m-auto text-gray-100" />
    </div>
  );
};

export default Loader;
