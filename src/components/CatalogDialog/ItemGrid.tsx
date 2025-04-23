import { CategoryItem } from '../../types/types.ts';
import ItemCard from './ItemCard';

type Props = {
  items: CategoryItem[];
  selected: string | null;
  onSelect: (id: string) => void;
  onDouble: (id: string) => void;
  columns: 1 | 2;
};

const visibleItems = { 1: 4, 2: 6 };
const itemHeight = 100;

const ItemGrid = ({ items, selected, onSelect, onDouble, columns }: Props) => {
  const visibleCount = visibleItems[columns];
  const rows = columns === 1 ? visibleCount : Math.ceil(visibleCount / 2);
  const maxHeight = rows * itemHeight;

  return (
    <div
      className={`grid gap-3 ${
        columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
      } overflow-y-auto`}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      {items.map((i) => (
        <ItemCard
          key={i.id}
          item={i}
          columns={columns}
          selected={i.id === selected}
          onClick={() => onSelect(i.id)}
          onDoubleClick={() => onDouble(i.id)}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
