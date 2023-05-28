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
8. finished 4-Filmpire--> 13. Finalizing Authentication
9. video at 15. Movie Information Page - Part 2--> second button group = 13:30
10. finished 4-Filmpire--> 15. Movie Information Page - Part 2

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

5. FIXME: search feature not working in movie info page

6. learn how to properly handle errors(wrong routes, wrongs params), showing 404 pages

7. FIXME: but when i directly go to 'movie/502356' or as such, it shows not found on deployed platforms.

    Solution through [phind.com]():  
    The issue you're experiencing is because your server is **not serving the index.html** file for your non-root routes, such as /movie/:id. This is a common issue when deploying Single Page Applications (SPAs) that use client-side routing, like React Router.

    To fix this issue, you need to **configure your server to serve the index.html file for all routes**. The solution depends on the server you are using for deployment. Here are a few examples:  
    **`Netlify`**: Create a _redirects file in your public folder with the following content:

    ```
    /* /index.html 200
    ```
