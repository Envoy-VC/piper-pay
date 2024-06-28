import { useMemo } from 'react';

import type { InvoiceInfo, PartyInfo, PaymentInfo } from '~/lib/zod';

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { CurrencyManager } from '@requestnetwork/currency';
import { RequestLogicTypes } from '@requestnetwork/types';

import {
  Address,
  DateBox,
  ItemsTable,
  Logo,
  Note,
  PaymentDetails,
  PaymentTerms,
  tw,
} from './components.';

export interface InvoicePDFProps {
  partyInfo?: PartyInfo;
  paymentInfo?: PaymentInfo;
  invoiceInfo?: InvoiceInfo;
}

export const InvoicePDF = ({
  partyInfo,
  paymentInfo,
  invoiceInfo,
}: InvoicePDFProps) => {
  'use no memo';

  const currencySymbol = useMemo(() => {
    console.log(paymentInfo?.currency);
    const symbol =
      CurrencyManager.getDefaultList()
        .filter((c) => c.type === paymentInfo?.currency.type)
        .find((c) => {
          if (
            c.type === RequestLogicTypes.CURRENCY.ERC20 ||
            c.type === RequestLogicTypes.CURRENCY.ERC777
          ) {
            return c.address === paymentInfo?.currency.value;
          }
          return c.symbol === paymentInfo?.currency.value;
        })?.symbol ?? '';

    console.log(symbol);
    return symbol;
  }, [paymentInfo?.currency]);

  return (
    <Document>
      <Page style={tw('flex bg-white flex-col border p-12 font-sfProRegular')}>
        <View style={tw('w-full flex flex-row')}>
          <View style={tw('basis-2/6 w-full')}>
            <Logo />
          </View>
          <View style={tw('basis-4/6 w-full flex flex-col gap-3')}>
            <View style={tw('flex flex-row items-center gap-2')}>
              <Text style={tw('text-2xl font-sfProBold text-headings')}>
                Invoice No:{' '}
              </Text>
              <Text style={tw('text-2xl font-sfProBold text-neutral-700')}>
                {invoiceInfo?.invoiceNumber ?? ''}
              </Text>
            </View>
            <View style={tw('flex flex-row items-center gap-2')}>
              <Address type='from' {...partyInfo?.payee.userInfo} />
              <Address type='to' {...partyInfo?.payer.userInfo} />
            </View>
          </View>
        </View>
        <PaymentDetails
          currency={currencySymbol}
          network={paymentInfo?.currency.network}
          paymentType={paymentInfo?.currency.type}
        />
        <View style={tw('flex flex-row items-center gap-8 pt-20')}>
          <DateBox date={invoiceInfo?.creationDate ?? ''} title='Issue Date' />
          <DateBox
            date={invoiceInfo?.paymentTerms?.dueDate ?? ''}
            title='Due Date'
          />
        </View>
        <View style={tw('flex flex-row items-center gap-8 pt-2')}>
          <View style={tw('basis-4/6 w-full')}>
            <Note text={invoiceInfo?.note ?? ''} />
          </View>
          <View style={tw('basis-2/6 w-full')}>
            <View style={tw('flex flex-col w-full')}>
              <Text style={tw('text-sm font-sfProSemibold text-headings py-1')}>
                Total Due
              </Text>
              <Text style={tw('text-3xl font-sfProBold text-neutral-700')}>
                {`${String(paymentInfo?.expectedAmount ?? '0')} ${currencySymbol.split('-')[0] ?? ''}`}
              </Text>
            </View>
          </View>
        </View>
        <ItemsTable items={invoiceInfo?.invoiceItems ?? []} />
        <PaymentTerms
          lateFeesFix={invoiceInfo?.paymentTerms?.lateFeesFix}
          lateFeesPercent={invoiceInfo?.paymentTerms?.lateFeesPercent}
          terms={invoiceInfo?.terms}
        />
      </Page>
    </Document>
  );
};
