import { Document, Page, Text, View } from '@react-pdf/renderer';

import { Address, DateBox, Logo, Note, tw } from './components.';

// The 'theme' object is your Tailwind theme config

export const InvoicePDF = () => {
  return (
    <div className='p-4'>
      <Document>
        <Page
          size='A4'
          style={tw('flex font-sans bg-white flex-col border p-12')}
        >
          <View style={tw('w-full flex')}>
            <View style={tw('basis-2/6 w-full')}>
              <Logo />
            </View>
            <View style={tw('basis-4/6 w-full flex flex-col gap-3')}>
              <View style={tw('flex flex-row items-center gap-2')}>
                <Text style={tw('text-2xl font-bold text-headings')}>
                  Invoice No:{' '}
                </Text>
                <Text style={tw('text-2xl font-bold text-neutral-700')}>
                  363-311-990
                </Text>
              </View>
              <View style={tw('flex flex-row items-center gap-2')}>
                <Address
                  city='San Francisco'
                  country='94102'
                  email='bigarchitects@gmail.com'
                  name='BIG Architects INC.'
                  state='CA'
                  streetAddress='1000 Market Street'
                  type='from'
                />
                <Address
                  city='San Francisco'
                  country='94102'
                  name='BIG Architects INC.'
                  state='CA'
                  streetAddress='1000 Market Street'
                  type='to'
                />
              </View>
            </View>
          </View>
          <View style={tw('flex flex-row items-center gap-8 pt-20')}>
            <DateBox date='2024-06-27T17:09:18.429Z' title='Issue Date' />
            <DateBox date='2024-06-27T17:09:18.429Z' title='Due Date' />
          </View>
          <View style={tw('flex flex-row items-center gap-8 pt-2')}>
            <View style={tw('basis-4/6 w-full')}>
              <Note text='Please make sure to pay the invoice before the due date to avoid any late fees.' />
            </View>
            <View style={tw('basis-2/6 w-full')}>
              <View style={tw('flex flex-col w-full')}>
                <Text style={tw('text-sm font-semibold text-headings py-1')}>
                  Total Due
                </Text>

                <Text style={tw('text-3xl font-bold text-neutral-700')}>
                  $1,200.00
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </div>
  );
};
