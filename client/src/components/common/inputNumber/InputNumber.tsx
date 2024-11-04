import { Input } from '@/components/ui/input';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  { errorMessage, className, classNameError, onChange, value = '', ...rest },
  ref
) {
  const [localValue, setLocalValue] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(event);
      setLocalValue(value);
    }
  };
  return (
    <div className={className}>
      <Input
        value={value || localValue}
        onChange={handleChange}
        {...rest}
        ref={ref}
        className='focus-visible:ring-0 focus-visible:ring-offset-0'
      />
    </div>
  );
});

export default InputNumber;
