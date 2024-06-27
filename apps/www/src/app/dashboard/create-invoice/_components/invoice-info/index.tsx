import React from 'react';
import { useForm } from 'react-hook-form';

import { type InvoiceInfo, invoiceInfoSchema } from '~/lib/zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '~/components/ui/button';
import { DateTimePicker } from '~/components/ui/date-time-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

import { Header } from '../header';

export const InvoiceInfoForm = () => {
  'use no memo';
  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      meta: { format: 'rnf_invoice', version: '0.0.3' },
    },
  });

  const onSubmit = (data: InvoiceInfo) => {
    console.log(data);
  };

  return (
    <div className='p-4'>
      <Header
        className='pb-4'
        description='Invoice Details such as invoice number, purchase order id, note, terms, invoice items, payment terms, and miscellaneous information.'
        title='Invoice Information'
      />
      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-row items-center justify-between gap-2'>
            <div className='flex flex-row items-center gap-2'>
              <div className='font-semibold'>Invoice #</div>
              <FormField
                control={form.control}
                name='invoiceNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='223' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col'>
              <div className='pb-[2px] text-sm font-semibold text-neutral-600'>
                Creation Date
              </div>
              <FormField
                control={form.control}
                name='creationDate'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DateTimePicker
                        granularity='second'
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- is undefined if no default value
                        jsDate={new Date(field.value ?? Date.now())}
                        onJsDateChange={(date) =>
                          field.onChange(date.toISOString())
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};
