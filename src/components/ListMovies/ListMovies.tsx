import React, { useEffect, useMemo, useState } from 'react';
import { IMovie } from '../../types/Movie';
import TableMovies from './TableMovies';
import Comment from '../Comment';

import './styles.css';

const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="movies-message">
      <p className="alert alert-danger" role="alert">
        {error}
      </p>
    </div>
  );
};

const ListMovies: React.FC = () => {
  const [dataMovies, setDataMovies] = useState<IMovie[]>([]);
  const [dataMoviesFiltered, setDataMoviesFiltered] = useState<IMovie[]>([]);
  const [modalData, setModalData] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const [searchGenre, setSearchGenre] = useState<string | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const response = await fetch('/web/movies.json');
        if (!response.ok) {
          setLoading(false);
          setDataMovies([]);
          setError(response.statusText);
        } else {
          const data = await response.json();
          setLoading(false);
          setError(null);
          setDataMovies(data);
          setDataMoviesFiltered(data);
        }
      } catch (e: any) {
        const errorString = e?.error.message || 'Error when try to get data from server';
        setLoading(false);
        setDataMovies([]);
        setError(errorString);
      }
    };
    getAllMovies();
  }, []);

  const allUniqueGenres = useMemo(() => {
    return dataMovies.reduce((previousMovie, currentMovie) => {
      currentMovie.genre.map(tag => {
        if (!previousMovie.includes(tag)) {
          previousMovie = [...previousMovie, tag];
        }
        return previousMovie;
      });
      return previousMovie;
    }, [] as string[]);
  }, [dataMovies]);

  useEffect(() => {
    if (searchTitle && searchTitle !== '') {
      const getMoviesFilteredByTitle = () =>
        dataMoviesFiltered.filter(movie => movie.title.toLocaleUpperCase() === searchTitle.toLocaleUpperCase());

      setDataMoviesFiltered(getMoviesFilteredByTitle());
    } else if (searchTitle !== null) {
      setDataMoviesFiltered(dataMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTitle]);

  useEffect(() => {
    if (searchGenre && searchGenre !== '') {
      const getMoviesFilteredByGenre = () => dataMoviesFiltered.filter(movie => movie.genre.includes(searchGenre));

      setDataMoviesFiltered(getMoviesFilteredByGenre());
    } else if (searchGenre !== null) {
      setDataMoviesFiltered(dataMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchGenre]);

  if (error) return <Error error={error} />;

  const handleModal = (title: string) => {
    setModalData(title);
    setShowModal(true);
  };

  return (
    <>
      {showModal && <Comment setShowModal={setShowModal} title={modalData} />}
      <div className="movies-container">
        {
          <TableMovies
            allUniqueGenres={allUniqueGenres}
            loading={loading}
            handleModal={handleModal}
            handleOnSearchGenre={setSearchGenre}
            handleOnSearchTitle={setSearchTitle}
            data={dataMoviesFiltered}
          />
        }
      </div>
    </>
  );
};

export default ListMovies;
