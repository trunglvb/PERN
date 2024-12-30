import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Camera } from 'lucide-react';
import DivButton from '../divButton';
import { X } from 'lucide-react';

const maxSizeUpload = 1048576;

interface IInputFileProps {
  imageUrl?: string;
  onChange?: (file?: File) => void;
}

const InputFile = (props: IInputFileProps) => {
  const { onChange, imageUrl } = props;
  const [previewImage, setPreViewImage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageUrl) {
      setPreViewImage(imageUrl);
    }
  }, [imageUrl]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUpload = event.target.files?.[0];
    if (!fileUpload || fileUpload.size >= maxSizeUpload || !fileUpload.type.includes('image')) {
      toast.error('File không hợp lệ');
    }
    const image = fileUpload ? URL.createObjectURL(fileUpload) : '';
    setPreViewImage(image);
    onChange && onChange(fileUpload);
  };

  const handleUploadImage = () => {
    inputRef?.current?.click();
  };

  const handleRemoveImage = () => {
    setPreViewImage('');
  };

  return (
    <>
      <input
        ref={inputRef}
        type='file'
        className='hidden'
        accept='.jpg, .jpeg, .png'
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          //fix loi chon cung 1 anh
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event.target as any).value = null;
        }}
        onChange={onFileChange}
      />
      {previewImage ? (
        <div className='mx-auto'>
          <div className='relative'>
            <img src={previewImage} alt='preview' className='h-28 w-28 rounded-full object-cover' />
            <DivButton className='absolute right-1 top-0 translate-y-1 transform' onClick={handleRemoveImage}>
              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm'>
                <X className='h-4 w-4 text-red-500' />
              </div>
            </DivButton>
          </div>
        </div>
      ) : (
        <DivButton className='mx-auto h-28 w-28' onClick={handleUploadImage}>
          <div className='flex h-full w-full flex-col items-center justify-center gap-2 rounded-full border-2 border-dashed border-gray-300'>
            <Camera className='h-6 w-6 text-gray-400' />
            <span className='text-sm text-gray-400'>Tải ảnh</span>
          </div>
        </DivButton>
      )}
    </>
  );
};

export default InputFile;
