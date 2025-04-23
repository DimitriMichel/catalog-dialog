import { Category } from '../../types/types';

type Props = {
  categories: Category[];
  active: string;
  onSelect: (id: string) => void;
};

const CategoryTabs = ({ categories, active, onSelect }: Props) => (
  <ul className='space-y-1 overflow-y-auto pr-2'>
    {['all', ...categories.map((c) => c.id)].map((id) => {
      const cat = categories.find((c) => c.id === id);
      const disabled = id !== 'all' && !cat;
      return (
        <li key={id}>
          <button
            type='button'
            disabled={disabled}
            onClick={() => onSelect(id)}
            className={`w-full rounded-md px-3 py-1 text-left text-sm ${
              id === active
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 disabled:text-gray-400'
            }`}
          >
            {id === 'all' ? 'All' : cat?.name}
          </button>
        </li>
      );
    })}
  </ul>
);

export default CategoryTabs;
