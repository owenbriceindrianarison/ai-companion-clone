import { Companion, Message } from '@prisma/client'
import ChatHeader from '@/components/chat-header'

interface ChatClientProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}

export default function ChatClient({ companion }: ChatClientProps) {
  return (
    <div className='flex flex-col space-y-2 p-4'>
      <ChatHeader companion={companion} />
    </div>
  )
}
