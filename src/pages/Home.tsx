import iconTalkChat from '../assets/illustrationTalks.svg';
import iconGoogle from '../assets/googleIcon.svg';
import logoImg from '../assets/letsTalkLogo.svg';
import { Button } from '../components/Button';
import { SignIn } from 'phosphor-react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate()

  async function handleCreateTalk() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/create/room');
  }

  async function handleJoinTalk(event: FormEvent) {
    event.preventDefault();
    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = database.ref(database.getDatabase(), `/rooms/${roomCode}`);
    const firebaseRoom = await database.get(roomRef);

    if (!firebaseRoom.exists()) {
      alert('Room does not exists')
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div className='flex items-stretch h-screen'>
      <aside className='bg-brand-500 text-white flex flex-[7] flex-col justify-center px-28 py-20'>
        <img src={iconTalkChat} alt="imagem representando um chat" className='max-w-xs' />
        <strong className='leading-10 mt-4 text-4xl'>Que tal bater um papo com seus amigos?</strong>
        <p className='text-xl mt-4 text-white'>Crie uma sala de conversa ou entre em uma e se divirta conversando com seus amigos ou faça novas amizades.</p>
      </aside>
      <main className='flex-[8] px-8 flex items-center justify-center'>
        <div className='flex flex-col w-full max-w-[328px] items-stretch text-center'>
          <img src={logoImg} alt="logo do letstalk" className='self-center' />
          <button onClick={handleCreateTalk} className='mt-16 h-[50px] rounded-lg font-medium bg-google-500 text-white flex justify-center items-center cursor-pointer hover:brightness-90'>
            <img src={iconGoogle} alt="ícone do Google para autenticação" className='mr-2' />
            Crie sua sala com o Google
          </button>
          <div className="text-sm text-zinc-500 my-8 flex items-center before:content-[''] before:flex-1 before:h-[1px] before:bg-zinc-500 before:mr-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-zinc-500 after:ml-4">Ou entre em uma sala</div>
          <form onSubmit={handleJoinTalk}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
              className='w-full h-[50px] rounded-lg p-4 bg-[#c7dad06e] border border-brand-500 placeholder:text-[#7c7b7b] drop-shadow-sm focus:outline-none focus:border-brand-500 focus:ring-brand-500 focus:ring-1'
            />
            <Button>
              <SignIn className='w-6 h-6 mr-2' weight='fill' />
              Entrar na Sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}