'use client';

import React, { createElement } from 'react';

import { useRequest } from '~/lib/hooks';

import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { useAccount } from 'wagmi';

import { Button } from '~/components/ui/button';

import {
  InvoicePDFCreated,
  type InvoicePDFCreatedProps,
  Payer,
} from '../../_components';

import { CircleCheckBig } from 'lucide-react';

interface Params {
  params: { id: string };
}

const renderPDF = async (props: InvoicePDFCreatedProps) => {
  const { pdf } = await import('@react-pdf/renderer');
  const { InvoicePDFCreated: PDF } = await import(
    '../../_components/invoice-pdf'
  );
  // @ts-expect-error -- TS CONVERSION ERROR
  return pdf(createElement(PDF, props)).toBlob();
};

const InvoicePage = ({ params: { id } }: Params) => {
  const { getRequestById, data } = useRequest();
  const { address } = useAccount();

  const { data: request, isPending } = useQuery({
    queryKey: ['request', id],
    queryFn: async () => await getRequestById(id),
    enabled: Boolean(data) && Boolean(address) && Boolean(id),
    refetchInterval: 3000,
  });

  if (!address) {
    return <div>no address</div>;
  }

  if (isPending || !request) return <div>Loading...</div>;

  const requestData = request.getData();

  const userType = () => {
    if (address === requestData.payee?.value) {
      return 'payee';
    } else if (requestData.payer?.value === address) {
      return 'payer';
    }

    return 'other';
  };

  const current = BigNumber(requestData.balance?.balance ?? 0);
  const expected = BigNumber(requestData.expectedAmount);

  const progress = current.dividedBy(expected).times(100).toNumber().toFixed(0);

  const isComplete = current.isEqualTo(expected);

  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <InvoicePDFCreated data={request.getData()} />
      <Button
        className='w-fit'
        onClick={async () => {
          const blob = await renderPDF({
            data: request.getData(),
          });
          const file = new File([blob], 'invoice.pdf', {
            type: 'application/pdf',
          });

          const url = URL.createObjectURL(file);
          const a = document.createElement('a');

          a.download = 'invoice.pdf';
          a.href = url;
          a.click();

          URL.revokeObjectURL(url);
          a.remove();
        }}
      >
        Download
      </Button>

      <div className='flex flex-row items-center gap-2'>
        <div className='text-base font-semibold text-neutral-700'>
          Payment Status:{' '}
        </div>
        <div className='text-base font-semibold text-neutral-700'>
          {isComplete ? (
            <div className='flex flex-row items-center gap-2'>
              <CircleCheckBig className='h-6 w-6 text-green-500' />
              Completed
            </div>
          ) : (
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-row items-center gap-2'>
                <div className='w-24 rounded-md border border-neutral-300'>
                  <div
                    className='h-3 rounded-md bg-yellow-500'
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className='text-sm font-medium text-neutral-500'>
                  {progress}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {userType() === 'payer' ? <Payer request={request} /> : null}
    </div>
  );
};

export default InvoicePage;
