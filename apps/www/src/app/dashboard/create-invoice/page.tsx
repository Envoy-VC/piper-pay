'use client';

import React from 'react';

import { InvoiceFormStep, useInvoiceForm } from '~/lib/hooks';

import { PartyInfoForm, PaymentInfoForm } from './_components';

const CreateInvoice = () => {
  const { step } = useInvoiceForm();
  return (
    <div className='flex w-full flex-col gap-3 bg-gray-50 lg:flex-row'>
      <div className='w-full basis-1/2'>
        {step === InvoiceFormStep.PartyInfo && <PartyInfoForm />}
        {step === InvoiceFormStep.PaymentInfo && <PaymentInfoForm />}
      </div>
      <div className='w-full basis-1/2'>q</div>
    </div>
  );
};

export default CreateInvoice;
