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

const KEY = "22453348-6986f932e651dfab56ec0e491";
const URL = "ttps://pixabay.com/api/?image_type=photo&orientation=horizontal";
const AMOUNT_IMAGES = 12;

function ImageApiService(query, page) {
  const url = `${URL}&q=${query}&page=${page}&per_page=${AMOUNT_IMAGES}&key=${KEY}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Нет картинок с запросом ${query}`));
  });
}

export default ImageApiService;

////////////////////////////////////////////////////////////////////////////////////////////////

// const KEY = "22453348-6986f932e651dfab56ec0e491";
// const URL = "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
// const AMOUNT_IMAGES = 12;

// const ImageApiService = async (query, page) => {
//   const url = `${URL}&q=${query}&page=${page}&per_page=${AMOUNT_IMAGES}&key=${KEY}`;

//   const response = await fetch(url);
//   const fetchObject = await response.json();

//   if (fetchObject.length !== 0) {
//     return fetchObject;
//   }
//   return Promise.reject(new Error(`No pictures with name "${query}"`));
// };

// export default ImageApiService;
