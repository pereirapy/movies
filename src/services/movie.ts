import { ref, set, update, remove, get, child } from 'firebase/database';

import database from '../config/firebase';
import { IMovieComment } from '../types/Movie';

const tableName = 'comments';
const dbRef = ref(database);

class MoviesCommentsDataService {
  create({ title, comment }: IMovieComment) {
    return set(ref(database, `${tableName}/` + title), {
      comment,
    });
  }

  getOne(title: string) {
    return get(child(dbRef, `${tableName}/${title}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null;
        }
      })
      .catch(error => {
        return error;
      });
  }

  update({ title, comment }: IMovieComment) {
    const updates = {
      [`/${tableName}/${title}`]: { comment },
    };

    return update(ref(database), updates);
  }

  delete(title: string) {
    const comment = `/${tableName}/${title}`;
    return remove(ref(database, comment));
  }

  deleteAll() {
    return remove(ref(database));
  }
}
export default new MoviesCommentsDataService();
