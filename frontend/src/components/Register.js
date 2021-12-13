import React from 'react'
import PopupWithForm from './PopupWithForm'
import InfoTooltip  from './InfoTooltip';
import { register } from '../utils/auth.js';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.onClose = props.onClose;
    this.state = {
      email: '',
      password: '',
      status: ''
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    register(this.state.password, this.state.email)
    .then((res) => {
      if(!res.error){
        this.setState({
          status: 'success'
        })
        this.props.onRegister();
        this.props.history.push('/sign-in');
      } else {
        this.setState({
          status: 'fail'
        })
        this.props.onRegister();
      }
    })
    .catch(err => {
      console.log(err);
    })
 }


  render() {
    return (
      <div>
        <section className="register">
          <PopupWithForm onSubmit={this.handleSubmit} isOpen={true} name="login" title="Регистрация" buttonTitle="Зарегистрироваться" version="black">
            <input className="popup__input popup__input_white" type="email" placeholder="Email" id="email" name="email" required minLength="2" maxLength="40" onChange={this.handleChange} />
            <span className="popup__input-error">
            </span>
            <input className="popup__input popup__input_white" type="password" placeholder="Пароль" id="password" name="password" required minLength="2" maxLength="200" onChange={this.handleChange} />
            <span className="popup__input-error">
            </span>
          </PopupWithForm>
          <div className="register__question">
            <p className="register__question-text">
              Уже зарегистрированы?
            </p>
            <Link className="register__link" to="/sign-in">
              Войти
            </Link>
          </div>
          <InfoTooltip status={this.state.status} isOpen={this.props.isOpen} onClose={this.onClose}/>
        </section>
      </div>
    )
  }
}

export default withRouter(Register)