"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToogleThemeButton() {
  const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    const root = window.document.documentElement;
    const theme = localStorage.getItem("theme");
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("prefers-theme-scheme:dark").matches)
    ) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(!true);
    }
  }, []);

  const toogleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = isDark ? "light" : "dark";
    root.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={toogleTheme}>
      {isDark ? <Sun></Sun> : <MoonIcon></MoonIcon>}
    </Button>
  );
}
