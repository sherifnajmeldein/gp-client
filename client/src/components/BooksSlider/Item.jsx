import React from "react";
import cx from "classnames";
import SliderContext from "./context";
import ShowDetailsButton from "./ShowDetailsButton";
import "./Item.css";

const Item = ({ book }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === book.id;
      return (
        <div
          ref={elementRef}
          className={cx("item", {
            "item--open": isActive,
          })}
        >
          <div className="relative">
            <img src={book.image} className="w-full" alt="" />
            <div className="absolute bottom-0 left-4 right-16 top-2 p-5  text-white">
              <h5 className="text-sm font-semibold mb-1">{book.name}</h5> 
            </div>
          </div>
          <ShowDetailsButton book={book} onClick={() => onSelectSlide(book)} />
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
