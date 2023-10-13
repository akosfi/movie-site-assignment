import { test, expect } from '@playwright/test';
import MovieListingPage from './MovieListingPage';

test('Test search for a movie called "Anabelle", with an empty listing page, expect movies to be visible.', async ({
    page,
}) => {
    const movieListingPage: MovieListingPage = new MovieListingPage(page);
    await movieListingPage.navigateHere();

    await expect(
        movieListingPage.searchResultsListItem.first(),
    ).not.toBeVisible();

    await movieListingPage.searchInput.fill('Annabelle');

    await movieListingPage.loadingSpinner.waitFor({ state: 'hidden' });

    await expect(
        movieListingPage.searchResultsListItemName.first(),
    ).toContainText('Annabelle');
});

test('Test adding and removing a movie to favourites, with an empty favourites list, expect movies to be added and removed.', async ({
    page,
}) => {
    const movieListingPage: MovieListingPage = new MovieListingPage(page);
    await movieListingPage.navigateHere();

    await expect(movieListingPage.favouritesListItem.first()).not.toBeVisible();

    await movieListingPage.searchInput.fill('Annabelle');

    await movieListingPage.loadingSpinner.waitFor({ state: 'hidden' });

    const firstMovieName = await movieListingPage.searchResultsListItemName
        .first()
        .textContent();

    await movieListingPage.searchResultsListItemFavouriteButton.first().click();

    expect(await movieListingPage.favouritesListItemName.textContent()).toBe(
        firstMovieName,
    );

    await movieListingPage.favouritesListItemFavouriteButton.first().click();

    await expect(movieListingPage.favouritesListItem.first()).not.toBeVisible();
});
