import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter';
import { Separator } from '@/components/ui/separator';
import provinces from '@/constants/province';
import { useQuery } from '@tanstack/react-query';
import { getAllProvince } from '@/apis/openApis/province.api';
import { Link } from 'react-router-dom';

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

  const { data } = useQuery({
    queryKey: ['province'],
    queryFn: getAllProvince
  });

  const provincesSearch = data?.data.map((i) => ({
    idProvince: i.idProvince,
    name: i?.name.replace(/^(Tỉnh|Thành phố)\s+/, ''),
    fullName: i.name
  }));

  return (
    <div className='absolute  left-10 right-10 top-10 flex items-center justify-center '>
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
              className='space-y-4 rounded-md rounded-tl-none bg-black/60 p-4 text-sm text-white'
            >
              <div className='w-full items-center rounded-md bg-white  text-primary shadow-lg' ref={wrapRef}>
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
                      className='overflow-hidden'
                      ref={childRef}
                    >
                      <Separator />
                      <div className='p-4'>
                        <div className='w-full rounded-b-sm '>
                          <div className='mb-2 text-xs font-semibold text-gray-400'>Top tỉnh thành nổi bật</div>
                          <div className='mb-4 grid grid-cols-6 gap-4'>
                            {provinces.map((i) => (
                              <div className='relative max-h-20 cursor-pointer overflow-hidden rounded-sm' key={i.name}>
                                <span className='absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 transform text-center text-xs font-medium leading-[20px] text-white'>
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
                        <div className='grid grid-cols-6 '>
                          {provincesSearch?.map((i) => (
                            <Link
                              key={i.idProvince}
                              className='flex cursor-pointer items-center justify-start rounded-sm p-[6px] text-sm hover:bg-[#F2F2F2]'
                              to={`/${i.idProvince}`}
                            >
                              {i.name}
                            </Link>
                          ))}
                        </div>
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
