import { Button } from "@/components/ui/button";
import { ArrowBigLeft, TriangleAlertIcon } from "lucide-react";

interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col border bg-gray-200 p-4 items-center justify-center rounded-md">
        {" "}
        <div className="flex flex-row items-center gap-2 mb-4">
          <TriangleAlertIcon />
          <h2 className="font-light text-xl">
            Sinto Muito, Um erro aconteceu: {error.digest}
          </h2>
        </div>
        <Button className="w-full" variant={"outline"} onClick={() => reset()}>
          <ArrowBigLeft />
          <span>Tente Novamente</span>
        </Button>
      </div>
    </div>
  );
};

export default ErrorComponent;
