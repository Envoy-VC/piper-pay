import {
  CurrencyManager,
  type ERC20Currency,
  type ERC777Currency,
  type NativeCurrencyInput,
} from '@requestnetwork/currency';
import { RequestLogicTypes } from '@requestnetwork/types';
import { z } from 'zod';

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
    sellerInfo: z
      .object({
        email: z.string().email().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        businessName: z.string().optional(),
        phone: z.string().optional(),
        address: z.any().optional(),
        taxRegistration: z.string().optional(),
        companyRegistration: z.string().optional(),
        miscellaneous: z.record(z.any()).optional(),
      })
      .strict()
      .describe('Seller information')
      .optional(),
    buyerInfo: z
      .object({
        email: z.string().email().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        businessName: z.string().optional(),
        phone: z.string().optional(),
        address: z.any().optional(),
        taxRegistration: z.string().optional(),
        companyRegistration: z.string().optional(),
        miscellaneous: z.record(z.any()).optional(),
      })
      .strict()
      .describe('Buyer information')
      .optional(),
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

export type InvoiceType = z.infer<typeof invoiceSchema>;
// https://icons.llamao.fi/icons/chains/rsz_rsz_zksync era
const EVMChains = [
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
