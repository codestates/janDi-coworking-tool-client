import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = (props) => (
  <ul className="MenuWrapper">
    <li>
      <Link to="/">홈</Link>
    </li>
    <li>
      <Link to="/mypage">마이페이지</Link>
    </li>
    <li>
      <a className="btnLogout">로그아웃</a>
    </li>
    <li className="btnClose" onClick={this.closePopup.bind(this)}>
      <img src="/img/btn_close.png" alt="메뉴닫기" />
    </li>
  </ul>
);

export default Menu;
