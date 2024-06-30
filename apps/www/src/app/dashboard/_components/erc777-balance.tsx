'use client';

import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import { useEthers } from '~/lib/hooks/use-ethers';

import { ChainNames } from '~/lib/chains';
import { truncate } from '~/lib/utils';

import { type IRequestData } from '@requestnetwork/types/dist/client-types';
import sfMetadata from '@superfluid-finance/metadata';
import { Framework } from '@superfluid-finance/sdk-core';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import StreamGIF from 'public/stream.gif';

import { Button } from '~/components/ui/button';

interface Erc777BalanceProps {
  request: IRequestData;
}

export const Erc777Balance = ({ request }: Erc777BalanceProps) => {
  const { provider } = useEthers();
  const payeeAddress = request.payee?.value ?? '0x0';
  const payerAddress = request.payer?.value ?? '0x0';

  const [payerBalance, setPayerBalance] = useState<BigNumber>(BigNumber(0));
  const [payeeBalance, setPayeeBalance] = useState<BigNumber>(BigNumber(0));

  const network = sfMetadata.getNetworkByShortName(
    request.currencyInfo.network ?? 'mainnet'
  );

  const chainLogo =
    ChainNames.find((c) => c.id === request.currencyInfo.network)?.icon ??
    'ethereum';

  const { data, refetch } = useQuery({
    enabled: false,
    queryKey: [
      'erc777-balance',
      payeeAddress,
      payerAddress,
      network?.nativeTokenWrapper,
    ],
    queryFn: async () => {
      if (!network) return;
      if (!provider) return;
      // Initialize Superfluid Framework
      const sf = await Framework.create({
        chainId: network.chainId,
        provider,
        resolverAddress: network.contractsV1.resolver,
      });

      const superToken = await sf.loadSuperToken(request.currencyInfo.value);

      const flowRate = await superToken.getAccountFlowInfo({
        account: payerAddress,
        providerOrSigner: provider,
      });
      const payeeBalance = await superToken.balanceOf({
        account: payeeAddress,
        providerOrSigner: provider,
      });

      const payerBalance = await superToken.balanceOf({
        account: payerAddress,
        providerOrSigner: provider,
      });

      setPayerBalance(BigNumber(payerBalance).dividedBy(1e18));
      setPayeeBalance(BigNumber(payeeBalance).dividedBy(1e18));

      console.log({
        flowRate,
        payeeBalance,
        payerBalance,
      });

      return {
        flowRate,
        payeeBalance,
        payerBalance,
      };
    },
  });

  // when flowrate changes then decrease the balance every second
  useEffect(() => {
    if (!data) return;
    if (payeeBalance.isEqualTo(0) || payerBalance.isEqualTo(0)) return;

    const multiplier = BigNumber(data.flowRate.flowRate).dividedBy(1e19);

    const interval = setInterval(() => {
      const updatedPayeeBalance = payeeBalance.minus(multiplier);
      const updatedPayerBalance = payerBalance.plus(multiplier);

      setPayerBalance(updatedPayerBalance);
      setPayeeBalance(updatedPayeeBalance);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [data, payeeBalance, payerBalance]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='m-4 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-xl text-center'>
        <div className='text-lg font-semibold text-neutral-800'>
          Total Amount Streamed
        </div>
        <div className='flex flex-row items-center justify-between gap-8 text-6xl font-semibold text-neutral-800'>
          <Image
            alt='Image'
            className='rounded-full'
            height={64}
            src={`https://icons.llamao.fi/icons/chains/rsz_${chainLogo}?w=512&h=512`}
            width={64}
          />
          <div>0.000000003417126</div>
          <div className='text-[#01A261]'>ETHx</div>
        </div>
        <div className='flex w-full max-w-3xl flex-row items-end py-8'>
          <div className='flex flex-1 flex-col gap-4'>
            <div className='tet-neutral-700 text-start text-base font-medium'>
              Sender
            </div>
            <div className='flex flex-row items-center gap-3 rounded-xl border p-3 text-lg font-medium text-neutral-800 shadow-sm'>
              <Image
                alt='Image'
                className='rounded-full'
                height={32}
                src={`https://api.dicebear.com/9.x/shapes/png?seed=${request.payer?.value ?? ''}`}
                width={32}
              />
              {truncate(request.payer?.value ?? '', 12)}
            </div>
          </div>
          <Image
            alt='Image'
            className='mb-1'
            height={84}
            src={StreamGIF}
            width={84}
          />
          <div className='flex flex-1 flex-col gap-4'>
            <div className='tet-neutral-700 text-start text-base font-medium'>
              Receiver
            </div>
            <div className='flex flex-row items-center gap-3 rounded-xl border p-3 text-lg font-medium text-neutral-800 shadow-sm'>
              <Image
                alt='Image'
                className='rounded-full'
                height={32}
                src={`https://api.dicebear.com/9.x/shapes/png?seed=${request.payee?.value ?? ''}`}
                width={32}
              />
              {truncate(request.payee?.value ?? '', 12)}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          void refetch();
        }}
      >
        Refetch
      </Button>
    </div>
  );
};
