import Banner from '@/components/banner';
import banner1 from '@/assets/carousel/banner1.avif';
import banner2 from '@/assets/carousel/banner2.avif';
import banner3 from '@/assets/carousel/banner3.avif';
import banner4 from '@/assets/carousel/banner4.avif';

const carousels = [banner1, banner2, banner3, banner4];

const Home = () => {
  return (
    <div>
      <Banner images={carousels} />
    </div>
  );
};

export default Home;
