"use client";

import { LucideLoaderCircle } from "lucide-react";

interface LoaderAppProps {
  name: string;
  open: boolean;
}

const LoaderApp: React.FC<LoaderAppProps> = (props) => {
  if (props.open)
    return (
      <>
        <div
          className="h-screen w-screen fixed top-0 object-cover z-[100000]"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="flex flex-col items-center justify-center h-screen w-screen">
            <div className="p-10 rounded flex flex-col items-center justify-center w-full">
              <h2 className="text-8xl font-bold p-4 mb-6 text-foreground bg-gradient-to-tr from-indigo-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                {props.name}
              </h2>
              <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                <LucideLoaderCircle className=" mr-4  animate-spin" />
                Patientez quelques instants...
              </h2>
            </div>
          </div>
        </div>
      </>
    );
};

export default LoaderApp;
