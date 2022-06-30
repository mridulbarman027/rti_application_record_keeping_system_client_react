
const Card = (cardValue: { title: string, desc: string }) => {
  return (
    <div className='flex mx-20 items-center flex-col justify-center border-[1px] p-4 shadow-sm cursor-pointer hover:bg-slate-100'>

      <div className="font-semibold text-lg">
        {cardValue.title}
      </div>

      <div className="font-thin text-sm">
        {cardValue.desc}
      </div>

    </div>
  )
}

export default Card