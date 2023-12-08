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

Enjoy exploring movies with MovieBuddy!

###### This project was created for the Web Developer Bootcamp 2022 Udemy Course
