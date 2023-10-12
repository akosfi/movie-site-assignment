export default class MovieSearchRequest {
    name: string;

    page: number;

    constructor(name: string, page: number) {
        this.name = name;
        this.page = page;
    }
}
