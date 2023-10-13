import { Locator, Page } from '@playwright/test';

export default class MovieListingPage {
    searchInput: Locator;
    searchResultsList: Locator;
    searchResultsListItem: Locator;
    searchResultsListItemFavouriteButton: Locator;
    searchResultsListItemName: Locator;
    loadingSpinner: Locator;
    favouritesList: Locator;
    favouritesListItem: Locator;
    favouritesListItemFavouriteButton: Locator;
    favouritesListItemName: Locator;

    constructor(private readonly page: Page) {
        this.searchInput = page.locator(
            '[data-testid="movieListingPage/searchInput"]',
        );
        this.searchResultsList = page.locator(
            '[data-testid="movieListingPage/searchResultsList"]',
        );
        this.searchResultsListItem = page.locator(
            '[data-testid="movieListingPage/searchResultsList/item"]',
        );
        this.searchResultsListItemFavouriteButton = page.locator(
            '[data-testid="movieListingPage/searchResultsList/item/favouriteButton"]',
        );
        this.searchResultsListItemName = page.locator(
            '[data-testid="movieListingPage/searchResultsList/item/name"]',
        );
        this.loadingSpinner = page.locator(
            '[data-testid="movieListingPage/loadingSpinner"]',
        );
        this.favouritesList = page.locator(
            '[data-testid="movieListingPage/favouritesList"]',
        );
        this.favouritesListItem = page.locator(
            '[data-testid="movieListingPage/favouritesList/item"]',
        );
        this.favouritesListItemFavouriteButton = page.locator(
            '[data-testid="movieListingPage/favouritesList/item/favouriteButton"]',
        );
        this.favouritesListItemName = page.locator(
            '[data-testid="movieListingPage/favouritesList/item/name"]',
        );
    }

    navigateHere = async () =>
        await this.page.goto(String(process.env.SITE_URL));
}
