import React, { Component } from 'react';

import Participate from '../Participate/';

class Lottery extends Component {

  render() {
    return (
      <div className="row lt-v-pad-8">
        <div className="col-sm-3">
          <span>{this.props.lotteryData.name}</span>
        </div>
        <div className="col-sm-3">
          <span>{this.props.lotteryData.prize} </span>
        </div>
        <div className="col-sm-3">
          <span>{this.props.lotteryData.current} </span>
        </div>
        <div className="col-sm-3">
          <Participate
            contractName={this.props.lotteryData.name}
            contractAddress={this.props.lotteryData.address}
          />
        </div>
      </div>
    );
  }
}

export default Lottery;
