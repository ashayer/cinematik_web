import { MovieResult } from "moviedb-promise";
import Image from "next/image";
import Link from "next/link";

const MovieCard: React.FC<{ data: MovieResult }> = ({ data }) => {
  return (
    <Link href={`/movie/${data.id}`}>
      <div
        className="flex flex-col content-center justify-start border-2 
     w-48justify-self-center hover:scale-95 cursor-pointer ease-in-ou duration-100"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
          alt="Movie Poster"
          width={200}
          height={300}
        />
        <h1 className="font-bold">{data.title}</h1>
        <h1>{data.vote_average}</h1>
        <h1>{data.release_date}</h1>
      </div>
    </Link>
  );
};

export default MovieCard;
