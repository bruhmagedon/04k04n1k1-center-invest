import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Checkbox } from '@/shared/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { NpaItem } from '@/widgets/NpaModal/types';
import { FileQuestion } from 'lucide-react';

interface NpaListProps {
  items: NpaItem[];
  form: UseFormReturn<{ items: string[] }>;
  maxSelection: number;
}

export const NpaList = ({ items, form, maxSelection }: NpaListProps) => (
  <FormField
    control={form.control}
    name='items'
    render={() => (
      <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
        {items.length > 0 ? (
          items.map((item) => (
            <NpaListItem key={item.id} item={item} form={form} maxSelection={maxSelection} />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center py-10 text-center text-muted-foreground  rounded-lg'>
            <FileQuestion size={48} className='mb-3 opacity-50' />
            <p className='text-lg font-medium'>Нет подходящих НПА</p>
            <p className='text-sm mt-1'>Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    )}
  />
);

interface NpaListItemProps {
  item: NpaItem;
  form: UseFormReturn<{ items: string[] }>;
  maxSelection: number;
}

const NpaListItem = ({ item, form, maxSelection }: NpaListItemProps) => {
  const selectedItems = form.watch('items') || [];
  const isDisabled = selectedItems.length >= maxSelection && !selectedItems.includes(item.id);

  return (
    <FormItem className='flex items-center space-x-2'>
      <FormControl>
        <Checkbox
          disabled={isDisabled}
          checked={selectedItems.includes(item.id)}
          onCheckedChange={(checked) => {
            const newValue = checked
              ? [...selectedItems, item.id]
              : selectedItems.filter((id) => id !== item.id);

            if (newValue.length <= maxSelection) {
              form.setValue('items', newValue);
            }
          }}
        />
      </FormControl>
      <FormLabel
        className={`text-sm font-normal ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {item.label}
      </FormLabel>
    </FormItem>
  );
};
