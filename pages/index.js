import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "@next/font/google";

import styles from "@/styles/Home.module.css";
import LoginForm from "@/components/forms/LoginForm";

const raleway = Raleway({
  subsets: ["latin"], // Specify the subsets you need
  weight: ["400", "700"], // Specify the weights you need
  variable: "--font-raleway", // Optional: Define a CSS variable
});

export default function Home() {
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}
