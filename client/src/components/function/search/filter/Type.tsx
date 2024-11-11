import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

const Type = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='rounded-sm border px-4 py-[6px] text-sm text-white'>
        <div className='relative flex items-center justify-center '>
          <div>Loại nhà đất</div>
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
          <div className='p-4'>
            <div className='relative mb-2 flex items-center justify-center '>
              <span className='text-base font-semibold'>Loại nhà đất</span>
              <button className='absolute right-0' onClick={() => setIsOpen(false)}>
                <X size={14} />
              </button>
            </div>
            <Separator />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Type;
