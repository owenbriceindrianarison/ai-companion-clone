import Image from 'next/image'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { Companion } from '@prisma/client'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'

interface CompanionsProps {
  data: (Companion & {
    _count: {
      messages: number
    }
  })[]
}

export default function Companions({ data }: CompanionsProps) {
  if (data.length === 0) {
    return (
      <div className='pt-10 flex flex-col justify-center items-center space-y-3'>
        <div className='relative h-60 w-60'>
          <Image fill src='/empty.png' alt='Empty' />
        </div>
        <p className='text-sm text-muted-foreground'>No companions found</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-10'>
      {data.map((item) => (
        <Card
          key={item.id}
          className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0'
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
              <div className='relative h-32 w-32'>
                <Image
                  fill
                  src={item.src}
                  alt='Companion'
                  className='rounded-xl object-cover'
                />
              </div>
              <p className='font-bold'>{item.name}</p>
              <p className='text-xs'>{item.description}</p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-sm text-muted-foreground'>
              <p className='lowercase'>@{item.userName}</p>
              <div className='flex items-center'>
                <MessageSquare className='w-3 h-3 mr-3' />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}
