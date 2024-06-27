import { useMemo } from 'react';

import type { InvoiceInfo, PartyInfo, PaymentInfo } from '~/lib/zod';

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { CurrencyManager } from '@requestnetwork/currency';

import {
  Address,
  DateBox,
  ItemsTable,
  Logo,
  Note,
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
    return (
      CurrencyManager.getDefaultList().find(
        (c) =>
          c.type === paymentInfo?.currency.type &&
          c.symbol === paymentInfo.currency.value
      )?.symbol ?? ''
    );
  }, [paymentInfo?.currency.type, paymentInfo?.currency.value]);

  return (
    <Document>
      <Page style={tw('flex bg-white flex-col border p-12 font-sans')}>
        <View style={tw('w-full flex flex-row')}>
          <View style={tw('basis-2/6 w-full')}>
            <Logo />
          </View>
          <View style={tw('basis-4/6 w-full flex flex-col gap-3')}>
            <View style={tw('flex flex-row items-center gap-2')}>
              <Text style={tw('text-2xl font-bold text-headings')}>
                Invoice No:{' '}
              </Text>
              <Text style={tw('text-2xl font-bold text-neutral-700')}>
                {invoiceInfo?.invoiceNumber ?? ''}
              </Text>
            </View>
            <View style={tw('flex flex-row items-center gap-2')}>
              <Address type='from' {...partyInfo?.payee.userInfo} />
              <Address type='to' {...partyInfo?.payer.userInfo} />
            </View>
          </View>
        </View>
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
              <Text style={tw('text-sm font-semibold text-headings py-1')}>
                Total Due
              </Text>
              <Text style={tw('text-3xl font-bold text-neutral-700')}>
                {`${String(paymentInfo?.expectedAmount ?? '0')} ${currencySymbol}`}
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
