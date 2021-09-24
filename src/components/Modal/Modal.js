import { Component } from "react";
import s from "./Modal.module.css";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  //ОБЯЗАТЕЛЬНО снимаем слушатель и handleKeyDown()
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      console.log("нажали Escape, нужно закрыть модалку");
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };
  render() {
    return (
      <div className={s.overlay} onClick={this.props.onCloseModal}>
        <div className={s.modal}>
          <img
            src={this.props.imgModal.img}
            alt={this.props.imgModal.alt}
            className={s.modalImage}
          />
        </div>
      </div>
    );
  }
}
