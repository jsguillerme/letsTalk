import copyImg from '../assets/copyIcon.svg';

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button
      className='h-10 rounded-lg overflow-hidden bg-white border border-[#68B28A] cursor-pointer flex'
      onClick={copyRoomCodeToClipboard}
    >
      <div className='w-10 bg-[#68B28A] py-3 flex justify-center items-center h-full '>
        <img src={copyImg} alt="ícone de copiar código" />
      </div>
      <span className='block self-center flex-1 px-0 pl-4 pr-4 w-60 text-sm font-medium'>#{props.code}</span>
    </button>
  )
}