import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { ArrowRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FieldValues, UseFormReturn, Path, PathValue } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { prices } from '@/constants/function/prices';
import { ScrollArea } from '@/components/ui/scroll-area';
import FormInputNumber from '@/components/common/inputNumber/FormInputNumber';
import { motion } from 'framer-motion';

const default_all_value = 'ALL';

interface IOptionsProps {
  id: number;
  label: string;
  value: string;
}

interface IDefaultRangeProps {
  min: number;
  max: number;
  step: number;
}

interface IRangleFilterProps<T extends FieldValues> {
  label: string;
  options: IOptionsProps[];
  form: UseFormReturn<T>;
  schema_min: Path<T>;
  schema_max: Path<T>;
  schema_range: Path<T>;
  defaultRange: IDefaultRangeProps;
  onChange?: (value: T) => void;
  unit: 'price' | 'size';
  minValueLabel?: string;
  maxValueLabel?: string;
}

const RangeFilter = <T extends FieldValues>(props: IRangleFilterProps<T>) => {
  type IPathValue = PathValue<T, Path<T>>;
  const {
    label,
    options,
    form,
    schema_min,
    schema_max,
    schema_range,
    defaultRange,
    unit,
    onChange,
    minValueLabel,
    maxValueLabel
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<string>(default_all_value);
  const [labelText, setLabelText] = useState(label);
  const [isShowPrice, setIsShowPrice] = useState(false);

  const { handleSubmit, setValue, watch, reset } = form;
  const currentValue = watch();

  const handleRadioChange = (value: string) => {
    setSelectedRange(value);
    setIsShowPrice(true);
    const isSelectAll = value === default_all_value;
    if (isSelectAll) {
      setValue(schema_range, [defaultRange.min, defaultRange.max] as IPathValue);
      setValue(schema_min, defaultRange.min.toString() as IPathValue);
      setValue(schema_max, defaultRange.max.toString() as IPathValue);
    } else {
      const parseValue = JSON.parse(value);
      setValue(schema_range, [Number(parseValue[0]), Number(parseValue[1])] as IPathValue);
      setValue(schema_min, parseValue[0].toString() as IPathValue);
      setValue(schema_max, parseValue[1].toString() as IPathValue);
    }
    if (value === prices[prices.length - 1].value) {
      setValue(schema_max, '' as IPathValue);
    }
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const min = event?.target.value;
    setValue(schema_range, [Number(min), currentValue[schema_range][1]] as IPathValue);
    setSelectedRange('');
    setIsShowPrice(true);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let max = event?.target.value;
    setValue(schema_range, [currentValue[schema_range][0], Number(max)] as IPathValue);
    setSelectedRange('');
    setIsShowPrice(true);
  };

  const handleSliderChange = (value: number[]) => {
    setValue(schema_range, value as IPathValue);
    setValue(schema_min, value[0].toString() as IPathValue);
    setValue(schema_max, value[1].toString() as IPathValue);
    setSelectedRange('');
    setIsShowPrice(true);
  };

  const onSubmit = handleSubmit((data) => {
    let min = data[schema_min];
    let max = data[schema_max];
    if (Number(min) > Number(max)) {
      setValue(schema_min, max as IPathValue);
      setValue(schema_max, min as IPathValue);
    } else {
      setValue(schema_min, min as IPathValue);
      setValue(schema_max, max as IPathValue);
    }
    setIsOpen(false);
    onChange && onChange(data);
  });

  const convertRangeValue = (value: string) => {
    if (!value || Number(value) <= defaultRange.min) {
      return '';
    }
    switch (unit) {
      case 'price':
        if (Number(value) > 999) {
          if (Number(value) > 1000000) {
            return '1000 tỷ';
          }
          return `${Number(value) / 1000} tỷ`;
        } else {
          return `${value} triệu`;
        }
      case 'size':
        return `${value} m²`;
    }
  };

  const convertLabelText = (min: string, max: string) => {
    if (selectedRange == 'ALL' || (Number(min) === 0 && Number(max) === 0)) {
      setLabelText(label);
      return;
    }
    if (Number(min) === 0) {
      setLabelText(`Dưới ${convertRangeValue(max)}`);
    } else if (Number(min) >= defaultRange.max) {
      setLabelText(`Trên ${convertRangeValue(min)}`);
    } else {
      setLabelText(`${convertRangeValue(min)} - ${convertRangeValue(max)}`);
    }
  };

  useEffect(() => {
    convertLabelText(currentValue[schema_min], currentValue[schema_max]);
  }, [currentValue[schema_min], currentValue[schema_max]]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='rounded-sm border px-4 py-[6px] text-sm text-white'>
        <div className='relative flex items-center justify-center'>
          <div>{labelText}</div>
          <motion.span
            className='absolute right-0'
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </div>
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
                <div className='grid items-center gap-4 px-4'>
                  <div className='flex items-center gap-4'>
                    <div className='grid flex-1 gap-2'>
                      <div className='relative'>
                        {isShowPrice ? (
                          <div className='flex gap-1 text-sm'>
                            <span className='font-semibold'>Từ:</span>
                            <span className='font-semibold text-main'>
                              {convertRangeValue(currentValue[schema_min])}
                            </span>
                          </div>
                        ) : (
                          <Label htmlFor='from' className='text-sm font-semibold'>
                            {minValueLabel ?? ''}
                          </Label>
                        )}
                      </div>
                      <FormInputNumber
                        placeholder='Từ'
                        formControl={form}
                        name={schema_min}
                        onChange={(e) => handleMinChange(e)}
                        maxLength={7}
                        value={currentValue[schema_min]}
                      />
                    </div>
                    <div className='mt-8'>
                      <ArrowRight size={14} />
                    </div>
                    <div className='grid flex-1 gap-2'>
                      {isShowPrice ? (
                        <div className='flex gap-1 text-sm'>
                          <span className='font-semibold'>Đến:</span>
                          <span className='font-semibold text-main'>{convertRangeValue(currentValue[schema_max])}</span>
                        </div>
                      ) : (
                        <Label htmlFor='to' className='font-semibold'>
                          {maxValueLabel ?? ''}
                        </Label>
                      )}
                      <FormInputNumber
                        placeholder='Đến'
                        formControl={form}
                        name={schema_max}
                        onChange={(e) => handleMaxChange(e)}
                        maxLength={7}
                        value={currentValue[schema_max]}
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
                            step={defaultRange.step}
                            value={field.value}
                            onValueChange={handleSliderChange}
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
                    {options.map((i) => (
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

                <div className=' flex items-center justify-between px-4 py-2'>
                  <div
                    role='presentation'
                    className='cursor-pointer text-sm font-semibold'
                    onClick={() => {
                      reset();
                      setSelectedRange(options[0].value);
                      setLabelText(label);
                    }}
                  >
                    Đặt lại
                  </div>
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
