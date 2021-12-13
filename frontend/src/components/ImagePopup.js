import React from 'react'

class ImagePopup extends React.Component {

 constructor(props) {
   super(props);
   this.onClose = props.onClose;
 } 

 render() {
   return (
    <section className={`popup popup_type_image ${this.props.card.link && 'popup_opened'}`} id="imagePopup">
      <div className="popup__container popup__container_type_image">
        <img className="popup__image" src={this.props.card.link} alt=" "/>
        <p className="popup__image-title">
        </p>
        <button className="popup__close-button" type="button" onClick={this.onClose}>
        </button>
      </div>
  </section>
   )
 }
}

export default ImagePopup