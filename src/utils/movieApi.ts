import axios from "axios";

const API_KEY: string = '846d571b90msh4582e19480a6db6p18d4e8jsna47bfdf60c0f';
const API_HOST: string = 'imdb8.p.rapidapi.com';

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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error" + error)
  }
}

export { getOverviewDetails };