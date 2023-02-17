import React from "react";
import { Button, ButtonProps } from "@mantine/core"
import { SiDiscord } from "react-icons/si"
import { signIn } from "next-auth/react";

export function DiscordButton(props: ButtonProps) {
    return <Button onClick={() => {
      signIn("discord").catch(console.log)}} leftIcon={<SiDiscord />} variant="default" color="blue" {...props} />;
  }