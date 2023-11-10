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
    runningTimeInMinutes? : number;
  },
  ratings: {
    rating: number;
    ratingCount?: number;
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
    writer: IMovieCrewCredits[];
  }
}

export interface ITriviaSpoilt {
  id: string;
  text: string;
}

export interface ITriviaUnspoilt {
  id: string;
  text: string;
}

export interface ITrivia {
  id: string;
  spoilt: ITriviaSpoilt[];
  unspoilt: ITriviaUnspoilt[];
}

export interface IImages {
  id: string;
  caption: string;
  url: string;
}

export interface IMovieImages {
  images: IImages[]
}