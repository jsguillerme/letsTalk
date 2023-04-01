import { useAuth } from "../hooks/useAuth";
import { MessagesTypes } from "../hooks/useRoom";

export function Message({
  content,
  author,
  created_at,
  sent_by,
  id,
}: MessagesTypes) {
  const { user } = useAuth();

  console.log(author.avatar)

  return (
    <>
      {sent_by === user?.id ? (
        <>
          <div className="flex flex-col">
            <span className="max-w-[410px] m-1 mr-4 break-words p-2 h-fit text-[#29292e] border-[#c7dad0a4] bg-[#c7dad0a4] rounded-t-xl rounded-bl-xl self-end">{content}</span>
            <div className="flex items-center gap-2 mr-4 mb-4 self-end">
              <span className="text-[12px]">{author.name}</span>
              <img src={author.avatar} alt="ícone de perfil" className="w-6 h-6 rounded-full" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col"> 
            <span className="max-w-[410px] m-1 ml-4 break-words p-2 h-fit text-[#e9e9e9] border-[#192920a4] bg-[#192920a4] rounded-t-xl rounded-br-xl self-start">{content}</span>
          </div>
          <div className="flex items-center gap-2 mb-4 ml-4 self-start">
            <img src={author.avatar} alt="ícone de perfil" className="w-6 h-6 rounded-full" />
            <span className="text-[12px]">{author.name}</span>
          </div>
        </>
      )}
    </>
  )

}