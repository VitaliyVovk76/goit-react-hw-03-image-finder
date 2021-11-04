import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";
export default function ImageGalleryItem({
  onSetImg,
  largeImageURL,
  tags,
  onOpenModal,
  webformatURL,
}) {
  return (
    <li
      className={s.imageGalleryItem}
      onClick={() => onSetImg(largeImageURL, tags)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItemImage}
        onClick={onOpenModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  onSetImg: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
