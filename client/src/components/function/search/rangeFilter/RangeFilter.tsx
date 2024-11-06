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
import { FieldValues, useForm, UseFormReturn, Path, PathValue } from 'react-hook-form';
import { IPriceSchemaType, priceSchema } from '@/schemas/function.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Slider } from '@/components/ui/slider';
import { prices } from '@/constants/function/prices';
import { ScrollArea } from '@/components/ui/scroll-area';

// const defaultPrice = {
//   price_min: 0,
//   price_max: 10000,
//   step: 1
// } as const;

const default_all_value = 'ALL';

interface IRangleFilterProps<T extends FieldValues> {
  label: string;
  options: {
    id: number;
    label: string;
    value: string;
  }[];
  form: UseFormReturn<T>;
  schema_min: Path<T>;
  schema_max: Path<T>;
  schema_range: Path<T>;
  defaultRange: {
    min: number;
    max: number;
    step: number;
  };
}

const RangeFilter = <T extends FieldValues>(props: IRangleFilterProps<T>) => {
  type IPathValue = PathValue<T, typeof schema_range>;
  const { label, options, form, schema_min, schema_max, schema_range, defaultRange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<string>(default_all_value);
  const { handleSubmit, setValue, watch, reset } = form;
  const currentValue = watch();

  const handleRadioChange = (value: string) => {
    setSelectedRange(value);
    const isSelectAll = value === default_all_value;
    if (isSelectAll) {
      setValue(schema_range, [defaultRange.min, defaultRange.max] as IPathValue);
      setValue(schema_min, defaultRange.min.toString() as IPathValue);
      setValue(schema_max, defaultRange.max.toString() as IPathValue);
    } else {
      const parseValue = JSON.parse(value);
      console.log(parseValue[0], parseValue[1]);
      setValue(schema_range, [Number(parseValue[0]), Number(parseValue[1])] as IPathValue);
      setValue(schema_min, parseValue[0].toString() as IPathValue);
      setValue(schema_max, parseValue[1].toString() as IPathValue);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='rounded-sm border px-4 py-[6px] text-sm text-white'>
        {!!selectedRange && selectedRange !== default_all_value
          ? options.find((i) => i.value === selectedRange)?.value
          : label}
      </PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] rounded-md bg-white p-0 shadow-lg'>
        <div className='mt-1'>
          <div className='p-4'>
            <div className='relative mb-2 flex items-center justify-center '>
              <span className='text-base font-semibold'>{label}</span>
              <button className='absolute right-0' onClick={() => setIsOpen(false)}>
                <X size={14} />
              </button>
            </div>
            <Separator />
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <div className='grid gap-4 px-4'>
                  <div className='flex items-center gap-4'>
                    <div className='grid flex-1 gap-2'>
                      <Label htmlFor='from' className='text-sm font-semibold'>
                        {`${label} thấp nhất`}
                      </Label>
                      <FormField
                        control={form.control}
                        name={schema_min}
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
                                  const min = event.target.value;
                                  field.onChange(event);
                                  setValue(schema_range, [Number(min), currentValue[schema_range][1]] as IPathValue);
                                  setSelectedRange('');
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
                        {`${label} cao nhất`}
                      </Label>
                      <FormField
                        control={form.control}
                        name={schema_max}
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
                                  const max = event.target.value;
                                  field.onChange(event);
                                  setValue(schema_range, [currentValue[schema_range][0], Number(max)] as IPathValue);
                                  setSelectedRange('');
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
                <div className='my-6 px-4'>
                  <FormField
                    control={form.control}
                    name={schema_range}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Slider
                            min={defaultRange.min}
                            max={defaultRange.max}
                            step={300}
                            value={field.value}
                            onValueChange={(value) => {
                              setValue(schema_range, value as IPathValue);
                              setValue(schema_min, value?.[0].toString() as IPathValue);
                              setValue(schema_max, value?.[1].toString() as IPathValue);
                              setSelectedRange('');
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
                    className='space-y-1'
                  >
                    {prices.map((i) => (
                      <div className='flex items-center justify-between px-4' key={i.id}>
                        <Label htmlFor={i.id.toString()} className='flex-1 cursor-pointer'>
                          {i.label}
                        </Label>
                        <RadioGroupItem value={i.value} id={i.id.toString()} className='flex-shrink-0' />
                      </div>
                    ))}
                  </RadioGroup>
                </ScrollArea>

                <Separator className='mt-2' />
                <div className=' flex justify-between px-4 py-2'>
                  <Button
                    variant='outline'
                    size={'sm'}
                    onClick={() => {
                      reset();
                      setSelectedRange(prices[0].value);
                    }}
                  >
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
