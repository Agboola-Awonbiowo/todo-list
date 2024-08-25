import React from "react";
import SpinnerIcon from "../spinner";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <SpinnerIcon className="h-16 w-16 text-white" />
    </div>
  );
};

export default LoadingScreen;
