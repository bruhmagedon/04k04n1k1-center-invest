import { FormField, FormControl, FormItem, FormMessage } from '@/shared/ui/form';
import { Checkbox } from '@/shared/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { NpaDocument } from './useNpaData';

interface NpaListProps {
  items: NpaDocument[];
  form: UseFormReturn<any>;
  maxSelection: number;
}

export const NpaList = ({ items, form, maxSelection }: NpaListProps) => {
  const selectedItems = form.watch('items') || [];
  const isMaxSelected = selectedItems.length >= maxSelection;

  if (items.length === 0) {
    return <div className='text-center py-10 text-gray-500'>Нормативно-правовые акты не найдены</div>;
  }

  return (
    <div className='space-y-2 max-h-[50vh] overflow-y-auto pr-2'>
      <FormField
        control={form.control}
        name='items'
        render={() => (
          <div className='space-y-3'>
            {items.map((item) => (
              <FormItem
                key={item.id}
                className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'
              >
                <FormControl>
                  <Checkbox
                    checked={selectedItems.includes(item.id.toString())}
                    onCheckedChange={(checked) => {
                      const currentItems = [...selectedItems];
                      if (checked && !isMaxSelected) {
                        form.setValue('items', [...currentItems, item.id.toString()]);
                      } else if (checked && isMaxSelected) {
                        return false;
                      } else {
                        form.setValue(
                          'items',
                          currentItems.filter((value) => value !== item.id.toString())
                        );
                      }
                    }}
                    disabled={!selectedItems.includes(item.id.toString()) && isMaxSelected}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <p className='font-medium'>{item.name}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {item.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className='text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full'
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.source && <p className='text-sm text-gray-500 mt-1'>Источник: {item.source}</p>}
                </div>
              </FormItem>
            ))}
            <FormMessage />
          </div>
        )}
      />
    </div>
  );
};
