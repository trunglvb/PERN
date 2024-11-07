import { InputHTMLAttributes } from 'react';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import InputNumber from './InputNumber';

interface IFormInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  formControl: UseFormReturn<T>;
  name: Path<T>;
  classNameInput?: string;
}

const FormInputNumber = <T extends FieldValues>({
  formControl,
  name,
  placeholder,
  type,
  classNameInput,
  maxLength,
  onChange,
  ...rest
}: IFormInputProps<T>) => {
  return (
    <FormField
      control={formControl.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputNumber
              type='text'
              placeholder={placeholder}
              maxLength={maxLength}
              {...field}
              {...rest}
              onChange={(event) => {
                onChange && onChange(event);
                field.onChange(event);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormInputNumber;
