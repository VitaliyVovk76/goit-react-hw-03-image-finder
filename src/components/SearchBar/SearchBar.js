import { Component } from "react";
import { ImSearch } from "react-icons/im";
import s from "./SearchBar.module.css";
class Searchbar extends Component {
  state = { searchQuery: "" };
  //записываем в state запрос
  hendleQueryChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };
  //делаем проверку на пустоту запроса, передаем значение state в Арр и чистим state
  hendleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      alert("Input query");
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };
  render() {
    return (
      <header className={s.searchBar}>
        <form className={s.searchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>
              <ImSearch />
              Search
            </span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.hendleQueryChange}
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
