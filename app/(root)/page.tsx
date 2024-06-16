import { Button } from "@/components/ui/button";
import { X, Circle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col ">
        <div className="flex flex-row text-white w-full justify-center mt-[15vh]">
          <Circle
            strokeWidth={4}
            absoluteStrokeWidth={true}
            className="w-[8rem]  h-[8rem] p-3"
          />
          <X strokeWidth={5} className="w-[8rem] h-[8rem]" />
        </div>
        <div className="flex flex-col w-fit mx-auto justify-center items-center gap-4 text-white mt-[20vh]">
          <h5 className="text-2xl font-bold">Choose a play mode</h5>
          <Button className="w-full mt-3 bg-white text-orange-400 " asChild>
            <Link href={"/ai"} >With AI</Link>
          </Button>
          <Button
            variant={"outline"}
            className="w-full bg-transparent text-border hover:bg-primary/90 hover:border-primary/90 hover:text-orange-400">
               <Link href={"/friend"} >With a friend</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
