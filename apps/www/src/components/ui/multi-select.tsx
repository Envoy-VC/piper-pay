'use client';

import React, {
  type KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from 'react';

import { cn } from '~/lib/utils';

import { Command as CommandPrimitive } from 'cmdk';

import { Badge } from '~/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '~/components/ui/command';

import { Check, X as RemoveIcon } from 'lucide-react';

type MultiSelectorProps = {
  values: string[];
  onValuesChange: (value: string[]) => void;
  loop?: boolean;
} & React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface MultiSelectContextProps {
  value: string[];
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error('useMultiSelect must be used within MultiSelectProvider');
  }
  return context;
};

const MultiSelector = ({
  values: value,
  onValuesChange: onValueChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}: MultiSelectorProps) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const onValueChangeHandler = useCallback(
    (val: string) => {
      if (value.includes(val)) {
        onValueChange(value.filter((item) => item !== val));
      } else {
        onValueChange([...value, val]);
      }
    },
    [onValueChange, value]
  );

  // TODO : change from else if use to switch case statement

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(
          // eslint-disable-next-line no-nested-ternary -- required for loop
          nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex
        );
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
      };

      if ((e.key === 'Backspace' || e.key === 'Delete') && value.length > 0) {
        if (inputValue.length === 0) {
          if (activeIndex !== -1 && activeIndex < value.length) {
            onValueChange(value.filter((item) => item !== value[activeIndex]));
            const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
            setActiveIndex(newIndex);
          } else {
            onValueChange(
              value.filter((item) => item !== value[value.length - 1])
            );
          }
        }
      } else if (e.key === 'Enter') {
        setOpen(true);
      } else if (e.key === 'Escape') {
        if (activeIndex !== -1) {
          setActiveIndex(-1);
        } else {
          setOpen(false);
        }
      } else if (dir === 'rtl') {
        if (e.key === 'ArrowRight') {
          movePrev();
        } else if (e.key === 'ArrowLeft' && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      } else if (e.key === 'ArrowLeft') {
        movePrev();
      } else if (e.key === 'ArrowRight' && (activeIndex !== -1 || loop)) {
        moveNext();
      }
    },
    [value, dir, activeIndex, loop, inputValue.length, onValueChange]
  );

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        dir={dir}
        className={cn(
          'flex flex-col space-y-2 overflow-visible bg-transparent',
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value, onValueChange, activeIndex } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1 py-[6px]',
        className
      )}
      {...props}
    >
      {value.map((item, index) => (
        <Badge
          key={item}
          variant='secondary'
          className={cn(
            'flex items-center gap-1 rounded-sm px-1',
            activeIndex === index && 'ring-2 ring-muted-foreground'
          )}
        >
          <span className='text-sm font-medium'>{item}</span>
          <button
            aria-label={`Remove ${item} option`}
            aria-roledescription='button to remove option'
            type='button'
            onClick={() => onValueChange(item)}
            onMouseDown={mousePreventDefault}
          >
            <span className='sr-only'>Remove {item} option</span>
            <RemoveIcon className='h-4 w-4 hover:stroke-destructive' />
          </button>
        </Badge>
      ))}
      {children}
    </div>
  );
});

MultiSelectorTrigger.displayName = 'MultiSelectorTrigger';

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } =
    useMultiSelect();
  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref}
      value={inputValue}
      className={cn(
        'ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
        className,
        activeIndex !== -1 && 'caret-transparent'
      )}
      onBlur={() => setOpen(false)}
      onClick={() => setActiveIndex(-1)}
      onFocus={() => setOpen(true)}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
    />
  );
});

MultiSelectorInput.displayName = 'MultiSelectorInput';

const MultiSelectorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect();
  return (
    <div ref={ref} className='relative'>
      {open ? children : null}
    </div>
  );
});

MultiSelectorContent.displayName = 'MultiSelectorContent';

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={cn(
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg absolute top-0 z-10 flex w-full flex-col gap-2 rounded-md border border-muted bg-background p-2 shadow-md transition-colors',
        className
      )}
    >
      {children}
      <CommandEmpty>
        <span className='text-muted-foreground'>No results found</span>
      </CommandEmpty>
    </CommandList>
  );
});

MultiSelectorList.displayName = 'MultiSelectorList';

const MultiSelectorItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  { value: string } & React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Item
  >
>(({ className, value, children, ...props }, ref) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isIncluded = Options.includes(value);
  return (
    <CommandItem
      ref={ref}
      {...props}
      className={cn(
        'flex cursor-pointer justify-between rounded-md px-2 py-1 transition-colors',
        className,
        isIncluded && 'cursor-default opacity-50',
        props.disabled && 'cursor-not-allowed opacity-50'
      )}
      onMouseDown={mousePreventDefault}
      onSelect={() => {
        onValueChange(value);
        setInputValue('');
      }}
    >
      {children}
      {isIncluded ? <Check className='h-4 w-4' /> : null}
    </CommandItem>
  );
});

MultiSelectorItem.displayName = 'MultiSelectorItem';

export {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
};
