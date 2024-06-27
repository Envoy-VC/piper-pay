import { createTw } from 'react-pdf-tailwind';

import { Path, Rect, Svg, Text, View } from '@react-pdf/renderer';

export const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)'],
    },
    extend: {
      colors: {
        headings: '#869098',
      },
    },
  },
});
export const Logo = () => {
  return (
    <Svg
      enable-background='new 0 0 512 512'
      height='64'
      viewBox='0 0 512 512'
      width='64'
    >
      <Path
        d='m58.852 423.328-32.851 61.799.821-336.709c0-67.651 54.613-122.366 122.365-122.366h335.889c-95.469 29.668-194.943 96.702-260.643 173.078-72.474 83.559-113.639 141.047-165.581 224.198'
        fill='#047863'
      />
      <Path
        d='m485.896 26.052s-146.591 68.574-191.35 171.538c-23.815 55.023-29.666 121.235-72.886 162.812-29.667 28.537-71.653 39.215-108.095 57.795-23.816 12.318-68.164 41.576-87.155 67.752h337.12c67.753 0 122.468-54.717 122.468-122.366-.102-.001-.102-337.531-.102-337.531z'
        fill='#06a261'
      />
    </Svg>
  );
};

interface AddressProps {
  type: 'from' | 'to';
  name?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  email?: string;
}

export const Address = (props: AddressProps) => {
  return (
    <View style={tw('flex w-full  basis-1/2 flex-col')}>
      <Text style={tw('text-lg font-semibold text-headings')}>
        Bill {props.type}
      </Text>
      <Text style={tw('text-lg font-bold text-neutral-700 pb-1')}>
        {props.name ?? ''}
      </Text>
      <Text
        style={tw('text-lg font-medium text-neutral-700 leading-[1.2] pb-1')}
      >
        {props.email ? `(${props.email})` : ''}
      </Text>
      <Text style={tw('text-lg font-medium text-neutral-700 leading-[1.2]')}>
        {props.streetAddress}
      </Text>
      <Text style={tw('text-lg font-medium text-neutral-700 leading-[1.2]')}>
        {props.city}
      </Text>
      <Text style={tw('text-lg font-medium text-neutral-700 leading-[1.2]')}>
        {`${props.state ?? ''} ${props.country ? `, ${props.country}` : ''}`}
      </Text>
    </View>
  );
};

export const CalenderLogo = () => {
  return (
    <Svg
      fill='none'
      height='24'
      stroke='currentColor'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='24'
    >
      <Path d='M8 2v4' fill='#64707B' stroke='#64707B' strokeWidth={1.5} />
      <Path d='M16 2v4' fill='#64707B' stroke='#64707B' strokeWidth={1.5} />
      <Rect
        height='18'
        rx='2'
        stroke='#64707B'
        strokeWidth={1.5}
        width='18'
        x='3'
        y='4'
      />
      <Path d='M3 10h18' fill='#64707B' stroke='#64707B' strokeWidth={1.5} />
    </Svg>
  );
};

interface DateBoxProps {
  title: string;
  date: string;
}

export const DateBox = ({ title, date }: DateBoxProps) => {
  const jsDate = new Date(date);
  const formattedDate = jsDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={tw('flex flex-col')}>
      <Text style={tw('text-sm font-semibold text-headings py-1')}>
        {title}
      </Text>
      <View
        style={tw(
          'border border-neutral-300 rounded-md flex flex-row items-center gap-3 w-[12rem] py-1 px-2'
        )}
      >
        <CalenderLogo />
        <Text style={tw('text-base font-medium text-neutral-700')}>
          {formattedDate}
        </Text>
      </View>
    </View>
  );
};

interface NoteProps {
  text?: string;
}

export const Note = ({ text }: NoteProps) => {
  return (
    <View style={tw('flex flex-col w-full')}>
      <Text style={tw('text-sm font-semibold text-headings py-1')}>Note</Text>
      <View
        style={tw(
          'border border-neutral-300 rounded-md flex flex-row items-center gap-3 py-1 px-2'
        )}
      >
        <Text style={tw('text-base font-medium text-neutral-700')}>{text}</Text>
      </View>
    </View>
  );
};
