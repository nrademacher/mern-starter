import React, { useRef, useState } from 'react';
import { useApolloClient, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const NavBar = () => {
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN);
  const navTab = useRef(null);
  const [initTab, setInitTab] = useState('bordered');

  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem('auth-token');
    console.log(client)
    client.writeData({
      data: {
        isLoggedIn: false,
      },
    });
    console.log(client)
    setInitTab('bordered');
  };

  const handleNavClick = (e) => {
    initTab && setInitTab('');
    navTab.current && navTab.current.classList.remove('bordered');
    navTab.current = e.currentTarget;
    e.currentTarget.classList.add('bordered');
  };

  const getLinks = () => {
    if (data.isLoggedIn) {
      return (
        <ul className="px-3 text-xs md:text-base flex w-full shadow-lg menu horizontal">
          <li
            className={`justify-self-start ${initTab}`}
            onClick={(e) => handleNavClick(e)}
          >
            <Link to={'/tweets'}>All Tweets</Link>
          </li>
          <li className="justify-self-start" onClick={(e) => handleNavClick(e)}>
            <Link to={'/profile'}>Profile</Link>
          </li>
          <li className="flex-1" onClick={(e) => handleNavClick(e)}>
            <Link to={'/new_tweet'}>Write a Tweet</Link>
          </li>
          <li className="justify-self-end self-center h-full">
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      );
    } else {
      return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
          <div className="flex-none px-2 mx-2">
            <span className="text-lg font-bold">Chirper</span>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="items-stretch flex">
              <a className="btn btn-ghost btn-sm rounded-btn">
                <Link to={'/signup'}>Signup</Link>
              </a>
              <a className="btn btn-ghost btn-sm rounded-btn">
                <Link to={'/login'}>Login</Link>
              </a>
            </div>
          </div>
        </div>
      );
    }
  };

  return <nav className="mx-auto w-full text-center">{getLinks()}</nav>;
};

export default NavBar;
