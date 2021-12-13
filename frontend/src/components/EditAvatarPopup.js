import React from 'react'
import PopupWithForm from './PopupWithForm'

class EditAvatarPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    }
    this.avatarRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateAvatar({
      avatar: this.avatarRef.current.value,
    });
  } 

  componentDidUpdate() {
    this.avatarRef.current.value = ''
  }

  render() {
    return (
      <PopupWithForm onSubmit={this.handleSubmit} title='Обновить аватар' name='avatar' buttonTitle='Сохранить' isOpen={this.props.isOpen} onClose={this.props.onClose} version="white">
        <input className="popup__input" ref={this.avatarRef} type="url" defaultValue='' placeholder="Ссылка" id="pictureLink" name="link" required />
        <span className="popup__input-error">
        </span>
      </PopupWithForm>
    )
  }

}

export default EditAvatarPopup