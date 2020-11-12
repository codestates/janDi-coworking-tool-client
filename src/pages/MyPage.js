import React, { Component } from 'react';
import Header from 'components/Header';

import classNames from 'classnames/bind';
import styles from 'styles/MyPage.css';
import MiniButton from 'components/MiniButton';

const cx = classNames.bind(styles);


class Mypage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isReadonlyUserName: true,
      inputNickName: 'David123'
    }
  }

  modifyNickName(e) {
    console.log(e);
    this.setState((prevState) => ({
      isReadonlyUserName: !prevState.isReadonlyUserName
    }))
  }
  changeInput(e) {
    let { name, value } = e.target;
    if (name === 'nickname') {
      this.setState({
        inputNickName: value
      })
    }
  }

  render() {
    return (
      <div className="App-wrap">
        <div className="mb-view">
          <Header />
          <div className="App-contents">
            <h2>마이페이지</h2>
            <ul className={cx('Mypage-userInfo')}>
              <li>
                <label>이메일</label>
                <div className="inputWrap">
                  test@test.com
                </div>
              </li>
              <li>
                <label>닉네임</label>
                <div className="inputWrap" style={!this.state.isReadonlyUserName ? { paddingRight: '85px' } : null}>
                  <input type="text" value={this.state.inputNickName} readOnly={this.state.isReadonlyUserName} onChange={this.changeInput.bind(this)} name="nickname" />
                  {this.state.isReadonlyUserName ? (
                    <div className="btnModify" onClick={this.modifyNickName.bind(this)}>
                      <img src="/img/ico_modify.png" alt="닉네임 수정" />
                    </div>) : <MiniButton classList={['right']}>수정완료</MiniButton>}
                </div>
              </li>
              <li>
                <label>비밀번호</label>
                <div className="inputWrap">
                  <input type="password" value="password" readOnly />
                  <div className="btnModify">
                    <img src="/img/ico_modify.png" alt="비밀번호 수정" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
export default Mypage;