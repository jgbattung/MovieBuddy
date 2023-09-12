export interface IMovieOverviewDetails {
  title: {
    image: {
      url: string;
    },
    year: number;
    title: string;
    titleType: string;
    numberOfEpisodes?: number;
    seriesStartYear?: number;
    seriesEndYear?: number;
  },
  ratings: {
    rating: number;
  },
  genres: string[];
  plotSummary?: {
    text: string;
  }
  plotOutline: {
    text: string;
  }
}

export interface IMovieCastCredits {
  id: string;
  name: string;
  image: {
    url: string;
  },
  characters: string[];
}

export interface IMovieCrewCredits {
  image: {
    url: string;
  };
  name: string;
  id: string;
}

export interface IMovieFullCredits {
  id: string;
  cast: IMovieCastCredits[];
  crew: {
    director: IMovieCrewCredits[];
  }
}