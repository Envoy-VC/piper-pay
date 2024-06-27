'use client';

import React from 'react';

import { InvoiceFormStep, useInvoiceForm } from '~/lib/hooks';

import { InvoicePDF } from '../_components';
import { InvoiceInfoForm, PartyInfoForm, PaymentInfoForm } from './_components';

const CreateInvoice = () => {
  const { step } = useInvoiceForm();
  return (
    <div className='flex w-full flex-col gap-3 bg-gray-50 lg:flex-row'>
      <div className='w-full basis-2/5'>
        {step === InvoiceFormStep.PartyInfo && <PartyInfoForm />}
        {step === InvoiceFormStep.PaymentInfo && <PaymentInfoForm />}
        {step === InvoiceFormStep.InvoiceInfo && <InvoiceInfoForm />}
      </div>
      <div className='w-full basis-3/5'>
        <InvoicePDF />
      </div>
    </div>
  );
};

export default CreateInvoice;
