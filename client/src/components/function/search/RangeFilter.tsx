import { Popover } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Label } from '@/components/ui/label';
// import { Slider } from '@/components/ui/slider';
import { ArrowRight, X } from 'lucide-react';
import React, { useState } from 'react';
import InputNumber from '@/components/common/inputNumber';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { IPriceSchemaType, priceSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Slider } from '@/components/ui/slider';
import { prices } from '@/constants/function/prices';
import { ScrollArea } from '@/components/ui/scroll-area';

const defaultPrice = {
  price_min: 0,
  price_max: 10000,
  step: 1
} as const;

const RangeFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<string>(prices[0].value);

  const form = useForm<IPriceSchemaType>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price_min: '',
      price_max: '',
      price: [defaultPrice.price_min, defaultPrice.price_max]
    }
  });
  const { handleSubmit, setValue, watch } = form;
  const currentValue = watch();

  const handleRadioChange = (value: string) => {
    setSelectedRange(value);
    const isSelectAll = value === 'ALL';
    if (isSelectAll) {
      setValue('price', [defaultPrice.price_min, defaultPrice.price_max]);
      setValue('price_min', defaultPrice.price_min.toString());
      setValue('price_max', defaultPrice.price_max.toString());
    } else {
      const parseValue = JSON.parse(value);
      console.log(parseValue[0], parseValue[1]);
      setValue('price', [Number(parseValue[0]), Number(parseValue[1])]);
      setValue('price_min', parseValue[0].toString());
      setValue('price_max', parseValue[1].toString());
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='rounded-sm border px-4 py-[6px] text-sm text-white'>Muc Gia</PopoverTrigger>
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
                                maxLength={6}
                                onChange={(event) => {
                                  const price_min = event.target.value;
                                  field.onChange(event);
                                  setValue('price', [Number(price_min), currentValue.price[1]]);
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
                                maxLength={8}
                                {...field}
                                onChange={(event) => {
                                  const price_max = event.target.value;
                                  field.onChange(event);
                                  setValue('price', [currentValue.price[1], Number(price_max)]);
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
                <div className='my-4'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Slider
                            min={defaultPrice.price_min}
                            max={defaultPrice.price_max}
                            step={300}
                            value={field.value}
                            onValueChange={(value) => {
                              setValue('price', value);
                              setValue('price_min', value?.[0].toString());
                              setValue('price_max', value?.[1].toString());
                            }}
                            isDirectionControl
                          ></Slider>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <ScrollArea className='h-32'>
                  <RadioGroup
                    value={selectedRange}
                    onValueChange={(value) => handleRadioChange(value)}
                    className='mt-4'
                  >
                    {prices.map((i) => (
                      <div className='flex items-center space-x-2' key={i.id}>
                        <RadioGroupItem value={i.value} id={i.id.toString()} />
                        <Label htmlFor={i.id.toString()}>{i.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </ScrollArea>

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

export default React.memo(RangeFilter);
