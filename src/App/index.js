import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.css';
import { routes as scenes } from '../routes';
import { FontIcon, Button, Toolbar } from 'react-md';
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
          title="CHARITY RAFFLE"
          actions={
            <div>
              <Button icon ><FontIcon iconClassName="fa fa-user-circle" /></Button>
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
