import {
  CurrencyManager,
  type ERC20Currency,
  type ERC777Currency,
  type NativeCurrencyInput,
  getSupportedERC20Tokens,
} from '@requestnetwork/currency';
import { type Types, Utils } from '@requestnetwork/request-client.js';
import {
  type ClientTypes,
  type PaymentTypes,
  RequestLogicTypes,
} from '@requestnetwork/types';
import { Country, State } from 'country-state-city';
import { z } from 'zod';

import type { InvoiceInfo, PartyInfo, PaymentInfo } from './zod';

export const userInfoSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  businessName: z.string().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
    })
    .optional(),
  taxRegistration: z.string().optional(),
  companyRegistration: z.string().optional(),
  miscellaneous: z.record(z.any()).optional(),
});

export const invoiceSchema = z
  .object({
    meta: z
      .object({ format: z.literal('rnf_invoice'), version: z.literal('0.0.3') })
      .strict()
      .describe('Meta information about the format'),
    creationDate: z.string().datetime(),
    invoiceNumber: z.string(),
    purchaseOrderId: z.string().optional(),
    note: z.string().optional(),
    terms: z.string().optional(),
    sellerInfo: userInfoSchema
      .strict()
      .describe('Seller information')
      .optional(),
    buyerInfo: userInfoSchema.strict().describe('Buyer information').optional(),
    invoiceItems: z.array(
      z
        .object({
          name: z.string(),
          reference: z.string().optional(),
          quantity: z.number().gte(0),
          unitPrice: z.string().regex(/^\d+$/),
          discount: z.string().regex(/^\d+$/).optional(),
          tax: z
            .object({
              amount: z.string(),
              type: z.enum(['percentage', 'fixed']),
            })
            .strict()
            .describe('Tax information about the invoice'),
          currency: z.string().min(2),
          deliveryDate: z.string().datetime().optional(),
          deliveryPeriod: z.string().optional(),
        })
        .strict()
    ),
    paymentTerms: z
      .object({
        dueDate: z.string().datetime().optional(),
        lateFeesPercent: z.number().optional(),
        lateFeesFix: z.string().regex(/^\d+$/).optional(),
        miscellaneous: z.record(z.any()).optional(),
      })
      .strict()
      .describe('Payment terms')
      .optional(),
    miscellaneous: z.record(z.any()).optional(),
  })
  .strict()
  .describe('Request Network Format of an invoice');

export type UserInfo = z.infer<typeof userInfoSchema>;
export type InvoiceType = z.infer<typeof invoiceSchema>;
// https://icons.llamao.fi/icons/chains/rsz_rsz_zksync era
export const EVMChains = [
  {
    id: 'mainnet',
    name: 'Ethereum',
    icon: 'ethereum',
  },
  {
    id: 'rinkeby',
    name: 'Ethereum Rinkeby',
    icon: 'ethereum',
  },
  {
    id: 'bsc',
    name: 'Binance Smart Chain',
    icon: 'bsc',
  },
  {
    id: 'bsctest',
    name: 'Binance Smart Chain Testnet',
    icon: 'bsc',
  },
  {
    id: 'matic',
    name: 'Polygon',
    icon: 'polygon',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: 'optimism',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    icon: 'avalanche',
  },
  {
    id: 'sepolia',
    name: 'Sepolia',
    icon: 'ethereum',
  },
  {
    id: 'zksyncera',
    name: 'zkSync Mainnet',
    icon: 'zksync era',
  },
  {
    id: 'zksynceratestnet',
    name: 'zkSync Testnet',
    icon: 'zksync era',
  },
  {
    id: 'base',
    name: 'Base',
    icon: 'base',
  },
] as const;

export const BtcChains = [
  {
    id: 'mainnet',
    name: 'Bitcoin',
    icon: 'bitcoin',
  },
  {
    id: 'testnet',
    name: 'Bitcoin Testnet',
    icon: 'bitcoin',
  },
] as const;

export const DeclarativeChains = [
  {
    id: 'tron',
    name: 'Tron',
    icon: 'tron',
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: 'solana',
  },
] as const;

export const NearChains = [
  {
    id: 'aurora',
    name: 'Aurora',
    icon: 'aurora',
  },
  {
    id: 'aurora-testnet',
    name: 'Aurora Testnet',
    icon: 'aurora',
  },
  {
    id: 'near',
    name: 'NEAR',
    icon: 'near',
  },
  {
    id: 'near-testnet',
    name: 'NEAR Testnet',
    icon: 'near',
  },
] as const;
export const VMChains = [...EVMChains, ...NearChains] as const;

export const ChainNames = [
  ...EVMChains,
  ...BtcChains,
  ...NearChains,
  ...DeclarativeChains,
] as const;

export type CurrencyWithMeta<T, Type> = T & {
  type: Type;
  id: string;
  hash: string;
  meta: unknown;
};

export const getCurrencies = (
  type: RequestLogicTypes.CURRENCY,
  network?: (typeof ChainNames)[number]['id']
) => {
  const allCurrencies = CurrencyManager.getDefaultList();

  if (
    type === RequestLogicTypes.CURRENCY.ETH ||
    type === RequestLogicTypes.CURRENCY.BTC
  ) {
    const c = allCurrencies.filter(
      (currency) => currency.type === type
    ) as CurrencyWithMeta<NativeCurrencyInput, typeof type>[];
    if (network) {
      return c.filter((currency) => currency.network === network);
    }
    return c;
  } else if (type === RequestLogicTypes.CURRENCY.ERC20) {
    const c = allCurrencies.filter(
      (currency) => currency.type === type
    ) as CurrencyWithMeta<ERC20Currency, typeof type>[];
    if (network) {
      return c.filter((currency) => currency.network === network);
    }
    return c;
  } else if (type === RequestLogicTypes.CURRENCY.ERC777) {
    const c = allCurrencies.filter(
      (currency) => currency.type === type
    ) as CurrencyWithMeta<ERC777Currency, typeof type>[];
    if (network) {
      return c.filter((currency) => currency.network === network);
    }
    return c;
  }

  const c = allCurrencies.filter((currency) => currency.type === type);
  return c;
};

export const paymentIdDetails: Record<
  Types.Extension.PAYMENT_NETWORK_ID,
  string
> = {
  'pn-any-declarative':
    'Payer declares payment sent. Payee declares payment received.',
  'pn-any-to-erc20-proxy': 'Swap to ERC20 before sending to payee',
  'pn-any-to-eth-proxy':
    'Swap to native token before sending to payee. Only works on EVM-compatible chains.',
  'pn-any-to-native-token':
    'Swap to native token before sending to payee. Only works on NEAR.',
  'pn-bitcoin-address-based':
    'Payee generates a new Bitcoin address. Use block explorer to detect all payments to that address.',
  'pn-erc20-address-based':
    'Payee generates a new Ethereum address. Use block explorer to detect all payments to that address.',
  'pn-erc20-fee-proxy-contract':
    'Send ERC20 via smart contract with an optional fee.',
  'pn-erc20-proxy-contract': 'Send ERC20 via smart contract',
  'pn-erc20-transferable-receivable':
    'Mint a Request as an NFT. The holder receives the payment.',
  'pn-erc777-stream': 'Superfluid stream',
  'pn-eth-fee-proxy-contract':
    'Send native token via smart contract with an optional fee.',
  'pn-eth-input-data':
    'Send native token with paymentReference in the call data.',
  'pn-native-token':
    'Send native token via smart contract with an optional fee on NEAR.',
  'pn-testnet-bitcoin-address-based':
    'Payee generates a new Bitcoin testnet address. Use block explorer to detect all payments to that address.',
};

export const getRequestParams = (
  partyInfo: PartyInfo,
  paymentInfo: PaymentInfo,
  invoiceInfo: InvoiceInfo
) => {
  const currency = getCurrencies(
    paymentInfo.currency.type,
    paymentInfo.currency.network
  ).filter((c) => c.symbol === paymentInfo.currency.value);

  if (!currency[0]) {
    throw new Error('Currency not found');
  }

  const currencyWithUnits =
    Number(paymentInfo.expectedAmount) * 10 ** currency[0].decimals;

  const request: ClientTypes.IRequestInfo = {
    currency: paymentInfo.currency,
    expectedAmount: currencyWithUnits,
    payee: partyInfo.payee.identity,
    payer: partyInfo.payer.identity,
    timestamp: Utils.getCurrentTimestampInSecond(),
  };

  const { id: _id, ...params } = paymentInfo.parameters;

  if ('acceptedTokens' in params) {
    const tokens = getSupportedERC20Tokens().filter((t) => {
      return t.network === params.network;
    });

    if (tokens.length === 0) {
      throw new Error('No tokens found');
    }
    const addresses: string[] = [];

    params.acceptedTokens.forEach((token) => {
      const t = tokens.find((t) => t.symbol === token);
      if (t) {
        addresses.push(t.address);
      }
    });

    params.acceptedTokens = addresses;
  }

  const paymentNetwork: PaymentTypes.PaymentNetworkCreateParameters = {
    id: paymentInfo.id,
    // @ts-expect-error -- we are not using other interface for erc777 stream
    parameters: params,
  };

  // Update country and state iso
  const sellerInfo = partyInfo.payee.userInfo;
  const buyerInfo = partyInfo.payer.userInfo;

  if (sellerInfo?.address?.country) {
    const country = Country.getCountryByCode(sellerInfo.address.country);
    if (!country) return;
    sellerInfo.address.country = country.name;
    if (sellerInfo.address.state) {
      const state = State.getStateByCodeAndCountry(
        sellerInfo.address.state,
        country.isoCode
      );
      if (!state) return;
      sellerInfo.address.state = state.name;
    }
  }

  if (buyerInfo?.address?.country) {
    const country = Country.getCountryByCode(buyerInfo.address.country);
    if (!country) return;
    buyerInfo.address.country = country.name;
    if (buyerInfo.address.state) {
      const state = State.getStateByCodeAndCountry(
        buyerInfo.address.state,
        country.isoCode
      );
      if (!state) return;
      buyerInfo.address.state = state.name;
    }
  }

  const invoice: InvoiceType = {
    ...invoiceInfo,
    sellerInfo,
    buyerInfo,
  };

  return {
    request,
    paymentNetwork,
    invoice,
  };
};
