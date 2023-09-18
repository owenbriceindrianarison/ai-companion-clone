'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Companion, Message } from '@prisma/client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import BotAvatar from '@/components/bot-avatar'
import { useToast } from '@/components/ui/use-toast'

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}
export default function ChatHeader({ companion }: ChatHeaderProps) {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  async function onDelete() {
    try {
      await axios.delete(`/api/companion/${companion.id}`)

      toast({
        description: 'Success',
      })

      router.refresh()
      router.push('/')
    } catch (error) {
      toast({
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
      <div className='flex gap-x-2 items-center'>
        <Button onClick={() => router.back()} size='icon' variant='ghost'>
          <ChevronLeft className='h-8 w-8' />
        </Button>
        <BotAvatar src={companion.src} />
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='font-bold'>{companion.name}</p>
            <div className='flex items-center text-xs text-muted-foreground'>
              <MessageSquare className='h-3 w-3 mr-1' />
              {companion._count.messages}
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className='h-4 w-4 mr-2' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className='h-4 w-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
