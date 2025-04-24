import { Category } from '../../types/types';
import { FlowArrow } from '@phosphor-icons/react';

type Props = {
  categories: Category[];
  active: string;
  onSelect: (id: string) => void;
  items: Array<{ category: string; id: string; name: string }>;
};

const CategoryTabs = ({ categories, active, onSelect, items }: Props) => {
  const hasItems = (categoryId: string) => {
    if (!items || items.length === 0) {
      return categoryId === 'all';
    }

    return items.some((item) => item.category === categoryId);
  };

  return (
    <ul className='space-y-1 overflow-y-auto pr-4 border-r border-gray-200'>
      {['all', ...categories.map((category) => category.id)].map((id) => {
        const cat = categories.find((category) => category.id === id);
        const isEmpty = id !== 'all' && !hasItems(id);
        const disabled = (id !== 'all' && !cat) || isEmpty;

        return (
          <li key={id} className='mb-1.5'>
            <button
              type='button'
              disabled={disabled}
              onClick={() => onSelect(id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm flex items-center ${
                id === active
                  ? 'bg-midnight text-white shadow'
                  : disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100'
              }`}
            >
              <div className='w-6 flex justify-center mr-2'>
                {id === 'all' ? (
                  <FlowArrow
                    size={16}
                    className={
                      id === active
                        ? 'text-white'
                        : disabled
                          ? 'text-gray-300'
                          : ''
                    }
                  />
                ) : cat?.icon ? (
                  <img
                    src={cat.icon}
                    alt=''
                    className={`w-4 h-4 ${
                      id === active
                        ? 'brightness-0 invert'
                        : disabled
                          ? 'opacity-50'
                          : ''
                    }`}
                  />
                ) : (
                  <FlowArrow
                    size={16}
                    className={
                      id === active
                        ? 'text-white'
                        : disabled
                          ? 'text-gray-300'
                          : ''
                    }
                  />
                )}
              </div>
              <span>{id === 'all' ? 'All' : cat?.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryTabs;
