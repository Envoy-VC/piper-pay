'use client';

import React, { createElement } from 'react';

import { InvoiceFormStep, useInvoiceForm } from '~/lib/hooks';

import { Button } from '~/components/ui/button';

import { InvoicePDF, type InvoicePDFProps } from '../_components';
import { InvoiceInfoForm, PartyInfoForm, PaymentInfoForm } from './_components';

const renderPDF = async (props: InvoicePDFProps) => {
  const { pdf } = await import('@react-pdf/renderer');
  const { InvoicePDF: PDF } = await import('../_components/invoice-pdf');
  // @ts-expect-error -- TS CONVERSION ERROR
  return pdf(createElement(PDF, props)).toBlob();
};

const CreateInvoice = () => {
  const { step, partyInfo, paymentInfo, invoiceInfo } = useInvoiceForm();

  return (
    <div className='flex w-full flex-col gap-3 bg-gray-50 lg:flex-row'>
      <div className='w-full basis-1/2'>
        {step === InvoiceFormStep.PartyInfo && <PartyInfoForm />}
        {step === InvoiceFormStep.PaymentInfo && <PaymentInfoForm />}
        {step === InvoiceFormStep.InvoiceInfo && <InvoiceInfoForm />}
      </div>
      <div className='flex w-full basis-1/2 flex-col gap-2 px-2'>
        <Button
          className='w-fit'
          onClick={async () => {
            const blob = await renderPDF({
              partyInfo,
              paymentInfo,
              invoiceInfo,
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
        <InvoicePDF
          invoiceInfo={invoiceInfo}
          partyInfo={partyInfo}
          paymentInfo={paymentInfo}
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
