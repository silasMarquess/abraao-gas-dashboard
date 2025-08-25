"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useEffect } from "react";
import ErrorComponent from "../components/error-component";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorComponent error={error} reset={reset} />;
}
