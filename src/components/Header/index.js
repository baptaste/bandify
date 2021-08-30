import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarDesktop from 'src/containers/NavbarDesktop';
import logoBandify from 'src/assets/logoBandify.svg';
import './style.scss';

const Header = ({
  toggleIsMenuOpen, toggleIsChatroomOpen,
  isLogged, toggleIsNotificationsOpen,
  notifications,
}) => (
  <header className="header">
    <div className="header__bandify">
      <Link to="/">
        <img src={logoBandify} alt="bandify" className="header__bandify--logo" />
      </Link>
      <h1 className="header__bandify--title">Bandify</h1>
    </div>

    <div className="header__menu-buttons">
      {isLogged && (
        <>
          <button
            type="button"
            className="header__menu-buttons-btn--chat"
            onClick={toggleIsChatroomOpen}
          >
            <i className="fas fa-comments" />
          </button>
          <button
            type="button"
            className={notifications.length > 0
              ? 'header__menu-buttons-btn--notifs header__menu-buttons-btn--notifs__new'
              : 'header__menu-buttons-btn--notifs'}
            onClick={toggleIsNotificationsOpen}
          >
            <i className={notifications.length > 0 ? 'fas fa-bell fas fa-bell__new' : 'fas fa-bell'} />
          </button>
        </>
      )}

      <button
        type="button"
        className="header__menu-buttons-btn--menu"
        onClick={toggleIsMenuOpen}
      >
        <i className="fas fa-bars" />
      </button>
    </div>

    <NavbarDesktop />

  </header>
);

Header.propTypes = {
  toggleIsMenuOpen: PropTypes.func.isRequired,
  toggleIsChatroomOpen: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  toggleIsNotificationsOpen: PropTypes.func.isRequired,
};

export default Header;
