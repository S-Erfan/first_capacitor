import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Template from "./template";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Suspense fallback={"loading ..."}>
      <Template>
        <main className={cn("w-full h-screen bg-orange-400 ")}>
          <div className="container h-full">{children}</div>
        </main>
      </Template>
    </Suspense>
  );
};

export default Layout;
