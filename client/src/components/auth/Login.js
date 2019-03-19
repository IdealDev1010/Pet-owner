import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../common/input/TextField";
import { login } from "../../actions/authAction";
import "./auth.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password, errors } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form className="auth-form" onSubmit={this.onSubmit}>
          {errors.invalid && <div className="invalid">{errors.invalid}</div>}
          <TextFieldInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            value={email}
            error={errors.email}
          />
          <TextFieldInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
            value={password}
            error={errors.password}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.error
})
export default connect(
  mapStateToProps,
  { login }
)(Login);
