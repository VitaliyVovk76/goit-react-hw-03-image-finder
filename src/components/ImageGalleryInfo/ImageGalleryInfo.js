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

// const imageApiService = new ImageApiService();

class ImageGalleryInfo extends Component {
  state = {
    images: [],
    error: null,
    page: 1,
    status: Status.IDLE,

    showModal: false,
    imgModal: { img: "", alt: "" },
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    //     if (prevQuery !== nextQuery) {
    //       this.setState({ status: Status.PENDING, query: nextQuery });

    //       setTimeout(() => {
    //         imageApiService
    //           .fetchRequest(nextQuery)
    //           .then((images) => {
    //             this.setState({ images, status: Status.RESOLVED });
    //           })
    //           .catch((error) => {
    //             this.setState({ error, status: Status.REJECTED });
    //           });
    //       }, 1500);
    //     }
    //   }
    if (prevQuery !== nextQuery) {
      this.setState({
        page: 1, //searchBar
        images: [], // searchBar
        // isClickButtonLoadMore: false,
      });

      if (nextQuery === "") {
        setTimeout(() => {
          this.setState({
            error: {
              message: "Ops, empty. Please enter something...",
            },
            status: Status.REJECTED,
          });
        }, 500);
        return;
      }

      this.fetchImages(nextQuery, 1);
    }
  }

  fetchImages(query, page) {
    this.setState({
      status: Status.PENDING,
    });

    imageApiService(query, page)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          status: Status.RESOLVED,
        }));
        this.scroll();
      })
      .catch((error) =>
        this.setState({
          error: {
            message: "Sorry, no more pictures ...",
          },
          status: Status.REJECTED,
        })
      );
  }

  //   setImgModal = (img, alt) => {
  //     this.setState({ imgModal: img, alt: alt });
  //   };

  //   toggleModal = (data) => {
  //     this.setState(({ showModal }) => ({ showModal: !showModal }));
  //     console.log("ShowModal:");
  //     console.log(this.state.showModal);
  //   };
  //   nextPageImg() {
  //     // imageApiService.incrementPage();
  //     imageApiService.fetchRequest(this.state.query);
  //     // console.log(this.state.query);
  //     // console.log(this.state.showModal);
  //     console.log("helloddfsdafa");
  //   }

  render() {
    const { images, error, status, showModal } = this.state;
    console.log(this.state.images);
    if (status === Status.IDLE) {
      return null;
    }
    if (status === Status.PENDING) {
      return (
        <div className={s.loader}>
          <Loader />
          <p>Загружаем...</p>
        </div>
      );
    }
    if (status === Status.RESOLVED && showModal) {
      return (
        <>
          <ImageGallery
            images={images}
            onOpenModal={this.toggleModal}
            onSetImg={this.setImgModal}
          />
          <Modal
            onCloseModal={this.toggleModal}
            imgModal={this.state.imgModal}
          />
          ;
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
          <Button onNextPageImg={this.nextPageImg} />
        </>
      );
    }

    if (status === Status.REJECTED) {
      return <ImageGalleryError message={error.message} />;
    }
  }
}
export default ImageGalleryInfo;
