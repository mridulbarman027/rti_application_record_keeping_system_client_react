import React from "react"

interface Props {
  title: string;
  desc: string;
}

const Card: React.FC<Props> = ({ title, desc }) => {
  return (
    <div className='flex mx-20 w-96 items-center flex-col justify-center border-[1px] p-4 shadow-sm cursor-pointer hover:bg-slate-100'>

      <div className="font-semibold text-lg">
        {title}
      </div>

      <div className="font-thin text-sm">
        {desc}
      </div>

    </div>
  )
}

export default Card