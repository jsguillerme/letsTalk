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

  return (
    <>
      {sent_by === user?.id ? (
        <>
          <div className={`flex flex-col w-max h-fit p-4 mb-2 mr-4 text-sm placeholder:text-[#7e7d7d] text-[#29292e] border-[#c7dad0a4] bg-[#c7dad0a4] rounded-t-xl rounded-bl-xl self-end`}>
            <span>{content}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mr-4 self-end">
            <span className="text-[12px]">{author.name}</span>
            <img src={author.avatar} alt="ícone de perfil" className="w-6 h-6 rounded-full" />
          </div>
        </>
      ) : (
        <>
          <div className={`flex flex-col w-max h-fit p-4 mb-2 text-sm placeholder:text-[#7e7d7d] text-[#29292e] border-[#c7dad0a4] bg-[#c7dad0a4] rounded-t-xl rounded-bl-xl self-start`}>
            <span>{content}</span>
          </div>
          <div className="flex items-center justify-between gap-2 ml-2 self-start">
            <span className="text-[12px]">{author.name}</span>
            <img src={author.avatar} alt="ícone de perfil" className="w-6 h-6 rounded-full" />
          </div>
        </>
      )}
    </>
  )

}