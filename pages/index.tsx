import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, signOut, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {data:session} = useSession();
  
  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center">
      <div className="mx-auto">
        <div className="border borer-white relative flex flex-col w-full rounded-lg">
          <div className="flex flex-wrap justify-center items-center ">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <button onClick={()=> signOut()} className="bg-blue-500 hover:bg-blue-700 uppercase text-md font-bold px-8 py-2 rounded-mg sm:mr-2 mb-1 ease-linear transition-all duration-150">Logout</button>

              </div>
            </div>
            <div className="w-full flex justify-center ">
              <Image src={session?.user?.image!} alt={session?.user?.name!} width={40} height={40} className="object-fit rounded-full"/>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-4xl font-semibold mb-2">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-bold">
                {session?.user?.email}
              </div>
            </div>
          </div>
          <div className="mt-10 py-10 border-t text-center ">
            <div className="flex flex-wrap justify-center ">
              <div className="w-full px-4 ">
                <p className="mb-4 text-sm ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae beatae ipsa illum nisi sunt provident voluptas eos sed amet tempora!</p>
                <p className="font-bold text-xs ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores animi ut veniam, atque nostrum ipsam.</p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  Source Code here <Link href="https//" target="_blank" rel="noopener noreferrer">
                    <AiFillGithub/>
                  </Link>
                </div>
                <div className="flex justify-center items-center gap-4 mt-4 pt-6 text-3xl ">
                <Link href="https//" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition ease-in-out">
                    <AiFillGithub/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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