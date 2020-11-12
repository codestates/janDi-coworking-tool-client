import React from 'react';
import classNames from 'classnames/bind';
import styles from './MiniButton.scss';

const cx = classNames.bind(styles);

const MiniButton = (props) => (
  <div className={`${cx('MiniButtonWrapper')} ${props.classList}`}>
    { props.children}
  </div >
);

export default MiniButton;
