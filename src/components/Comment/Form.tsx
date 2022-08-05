import React from 'react';

import { IForm } from './Comment';

interface IProps {
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initialState: IForm;
  form: IForm;
}

const Form: React.FC<IProps> = ({ onChangeInput, initialState, form }) => {
  return (
    <form>
      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            onChange={onChangeInput}
            checked={form.comment1.checked}
            defaultValue={initialState.comment1.value}
            type="radio"
            name="comment"
            id="comment1"
          />
          <label className="form-check-label" htmlFor="comment1">
            {initialState.comment1.value}
          </label>
        </div>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            onChange={onChangeInput}
            checked={form.comment2.checked}
            type="radio"
            defaultValue={initialState.comment2.value}
            name="comment"
            id="comment2"
          />
          <label className="form-check-label" htmlFor="comment2">
            {initialState.comment2.value}
          </label>
        </div>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            onChange={onChangeInput}
            checked={form.comment3.checked}
            defaultValue={initialState.comment3.value}
            type="radio"
            name="comment"
            id="comment3"
          />
          <label className="form-check-label" htmlFor="comment3">
            {initialState.comment3.value}
          </label>
        </div>
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          name="inputText"
          onChange={onChangeInput}
          value={form.inputText}
          placeholder="Feel free to writer here"
          aria-label="default input example"
        />
      </div>
    </form>
  );
};

export default Form;
