import { Separator } from '@/components/ui/separator';
import provincesSlider from '@/constants/province';
import { IProvinceResponse } from '@/types/provinces.type';
import { Link } from 'react-router-dom';

interface IProvincesProps {
  provinces: IProvinceResponse[];
}
const ProvincesFilter = (props: IProvincesProps) => {
  const { provinces } = props;
  const provincesFilter = provinces?.map((i) => ({
    idProvince: i.idProvince,
    name: i?.name.replace(/^(Tỉnh|Thành phố)\s+/, ''),
    fullName: i.name
  }));
  return (
    <div className='p-4'>
      <div className='w-full rounded-b-sm '>
        <div className='mb-2 text-xs font-semibold text-gray-400'>Top tỉnh thành nổi bật</div>
        <div className='mb-4 grid grid-cols-6 gap-4'>
          {provincesSlider.map((i) => (
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
        {provincesFilter?.map((i) => (
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
  );
};

export default ProvincesFilter;
