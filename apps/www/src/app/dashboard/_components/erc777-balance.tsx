'use client';

import React, { useEffect, useState } from 'react';

import { useEthers } from '~/lib/hooks/use-ethers';

import { type IRequestData } from '@requestnetwork/types/dist/client-types';
import sfMetadata from '@superfluid-finance/metadata';
import { Framework } from '@superfluid-finance/sdk-core';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { Button } from '~/components/ui/button';

import { ArrowBigRightIcon, MoveRight } from 'lucide-react';

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
      <div className='text-xl font-semibold text-neutral-700'>
        SuperFluid Stream
      </div>
      <div className='flex w-fit flex-row items-center gap-4 rounded-3xl bg-[#e9ffe5] p-4 text-neutral-700'>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-5xl'>{payerBalance.toFixed(8)}</div>
        </div>
        <div className='relative h-fit'>
          <MoveRight size={64} />
          <div className='absolute bottom-0 right-1/2 translate-x-1/4 translate-y-1/4 text-lg font-semibold text-neutral-700'>
            -10
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-5xl'>{payeeBalance.toFixed(8)}</div>
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
