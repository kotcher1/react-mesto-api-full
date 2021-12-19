import Header from './Header'
import Main from './Main'
// import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import React from 'react'
import {api} from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext' 
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import { checkToken } from '../utils/auth.js';

class App extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isRegistrationStatusPopupOpen: false,
      selectedCard: {},
      currentUser: {},
      cards: [],
      loggedIn: false,
      email: '',
    }
  }

  handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
    const jwt = localStorage.getItem('jwt');
    checkToken(jwt)
    .then((res) => {
      if (res){
        this.setState({
          loggedIn: true,
          email: res.email,
        }, () => {
          this.props.history.push("/");
        });
      }
      console.log(res)
    })
    .catch(err => console.log(err))
  }
  }

  getCard() {
    api.getInitialCards()
    .then((apiCards) => {
      this.setState({cards: apiCards})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    const apiMethod = isLiked ? "DELETE" : "PUT";
    api.likeCard(card._id, apiMethod)
    .then((newCard) => {
      this.setState((state) => ({
        cards: state.cards.map((c) => (c._id === card._id ? newCard : c)),
      }));
    }).catch((err) => {
      console.log(err);
    })
  } 

  handleLogin = () => {
    this.setState({ loggedIn: true });
  }

  handleEmail = (email) => {
    this.setState({ email });
  }

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      this.setState((state) => ({
        cards: state.cards.filter((c) => c._id !== card._id)}));
    }).catch((err) => {
      console.log(err);
    })
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  }

  handleRegisterClick = () => {
    this.setState({ isRegistrationStatusPopupOpen: true })
  }

  closeAllPopups = () => {
    this.setState({ isAddPlacePopupOpen: false, isEditProfilePopupOpen: false, isEditAvatarPopupOpen: false, isRegistrationStatusPopupOpen: false, selectedCard: {}});
  }

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  }

  handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
      .then((user) => {
        this.setState({currentUser: user});
        this.closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
  }

  handleUpdateAvatar = ({avatar}) => {
    api.changeAvatar(avatar)
      .then((user) => {
        this.setState({currentUser: user});
        this.closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
  }

  handleAddPlaceSubmit = ({cardName, cardLink}) => {
    api.addCard(cardName, cardLink)
      .then((newCard) => {
        this.setState({cards: [newCard, ...this.state.cards]});
        this.closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
  }

  getUserInfo() {
    api.getUserInfo()
      .then((user) => {
        this.setState({currentUser: user});
      }).catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getUserInfo();
    this.getCard();
    this.handleTokenCheck();
  }

  handleOut = () => {
    localStorage.removeItem('jwt');
    this.setState({
      loggedIn: false,
      email: '',
    })
  }

  handleClickRegister = () => {
    this.props.history.push("/sign-up");
  }

  handleClickLogin = () => {
    this.props.history.push("/sign-in");
  }

  render() {
    return (
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <div className="page">
            <main>
              <Switch>
                <ProtectedRoute component={Main} loggedIn={this.state.loggedIn} exact path="/"
                  email={this.state.email}
                  onEditProfile={this.handleEditProfileClick} 
                  onAddPlace={this.handleAddPlaceClick} 
                  onEditAvatar={this.handleEditAvatarClick}
                  isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen}
                  isEditProfilePopupOpen={this.state.isEditProfilePopupOpen}
                  isAddPlacePopupOpen={this.state.isAddPlacePopupOpen}
                  selectedCard={this.state.selectedCard}
                  closeAllPopups={this.closeAllPopups}
                  onOpenPopup={this.handleCardClick}
                  onUpdateUser={this.handleUpdateUser}
                  onUpdateAvatar={this.handleUpdateAvatar}
                  cards={this.state.cards}
                  onCardLike={this.handleCardLike}
                  onCardDelete={this.handleCardDelete}
                  onAddCard={this.handleAddPlaceSubmit}
                  handleOut={this.handleOut}
                  >
                </ProtectedRoute>
                <Route path="/sign-up">
                  <Header page="sign_up" method={this.handleClickLogin}/>
                  <Register onRegister={this.handleRegisterClick} isOpen={this.state.isRegistrationStatusPopupOpen} onClose={this.closeAllPopups}/>
                </Route>
      	        <Route path="/sign-in">
                  <Header page="log_in" method={this.handleClickRegister}/>
                  <Login handleLogin={this.handleLogin} handleEmail={this.handleEmail}/>
                </Route>
                <Route path="*">
                    {this.state.loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                </Route>
              </Switch>
            </main>
          </div>
        </CurrentUserContext.Provider>
    );
  }

}

export default withRouter(App);
