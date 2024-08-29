interface IButtonProps{
  type:'submit'|'reset'|'button';
  text:string;
  slide_text:string;
  icon:JSX.Element;
  disabled:boolean
}


const SlideButton = ({type,text,slide_text,icon,disabled}:IButtonProps) => {
  return (
    <button type={type} disabled={disabled} className="relative w-full inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium bg-blue-500 duration-300 transition ease-out border-2 rounded-md group">
      {disabled ? 'loading...':<>
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-4 bg-blue-600 group-hover:translate-x-0 ease">{icon}&nbsp;{slide_text}</span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          {text}
        </span>
        <span className="relative invisible">{text}</span>
      </>}
    </button>
  )
}

export default SlideButton