import { Component } from "react";
import s from "./Button.module.css";
export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={s.loadButton}
        onClick={this.props.onNextPageImg}
      >
        Load more
      </button>
    );
  }
}
