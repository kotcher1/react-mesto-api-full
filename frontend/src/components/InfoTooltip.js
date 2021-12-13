import React from 'react'
import check from '../images/check_icon.svg'
import cross from '../images/cross_icon.svg'

class InfoTooltip extends React.Component {

  constructor(props) {
    super(props);
    this.onClose = props.onClose;
  }

  render() {

    const texts = {
      success: 'Вы успешно зарегистрировались!',
      fail: 'Что-то пошло не так! Попробуйте ещё раз.',
    }

    return (
      <section className={`popup ${this.props.isOpen === true ? 'popup_opened' : ''}`}>
        <div className={`popup__container`}>
          <img className='popup__icon' src={this.props.status === "success" ? check : cross} alt="Иконка"/>
          <p className='popup__text'>
            {texts[this.props.status]}
          </p>
          <button className="popup__close-button" type="button" onClick={this.onClose}>
          </button>
        </div>
      </section>
    )
  }
}

export default InfoTooltip