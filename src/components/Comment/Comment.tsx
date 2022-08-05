import React, { useState, useEffect } from 'react';

import MoviesCommentsDataService from '../../services/movie';

import Form from './Form';
import Modal from '../Modal';

import './styles.css';

interface IComment {
  value: string;
  checked: boolean;
}

export interface IForm {
  comment1: IComment;
  comment2: IComment;
  comment3: IComment;
  inputText: string;
}

const updateInitialValues = (form: IForm, commentOnFirebase: string) => {
  let userChooseRadio = false;
  const newForm = Object.fromEntries(
    Object.entries(form).map(([key, objectCheck]) => {
      if (objectCheck?.value === commentOnFirebase) {
        userChooseRadio = true;
        return [key, { checked: true, value: commentOnFirebase }];
      }
      return [key, objectCheck];
    }),
  ) as IForm;

  return { userChooseRadio, newForm };
};

interface IPropsAlert {
  message: string;
  type?: string;
}

const Alert: React.FC<IPropsAlert> = ({ message, type = 'danger' }) => {
  return (
    <div className="comment-message">
      <p className={`alert fade show alert-${type}`} role="alert">
        {message}
      </p>
    </div>
  );
};

interface IProps {
  title: string;
  setShowModal: (show: boolean) => void;
}

const Comment: React.FC<IProps> = ({ title, setShowModal }) => {
  const initialState = {
    comment1: { checked: false, value: 'I hate it' },
    comment2: { checked: false, value: 'Not bad but I wish it was longer. 2hs is too short :(' },
    comment3: { checked: false, value: 'Kept me on the edge of my seat the entire time' },
    inputText: '',
  };

  const [comment, setComment] = useState('');
  const [commentAlreadyExists, setCommentAlreadyExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [form, setForm] = useState<IForm>(initialState);

  useEffect(() => {
    async function getComment() {
      try {
        setLoading(true);
        setMessageAlert('');
        const commentOnFirebase = await MoviesCommentsDataService.getOne(title);
        if (commentOnFirebase) {
          setCommentAlreadyExists(true);
          setComment(commentOnFirebase.comment);
          const { userChooseRadio, newForm } = updateInitialValues(form, commentOnFirebase.comment);

          if (!userChooseRadio) {
            setForm({ ...form, inputText: commentOnFirebase.comment });
          } else setForm(newForm);
        } else setCommentAlreadyExists(false);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        const messageError = error?.message || 'Error when try to retrieve your data';
        setMessageAlert(messageError);
      }
    }
    getComment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'radio') {
      setComment(event.target.value);
      setForm({ ...initialState, [event.target.id]: { checked: event.target.checked } });
      setMessageAlert('');
    } else {
      setComment(event.target.value);
      setForm({ ...initialState, [event.target.name]: event.target.value });
      setMessageAlert('');
    }
  };

  const validation = () => {
    if (comment === '') {
      setMessageAlert('Please enter a comment');
      return false;
    }
    return true;
  };

  const submitData = async () => {
    if (validation()) {
      setSubmitting(true);
      const data = { title, comment };
      try {
        if (commentAlreadyExists) await MoviesCommentsDataService.update(data);
        else await MoviesCommentsDataService.create(data);
        setSubmitting(false);
        setShowModal(false);
      } catch (error: any) {
        const messageError = error?.message || 'Error when try to save your data';
        setSubmitting(false);
        setMessageAlert(messageError);
      }
    }
  };

  const titleWithAction = `${title} - ${commentAlreadyExists ? 'Edit' : 'New'} comment`;

  return (
    <Modal title={titleWithAction} setShowModal={setShowModal} handleOnClick={submitData}>
      {submitting && <Alert type="success" message="Submitting..." />}
      {messageAlert !== '' && <Alert message={messageAlert} />}
      {loading ? (
        <Alert type="success" message="Loading..." />
      ) : (
        <Form form={form} initialState={initialState} onChangeInput={onChangeInput} />
      )}
    </Modal>
  );
};

export default Comment;
