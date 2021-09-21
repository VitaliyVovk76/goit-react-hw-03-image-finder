import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import s from "./ImageGallery.module.css";

// export default ImageGallery({ images, onOpenModal, showModal }) {
export default class ImageGallery extends Component {
  render() {
    console.log(this.props.images);
    return (
      <div>
        <ul className={s.imageGallery}>
          {this.props.images.map(
            ({ id, webformatURL, tags, largeImageURL }) => (
              //   <li key={img.id}>
              //     <img src={img.webformatURL} alt={img.tags} />
              //   </li>
              <>
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                  onOpenModal={this.props.onOpenModal}
                  onSetImg={this.props.onSetImg}
                />
                {/* {showModal && <Modal onCloseModal={onOpenModal} image={img} />} */}
              </>
            )
          )}
        </ul>
      </div>
    );
  }
}
