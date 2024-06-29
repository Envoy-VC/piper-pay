import { useMemo } from 'react';

import { payRequest } from '@requestnetwork/payment-processor';
import { RequestNetwork, Types } from '@requestnetwork/request-client.js';
import { type ClientTypes, type PaymentTypes } from '@requestnetwork/types';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { useAccount, useWalletClient } from 'wagmi';

import { type InvoiceType } from '../invoice';
import { useEthers } from './use-ethers';

export const useRequest = () => {
  const { data: walletClient } = useWalletClient();
  const { provider, signer } = useEthers();
  const { address } = useAccount();

  const data = useMemo(() => {
    if (walletClient) {
      const signatureProvider = new Web3SignatureProvider(walletClient);
      const client = new RequestNetwork({
        nodeConnectionConfig: {
          baseURL: 'https://sepolia.gateway.request.network/',
        },
        signatureProvider,
      });

      return {
        signatureProvider,
        client,
      };
    }
  }, [walletClient]);

  const createRequest = async (
    requestInfo: ClientTypes.IRequestInfo,
    paymentNetwork: PaymentTypes.PaymentNetworkCreateParameters,
    invoice: InvoiceType
  ) => {
    if (!provider) {
      throw new Error('Connect wallet to create Invoice');
    }
    if (!data) {
      throw new Error('Request client not initialized');
    }
    if (!requestInfo.payee) {
      throw new Error('Missing payee');
    }

    const request = await data.client.createRequest({
      requestInfo,
      paymentNetwork,
      signer: requestInfo.payee,
      contentData: invoice,
    });

    await request.waitForConfirmation();
    return request;
  };

  const getAllRequestsData = async () => {
    if (!data) return;
    if (!address) return;

    try {
      const res = await data.client.fromIdentity(
        {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: address,
        },
        {
          from: 1719560034,
        }
      );

      const requestsData = res.map((request) => request.getData());

      return requestsData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const getRequestById = async (requestID: string) => {
    if (!data) return;
    if (!signer) return;

    const request = await data.client.fromRequestId(requestID);
    console.log(request.getData());

    return request;
  };

  const pay = async (requestID: string) => {
    if (!data) return;
    if (!signer) return;

    const request = await data.client.fromRequestId(requestID);
    const requestData = request.getData();

    const res = await payRequest(requestData, signer);
    console.log(res);
  };

  return { createRequest, getAllRequestsData, pay, data, getRequestById };
};
