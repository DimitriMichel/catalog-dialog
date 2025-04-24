import { ChangeEvent } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

type Props = { term: string; onChange: (v: string) => void };

const SearchInput = ({ term, onChange }: Props) => (
  <div className='relative'>
    <input
      value={term}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder='Search'
      className='flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 pr-10 shadow-sm transition-colors
       placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1'
    />
    <MagnifyingGlass
      weight='bold'
      className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400'
    />
  </div>
);

export default SearchInput;
