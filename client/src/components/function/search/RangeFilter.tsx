import { Popover } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Label } from '@/components/ui/label';
// import { Slider } from '@/components/ui/slider';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import InputNumber from '@/components/common/inputNumber';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import * as Slider from '@radix-ui/react-slider';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { IPriceSchemaType, priceSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const RangeFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState('all');

  const form = useForm<IPriceSchemaType>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price_min: '',
      price_max: ''
    }
  });
  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='rounded-sm border px-4 py-2 text-sm text-white'>Muc Gia</PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] rounded-md bg-white p-0'>
        <div className='mt-1 p-4'>
          <div className='relative mb-2 flex items-center justify-center'>
            <span className='text-base font-semibold'>Mức giá</span>
            <button className='absolute right-0' onClick={() => setIsOpen(false)}>
              <X size={14} />
            </button>
          </div>
          <Separator />

          <div className='mt-4'>
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <div className='grid gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='grid flex-1 gap-2'>
                      <Label htmlFor='from' className='text-sm font-semibold'>
                        Giá thấp nhất
                      </Label>
                      <FormField
                        control={form.control}
                        name='price_min'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputNumber
                                id='from'
                                type='text'
                                placeholder='Từ'
                                {...field}
                                onChange={(event) => {
                                  field.onChange(event);
                                  // trigger('price_max');
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='mt-8'>
                      <ArrowRight size={14} />
                    </div>
                    <div className='grid flex-1 gap-2'>
                      <Label htmlFor='to' className='font-semibold'>
                        Giá cao nhất
                      </Label>
                      <FormField
                        control={form.control}
                        name='price_max'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputNumber
                                id='from'
                                type='text'
                                placeholder='Đến'
                                {...field}
                                onChange={(event) => {
                                  field.onChange(event);
                                  // trigger('price_max');
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <Slider.Root defaultValue={[25, 75]}>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                  <Slider.Thumb />
                </Slider.Root>
                <RadioGroup value={selectedRange} onValueChange={setSelectedRange} className='mt-4'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='all' id='all' />
                    <Label htmlFor='all'>Tất cả mức giá</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='under500' id='under500' />
                    <Label htmlFor='under500'>Dưới 500 triệu</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='500to800' id='500to800' />
                    <Label htmlFor='500to800'>500 - 800 triệu</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='800to1000' id='800to1000' />
                    <Label htmlFor='800to1000'>800 triệu - 1 tỷ</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='1to2' id='1to2' />
                    <Label htmlFor='1to2'>1 - 2 tỷ</Label>
                  </div>
                </RadioGroup>
                <Separator className='my-4' />
                <div className=' flex justify-between'>
                  <Button variant='outline' size={'sm'}>
                    Đặt lại
                  </Button>
                  <Button size={'sm'} type='submit'>
                    Áp dụng
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RangeFilter;
