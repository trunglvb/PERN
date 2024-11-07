import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import provinceApi from '@/apis/openApis/province.api';
import ProvincesFilter from './Provinces';
import Price from './rangeFilter/Price';
import Size from './rangeFilter/Size';

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

  //outside click
  useOutsideAlerter(wrapRef, setIsShowSearchDetails, false, childRef);

  //get all provinces
  const { data: provinces } = useQuery({
    queryKey: ['province'],
    queryFn: provinceApi.getAllProvince
  });

  return (
    <div className='absolute left-10 right-10 top-10 flex items-center justify-center '>
      <div className='w-[900px] max-w-full'>
        <Tabs className='w-full space-y-0' defaultValue={'rent'} onChange={() => setIsShowSearchDetails(false)}>
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
              className=' relative min-h-32 space-y-4 rounded-md rounded-tl-none bg-black/60 p-4 text-sm text-white'
            >
              <div className='relative'>
                {' '}
                <div
                  className='absolute z-10 w-full items-center rounded-md bg-white text-primary shadow-lg'
                  ref={wrapRef}
                >
                  <div className={isShowSearchDetails ? 'py-3' : ''}>
                    <motion.div
                      className='overflow-hidden rounded-md border border-[#ccc] bg-[#F2F2F2] shadow-lg'
                      animate={
                        isShowSearchDetails
                          ? {
                              scale: 0.96
                            }
                          : {
                              scale: 1
                            }
                      }
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
                      }}
                    >
                      <div className='flex h-10 items-center p-4'>
                        <button className='flex w-full items-center gap-2' onClick={() => setIsShowSearchDetails(true)}>
                          <Search className='h-4 w-4' />
                          <span>Trên toàn quốc</span>
                        </button>
                        <Button className='h-full py-3 text-sm '>Tìm kiếm</Button>
                      </div>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isShowSearchDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='z-10 overflow-hidden'
                        ref={childRef}
                      >
                        <Separator />
                        <ProvincesFilter provinces={provinces?.data!} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className='relative'>
                <div className='absolute top-10 grid w-full grid-cols-3 gap-2 text-primary'>
                  <div>Loai nha dat</div>
                  <Price />
                  <Size />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SearchFilter;
