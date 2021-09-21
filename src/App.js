import { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGalleryInfo from "./components/ImageGalleryInfo/ImageGalleryInfo";

class App extends Component {
  state = { searchQuery: "" };

  hendleFormSubmit = (search) => {
    this.setState({ searchQuery: search });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.hendleFormSubmit} />
        <ImageGalleryInfo searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
export default App;
