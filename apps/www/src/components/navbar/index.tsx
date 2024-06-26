import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import Logo from 'public/logo.svg';

import { Button } from '../ui/button';
import { ConnectButton } from './connect-button';

export const Navbar = () => {
  return (
    <div className='z-[10 bg-white] sticky top-0 h-[6dvh] w-full'>
      <div className='mx-auto flex h-full items-center justify-between px-4 sm:px-8'>
        <div className='flex flex-row items-center gap-2'>
          <Image
            alt='PiperPay'
            height={32}
            src={Logo as unknown as string}
            width={32}
          />
          <div className='text-2xl font-semibold'>PiperPay</div>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <Button
            asChild
            className='hidden p-0 px-2 text-base sm:flex'
            variant='link'
          >
            <Link href='/dashboard'>Dashboard</Link>
          </Button>
          <Button
            asChild
            className='hidden p-0 px-2 text-base sm:flex'
            variant='link'
          >
            <Link href='/dashboard/create-invoice'>Create Invoice</Link>
          </Button>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};
