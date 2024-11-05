import Banner from '@/components/function/banner';

import carousels from '@/constants/function/carousel';

const Home = () => {
  return (
    <div>
      <Banner images={carousels} />
    </div>
  );
};

export default Home;
