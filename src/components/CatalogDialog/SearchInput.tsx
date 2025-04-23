import { ChangeEvent } from 'react';

type Props = { term: string; onChange: (v: string) => void };

const SearchInput = ({ term, onChange }: Props) => (
  <input
    value={term}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    placeholder='Search'
    className='w-full rounded-md border px-3 py-1 text-sm focus:outline-none'
  />
);

export default SearchInput;
