import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.css';
import { routes as scenes } from '../routes';
import { FontIcon, Button, Toolbar } from 'react-md';
import NewLottery from '../components/NewLottery';
// import 'normalize.css/normalize.css';
// import '@blueprintjs/core/dist/blueprint.css';
// import 'bootstrap/dist/css/bootstrap.css';

import { appInitCompileContract } from './app.actions';

class App extends Component {

  componentWillMount() {
    this.props.appInitCompileContract();
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          colored
          title="ETH LOTTERY"
          actions={
            <div>
              <Button icon ><FontIcon iconClassName="fa fa-user-circle" /></Button>
              <NewLottery />
            </div>
          }
        />
        {scenes}
      </div>
    );
  }
}

const connected = connect(
  () => { return {} }, // empty mapStateToProps
  {
    appInitCompileContract
  })(App);

export default withRouter(connected);
