const defaultSettings = {
  speed: 500,
  dots: false,
  infinite: true,
  initialSlide: 0,
  slidesToScroll: 1
};

export const holidaySetSettings = {
  ...defaultSettings,
  slidesToShow: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        swipe: true,
        infinite: true,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        swipe: true,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        swipe: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export const priceSettings = {
  ...defaultSettings,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        swipe: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        swipe: true,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        swipe: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
