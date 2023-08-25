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
  plotSummary: {
    text: string;
  }
}