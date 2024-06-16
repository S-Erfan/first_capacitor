"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AiPage = () => {
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (window) {
      localStorage.setItem("player", JSON.stringify(selected));
    }
  }, [selected]);

  return (
    <div className="flex flex-col w-fit mx-auto ">
      <h5 className="text-2xl font-bold mt-[15vh] mb-[5vh] text-white">
        Choose a play mode
      </h5>
      <Circle
        strokeWidth={4}
        absoluteStrokeWidth={true}
        className={cn(
          "w-[8rem]  h-[8rem] p-3 transition-all mb-5 mx-auto rounded-md cursor-pointer hover:drop-shadow-lg",
          selected === 0 ? "bg-white text-blue-500 shadow-md scale-110" : "text-white"
        )}
        onClick={() => setSelected(0)}
      />
      <X
        strokeWidth={5}
        className={cn(
          "w-[8rem] h-[8rem] transition-all mx-auto rounded-md cursor-pointer hover:drop-shadow-lg",
          selected === 1 ? "bg-white text-red-500 shadow-md scale-110" : "text-white"
        )}
        onClick={() => setSelected(1)}
      />
      <Button className="w-full bg-white text-orange-400 mt-[7vh]" asChild>
        <Link href={"/ai/start"}>Start Game</Link>
      </Button>
    </div>
  );
};

export default AiPage;
