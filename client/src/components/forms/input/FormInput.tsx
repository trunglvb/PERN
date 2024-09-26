import { InputHTMLAttributes } from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import PasswordInput from '@/components/passwordInput/PasswordInput';

interface IFormInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  formControl: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
}

const FormInput = <T extends FieldValues>({ formControl, name, placeholder, type, ...rest }: IFormInputProps<T>) => {
  return (
    <FormField
      control={formControl.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {type === 'password' ? (
              <PasswordInput
                {...rest}
                {...field}
                placeholder={placeholder as string}
                className='focus-visible:ring-0 focus-visible:ring-offset-0 '
              />
            ) : (
              <Input
                {...rest}
                {...field}
                placeholder={placeholder as string}
                className='focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
