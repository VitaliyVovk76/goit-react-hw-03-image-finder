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
      // onClick={onSetImg(largeImageURL, tags)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItemImage}
        //////////////////////
        onClick={onOpenModal}
        //////////////////////
      />
    </li>
  );
}
