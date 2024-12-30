import InputFile from '@/components/common/inputFile';

const Personals = () => {
  return (
    <div className='mx-auto'>
      <div className='bg-content w-[800px] rounded-md p-4'>
        <div className='text-base font-semibold'>Thông tin cá nhân</div>
        <div className='mt-4 flex items-center justify-center'>
          <InputFile />
        </div>
      </div>
    </div>
  );
};

export default Personals;
