import { Component } from "react";
import imageApiService from "../../servises/image-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryError from "../ImageGalleryError/ImageGalleryError";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import s from "./ImageGalleryInfo.module.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
class ImageGalleryInfo extends Component {
  state = {
    images: [],
    error: null,
    page: 1,
    status: Status.IDLE,
    showModal: false,
    // imgModal: { img: "", alt: "" },
    imgModal: null,
    isClickButtonLoadMore: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({
        page: 1,
        images: [],
        isClickButtonLoadMore: false,
      });

      this.fetchImages(nextQuery, 1);
    }

    if (nextPage === 1) {
      return;
    }

    if (prevPage !== nextPage) {
      this.setState({
        isClickButtonLoadMore: true,
      });

      this.fetchImages(prevQuery, nextPage);
    }
  }

  fetchImages(query, page) {
    this.setState({
      status: Status.PENDING,
    });

    imageApiService(query, page)
      .then((images) => {
        if (images.total === 0) {
          return this.setState({
            error: {
              message: `There are no pictures with the name ${query}`,
            },
            status: Status.REJECTED,
          });
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...images.hits],
          status: Status.RESOLVED,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) =>
        this.setState({
          //   error: {
          //     message: `There are no pictures with the name ${query}`,
          //   },
          error,
          status: Status.REJECTED,
        })
      );
  }

  setImgModal = (img, alt) => {
    this.setState({ imgModal: { img: img, alt: alt } });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pageIncrement = () =>
    this.setState((prevState) => ({ page: prevState.page + 1 }));

  render() {
    const {
      images,
      error,
      status,
      showModal,
      imgModal,
      isClickButtonLoadMore,
    } = this.state;
    if (status === Status.IDLE) {
      return null;
    }
    if (status === Status.PENDING) {
      return (
        <>
          {isClickButtonLoadMore && (
            <ImageGallery
              images={images}
              onOpenModal={this.toggleModal}
              onSetImg={this.setImgModal}
            />
          )}
          <div className={s.loader}>
            <Loader />
            <p>Загружаем...</p>
          </div>
        </>
      );
    }
    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGallery
            images={images}
            onOpenModal={this.toggleModal}
            onSetImg={this.setImgModal}
          />
          <Button onNextPageImg={this.pageIncrement} />

          {showModal && (
            <Modal onCloseModal={this.toggleModal} imgModal={imgModal} />
          )}
        </>
      );
    }
    if (status === Status.REJECTED) {
      return <ImageGalleryError message={error.message} />;
    }
  }
}
export default ImageGalleryInfo;
