import { FieldError } from "react-hook-form";
import { IoAlertCircle } from "react-icons/io5";

interface IInputFormProps {
  name: string;
  type: string;
  icon: JSX.Element;
  placeholder: string;
  label: string;
  register: any;
  error: any;
  disabled: boolean;
}

const Input = ({
  name,
  type,
  icon,
  placeholder,
  label,
  register,
  error,
  disabled
}: IInputFormProps) => {
  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name} className="text-gray-700">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm ">
        <div className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3" style={{transform:`${error? 'translateY(-10px)':''}`}}>
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input type={type} placeholder={placeholder} name={name} className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-indigo-500 focus:ring-2 text-sm" {...register(name, { required: true })} style={{borderColor:`${error?'#ed4337':''}`}}/>
        {
          error && <div className="fill-red-500 absolute right-2 top-2.5 text-xl ">
            <IoAlertCircle fill="#ed4337"/>
          </div>
        }
        {
          error && <p className="text-sm text-[#ed4337] mt-1">{error}</p>
        }
      </div>
    </div>
  )
}

export default Input