import React, { Component } from "react";
import CrossIcon from "../Icons/CrossIcon";
import "../../css/style.css";
// import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
// import DashboardCard11 from "../../partials/dashboard/DashboardCard11";
import FlipCard from "../FipCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      flipCards: [1, 2, 3], // Initial flip cards
    };
  }




  render() {
    const { book, onClose } = this.props;
    const { flipCards } = this.state;

    // Slider settings
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <div className="fixed flex justify-center top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] overflow-y-auto">
        <div className="absolute bg-netflix-black-2 z-[1000] w-[98%] lg:w-7/12 rounded-md top-5">
          <div className="h-full w-full relative">
            <button
              onClick={onClose}
              className="flex absolute top-4 right-4 justify-center items-center  bg-netflix-black-2  w-9 h-9 rounded-full z-20"
            >
              <CrossIcon width={18} height={18} color="white" />
            </button>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Slider for FlipCards */}
            <Slider {...settings} className="mb-4">
              {/* Render FlipCards */}
              {book?.questions.map((questionObj, index) => (
                <div key={index} className="px-3">
                  <div className="py-4">
                    <FlipCard
                      question={questionObj.question}
                      answer={questionObj.answer}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            {/* Button to add more FlipCards */}
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
