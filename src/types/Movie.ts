export interface IMovie {
  year: string;
  votes: string;
  volume: string;
  title: string;
  runtime: string;
  revenue: string;
  rating: string;
  rank: string;
  metascore: string;
  genre: string[];
  director: string;
  description: string;
  actors: string[];
}

export interface IMovieComment {
  title: string;
  comment: string;
}
