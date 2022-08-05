import React from 'react';

import { IMovie } from '../../types/Movie';

import Movie from '../Movie';

interface IProps {
  data: IMovie[];
  handleModal: (title: string) => void;
  handleOnSearchTitle: (title: string) => void;
  handleOnSearchGenre: (title: string) => void;
  loading: boolean;
  allUniqueGenres: string[];
}

interface IProsSelect {
  handleOnSearchGenre: (title: string) => void;
  genreOptions: { label: string; value: string }[];
}

interface IPropsAlert {
  message: string;
  type: string;
}

const Alert: React.FC<IPropsAlert> = ({ message, type }) => {
  return (
    <tr>
      <td colSpan={6}>
        <div className="movies-message">
          <p className={`alert alert-${type}`} role="alert">
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
};

const SelectGenres: React.FC<IProsSelect> = ({ handleOnSearchGenre, genreOptions }) => {
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={e => handleOnSearchGenre(e.target.value)}
    >
      <option>Select one genre</option>
      {genreOptions.map(genre => (
        <option key={genre.value} value={genre.value}>
          {genre.label}
        </option>
      ))}
    </select>
  );
};

const TableMovies: React.FC<IProps> = ({
  data,
  handleModal,
  handleOnSearchTitle,
  handleOnSearchGenre,
  loading,
  allUniqueGenres,
}) => {
  const genreOptions = allUniqueGenres.map(genre => ({ label: genre, value: genre }));

  const onChangeSearched = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnSearchTitle(e.target.value);
    }
  };

  return (
    <>
      <table className="table table-striped table-hover cursor">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Year</th>
            <th scope="col">Runtime</th>
            <th scope="col">Revenue</th>
            <th scope="col">Rating</th>
            <th scope="col">Genres</th>
          </tr>
          <tr>
            <th scope="col">
              <input
                className="form-control"
                type="text"
                onKeyDown={onChangeSearched}
                placeholder="Press enter to filter by Title"
                aria-label="Filter by Title"
              />
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">
              <SelectGenres handleOnSearchGenre={handleOnSearchGenre} genreOptions={genreOptions} />
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Alert type="success" message="Loading..." />
          ) : data.length > 0 ? (
            data.map((movie, i) => <Movie key={`${movie.title}-${i}`} handleModal={handleModal} data={movie} />)
          ) : (
            <Alert type="warning" message="No movies with this title" />
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableMovies;
