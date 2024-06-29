import { useMemo } from 'react';

import {
  approveErc20,
  hasErc20Approval,
  payRequest,
  prepareApproveErc20,
} from '@requestnetwork/payment-processor';
import { RequestNetwork, Types } from '@requestnetwork/request-client.js';
import { type ClientTypes, type PaymentTypes } from '@requestnetwork/types';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { BigNumber } from 'ethers';
import { toast } from 'sonner';
import { decodeAbiParameters } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';

import { type InvoiceType } from '../invoice';
import { errorHandler } from '../utils';
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

  const getAllRequestsData = async (from?: number, to?: number) => {
    if (!data) return;
    if (!address) return;

    try {
      const res = await data.client.fromIdentity(
        {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: address,
        },
        {
          from,
          to,
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
    if (!provider) return;

    const request = await data.client.fromRequestId(requestID);
    console.log(request.getData());

    return request;
  };

  const pay = async (requestID: string, amount?: string) => {
    const id = toast.loading('Paying Invoice');
    try {
      if (!data) {
        throw new Error('Request client not initialized');
      }
      if (!address) {
        throw new Error('Connect wallet to pay Invoice');
      }
      if (!signer) {
        throw new Error('Connect wallet to pay Invoice');
      }

      const request = await data.client.fromRequestId(requestID);
      const requestData = request.getData();

      console.log(
        decodeAbiParameters(
          [
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
          ],
          '0x095ea7b3000000000000000000000000399f5ee127ce7432e4921a61b8cf52b0af52cbfe0000000000000000000000000000000000000000000000000000000005f5e100'
        )
      );

      if (
        requestData.currencyInfo.type === Types.RequestLogic.CURRENCY.ERC20 ||
        requestData.currencyInfo.type === Types.RequestLogic.CURRENCY.ERC777
      ) {
        const hasApproval = await hasErc20Approval(
          requestData,
          address,
          signer
        );

        if (!hasApproval) {
          const prepared = prepareApproveErc20(
            requestData,
            signer,
            undefined,
            BigNumber.from(amount)
          );

          console.log(prepared);
          toast.loading('Approving ERC20', { id });
          const r = await approveErc20(
            requestData,
            signer,
            undefined,
            BigNumber.from(amount)
          );

          await r.wait(2);
          toast.loading('Approved ERC20', { id });
        }
      }

      const res = await payRequest(requestData, signer, amount, {
        gasLimit: 1000000,
      });
      const receipt = await res.wait(2);

      toast.success('Invoice Paid', {
        id,
        description: receipt.transactionHash,
      });
    } catch (error) {
      toast.error(errorHandler(error), { id });
    }
  };

  return { createRequest, getAllRequestsData, pay, data, getRequestById };
};
