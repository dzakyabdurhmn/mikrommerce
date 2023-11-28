import Link from "next/link";
import { Button } from "@mantine/core";
import { AuthenticationForm } from "../components/auth/AuthenticationForm";

function Demo() {
  return (
    <div className="ml-11 mr-11 flex flex-col h-screen justify-center items-center text-center">
      <AuthenticationForm />
    </div>
  );
}

export default Demo;
