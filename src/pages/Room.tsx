import { useEffect, useRef, useState } from "react"
import letsTalkLogo from '../assets/letsTalkLogo.svg';
import illustrationTalks from '../assets/illustrationTalks.svg';
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { PaperPlaneTilt } from "phosphor-react";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { Message } from "../components/Message";

type RoomParams = {
  id: string | undefined
}

export function Room() {
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const { user, signInWithGoogle } = useAuth();
  const [sendMessage, setSendMessage] = useState('');
  const [control, setControl] = useState(false);

  const roomId = params.id;
  const { title, messages, ownerRoom} = useRoom(roomId)

  const messageEndRef = useRef<null | HTMLDivElement>(null)

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  async function handleEndRoom() {
    const roomRef = database.ref(database.getDatabase(), `rooms/${roomId}`);
    await database.update(roomRef, {
      closed_at: new Date()
    })
    navigate('/')
  }

  async function handleLoggin() {
    event?.preventDefault()
    await signInWithGoogle();
    return;
  }
  
  async function handleKeyEnter(event: any) {
    const teclaPress = event.key;
    
    if (teclaPress !== 'Enter' && !event.shiftKey) {
      return;
    } else {
      setSendMessage('');
      handleSendMessage(sendMessage, user?.id, Date.now());
    }
  }
  
  async function handleSendMessage(message: string, send_by: string | undefined, created_at: number) {
    event?.preventDefault();
    setControl(true);
    
    if (message.trim() === '') {
      return;
    }
    
    if (!user) {
      throw new Error('Você precisa estar logado para enviar mensagens')
    }
    
    const mensagem = {
      content: message,
      author: {
        name: user.name,
        avatar: user.avatar,
        id_user: user.id
      },
      sent_by: send_by,
      created_at: created_at
    }
    
    const roomRef = database.ref(database.getDatabase(), `rooms/${roomId}/messages`);
    await database.push(roomRef, mensagem);
    setSendMessage('');
    setControl(false);
  }
  
  useEffect(() => {
    scrollToBottom();
  }, [messages])

  return (
    <div>
      <header className="p-4 border border-b-6 border-b-[#e2e2e2]">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-between items-center">
          <img className="max-w-[140px]" src={letsTalkLogo} alt="logo do lettalk" />
          <RoomCode code={roomId} />
          { user?.id === ownerRoom && <Button isOutlined style={{height: "40px", width: "160px", marginTop: 0}} onClick={handleEndRoom}>Encerrar conversa</Button>}
        </div>
      </header>
      <main className="max-w-4xl mx-auto">
        <div className="my-6 ml-6 flex items-center">
          <h1 className="text-2xl text-[#435A4E] font-bold">Sala: {title || 'Faça login'}</h1>
        </div>

        <section className="h-[520px] flex text-center">
          {messages.length === 0 ? (
            <div className="flex flex-col min-w-full items-center p-3">
              <img src={illustrationTalks} alt="ilustração de um chat" className="w-90 h-90" />
              <h3 className="text-xl text-brand-500 font-bold">Nenhuma mensagem por aqui...</h3>
              <span className="text-sm text-brand-500 font-normal">Envie o código desta sala para seus amigos e comece a responder perguntas!</span>
            </div>
          ) : (
            <section className="flex-1 self-end overflow-y-scroll scrollbar-thin">
              {messages.map(message => <Message
                key={message.id}
                content={message.content}
                author={message.author}
                created_at={message.created_at}
                sent_by={message.sent_by}
                id={message.id}
              />)}
              <div ref={messageEndRef} />
            </section>
          )}
        </section>

        <footer>
          <form className="flex flex-col items-center justify-center gap-1 mb-6">
            <div className="flex w-full items-center justify-center">
              <textarea className="w-full h-16 ml-4 text-sm drop-shadow-xl placeholder:text-[#304232] text-[#29292e] border-[#c7dad0a4] bg-[#c7dad0a4] rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-[#307a528a] scrollbar-track-transparent scrollbar-thin"
                placeholder="Digite sua mensagem..."
                onChange={(event) => setSendMessage(event.target.value)}
                value={sendMessage}
                onKeyUp={(e) => handleKeyEnter(e)}
              />
              <span className="w-16 h-20 m-3 drop-shadow-xl">
                <Button
                  onClick={() => handleSendMessage(sendMessage, user?.id, Date.now())}
                  disabled={!sendMessage.trim() || control}
                >
                  <PaperPlaneTilt weight="fill" className="w-7 h-7" />
                </Button>
              </span>
            </div>
            {!user && <span className="text-sm text-zinc-500 font-medium mb-4">Para enviar mensagens, <button onClick={handleLoggin} className="bg-transparent w-fit text-brand-500 border-0 underline text-sm cursor-pointer">faça seu login.</button></span>}
          </form>
        </footer>

      </main>
    </div>
  )
}