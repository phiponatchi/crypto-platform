import config from '@/app.config'
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function AuthLayout({children}: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex items-center justify-center rounded-md text-primary-foreground">
            <Image src={config.appIcon} alt={config.appName} width={48} height={48} />
          </div>
          <span className='text-xl font-extrabold font-mono'>{config.appName}</span>
        </Link>
        {children}
      </div>
    </div>
  )
}
