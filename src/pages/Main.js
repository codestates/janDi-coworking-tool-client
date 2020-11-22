import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import Header from 'components/Header';
import Button from 'components/Button';
import Popup from 'components/Popup';
import MiniButton from 'components/MiniButton';
import JandiGround from 'containers/JandiGround';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../styles/Main.css';
import { server_path } from 'modules/path.js';
import { setProjects } from 'actions';
const cx = classNames.bind(styles);

class Main extends Component {
  constructor(props) {
    super(props)
    this.jandiEl = [];
    this.state = {
      isPopupOpen: false,
      projectNameInput: "",
      memberInput: "",
      memberLists: [],
      errorMessage: ""
    }
  }

  componentDidMount() {
    let { cookies } = this.props;

    if (!cookies.cookies.userId) {
      this.props.history.push('/login')
    }
    axios.get(server_path + '/main', { withCredentials: true }).then(res => {
      console.log(res.data);
      this.props.setProjects(res.data);
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        //쿠키삭제
        cookies.remove('userId');
        this.props.history.push('/login');
      }
    })
    //스크롤조정
    for (let el of this.props.projects) {
      this.jandiEl[el.id].scrollLeft = this.jandiEl[el.id].scrollWidth - this.jandiEl[el.id].offsetWidth;
    }
  }
  componentDidUpdate() {

  }

  onOpenPopup() {
    this.setState({
      isPopupOpen: true
    })
  }
  handleClosePopup(e) {
    this.setState({
      isPopupOpen: false
    })
  }

  onChangeInput(e) {
    let { name, value } = e.target;
    if (name === "memberInput") {
      this.setState({
        errorMessage: ""
      })
    }
    this.setState({
      [name]: value
    })
  }

  onClickBtnInvite(e) {
    this.setState({
      errorMessage: ""
    })
    if (this.state.memberInput === "") {
      this.setState({
        errorMessage: "초대할 멤버를 입력해주세요"
      })
      return;
    }
    axios.post(server_path + '/usercheck', {
      email: this.state.memberInput
    }, { withCredentials: true }).then(res => {
      if (res.data.isUser === true) {
        let memLi = this.state.memberLists;
        memLi.push(this.state.memberInput);
        this.setState({
          memberInput: '',
          memberLists: memLi
        });
      } else {
        this.setState({
          errorMessage: "가입된 유저가 아닙니다"
        })
      }
    }).catch(error => {
      console.error(error)
    })
    // let memLi = this.state.memberLists;
    // memLi.push(this.state.memberInput);
    // this.setState({
    //   memberInput: '',
    //   memberLists: memLi
    // });
  }

  onLoadJandi() {
    let { cookies } = this.props;
    axios.get(server_path + '/main', { withCredentials: true }).then(res => {

      console.log(res.data);
      this.props.setProjects(res.data);
      let project;
      if (this.props.projects && this.props.projects.length > 0) {
        project = this.props.projects.filter(item => {
          return item.id == this.state.projectId;
        });
        if (project.length > 0) {
          this.setState({
            project: project[0],
          })
        }
      }
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        //쿠키삭제
        cookies.remove('userId');
        this.props.history.push('/login');
      }
    })
  }

  onCreateProject() {
    let { cookies } = this.props;
    let { projectNameInput, memberLists } = this.state;
    if (projectNameInput === "") {
      this.setState({
        errorMessage: "프로젝트 이름을 지정해주세요"
      });
      return;
    } else {
      axios.post(server_path + '/projectpost', {
        projectName: this.state.projectNameInput,
        member: this.state.memberLists
      }, { withCredentials: true }).then(res => {

        this.setState({
          isPopupOpen: false
        });

        this.onLoadJandi();

      }).catch(error => {
        if (error.response && error.response.status === 401) {
          //쿠키삭제
          cookies.remove('userId');
          this.props.history.push('/login');
        }
      })
    }

  }

  deleteMember(index) {
    let memLi = this.state.memberLists;
    memLi.splice(index, 1);
    this.setState({
      memberLists: memLi
    })
  }

  render() {
    return (
      <div className="App-wrap">
        <div className="mb-view">
          <Header />
          <div className="App-contents">
            <h2>프로젝트 리스트</h2>
            <div onClick={this.onOpenPopup.bind(this)}>
              <Button >프로젝트 생성하기</Button>
            </div>
            <ul className="Main-projectList" >
              {
                this.props.projects.map(item => {
                  return (
                    <li key={item.id} >
                      <Link to={`/project/${item.id}`}>
                        <h4>{item.projectName}</h4>
                      </Link>
                      <div className="Main-JandiGroundWrapper">
                        <div className="Main-JandiGround" ref={(el) => { this.jandiEl[item.id] = el }} >
                          <JandiGround todoLists={item} />
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>{/* App-contents */}

          {this.state.isPopupOpen ? (
            <Popup open onClosePopup={this.handleClosePopup.bind(this)}>
              <h3>프로젝트 생성</h3>

              <ul className="MainCreatePoject">
                <li>
                  <h4>프로젝트 이름</h4>
                  <div className="inputWrap">
                    <input placeholder="name" onChange={this.onChangeInput.bind(this)} value={this.state.projectNameInput} name="projectNameInput" />
                  </div>
                </li>
                <li>
                  <h4>멤버 초대</h4>
                  <div className="flex justCen alignEnd">
                    <div className="inputWrap">
                      <input placeholder="member" onChange={this.onChangeInput.bind(this)} value={this.state.memberInput} name="memberInput" />
                    </div>
                    <div onClick={this.onClickBtnInvite.bind(this)}>
                      <MiniButton classList={['posRel']}>초대</MiniButton>
                    </div>
                  </div>

                  {
                    this.state.memberLists.length > 0 &&
                    <ul className="addedMemberList">
                      {
                        this.state.memberLists.length > 0 &&
                        this.state.memberLists.map((item, index) => {
                          return (
                            <li className="flex" key={index} data-key={index}>
                              <span>{item}</span>
                              <div onClick={this.deleteMember.bind(this, index)}>
                                <img src="/img/btn_delete_member.png" alt="멤버 삭제" className="btnDelete" />
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  }

                  {
                    this.state.errorMessage ? (
                      <span className="warning_text">{this.state.errorMessage}</span>
                    ) : null
                  }

                  <div className={cx('btnSubmitCreateProject')} onClick={this.onCreateProject.bind(this)}>
                    <Button >프로젝트 생성하기</Button>
                  </div>
                </li>
              </ul>
            </Popup>
          ) : null}

        </div>{/* mb-view */}
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  // works: state.workReducer.works,
  projects: state.projectsReducer.projects
});

const mapDispatchToProps = (dispatch) => ({
  setProjects: (projectLists) => dispatch(setProjects(projectLists))
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Main));
