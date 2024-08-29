import { CiUser } from "react-icons/ci"
import Input from "../inputs/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import Link from "next/link";
import SlideButton from "../button/SlideButton";
import axios from "axios";

interface IRegisterFormProps{

}
const FormSchema= z.object({
  first_name:z.string().min(2,"first name must be at least 2 characters").max(32,'first name must be less than 32 characters').regex(new RegExp("^[a-zA-z]+$"),"No special characters are allowed"),
  last_name:z.string().min(2,"last name must be at least 2 characters").max(32,'last name must be less than 32 characters').regex(new RegExp("^[a-zA-z]+$"),"No special characters are allowed"),
  email:z.string().email("please enter a valid email"),
  phone:z.string().regex(/^\+20\d{10}$/, "Invalid Egyptian phone number"),
  password:z.string().min(6,"password must be at least 6 characters").max(52,"password must be less than 52 characters"),
  confirmPassword:z.string().min(6,"password must be at least 6 characters").max(52,"password must be less than 52 characters"),
  accept:z.literal(true,{
    errorMap:()=>({
      message:'please agree to all the terms and conditions'
    })
  })
}).refine((data)=> data.password === data?.confirmPassword,{
  message:"Password does not match",
  path:['confirmPassword']
});

type FormSchemaType = z.infer<typeof FormSchema>
const RegisterForm = () => {
  const {register,handleSubmit,watch,formState:{errors,isSubmitting}} = useForm<FormSchemaType>({
  resolver:zodResolver(FormSchema)
  });
  const [passwordScore,setPasswordScore] = useState(0);

  const onSubmit:SubmitHandler<FormSchemaType> =async (values:any)=>{
    const response = await axios.post("/api/auth/signup",{
      ...values
    }).then(result=> console.log(result)).catch(err=> console.log(err))
  }

  function validatePasswordLength(){
    let password = watch().password;
    return zxcvbn(password ? password:"").score;
  }

  useEffect(()=>{
    setPasswordScore(validatePasswordLength());
  },[watch().password])
  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-3 md:flex ">
        <Input 
          name="first_name"
          label="first_name"
          type="text"
          icon={<CiUser/>}
          placeholder="Enter your first name"
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input 
          name="last_name"
          label="last_name"
          type="text"
          icon={<CiUser/>}
          placeholder="Enter your last name"
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
        
      </div>
      <Input 
          name="email"
          label="Email Address"
          type="email"
          icon={<FiMail/>}
          placeholder="Enter your email"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
      <Input 
          name="phone"
          label="Phone number"
          type="text"
          icon={<BsTelephone/>}
          placeholder="+(xx) xx xxx xx xxx"
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
      <Input 
          name="password"
          label="Password"
          type="password"
          icon={<FiLock/>}
          placeholder="Password"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        {
          watch().password?.length > 0 && <div className="flex mt-2">
            {
              Array.from(Array(5).keys()).map((span,i)=>{
                return(
                  <span className="w-1/5 px-1" key={i}>
                    <div className={`
                      h-2 rounded-xl ${passwordScore <=2 ?'bg-red-400' : passwordScore <4 ?'bg-yellow-400' :'bg-green-500'}
                      `}></div>
                  </span>
                )
              })
            }
          </div>
        }
      <Input 
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          icon={<FiLock/>}
          placeholder="Confirmation Password"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />
        <div className="flex items-center mt-3">
          <input type="checkbox" id="accept" className="mr-2 focus:ring-0 rounded" {...register("accept",{required:true})} />
          <label htmlFor="accept" className="text-gray-700">
            I accept the&nbsp; <Link href="" target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline ">terms</Link>&nbsp;and&nbsp;<Link href="" target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline ">privacy policy</Link>
          </label>
        </div>
        <div>
          {errors?.accept && (
            <p className="text-sm text-red-600 mt-1">{errors?.accept?.message}</p>
          )}
        </div>
        <SlideButton type="submit" text="Sign up" slide_text="Secure Sign up" icon={<FiLock/>} disabled={isSubmitting} />
    </form>
  )
}

export default RegisterForm