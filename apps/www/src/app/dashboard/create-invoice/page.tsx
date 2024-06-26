import React from 'react';

import { InvoiceInfoForm } from './_components';

const CreateInvoice = () => {
  return (
    <div className='flex w-full flex-col gap-3 bg-gray-50 lg:flex-row'>
      <div className='w-full basis-1/2'>
        <InvoiceInfoForm />
      </div>
      <div className='w-full basis-1/2'>q</div>
    </div>
  );
};

export default CreateInvoice;
