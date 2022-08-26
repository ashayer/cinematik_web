import { MovieResult } from "moviedb-promise";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

const MovieCarousel: React.FC<{ data: MovieResult[] }> = ({ data }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div
      className="embla cursor-grab active:cursor-grabbing"
      ref={emblaRef}
      style={{ overflow: "hidden" }}
    >
      <div className="embla__container" style={{ display: "flex" }}>
        {data.map((movieResult) => (
          <div key={movieResult.id} className="embla__slide" style={{ flex: "0 0 100%" }}>
            <div className="flex items-center justify-center">
              <div
                className=""
                style={{
                  zIndex: 1,
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.25), rgba(0,0,0,0.75))",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    marginInline: "auto",
                    width: "100%",
                  }}
                >
                  <Link href={`/movie/${movieResult.id}`}>
                    <a className="text-3xl text-white mx-auto md:w-3/4 lg:w-1/2">
                      {movieResult.title}
                    </a>
                  </Link>
                  <h1 className=" text-white mx-auto md:w-3/4 lg:w-1/2">{movieResult.overview}</h1>
                  <h1 className=" text-white mx-auto md:w-3/4 lg:w-1/2">
                    {movieResult.release_date}
                  </h1>
                </div>
              </div>
              <Image
                src={`https://image.tmdb.org/t/p/original${movieResult.backdrop_path}`}
                alt="Burger"
                width={889}
                height={500}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
