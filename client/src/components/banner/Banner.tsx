import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { v4 as uuidv4 } from 'uuid';

interface IImages {
  images: string[];
}

const Banner = (props: IImages) => {
  const { images } = props;
  return (
    <div>
      <Carousel
        className='w-full'
        opts={{
          align: 'start',
          loop: true
        }}
      >
        <CarouselContent>
          {images.map((i: string) => (
            <CarouselItem key={uuidv4()}>
              <img src={i} alt='' className='aspect-[7/2] w-full object-cover' />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-2' />
        <CarouselNext className='right-2' />
      </Carousel>
    </div>
  );
};

export default Banner;
