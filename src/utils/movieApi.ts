import axios from "axios";
import { API_HOST, API_KEY } from "./utils";

const getOverviewDetails = async (movieId: string) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/title/get-overview-details', {
      params: {
        tconst: movieId
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
    }
    });

    return response.data;
  } catch (error) {
    throw error
  }
}

const getFullCredits = async (movieId: string) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/title/get-full-credits', {
      params: {
        tconst: movieId
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });

    return response.data;
  } catch (error) {
    throw error
  }
}

const getTrivia = async (movieId: string) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/title/get-trivia', {
      params: {
        tconst: movieId
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });

    return response.data;
  } catch (error) {
    throw error
  }
}

const getImages = async (movieId: string) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/title/get-images', {
      params: {
        tconst: movieId
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });

    return response.data;
  } catch (error) {
    throw error
  }
}

const getSimilarFilms = async (movieId: string) => {
  try {
    const response = await axios.get('https://imdb8.p.rapidapi.com/title/get-more-like-this', {
      params: {
        tconst: movieId
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });

    return response.data;
  } catch (error) {
    throw error
  }
}

export { getOverviewDetails, getFullCredits, getTrivia, getImages, getSimilarFilms };