import { Component } from "react";
import s from "./ImageGalleryItem.module.css";
// export default function ImageGalleryItem({
//   img: { webformatURL, tags, id, largeImageURL },
//   onOpenModal,
// }) {
export default class ImageGalleryItem extends Component {
  evtClick(img, alt) {
    // console.log("/////////////dddd////////////");
    //   console.log(res);
    this.props.onSetImg(img, alt);
  }
  render() {
    return (
      <li
        key={this.props.id}
        className={s.imageGalleryItem}
        ////////////////////
        onClick={() => this.evtClick(this.props.largeImageURL, this.props.tags)}
        // onClick={this.evtClick(this.props.largeImageURL)}
        ///////////////////
      >
        <img
          src={this.props.webformatURL}
          alt={this.props.tags}
          className={s.imageGalleryItemImage}
          //////////////////////
          onClick={this.props.onOpenModal}
          //////////////////////
        />
      </li>
    );
  }
}
