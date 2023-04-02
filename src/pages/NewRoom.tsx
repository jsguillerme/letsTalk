import iconTalkChat from '../assets/illustrationTalks.svg';
import logoImg from '../assets/letsTalkLogo.svg';
import { Button } from '../components/Button';
import { Plus } from 'phosphor-react'
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    /*
      Verifico se o valor digitado para nome da sala é vazio,
      caso sim, não é retornado nada.
    */
    if (newRoom.trim() === '') {
      return;
    }
    /*
      - Procuro a referência no banco, passando a chave 'rooms'
      - Utilizo do método push do database para enviar informações novas
      - Dou um set nessas informações passando o título da sala e o usuário que criou a sala
    */
    const roomRef = database.ref(database.getDatabase(), 'rooms');
    const firebaseRoom = database.push(roomRef);
    database.set(firebaseRoom, {
      title: newRoom.trim(),
      authorId: user?.id,
    })

    /*
      Após criar a referência no database do firebase, encaminho o usuário para a sala recém criada
    */
    navigate(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div className='flex items-stretch h-screen'>
      <aside className='bg-brand-500 text-white flex flex-[7] flex-col justify-center px-28 py-20 mobile:hidden'>
        <img src={iconTalkChat} alt="imagem representando um chat" className='max-w-xs' />
        <strong className='leading-10 mt-4 text-4xl'>Que tal bater um papo com seus amigos?</strong>
        <p className='text-2xl mt-4 text-white'>Crie uma sala de conversa ou entre em uma e se divirta conversando com seus amigos ou faça novas amizades.</p>
      </aside>
      <main className='flex-[8] px-8 flex items-center justify-center'>
        <div className='flex flex-col w-full max-w-[328px] items-stretch text-center'>
          <img src={logoImg} alt="logo do letstalk" className='self-center' />
          <h2 className='text-lg my-16 font-semibold text-zinc-800'>Criar uma nova sala de conversa</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Digite o nome da sala'
              className='w-full h-[50px] rounded-lg p-4 bg-[#c7dad06e] border border-brand-500 placeholder:text-[#7c7b7b] drop-shadow-sm focus:outline-none focus:border-brand-500 focus:ring-brand-500 focus:ring-1'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>
              <Plus weight='bold' className='w-5 h-5 mr-2' />
              <p className='text-lg'>Criar sala</p>
            </Button>
          </form>
          <p className='text-sm text-zinc-600 mt-8'>Quer entrar em uma conversa existente? <Link to='/' className='text-brand-500 underline'>Clique aqui</Link> </p>
        </div>
      </main>
    </div>
  )
}