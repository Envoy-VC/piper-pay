import Image from 'next/image';

import React from 'react';

import InvoiceIllustration from 'public/invoice.svg';

export const Hero = () => {
  return (
    <div className='h-full min-h-screen w-full bg-gradient-to-b from-[#EEFFF1] via-[#F8FAE9] via-[60%] to-[#FFF6E3]'>
      <div className='flex h-full flex-col items-center justify-center px-3 py-24 text-center'>
        <h1 className='text-4xl font-medium sm:text-6xl md:text-7xl lg:text-8xl'>
          <div className='bg-gradient-to-r from-[#047863] to-[#01A261] bg-clip-text pb-1 text-transparent'>
            Effortless Invoicing
          </div>
          No More Chasing Money.
        </h1>
        <p className='w-full max-w-4xl py-6 text-sm font-medium text-neutral-600 sm:text-base'>
          PiperPay simplifies invoicing & payments. Freelancers & businesses can
          create invoices & receive payments in various cryptocurrencies (native
          tokens, ERC-20 tokens), fiat, or payment streams.
        </p>
        <Image
          alt='Invoice Illustration'
          className='text-[#45d89d]'
          height={500}
          src={InvoiceIllustration as unknown as string}
          width={500}
        />
      </div>
    </div>
  );
};
