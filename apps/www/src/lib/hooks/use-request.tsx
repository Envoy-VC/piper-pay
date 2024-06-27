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
        // useMockStorage: true,
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
    if (!provider) return;

    if (!data) return;

    const request = await data.client.createRequest({
      requestInfo,
      paymentNetwork,
      signer: requestInfo.payee!,
      contentData: invoice,
    });

    await request.waitForConfirmation();

    console.log('Request created:', request);
    return request;
  };

  const getAllRequests = async () => {
    if (!data) return;
    if (!address) return;

    const res = await data.client.fromIdentity({
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: address,
    });

    console.log(res);

    return res;
  };

  const pay = async (requestID: string) => {
    if (!data) return;
    if (!signer) return;

    const request = await data.client.fromRequestId(requestID);
    const requestData = request.getData();

    const res = await payRequest(requestData, signer);
    console.log(res);
  };

  return { createRequest, getAllRequests, pay, data };
};
