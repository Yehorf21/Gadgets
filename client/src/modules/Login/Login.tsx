import React, { CSSProperties, useState } from 'react';

import { create } from '../../api/users';
import { addAlert } from '../../utils/helpers/helpers';

import { DotLoader } from 'react-spinners';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialInputBody = {
  email: '',
  password: '',
};

export const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [data, setData] = useState(initialInputBody);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = data;

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(body => ({ ...body, [e.target.type]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    create({ email, password })
      .then(response => {
        localStorage.setItem('auth_token', response.data.token);

        addAlert('success', response.data.message);
        setIsLoggedIn(true);
        setData(initialInputBody);
      })
      .catch(error => addAlert('error', error.response.data.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login">
      <form className="login__form" action="#" onSubmit={onSubmit}>
        <h2 className="login__title">Here you can sign up:</h2>

        <div className="login__inputs">
          <input
            type="email"
            className="login__input"
            placeholder="Come up with an email"
            value={email}
            onChange={onChange}
          />

          <input
            type="password"
            className="login__input"
            placeholder="Come up with a password"
            value={password}
            onChange={onChange}
          />
        </div>

        <button className="login__button">
          {isLoading ? (
            <DotLoader
              loading={isLoading}
              color="#FFF"
              size={32}
              cssOverride={override}
            />
          ) : (
            'Submit'
          )}
        </button>
      </form>

      <div className="login__block" />
    </div>
  );
};
