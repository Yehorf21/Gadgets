import { Link, useNavigate } from 'react-router-dom';
import { addAlert } from '../../../utils/helpers/helpers';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogOut = async () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    addAlert('success', 'Logged out successfully');
  };

  const handleLogIn = () => navigate('auth');

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token');

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Link to="/">
        <div className="footer__logo"></div>
      </Link>

      <div className="footer__links">
        <a
          href="https://github.com/Yehorf21"
          className="footer__link footer__link--github"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="mailto:feshchenkoye@gmail.com"
          className="footer__link footer__link--contacts"
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>

        {/* not sure about what this link is about */}
        <a className="footer__link footer__link--rights">Rights</a>
      </div>

      <div className="footer__right-section">
        {isLoggedIn ? (
          <button
            className="footer__text footer__text--button"
            onClick={handleLogOut}
          >
            Log out
          </button>
        ) : (
          <button
            className="footer__text footer__text--button"
            onClick={handleLogIn}
          >
            Log in / Sign up
          </button>
        )}

        <button className="footer__arrow" onClick={scrollToTop} />
      </div>
    </>
  );
};
