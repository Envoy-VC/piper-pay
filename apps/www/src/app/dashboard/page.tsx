'use client';

import React from 'react';

import { useRequest } from '~/lib/hooks';

import { CurrencyManager } from '@requestnetwork/currency';
import { useQuery } from '@tanstack/react-query';
import { RequestsTable } from '~/components';

import { Button } from '~/components/ui/button';

import { Header } from './create-invoice/_components/header';

const Dashboard = () => {
  const { getAllRequestsData, data } = useRequest();

  const { data: requests } = useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequestsData,
    initialData: [],
    enabled: Boolean(data),
  });

  return (
    <div className='flex w-full flex-col bg-gray-50 px-4 py-12'>
      <Header
        className='pb-4'
        description='View and manage your requests'
        title='Dashboard'
      />
      <RequestsTable data={requests ?? []} />
      <Button
        onClick={() => {
          const manager = CurrencyManager.getDefaultList().filter(
            (c) => c.type === 'ERC20' && c.network === 'sepolia'
          );
          console.log(manager);
        }}
      >
        Click
      </Button>
    </div>
  );
};

export default Dashboard;
