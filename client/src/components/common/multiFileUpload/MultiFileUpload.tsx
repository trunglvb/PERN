import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import DivButton from '../divButton';

const maxSizeUpload = 1048576; // 1MB

interface IMultiUploadProps {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  children?: React.ReactNode; //use for custom if dont want default ui
}

const MultiUpload: React.FC<IMultiUploadProps> = ({ onChange, maxFiles = 5, children }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size >= maxSizeUpload || !file.type.includes('image')) {
      toast.error(`File ${file.name} không đúng quy định`);
      return false;
    }
    return true;
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const validFiles = newFiles.filter(validateFile);

    if (selectedFiles.length + validFiles.length > maxFiles) {
      toast.error(`Chỉ có thể tải lên tối đa ${maxFiles} tệp`);
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    onChange && onChange([...selectedFiles, ...validFiles]);
  };

  const handleUploadImage = () => {
    fileInputRef?.current?.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onChange && onChange(updatedFiles);
  };

  return (
    <div>
      <input
        type='file'
        className='hidden'
        accept='.jpg, .jpeg, .png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          (event.target as HTMLInputElement).value = '';
        }}
        multiple
      />
      {children ? (
        <DivButton onClick={handleUploadImage}>{children}</DivButton>
      ) : (
        <>
          <button
            className='flex h-10 items-center justify-center rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm hover:bg-gray-200'
            type='button'
            onClick={handleUploadImage}
          >
            Chọn ảnh
          </button>
          <div className='mt-3 text-gray-400'>
            <div>Dụng lượng file tối đa 1 MB.</div>
            <div>Định dạng:.JPEG, .PNG</div>
            <div>Tối đa {maxFiles} tệp</div>
          </div>
          {selectedFiles.length > 0 && (
            <div className='mt-4'>
              <h3 className='text-lg font-semibold'>Đã chọn {selectedFiles.length} tệp:</h3>
              <ul className='mt-2 space-y-2'>
                {selectedFiles.map((file, index) => (
                  <li key={index} className='flex items-center justify-between rounded-md bg-gray-100 p-2'>
                    <span className='truncate'>{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className='ml-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MultiUpload;
