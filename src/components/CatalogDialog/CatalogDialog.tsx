import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FlowArrow } from '@phosphor-icons/react';
import { CatalogConfig, CategoryItem } from '../../types/types';
import CategoryTabs from './CategoryTabs';
import ItemGrid from './ItemGrid';
import SearchInput from './SearchInput';
import Button from '../UI/Button';
import { useFuse } from './useFuse';
import { catalogPayload } from '@data/catalog-payload.ts';

type Props = { config: CatalogConfig; onClose: () => void };

const CatalogDialog = ({ config, onClose }: Props) => {
  const {
    title,
    categories,
    items,
    tags,
    prompt,
    actions,
    columns = 2,
  } = config;

  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const tagLookup = useMemo(
    () => Object.fromEntries(tags.map((t) => [t.id, t])),
    [tags]
  );

  const searchableItems: (CategoryItem & { searchableTags: string })[] =
    useMemo(
      () =>
        items.map((it) => ({
          ...it,
          searchableTags: it.tags
            .map((tagId) => {
              const tag = tagLookup[tagId];
              return [tagId, tag.primary, ...tag.aliases].join(' ');
            })
            .join(' '),
        })),
      [items, tagLookup]
    );

  const { search } = useFuse(searchableItems, [
    'name',
    'description',
    'searchableTags',
  ]);

  const filteredItems = useMemo(() => {
    let results = searchTerm.trim() ? search(searchTerm) : searchableItems;
    if (searchTerm.trim().startsWith('tag-')) {
      const exactTagMatches = searchableItems.filter((it) =>
        it.tags.some(
          (tag) => tag.toLowerCase() === searchTerm.trim().toLowerCase()
        )
      );
      const ids = new Set(results.map((r) => r.id));
      exactTagMatches.forEach((it) => !ids.has(it.id) && results.push(it));
    }
    if (activeCategoryId !== 'all') {
      results = results.filter((it) => it.category === activeCategoryId);
    }
    return results;
  }, [search, searchTerm, activeCategoryId, searchableItems]);

  const triggerClose = () => onClose();
  const confirmAndClose = (itemId: string | null) => {
    actions.callback(itemId);
    onClose();
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && triggerClose();
    window.addEventListener('keydown', esc);
    cancelButtonRef.current?.focus();
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
      onClick={triggerClose}
    >
      <div
        className={`mx-4 w-full ${
          columns === 1 ? 'max-w-xl' : 'max-w-3xl'
        } rounded-xl border border-gray-400 bg-white p-8 shadow`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-4 flex flex-row items-center justify-between'>
          <header>
            <div className='flex flex-row items-center'>
              <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-midnight'>
                <FlowArrow size={24} className='text-white' />
              </div>
              <h1 className='text-2xl font-bold'>{title}</h1>
            </div>
            {prompt && <p className='mt-1 text-sm text-gray-700'>{prompt}</p>}
          </header>
          <div className='flex justify-end'>
            <div className={`${columns === 1 ? 'w-56' : 'w-72'} `}>
              <SearchInput term={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>
        </div>

        <hr className='mb-6 border-gray-200' />

        <div
          className={
            columns === 2
              ? 'grid min-h-[21.8rem] grid-cols-[170px_1fr] gap-3'
              : 'grid min-h-[21.8rem] grid-cols-[170px_1fr] gap-2'
          }
        >
          <CategoryTabs
            categories={[...categories].sort((a, b) =>
              a.name.localeCompare(b.name)
            )}
            active={activeCategoryId}
            onSelect={setActiveCategoryId}
            items={catalogPayload.items}
          />
          <div className='flex flex-col gap-4'>
            <ItemGrid
              items={filteredItems}
              selected={selectedItemId}
              onSelect={setSelectedItemId}
              onDouble={confirmAndClose}
              columns={columns}
            />
          </div>
        </div>

        <hr className='mt-8 mb-6 border-gray-200' />

        <footer className='flex justify-between items-center'>
          <span className='text-xs text-gray-400'>
            Select an action for your workflow
          </span>
          <div className='flex gap-4'>
            <Button
              type='button'
              onClick={() => confirmAndClose(selectedItemId)}
              disabled={!selectedItemId}
              className='rounded-md bg-midnight px-5 py-1.5 text-sm font-medium text-white disabled:opacity-50'
            >
              {actions.add}
            </Button>
            <button
              ref={cancelButtonRef}
              type='button'
              onClick={() => confirmAndClose(null)}
              className='text-sm font-medium text-gray-700 hover:underline'
            >
              {actions.cancel}
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.getElementById('app-modal')!
  );
};

export default CatalogDialog;
