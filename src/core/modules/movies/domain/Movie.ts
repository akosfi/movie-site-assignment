export interface MovieDTO {
    id: number;
    overview: string;
    posterPath: string;
    releaseDate: string;
    title: string;
}

export default class Movie implements MovieDTO {
    id: number;
    overview: string;
    posterPath: string;
    releaseDate: string;
    title: string;

    constructor({ id, overview, posterPath, releaseDate, title }: MovieDTO) {
        this.id = id;
        this.overview = overview;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.title = title;
    }

    serialize = (): MovieDTO => ({
        id: this.id,
        overview: this.overview,
        posterPath: this.posterPath,
        releaseDate: this.releaseDate,
        title: this.title,
    });
}
