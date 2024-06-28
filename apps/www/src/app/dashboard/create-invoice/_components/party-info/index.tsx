'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useInvoiceForm } from '~/lib/hooks';
import { type PartyInfo, partyInfoSchema } from '~/lib/zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';

import { Header } from '../header';
import { UserDetails } from './user-details';

export const PartyInfoForm = () => {
  'use no memo';

  const { address } = useAccount();
  const { next, partyInfo, setPartyInfo } = useInvoiceForm();

  const form = useForm<PartyInfo>({
    resolver: zodResolver(partyInfoSchema),
    defaultValues: partyInfo,
  });

  const onSubmit = (values: PartyInfo) => {
    setPartyInfo(values);
    next();
  };

  useEffect(() => {
    if (address) {
      form.setValue('payee.identity.value', address);
    }
  }, [address, form]);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <Header
        description='Basic Invoice Information such as Currency of Payment, Payer and Payee Details.'
        title='Invoice Information'
      />
      <Form {...form}>
        <form className='space-y-1' onSubmit={form.handleSubmit(onSubmit)}>
          <UserDetails type='payee' />
          <UserDetails type='payer' />
          <div className='flex py-6'>
            <Button type='submit'>Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
