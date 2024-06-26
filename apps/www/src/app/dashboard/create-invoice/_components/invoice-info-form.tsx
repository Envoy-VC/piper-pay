'use client';

import Image from 'next/image';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  BtcChains,
  DeclarativeChains,
  VMChains,
  getCurrencies,
} from '~/lib/invoice';
import { type InvoiceInfo, invoiceInfoSchema } from '~/lib/zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Types } from '@requestnetwork/request-client.js';
import { IdentityTypes, RequestLogicTypes } from '@requestnetwork/types';
import { useAccount } from 'wagmi';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { Header } from './header';

export const InvoiceInfoForm = () => {
  'use no memo';

  const { address } = useAccount();

  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      payee: {
        type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
        value: address,
      },
    },
  });

  const onSubmit = (values: InvoiceInfo) => {
    console.log(values);
  };

  const currencyType = form.watch('currency.type');
  const currencyNetwork = form.watch('currency.network');

  useEffect(() => {
    if (currencyType === Types.RequestLogic.CURRENCY.BTC) {
      form.setValue('currency.network', undefined);
      form.setValue('currency.value', 'BTC');
    } else if (currencyType === Types.RequestLogic.CURRENCY.ISO4217) {
      form.setValue('currency.network', undefined);
    }
  }, [currencyType, form]);

  useEffect(() => {
    if (address) {
      form.setValue('payee.value', address);
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
          <div className='py-2 text-lg font-semibold text-neutral-700'>
            Payee Details
          </div>
          <FormField
            control={form.control}
            name='payee.type'
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Payee Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ethereumAddress'>Address</SelectItem>
                    <SelectItem value='ethereumSmartContract'>
                      Smart Contract Address
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='payee.value'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete='new-password'
                    autoCorrect='off'
                    placeholder='Connect Wallet to Autofill'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='py-2 text-lg font-semibold text-neutral-700'>
            Payer Details
          </div>
          <FormField
            control={form.control}
            name='payer.type'
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Payer Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ethereumAddress'>Address</SelectItem>
                    <SelectItem value='ethereumSmartContract'>
                      Smart Contract Address
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='payer.value'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete='new-password'
                    placeholder='Payer Address (0x13de...0b12)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='py-2 text-lg font-semibold text-neutral-700'>
            Currency Details
          </div>
          <FormField
            control={form.control}
            name='currency.type'
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Currency Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ETH'>
                      Native Token (Ethereum, MATIC, etc.)
                    </SelectItem>
                    <SelectItem value='BTC'>Bitcoin</SelectItem>
                    <SelectItem value='ISO4217'>
                      Fiat Currency (USD, EUR, etc.)
                    </SelectItem>
                    <SelectItem value='ERC20'>
                      ERC20 Token (DAI, USDC, etc.)
                    </SelectItem>
                    <SelectItem value='ERC777'>
                      Superfluid streamable Token (USDCx, DAIx, etc.)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {currencyType !== Types.RequestLogic.CURRENCY.ISO4217 && (
            <FormField
              control={form.control}
              name='currency.network'
              render={({ field }) => (
                <FormItem>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger value={currencyNetwork}>
                        <SelectValue placeholder='Currency Network (only for tokens)' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(currencyType === Types.RequestLogic.CURRENCY.BTC
                        ? BtcChains
                        : [...VMChains, ...DeclarativeChains]
                      ).map((chain) => (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className='flex flex-row items-center gap-2'>
                            <Image
                              alt={chain.name}
                              className='rounded-full'
                              height={24}
                              src={`https://icons.llamao.fi/icons/chains/rsz_${chain.icon}?w=256&h=256`}
                              width={24}
                            />
                            {chain.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name='currency.value'
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger value={currencyNetwork}>
                      <SelectValue placeholder='Currency Value' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getCurrencies(currencyType, currencyNetwork).map(
                      (currency) => {
                        if (
                          currency.type === RequestLogicTypes.CURRENCY.ETH ||
                          currency.type === RequestLogicTypes.CURRENCY.BTC
                        ) {
                          return (
                            <SelectItem
                              key={currency.id}
                              value={currency.symbol}
                            >
                              {currency.symbol}
                            </SelectItem>
                          );
                        } else if (
                          currency.type === RequestLogicTypes.CURRENCY.ERC20
                        ) {
                          return (
                            <SelectItem
                              key={currency.id}
                              value={currency.address}
                            >
                              {currency.symbol}
                            </SelectItem>
                          );
                        } else if (
                          currency.type === RequestLogicTypes.CURRENCY.ERC777
                        ) {
                          return (
                            <SelectItem
                              key={currency.id}
                              value={currency.address}
                            >
                              {currency.symbol}
                            </SelectItem>
                          );
                        } else if (
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unexpected behavior
                          currency.type === RequestLogicTypes.CURRENCY.ISO4217
                        ) {
                          return (
                            <SelectItem
                              key={currency.id}
                              value={currency.symbol}
                            >
                              {currency.symbol}
                            </SelectItem>
                          );
                        }

                        return null;
                      }
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='expectedAmount'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete='new-password'
                    placeholder='Amount Expected in Currency'
                    type='number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex py-6'>
            <Button type='submit'>Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
