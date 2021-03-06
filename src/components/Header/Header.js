import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.scss';
import Menu from '../Menu';
const cx = classNames.bind(styles);
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }
  onOpenMenu() {
    this.setState({
      isMenuOpen: true
    })
  }
  onCloseMenu() {
    this.setState({
      isMenuOpen: false
    })
  }
  render() {
    return (
      <header className={cx('HeaderWrapper')}>
        <div className={cx('logoWrapper')}>
          <Link to="/" className={cx('headerLogo')}>
            < img src="/img/headerLogo.png" alt="잔디헤더로고" />
          </Link >
        </div>
        <div className={cx('menuBarWrap')} onClick={this.onOpenMenu.bind(this)}>
          < img src="/img/menuBar.png" alt="메뉴바" />
        </div>
        {
          this.state.isMenuOpen ?
            <Menu onCloseMenu={this.onCloseMenu.bind(this)} /> : null
        }


      </header >
    )
  }
}


export default Header;



