import React from 'react'
import PopupWithForm from './PopupWithForm'

class AddPlacePopup extends React.Component {

  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.linkRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddCard({
      cardName: this.nameRef.current.value,
      cardLink: this.linkRef.current.value,
    });
  } 

  componentDidUpdate() {
    this.nameRef.current.value = '';
    this.linkRef.current.value = '';
  }

  render() {
    return (
      <PopupWithForm title='Новое место' name='add' buttonTitle='Создать' onSubmit={this.handleSubmit} isOpen={this.props.isOpen} onClose={this.props.onClose} version="white">
        <input className="popup__input" ref={this.nameRef} type="text" defaultValue="" placeholder="Название" id="pictureName" name="pictureName" minLength="2" maxLength="30" required />
        <span className="popup__input-error">
        </span>
        <input className="popup__input" type="url" ref={this.linkRef} defaultValue="" placeholder="Ссылка на картинку" id="link" name="link" required />
        <span className="popup__input-error">
        </span>
      </PopupWithForm>
    )
  }
}

export default AddPlacePopup