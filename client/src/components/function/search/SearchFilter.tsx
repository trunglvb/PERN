import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter';
import { Separator } from '@/components/ui/separator';
import provinces from '@/constants/province';

const tabTypes = [
  {
    type: 'rent',
    title: 'Nhà cho thuê'
  },
  {
    type: 'sold',
    title: 'Nhà đất bán'
  }
];
const SearchFilter = () => {
  const wrapRef = useRef(null);
  const childRef = useRef(null);
  const [isShowSearchDetails, setIsShowSearchDetails] = useState<boolean>(false);
  useOutsideAlerter(wrapRef, setIsShowSearchDetails, false, childRef);
  return (
    <div className='absolute  left-10 right-10 top-10 flex items-center justify-center '>
      <div className='w-[900px] max-w-full'>
        <Tabs className='w-full space-y-0' defaultValue={'rent'}>
          <TabsList className='rounded-b-none'>
            {tabTypes.map((i) => (
              <TabsTrigger value={i.type} key={i.type}>
                {i.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabTypes.map((i) => (
            <TabsContent
              key={i.type}
              value={i.type}
              className='h-40 space-y-4 rounded-md rounded-tl-none bg-black/60 p-4 text-sm text-white'
            >
              <div className=' w-full items-center rounded-sm bg-slate-50  text-primary'>
                <div className='flex h-10 items-center p-4 transition-all duration-300 ease-in-out'>
                  <button
                    className='flex w-full items-center gap-2'
                    onClick={() => setIsShowSearchDetails(true)}
                    ref={wrapRef}
                  >
                    <Search className='h-4 w-4' />
                    <span>Trên toàn quốc</span>
                  </button>
                  <Button className='h-full py-3 text-sm '>Tìm kiếm</Button>
                </div>

                <AnimatePresence>
                  {isShowSearchDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'
                    >
                      <Separator />
                      <div className='p-4'>
                        <div className='w-full rounded-b-sm bg-slate-50' ref={childRef}>
                          <div className='mb-2 text-xs font-semibold text-gray-400'>Top tỉnh thành nổi bật</div>
                          <div className='mb-4 grid grid-cols-6 gap-4'>
                            {provinces.map((i) => (
                              <div className='relative max-h-20 cursor-pointer overflow-hidden rounded-sm' key={i.name}>
                                <span className='absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 transform text-center text-sm text-xs font-medium leading-[20px] text-white'>
                                  {i.name}
                                </span>
                                <div className='custom-overlay'></div>
                                <img
                                  src={i.image}
                                  alt=''
                                  className='z-10 h-full w-full animate-scale-down-center rounded-sm object-cover hover:animate-scale-up-center'
                                />
                              </div>
                            ))}
                          </div>
                          <Separator />
                        </div>
                        <div className='mb-2 mt-4 text-xs font-semibold text-gray-400'>Tất cả tỉnh thành</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SearchFilter;
