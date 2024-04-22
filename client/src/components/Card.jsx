import React, { Component } from "react";

class Card extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className="bg-netflix-gray-2 rounded-md">
        <div className="relative">
          <img className="rounded-t-md" src={book?.image}></img>
        </div>
      </div>
    );
  }
}

export default Card;
