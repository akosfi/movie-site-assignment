import { MovieDTO } from "modules/movies/domain/Movie";
import RemoteMovieRepository from "modules/movies/remote/RemoteMovieRepository";
import FindMovieByNameUseCase from "modules/movies/useCases/findMovieByNameUseCase";
import { useEffect, useState } from "react";

const Index = () => {
    const [movies, setMovies] = useState<MovieDTO[]>([]);

    const [movieName, setMovieName] = useState("");
    const [pageNumber, setPageNumber] = useState(1);


    const fetchMovies = async () => {
        const { movies } = await new FindMovieByNameUseCase({ movieRepository: new RemoteMovieRepository(), name: movieName, page: pageNumber }).execute();
        setMovies(movies);
    };

    return <div>
        <input type="text" value={movieName} onChange={({ target: { value } }) => setMovieName(value)} />
        <input type="number" value={pageNumber} onChange={({ target: { value } }) => setPageNumber(Number(value))} step={1} />
        <div onClick={fetchMovies}>Submit</div>
        {JSON.stringify(movies)}
    </div>;
};

export default Index;