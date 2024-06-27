'use client';

import React from 'react';

import { useRequest } from '~/lib/hooks';

import { useQuery } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';

const Dashboard = () => {
  const { getAllRequests, data, pay } = useRequest();

  const { data: requests } = useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequests,
    initialData: [],
    enabled: Boolean(data),
  });

  return (
    <div className='flex w-full flex-col bg-gray-50'>
      <Button onClick={getAllRequests}>Get Requests</Button>
      {requests?.map((req) => {
        const id = req.requestId;
        const data = req.getData();
        return (
          <div key={id} className=''>
            <div>ID: {id}</div>
            <div>Currency: {data.currencyInfo.value}</div>
            <div>Amount: {data.expectedAmount}</div>
            <div>Current: {data.balance?.balance}</div>
            <Button onClick={async () => await pay(id)}>Pay</Button>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
