"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col border bg-gray-100 p-3 items-center justify-center">
        <h2 className="font-semibold text-2xl">
          {" "}
          Sinto Muito, Um erro aconteceu !
        </h2>
        <Button className="w-full" variant={"outline"} onClick={() => reset()}>
          <ArrowBigLeft />
          <span>Tente Novamente</span>
        </Button>
      </div>
    </div>
  );
}
