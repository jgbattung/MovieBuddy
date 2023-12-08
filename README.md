# MovieBuddy

## Overview
MovieBuddy is a web application that allows users to search for films, explore detailed information about movies, and create a personalized favorites list.

## Built with
This project was created using React-TypeScript, TailwindCSS, and DaisyUI. <br>
Backend data is handled by FireBase and FireStore. <br>
Films API is provided by Rapid API's IMDb API.

## Features
1. **User Authentication**: Users can register their own accounts to utilize all the features of MovieBuddy.
2. **Search Movies**: Users can search for local and international films using a search query.
3. **Movie Details**: Users can view detailed information about each film, including the synopsis, cast and crew, film images, trivias, and related films.
4. **Favorites List**: Users can add films to their favorites and view all of their favorite films in the My Favorites section.

## Screens
### Registration Page
![landing-registration](https://github.com/jgbattung/MovieBuddy/assets/100396329/b39427d6-706a-4148-8168-05f8b8fa31fd)

### Login Page
![login](https://github.com/jgbattung/MovieBuddy/assets/100396329/f330b8ae-4005-4d19-8d9d-bdb4837b1130)

### Search Movies
![search-movies](https://github.com/jgbattung/MovieBuddy/assets/100396329/c714bfb4-578e-4cb0-aa9c-97b298de7e00)

### Movie Details
![movie-detail](https://github.com/jgbattung/MovieBuddy/assets/100396329/d7b96596-22d1-4760-8a7a-84ced05f78fb)

#### Overview Details
![movie-detail-1](https://github.com/jgbattung/MovieBuddy/assets/100396329/fb6462d1-759a-45d9-b915-0cf9aef71817)

#### Film Images and Cast
![movie-detail-2](https://github.com/jgbattung/MovieBuddy/assets/100396329/0daa30ee-be62-4ae2-a294-ecc2be4991c0)

#### Film Trivia
![movie-detail-3](https://github.com/jgbattung/MovieBuddy/assets/100396329/a258e3ca-483a-4fff-b7ea-a5e4d4ed563c)

#### Similar Films
![movie-detail-4](https://github.com/jgbattung/MovieBuddy/assets/100396329/ef54b179-5bb8-45a2-9fce-72607b89beaa)

### Add to Favorites and My Favorites
#### Add Film to Favorites
![add-to-favorites](https://github.com/jgbattung/MovieBuddy/assets/100396329/50bbffae-353c-4aa6-91d3-2a8b5d2b2b11)

#### My Favorites
![my-faovrites](https://github.com/jgbattung/MovieBuddy/assets/100396329/d15eb270-806b-4df9-8a17-713530672ef3)


## Run the project locally
1. Clone the repository
 ```
 git clone https://github.com/jgbattung/MovieBuddy.git
 ```
2. Register a Rapid API account and subscribe to the [IMDb API](https://rapidapi.com/apidojo/api/imdb8) to get your API key.
3. Create a `.env` file in the root directory of the project and add your IMDb API key.
```
REACT_APP_API_KEY=your-key-here
```
4. Install the dependencies
```
npm install
```
5. Run the development server
```
npm run start
```
6. Open [localhost:3000](localhost:3000) on your browser.


**Enjoy exploring movies with MovieBuddy!**

###### This project was created as a personal project in 2023.
