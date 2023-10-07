import { useMoviesContext } from "modules/movies";
import { useState } from "react";

const Index = () => {

    const [movieName, setMovieName] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const { movies, fetchMovies } = useMoviesContext();

    return <div>
        <input type="text" value={movieName} onChange={({ target: { value } }) => setMovieName(value)} />
        <input type="number" value={pageNumber} onChange={({ target: { value } }) => setPageNumber(Number(value))} step={1} />
        <div onClick={() => fetchMovies(movieName, pageNumber)}>Submit</div>
        {JSON.stringify(movies)}
    </div>;
};

export default Index;