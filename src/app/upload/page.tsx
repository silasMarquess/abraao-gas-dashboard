"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const UploadPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const { isDragAccept, isDragActive, getRootProps, getInputProps } =
    useDropzone({
      onDrop: (acceptFiles) => {
        const dropFile = acceptFiles[0];

        if (dropFile) {
          setFile(dropFile);
          toast.success("Arquivo enviado com sucesso");
        } else {
          toast.message("nemhum arquivo selecionado");
        }
      },
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
          ".xls",
        ],
      },
    });

  const handleFiles = async () => {
    if (!file) {
      toast.error("nemhum arquivo selecioando");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/upload", formData);
      if (!(response.status === 200 || response.status === 201)) {
        throw new Error("Erro ao enviar arquivo");
      }
      toast.success("Arquivo enviado com sucesso");
      router.push("/");
    } catch (error) {
      console.log("Erro ao enviar arquivo:", error);
      toast.error("Erro ao enviar arquivo tente novamente");
    }
  };

  return (
    <div className=" h-screen w-screen flex flex-col p-10 justify-start items-center bg-gray-100 dark:bg-background">
      <Card className="flex w-[500px] h-[500px] flex-col  border">
        <CardHeader>
          <CardTitle>Upload de Planilhas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full space-y-3">
          <div
            {...getRootProps()}
            className={clsx(
              "flex flex-col items-center justify-center w-full h-full border-1 border-dashed rounded-2xl hover:border-primary",
              isDragActive
                ? "bg-gray-400 dark:bg-background"
                : "bg-gray-100 dark:bg-gray-800"
            )}
          >
            <Input {...getInputProps()}></Input>
            {isDragActive ? (
              <p>Solte o Arquivo Aqui</p>
            ) : (
              <p>Arraste e solte sua planilha aqui ou clique para selecionar</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 items-center p-2 w-full h-auto">
            {file && <p>Arquivo Selecionado pronto para envio: {file.name}</p>}
            <Button onClick={handleFiles} disabled={!file} className="w-full">
              Enviar Planilha
            </Button>
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => router.push("/")}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;
