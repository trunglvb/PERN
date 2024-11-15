import Banner from '@/components/function/banner';

import { carousels } from '@/constants/function/utils';
const Home = () => {
  return (
    <div>
      <Banner images={carousels} />
    </div>
  );
};

export default Home;
