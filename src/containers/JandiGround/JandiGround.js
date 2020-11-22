import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { generateJandi } from 'modules/generateDayBlock';
import JandiHana from 'components/JandiHana';
import classNames from 'classnames/bind';
import styles from './JandiGround.scss';

const cx = classNames.bind(styles);

class JandiGround extends PureComponent {

  constructor(props) {
    super(props)
    let JandiDayList = generateJandi();
    this.state = {
      jandiDay: JandiDayList
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={cx('JandiGroundWrapper')}>
        {
          this.state.jandiDay &&
          this.state.jandiDay.map(item => {
            if (this.props.todoLists.todolists && this.props.todoLists.todolists && this.props.todoLists.todolists[item] !== undefined) {
              return (<div onClick={this.props.method && this.props.method.bind(this)} key={item}><JandiHana dataKey={item} count={this.props.todoLists.todolists[item]} key={item} /></div>)
            } else {
              return (<JandiHana dataKey={item} key={item} />)
            }
          })
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JandiGround);


