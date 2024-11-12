import SecondLevelSelect from '@/components/common/secondLevelSeclect/SecondLevelSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { postTypes } from '@/constants/function/filters';
import { IPostTypesSchemaType, postTypesSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const Type = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<IPostTypesSchemaType>({
    resolver: zodResolver(postTypesSchema),
    defaultValues: {
      categories: []
    }
  });

  const { handleSubmit, watch } = form;
  const currentValue = watch();
  const label =
    currentValue?.categories.length > 0 ? currentValue?.categories.map((i) => i.label).join(' ,') : 'Loại nhà đất';

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='rounded-sm border px-4 py-[6px] text-sm text-white'>
        <div className='relative flex items-center justify-center '>
          <div className='mr-4 line-clamp-1'>{label}</div>
          <motion.span
            className='absolute right-0'
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </div>
      </PopoverTrigger>
      <PopoverContent className='rounded-md bg-white p-0 shadow-lg'>
        <div className='mt-1'>
          <div className='py-4'>
            <div className='relative mb-2 flex items-center justify-center px-4'>
              <span className='line-clamp-1 text-base font-semibold'>Loại nhà đất</span>
              <button className='absolute right-4' onClick={() => setIsOpen(false)}>
                <X size={14} />
              </button>
            </div>
            <Separator />
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <FormField
                  control={form.control}
                  name={'categories'}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='mt-4 px-2'>
                          <ScrollArea className='h-64'>
                            <SecondLevelSelect
                              items={postTypes}
                              onChange={(value) => field.onChange(value)}
                              defaulValue={field.value}
                            />
                          </ScrollArea>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Type;
