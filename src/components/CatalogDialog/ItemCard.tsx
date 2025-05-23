import { CategoryItem } from '../../types/types.ts';

type Props = {
  item: CategoryItem;
  selected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  columns: 1 | 2;
};

const iconSize = { 1: 60, 2: 80 };
const descSize = { 1: 230, 2: 150 };

const ItemCard = ({
  item,
  selected,
  onClick,
  onDoubleClick,
  columns,
}: Props) => (
  <button
    type='button'
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    className={`flex items-start gap-3 rounded-md border border-gray-200 p-2 bg-card shadow hover:bg-gray-100 ${
      selected ? 'outline-1 outline-gray-400' : ''
    }`}
    aria-selected={selected}
    data-testid={`item-card-${item.id}`}
  >
    <div
      className='flex shrink-0 items-center justify-center rounded bg-gray-200'
      style={{ width: iconSize[columns], height: iconSize[columns] }}
    >
      {item.icon ? (
        <img src={item.icon} alt='' className='h-3/4 w-3/4 object-contain' />
      ) : (
        <span className='text-xs text-gray-500'>Icon</span>
      )}
    </div>

    <div style={{ width: descSize[columns], textAlign: 'left' }}>
      <p className='font-semibold'>{item.name}</p>
      <p className='text-xs text-gray-600'>{item.description}</p>
    </div>
  </button>
);

export default ItemCard;
