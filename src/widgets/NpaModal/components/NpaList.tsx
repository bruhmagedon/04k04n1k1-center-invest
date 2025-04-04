import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Checkbox } from '@/shared/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { NpaItem } from '@/widgets/NpaModal/types';

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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {items.map((item) => (
          <NpaListItem key={item.id} item={item} form={form} maxSelection={maxSelection} />
        ))}
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
