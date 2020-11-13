import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './Button.scss';

const cx = classNames.bind(styles);

class Button extends Component {
  render() {
    let bgColor = this.props.bgColor || '#28B351';
    let color = this.props.color || '#ffffff';
    let alignSelf = this.props.mdSize ? 'center' : 'inherit';
    return (
      //props.bgColor 지정시 버튼 배경색으로 지정, 입력없을시 기본컬러 #28B351
      //props.color 지정시 버튼 폰트컬러로 지정, 입력없을시 기본컬러 #ffffff
      //props.mdSize 지정시 버튼 middle Size 버튼으로 변경, 기본 사이즈 Full
      <div className={cx('ButtonWrapper')} style={{ backgroundColor: bgColor, color, alignSelf }}>
        {this.props.children}
      </div>
    );
  }
}


export default Button;
