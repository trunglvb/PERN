import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SearchFilter from '../search';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface IImages {
  images: string[];
}

const Banner = (props: IImages) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const { images } = props;

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='relative'>
      <Carousel
        className='w-full'
        opts={{
          align: 'start',
          loop: true
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((i: string, index) => (
            <CarouselItem key={index}>
              <img src={i} alt='' className='aspect-[7/2] w-full object-cover' />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-2' />
        <CarouselNext className='right-2' />
      </Carousel>
      <div className='relative -top-10 bottom-4 left-1/2 flex w-fit min-w-32 -translate-x-1/2 justify-center gap-2 rounded-full bg-white px-4 py-1'>
        {Array.from({ length: images.length }).map((_, index) => (
          <Button
            key={index}
            variant='outline'
            size='icon'
            className={`h-[10px] w-[10px] rounded-full p-0 ${index === current ? 'bg-primary' : 'bg-muted'}`}
            onClick={() => api?.scrollTo(index)}
          >
            <span className='sr-only'>{`Go to slide ${index + 1}`}</span>
          </Button>
        ))}
      </div>
      <SearchFilter />
    </div>
  );
};

export default Banner;
