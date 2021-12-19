import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext' 

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.onCardClick = props.onCardClick;
    this.onCardLike = props.onCardLike;
    this.onCardDelete = props.onCardDelete;
  }

  static contextType = CurrentUserContext;

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }  

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }

  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  }

  render() {
    const isOwn = this.props.card.owner === this.context.data._id;

    const cardDeleteButtonClassName = (`places__delete-button ${isOwn ? '' : 'places__delete-button_hidden'}`); 
    const isLiked = this.props.card.data ? this.props.card.data.likes.some(i => i._id === this.context._id) : this.props.card.likes.some(i => i._id === this.context._id);
    const cardLikeButtonClassName = (`places__like ${isLiked ? 'places__like_liked' : ''}`);

    return (
      <div className="places__card">
        <img className="places__image" src={ this.props.card.data ? this.props.card.data.link : this.props.card.link} alt=" " onClick={this.handleClick} />
        <div className="places__name-line">
          <p className="places__name">
            {this.props.card.data ? this.props.card.data.name : this.props.card.name}
          </p>
          <div className="places__like-container">
            <div className={cardLikeButtonClassName} onClick={this.handleLikeClick}>
      
            </div>
            <p className="places__like-number">
              {this.props.card.data ? this.props.card.data.likes.length : this.props.card.likes.length}
            </p>
          </div>
        </div>
        <button className={cardDeleteButtonClassName} type="button" onClick={this.handleDeleteClick}>
        </button>
      </div>
    )
  }
}