import { create } from 'zustand';

import type  { PartyInfo, PaymentInfo } from '../zod';

export enum InvoiceFormStep {
  PartyInfo = 0,
  PaymentInfo,
  InvoiceDetails,
}

interface InvoiceFormState {
  step: InvoiceFormStep;
  partyInfo: PartyInfo | undefined;
  paymentInfo: PaymentInfo | undefined;
  setStep: (step: InvoiceFormStep) => void;
  next: () => void;
  previous: () => void;
  setPartyInfo: (data: PartyInfo) => void;
  setPaymentInfo: (data: PaymentInfo) => void;
}

const useInvoiceFormStore = create<InvoiceFormState>((set, get) => ({
  step: InvoiceFormStep.PartyInfo,
  partyInfo: undefined,
  paymentInfo: undefined,
  setStep: (step) => set({ step }),
  next: () => {
    const currentStep = get().step;
    set({ step: currentStep + 1 });
  },
  previous: () => {
    const currentStep = get().step;
    set({ step: currentStep - 1 });
  },
  setPartyInfo: (partyInfo) => set({ partyInfo }),
  setPaymentInfo: (paymentInfo) => set({ paymentInfo }),
}));

export const useInvoiceForm = () => {
  const store = useInvoiceFormStore();
  return { ...store };
};
