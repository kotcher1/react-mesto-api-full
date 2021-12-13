import React from 'react'

class PopupWithForm extends React.Component {

  constructor(props) {
    super(props);
    this.title = props.title;
    this.name = props.name;
    this.buttonTitle = props.buttonTitle;
    this.onClose = props.onClose;
    this.version = props.version;
  }

  render() {
    return (
      <section className={`popup popup_type_${this.name} ${this.props.isOpen === true ? 'popup_opened' : ''} ${this.version === 'black' && 'popup_black'} `}>
        <div className={`popup__container ${this.version === 'black' && 'popup__container_black'}`}>
          <h2 className={`popup__title ${this.version === 'black' && 'popup__title_white'}`}>
            {this.title}
          </h2>
          <form onSubmit={this.props.onSubmit} className="popup__form" name={`${this.name}`}>
            {this.props.children}
            <button type="submit" className={`popup__submit ${this.version === 'black' && 'popup__submit_white'}`}>
              {this.buttonTitle}
            </button>
          </form>
          {this.version === 'white' && (
            <button className="popup__close-button" type="button" onClick={this.onClose}>
            </button>
          )}
        </div>
      </section>
    )
  }
}

export default PopupWithForm