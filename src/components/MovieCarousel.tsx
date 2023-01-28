import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { api } from "../utils/api";
import loading from "../assets/loading.png";
import Image from "next/image";

const MovieCarousel = () => {
  const trendingList = api.movie.getTrendingMovies.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        {trendingList.isLoading ? (
          <div className="animate-pulse">
            <Image
              src={loading}
              alt=""
              width={100}
              height={100}
              className="animate-spin"
            />
          </div>
        ) : (
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {trendingList.data &&
                  trendingList?.data.map((movie, index) => (
                    <div className="embla__slide" key={index}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original${
                          movie.poster_path || ""
                        }`}
                        alt="Burger"
                        width={889}
                        height={500}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;

{
  /* <div className="flex h-screen items-center justify-center">
<div className="animate-pulse">
  <Image
    src={loading}
    alt=""
    width={100}
    height={100}
    className="animate-spin"
  />
</div>
</div> */
}
