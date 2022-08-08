import React from 'react';
import { IMovie } from '../../types/Movie';

interface IProps {
  data: IMovie;
  handleModal: (title: string) => void;
}

const Movie: React.FC<IProps> = ({ data, handleModal }) => {
  return (
    <tr onClick={() => handleModal(data.title)}>
      <td>{data.title}</td>
      <td>{data.year}</td>
      <td>{data.runtime}</td>
      <td>{data.revenue}</td>
      <td>{data.rating}</td>
      <td>{data.genre.join(", ")}</td>
    </tr>
  );
};

export default Movie;
