import {
  type CurrencyInput,
  CurrencyManager,
  type ERC20CurrencyInput,
  type ERC777CurrencyInput,
  type ISO4217CurrencyInput,
  type NativeCurrencyInput,
} from '@requestnetwork/currency';
import { RequestLogicTypes } from '@requestnetwork/types';

export type CurrencyDefinition<T> = T & {
  id: string;
  hash: string;
  meta: unknown;
};

export function getCurrenciesForType(
  type: RequestLogicTypes.CURRENCY
): CurrencyDefinition<CurrencyInput>[];
export function getCurrenciesForType(
  type: RequestLogicTypes.CURRENCY.BTC | RequestLogicTypes.CURRENCY.ETH
): CurrencyDefinition<NativeCurrencyInput>[];
export function getCurrenciesForType(
  type: RequestLogicTypes.CURRENCY.ISO4217
): CurrencyDefinition<ISO4217CurrencyInput>[];
export function getCurrenciesForType(
  type: RequestLogicTypes.CURRENCY.ERC20
): CurrencyDefinition<ERC20CurrencyInput>[];
export function getCurrenciesForType(
  type: RequestLogicTypes.CURRENCY.ERC777
): CurrencyDefinition<ERC777CurrencyInput>[];

export function getCurrenciesForType(type: RequestLogicTypes.CURRENCY) {
  const filtered = CurrencyManager.getDefaultList().filter(
    (c) => c.type === type
  );

  if (
    type === RequestLogicTypes.CURRENCY.BTC ||
    type === RequestLogicTypes.CURRENCY.ETH
  ) {
    return filtered as CurrencyDefinition<NativeCurrencyInput>[];
  } else if (type === RequestLogicTypes.CURRENCY.ISO4217) {
    return filtered as CurrencyDefinition<ISO4217CurrencyInput>[];
  } else if (type === RequestLogicTypes.CURRENCY.ERC20) {
    return filtered as CurrencyDefinition<ERC20CurrencyInput>[];
  }
  return filtered as CurrencyDefinition<ERC777CurrencyInput>[];
}

export const getCurrencyFromId = (id: string) => {
  return CurrencyManager.getDefaultList().find((c) => c.id === id);
};