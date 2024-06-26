import React from 'react';

import { create } from 'zustand';

export enum InvoiceFormStep {
  InvoiceInformation = 0,
}

interface InvoiceFormState {
  step: InvoiceFormStep;
  setStep: (step: InvoiceFormStep) => void;
  next: () => void;
  previous: () => void;
}

const useInvoiceFormStore = create<InvoiceFormState>((set, get) => ({
  step: InvoiceFormStep.InvoiceInformation,
  setStep: (step) => set({ step }),
  next: () => {
    const currentStep = get().step;
    set({ step: currentStep + 1 });
  },
  previous: () => {
    const currentStep = get().step;
    set({ step: currentStep - 1 });
  },
}));

export const useInvoiceForm = () => {
  const store = useInvoiceFormStore();
  return { ...store };
};
