import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

const EditProfilePopup = (props) => {

  const currentUser = useContext(CurrentUserContext);

  const [userName, setName] = useState();
  const [userDescription, setDescription] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }

  React.useEffect(() => {
    console.log(currentUser.data);
    setName(currentUser.data.name);
    setDescription(currentUser.data.about);
  }, [currentUser, props.isOpen]); 

  return (
    <PopupWithForm onSubmit={handleSubmit}  title='Редактировать профиль' name='edit' buttonTitle='Сохранить' isOpen={props.isOpen} onClose={props.onClose} version="white">
      <input className="popup__input" type="text" placeholder="Имя" id="name" value={userName || ''} name="fullname" required minLength="2" maxLength="40" onChange={handleNameChange}/>
      <span className="popup__input-error">
      </span>
      <input className="popup__input" type="text" value={userDescription || ''}  placeholder="Род деятельности" id="job" name="job" required minLength="2" maxLength="200" onChange={handleDescriptionChange}/>
      <span className="popup__input-error">
      </span>
  </PopupWithForm>
  )
}

export default EditProfilePopup