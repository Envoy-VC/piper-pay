import { Types } from '@requestnetwork/request-client.js';
import { z } from 'zod';

import { ChainNames } from '../invoice';
import { constructZodLiteralUnionType } from '../utils';

export const currencySchema = z.object({
  type: z.nativeEnum(Types.RequestLogic.CURRENCY),
  value: z.string(),
  network: constructZodLiteralUnionType(
    ChainNames.map((chain) => z.literal(chain.id))
  ).optional(),
});

export const paymentInfoSchema = z.object({
  currency: currencySchema,
  expectedAmount: z.union([z.string(), z.number()]),
});

export type Currency = z.infer<typeof currencySchema>;
export type PaymentInfo = z.infer<typeof paymentInfoSchema>;
