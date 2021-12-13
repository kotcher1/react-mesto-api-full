import React from 'react'
import PopupWithForm from './PopupWithForm'
import InfoTooltip  from './InfoTooltip';
import { login } from '../utils/auth.js';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onClose = props.onClose;
    this.state = {
      email: '',
      password: '',
      status: '',
      isLoginStatusPopupOpen: false,
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleLoginClick = () => {
    this.setState({ isLoginStatusPopupOpen: true })
  }

  handleClose = () => {
    this.setState({ isLoginStatusPopupOpen: false })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    login(this.state.email, this.state.password)
    .then((data) => {
      if (data) {
        this.props.handleEmail(this.state.email);
        this.setState({
          email: '',
          password: ''
        }, () => {
          this.props.handleLogin();
          this.props.history.push('/');
        })
      } else {
        this.setState({
          status: 'fail'
        });
        this.handleLoginClick();
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <section className="login">
          <PopupWithForm onSubmit={this.handleSubmit} isOpen={true} name="login" title="Вход" buttonTitle="Войти" version="black">
            <input className="popup__input popup__input_white" type="email" placeholder="Email" id="email" name="email" required minLength="2" maxLength="40" onChange={this.handleChange}/>
            <span className="popup__input-error">
            </span>
            <input className="popup__input popup__input_white" type="password" placeholder="Пароль" id="password" name="password" required minLength="2" maxLength="200" onChange={this.handleChange} />
            <span className="popup__input-error">
            </span>
          </PopupWithForm>
        </section>
        <InfoTooltip status={this.state.status} isOpen={this.state.isLoginStatusPopupOpen} onClose={this.handleClose}/>
      </div>
    )
  }
}

export default withRouter(Login)