import { RequestNetwork } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { useWalletClient } from 'wagmi';

import { useEthers } from './use-ethers';

export const useRequest = () => {
  const { data: walletClient } = useWalletClient();
  const { provider, signer } = useEthers();

  const web3SignatureProvider = new Web3SignatureProvider(walletClient);

  const client = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: 'https://sepolia.gateway.request.network/',
    },
    signatureProvider: web3SignatureProvider,
  });

  return { client };
};
