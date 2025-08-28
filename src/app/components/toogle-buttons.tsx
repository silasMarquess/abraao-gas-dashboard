"use client";

import { Button } from "@/components/ui/button";
import { InfoIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ToggleButtonProps {
  onClickDelete?: () => void;
  url: string;
  id_resources: string;
}

const ToggleButton = ({
  onClickDelete,
  id_resources,
  url,
}: ToggleButtonProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-1 items-center">
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => router.push(`${url}/${id_resources}`)}
      >
        <InfoIcon />
      </Button>
      <Button size={"icon"} variant={"destructive"} onClick={onClickDelete}>
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default ToggleButton;
