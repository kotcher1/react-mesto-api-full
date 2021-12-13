import React from 'react'
import Header from './Header'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext' 

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditAvatarClick = props.onEditAvatar;
    this.handleEditProfileClick = props.onEditProfile;
    this.handleAddPlaceClick = props.onAddPlace;
    this.closeAllPopups = props.closeAllPopups;
    this.handleCardClick = props.onOpenPopup;
    this.onUpdateUser = props.onUpdateUser;
    this.onUpdateAvatar = props.onUpdateAvatar;
    this.onCardDelete = props.onCardDelete;
    this.onCardLike = props.onCardLike;
  }

  static contextType = CurrentUserContext;

  render() {

    return (
      <div>
        <Header email={this.props.email} page="main" method={this.props.handleOut}/>
        <section className="profile">
          <div className="profile__block">
            <div className="profile__avatar-block">
              <img className="profile__avatar" src={this.context.avatar} alt="Фото" />
              <button className="profile__avatar-button" onClick={this.handleEditAvatarClick} type="button">
              </button>
            </div>
            <div className="profile__info">
              <div className="profile__name-line">
                <h1 className="profile__name">
                  {this.context.name}
                </h1>
                <button className="profile__edit" onClick={this.handleEditProfileClick} type="button">
                </button>
              </div>
              <p className="profile__profession">
                {this.context.about}
              </p>
            </div>
          </div>
          <button className="profile__add" onClick={this.handleAddPlaceClick} type="button">
          </button>
        </section>
        <section className="places">
          {this.props.cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={this.handleCardClick} onCardLike={this.onCardLike} onCardDelete={this.onCardDelete}/>
            )
          })}
        </section>
        <EditProfilePopup onUpdateUser={this.onUpdateUser} isOpen={this.props.isEditProfilePopupOpen} onClose={this.closeAllPopups} />
        <AddPlacePopup onAddCard={this.props.onAddCard} isOpen={this.props.isAddPlacePopupOpen} onClose={this.closeAllPopups}/>
        <PopupWithForm title='Вы уверены?' name='delete' buttonTitle='Да' onClose={this.closeAllPopups}/>
        <EditAvatarPopup onUpdateAvatar={this.onUpdateAvatar} isOpen={this.props.isEditAvatarPopupOpen} onClose={this.closeAllPopups} />
        <ImagePopup card={this.props.selectedCard} onClose={this.closeAllPopups}/>
        <Footer />
      </div>
    )
  }
}

export default Main