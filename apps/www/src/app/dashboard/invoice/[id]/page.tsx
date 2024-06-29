'use client';

import React, { createElement } from 'react';

import { useRequest } from '~/lib/hooks';

import { PDFViewer } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';

import {
  InvoicePDFCreated,
  type InvoicePDFCreatedProps,
} from '../../_components';

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

  const { data: request, isPending } = useQuery({
    queryKey: ['request', id],
    queryFn: async () => await getRequestById(id),
    enabled: Boolean(data),
  });

  if (isPending || !request) return <div>Loading...</div>;

  return (
    <div className='flex w-full flex-row gap-4'>
      <div className='w-full basis-1/2'>q</div>
      <div className='flex w-full basis-1/2 flex-col gap-2 p-4'>
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
        <PDFViewer height={990} className='w-full bg-white' showToolbar={false}>
          <InvoicePDFCreated data={request.getData()} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default InvoicePage;
