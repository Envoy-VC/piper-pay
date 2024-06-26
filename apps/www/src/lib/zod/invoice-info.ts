import { Types } from '@requestnetwork/request-client.js';
import { IdentityTypes } from '@requestnetwork/types';
import { z } from 'zod';

import { ChainNames } from '../invoice';
import { constructZodLiteralUnionType } from '../utils';

export const currencySchema = z.object({
  type: z.nativeEnum(Types.RequestLogic.CURRENCY),
  value: z.string(),
  network: constructZodLiteralUnionType(
    ChainNames.map((chain) => z.literal(chain.id))
  ),
});

export const identitySchema = z.object({
  type: z.nativeEnum(IdentityTypes.TYPE),
  value: z.string(),
});

export const invoiceInfoSchema = z.object({
  currency: currencySchema,
  expectedAmount: z.union([z.string(), z.number()]),
  payee: identitySchema,
  payer: identitySchema,
  timestamp: z.string().datetime(),
  nonce: z.number().optional(),
});

export type Currency = z.infer<typeof currencySchema>;
export type Identity = z.infer<typeof identitySchema>;
export type InvoiceInfo = z.infer<typeof invoiceInfoSchema>;
