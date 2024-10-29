import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabType = {
  rent: 'rent',
  sold: 'sold'
};
const SearchFilter = () => {
  return (
    <div className='absolute  left-10 right-10 top-10 flex items-center justify-center '>
      <div className='w-[900px] max-w-full'>
        <Tabs className='w-full space-y-0' defaultValue={tabType.sold} onChange={(value) => console.log(value)}>
          <TabsList className='rounded-b-none'>
            <TabsTrigger value={tabType.sold}>Nhà đất bán</TabsTrigger>
            <TabsTrigger value={tabType.rent}>Nhà đất cho thuê</TabsTrigger>
          </TabsList>
          <TabsContent
            value={tabType.sold}
            className='h-40 space-y-4 rounded-md rounded-tl-none bg-black/60 p-4 text-sm text-white'
          >
            Make changes to your account here.
          </TabsContent>
          <TabsContent
            value={tabType.rent}
            className='h-40 space-y-4 rounded-md rounded-tl-none bg-black/60 p-4 text-sm text-white'
          >
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchFilter;
