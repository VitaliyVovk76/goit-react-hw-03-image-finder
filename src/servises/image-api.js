// // function fetchImages(query) {
// //   const API_KEY = "22453348-6986f932e651dfab56ec0e491";
// //   const BASE_URL =
// //     "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
// //   const AMOUNT_IMAGES = 12;
// //   const page = 1;
// //   const url = `${BASE_URL}&q=${query}&page=${page}&per_page=${AMOUNT_IMAGES}&key=${API_KEY}`;
// //   return fetch(url).then((response) => {
// //     if (response.ok) {
// //       return response.json();
// //     }
// //     return Promise.reject(new Error("Enter liquidity request"));
// //   });
// // }

// // const api = { fetchImages };
// // export default api;

// class ImageApiService {
//   constructor() {
//     this.KEY = "22453348-6986f932e651dfab56ec0e491";
//     this.URL =
//       "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
//     this.AMOUNT_IMAGES = 12;
//     this.PAGE = 1;
//   }

//   //возвращает промис, его значение это hits - массив обьектов где наши картинки
//   fetchRequest(query) {
//     const url = `${this.URL}&q=${query}&page=${this.PAGE}&per_page=${this.AMOUNT_IMAGES}&key=${this.KEY}`;
//     return fetch(url).then((response) => {
//       if (response.ok) {
//         // this.incrementPage();
//         return response.json();
//       }
//       return Promise.reject(new Error("Enter liquidity request"));
//     });
//   }
//   incrementPage() {
//     return (this.page += 1);

//     // console.log("Next PAGE");
//     // console.log(this.PAGE);
//   }

//   resetPage() {
//     this.PAGE = 1;
//   }
// }

// export default ImageApiService;

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "22356210-f5a6fb995cd777b2b01184cc9";

const ImageApiService = async (searchQuery, page) => {
  const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    q: searchQuery,
    page,
    per_page: 12,
    key: `${API_KEY}`,
  });
  const url = `${BASE_URL}/?${searchParams}`;

  const response = await fetch(url);
  const fetchObject = await response.json();
  const imagesArray = await fetchObject.hit;

  if (imagesArray.length !== 0) {
    return imagesArray;
  }

  return Promise.reject(new Error(`No pictures with name "${searchQuery}"`));
};

export default ImageApiService;
