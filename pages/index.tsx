import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {data:session} = useSession();
  console.log(session)
  return (
    <></>
  );
}

export async function getServerSideProps(context:NextPageContext){
  const session = await getSession(context);
  return{
    props:{
      session
    }
  }
}