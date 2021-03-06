import React, { Component } from 'react';
import { DialogContainer, Button } from 'react-md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  participateRequest,
  participateOpenModal,
  participateCloseModal
} from './participate.actions';
import './participate.css'
import ReduxedTextField from '../../components/ReduxedTextField';
import { buildContractName } from '../../raffle/raffle.js';

class Participate extends Component {
  submitting = false;
  handleOpenModal = (e) => {
    this.submitting = false;
    this.props.reset();
    this.props.participateOpenModal(this.props.lookup);
  }

  handleCloseModal = (e) => {
    this.props.reset();
    this.props.participateCloseModal(this.props.lookup);
  }

  submit = (values) => {
    const payload = {
      username: values.modalUsername,
      userAddress: values.modalAddress,
      password: values.modalPassword,
      contractName: buildContractName("Raffle"),
      contractAddress: this.props.lotteryData.address,
      methodName: "enter",
      value: values.modalValue * this.props.lotteryData.ticketPrice * 1000000000000000000, //convert to ether
      args: {
        _numTickets: values.modalValue,
      },
    }
    this.submitting = this.props.participateRequest(this.props.lookup, payload).submitting;
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const error = this.props.failure &&
      (<div className="row">
        <div className="col-sm-12">
          <label className="pt-label" style={{ marginTop: '5px', color: 'red' }}>
            Failed to participate in lottery with error: {this.props.failure}
          </label>
        </div>
      </div>)

    const actions = [{
      onClick: this.handleCloseModal,
      primary: true,
      children: 'Close',
    },
    {
      onClick: handleSubmit(this.submit),
      disabled: this.props.pristine || this.props.submitting || this.submitting,
      primary: true,
      children: 'Play',
      className: this.submitting? 'disabled' : 'enabled',
    }];
    return (
      <section className="participate">
        <Button
          raised
          primary
          onClick={this.handleOpenModal}
          disabled={this.props.isDisabled}
          className={this.props.isDisabled ? 'lottery-disabled' : 'lottery-button'} > Play ${this.props.lotteryData.ticketPrice} coin </Button>
        <form>
          <DialogContainer
            id="participate-raffle"
            className="new-participate"
            footerClassName="footer-new-participate"
            visible={this.props.modal.isOpen || false}
            actions={actions}
            onHide={this.handleCloseModal}
            width={'40pc'}
            title={`${this.props.lotteryData.name}`}
          >
            <div className="lottery-participate">
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Username
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalUsername"
                  id="modalUsername"
                  component={ReduxedTextField}
                  placeholder="Username"
                  type="text"
                  disabled={Boolean(user)}
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Address
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  component={ReduxedTextField}
                  placeholder="Address"
                  type="text"
                  name="modalAddress"
                  id="modalAddress"
                  disabled={Boolean(user)}
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Password
                  </label>
                </div>
                <Field
                  name="modalPassword"
                  className="md-cell md-cell--9"
                  placeholder="Password"
                  id="modalPassword"
                  component={ReduxedTextField}
                  type="password"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Number of Tickets
                  </label>
                </div>
                <Field
                  name="modalValue"
                  className="md-cell md-cell--9"
                  component={ReduxedTextField}
                  placeholder="Number"
                  id="modalValue"
                  type="number"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Total: {this.props.lotteryData.ticketPrice * this.props.modalValue || 0}
                  </label>
                </div>
              </div>
              {error}
            </div>
          </DialogContainer>
        </form>
      </section>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.modalUsername) {
    errors.modalUsername = "Username Required";
  }
  if (!values.modalAddress) {
    errors.modalAddress = "Address Required";
  }
  if (!values.modalPassword) {
    errors.modalPassword = "Password Required";
  }
  if (!values.modalValue) {
    errors.modalValue = "Tickets Required";
  }
  if (values.modalValue < 1) {
    errors.modalValue = "Must have at least 1 ticket in lottery";
  }
  if (!values.modalTotal) {
    errors.modalTotal = "Total Required";
  }

  return errors;
}

const selector = formValueSelector('participate');

function mapStateToProps(state, ownProps) {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return {
    initialValues: { modalUsername: user && user.username, modalAddress: user && user.address },
    modal: state.participate.modals
      && state.participate.modals[ownProps.lookup] ?
      state.participate.modals[ownProps.lookup] : {},
    modalUsername: selector(state, 'modalUsername'),
    modalValue: selector(state, 'modalValue'),
    failure: state.participate.failure,
  };
}


const formed = reduxForm({ form: 'participate', validate })(Participate);
const connected = connect(
  mapStateToProps,
  {
    participateOpenModal,
    participateCloseModal,
    participateRequest,
  }
)(formed);
const routed = withRouter(connected);

export default routed;
