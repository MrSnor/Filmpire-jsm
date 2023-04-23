# extra

## Detail

1. finish up to 4-Filmpire--> sidebar.mp4 (2)
2. video at 4-Filmpire--> redux-setup = 24:00
3. video at 4-Filmpire--> 4. Rendering Movies = 15:00
4. finished 5. Finishing Movie View
5. finished 8. Redux Slice - commit - `
5. finished 9. Switch Genre Functionality
6. finished 4-Filmpire--> 10. Search Functionality
7. finished 4-Filmpire--> 11. Authentication (assignment - access profile name/id from redux state and display in the profile component)

## Note

1. prolly can use this snippet to resolve middleware issue

    ```js
      // Add the middleware for RTK-Query API
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
    ```

2. use 'refetch' to retry fetching data after an error (maybe try in Movies component)

3. show full name of movies as tooltip

4. review and update comments after the project completion, as more changes might have been done since the time comments were added
