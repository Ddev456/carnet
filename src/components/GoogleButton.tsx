import React from "react";
import { Button, ButtonProps } from "@mantine/core"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react";

export function GoogleButton(props: ButtonProps) {
    return <Button onClick={() => {
      signIn("google").catch(console.log)}} leftIcon={<FcGoogle />} variant="default" color="gray" {...props} />;
  }