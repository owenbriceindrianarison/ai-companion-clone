'use client'

import { Home, Plus, Settings } from 'lucide-react'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const ROUTES = [
  {
    icon: Home,
    href: '/',
    label: 'Home',
    pro: false,
  },
  {
    icon: Plus,
    href: '/companion/new',
    label: 'Create',
    pro: true,
  },
  {
    icon: Settings,
    href: '/settings',
    label: 'Settings',
    pro: false,
  },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const onNavigate = (url: string, pro: boolean) => {
    return router.push(url)
  }

  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex-1 justify-center'>
        <div className='space-y-2'>
          {ROUTES.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className='flex flex-col gap-y-2 items-center flex-1'>
                <route.icon className='h-4' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
