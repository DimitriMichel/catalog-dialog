import { CategoryItem } from '../../types/types.ts';
import ItemCard from './ItemCard';

type Props = {
  items: CategoryItem[];
  selected: string | null;
  onSelect: (id: string) => void;
  onDouble: (id: string) => void;
  columns: 1 | 2;
};

const ItemGrid = ({ items, selected, onSelect, onDouble, columns }: Props) => (
  <div
    className={`grid gap-3 py-1 pl-1 pr-3 ${
      columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
    } overflow-y-auto max-h-[26rem]`}
    data-testid='item-grid'
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

export default ItemGrid;
