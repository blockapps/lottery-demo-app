import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { Card, CardTitle, CardText, Button } from 'react-md';
import LotteryDetails from '../LotteryDetails';
import Participate from '../Participate';
import { participateOpenModal } from '../Participate/participate.actions';
import './lottery.css';

class Lottery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  handleModal(isOpen) {
    this.setState({ isOpen });
  }

  winner(message, address) {
    return (
      <Button
        raised
        primary
        onClick={() => { 
          message === 'You Won' ? alert(`You Won Lottery!`) : alert(`Address ${address} won lottery! `);
        }}
        className={'lottery-disabled'} > {message} </Button>
    )
  }

  render() {
    const isDisabled = (this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length) <= 0;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const winner = this.props.lotteryData.winnerAddress !== '0000000000000000000000000000000000000000';

    return (
      <div>
        <Card className="lottery">
          <CardTitle title={this.props.lotteryData.name} className="lottery-title" onClick={this.handleModal.bind(this, true)} />
          <CardText className="card-text">
            <p> <b>Jackpot:</b> {this.props.lotteryData.ticketPrice * this.props.lotteryData.ticketCount} coins </p>
            <p> <b>Remaining Tickets:</b> {this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length} </p>
            <p> <b>Charity:</b> {this.props.lotteryData.charityPercentage}% </p>
            <div>
              { winner ? (this.props.lotteryData.winnerAddress !== (user && user.address) ? this.winner('Completed', this.props.lotteryData.winnerAddress) : this.winner('You Won', this.props.lotteryData.winnerAddress) ) :
              <Participate isDisabled={isDisabled} lotteryData={this.props.lotteryData} lookup={`participate` + this.props.lotteryData.address} />}
            </div>
          </CardText>
        </Card>
        <LotteryDetails isOpen={this.state.isOpen} handleModal={this.handleModal.bind(this)} lotteryData={this.props.lotteryData} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connected = connect(
  mapStateToProps,
  {
    participateOpenModal
  }
)(Lottery);

export default withRouter(connected);
