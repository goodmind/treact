import * as React from 'react';
import { checkPassword } from 'modules/auth';
import { connect } from 'react-redux';
const t = require('../../style.css');

class PasswordImpl extends React.Component<any, any> {
  constructor(...args) {
    super(...args);

    this.handleChange = this.handleChange.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);

    this.state = {
      password: '',
      error: null,
    };
  }

  public handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  public handleNextStep() {
    const { update, nextStep, dispatch } = this.props;
    const { password } = this.state;

    update({ password });
    console.log(this.state, this.props);
    dispatch(checkPassword(this.state.password))
      .then(({payload: error}) => error.error_code ? this.setState({ error }) : this.setState({error: null}))
      .then(r => this.state.error || nextStep());
  }

  public render() {
    const { error } = this.state;

    return (
      <div className={t.loginStep}>
        <h1>Cloud password check</h1>
        <p>
          Please enter your cloud password.
        </p>
        <div className={t.formGroupLogin}>
          <input
            onChange={this.handleChange}
            name="password"
            className="form-control form-control-lg"
            placeholder="Your cloud password" type="password" />
        </div>
        {error && <div>Error type: {error.error_message}</div>}
        <button onClick={this.handleNextStep} className={`${t.btn} ${t.primary}`}>Submit</button>
      </div>
    );
  }
}

const Password = connect<any, any, any>(state => ({ auth: state.auth }))(PasswordImpl);

export { Password }
