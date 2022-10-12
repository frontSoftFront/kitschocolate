// components
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { AbsoluteBox } from '../../ui';
// //////////////////////////////////////////////////

const appendDots = dots => <div style={{ bottom: -40 }}>{dots}</div>;

const PrevArrow = ({ style, onClick, className }) => (
  <AbsoluteBox top="35%" left="-40px">
    <Icon
      w="100%"
      h="100%"
      width={35}
      height={35}
      iconName="arrow"
      handleClick={onClick}
    />
  </AbsoluteBox>
);

const NextArrow = ({ style, onClick, className }) => (
  <AbsoluteBox top="35%" right="-40px">
    <Icon
      w="100%"
      h="100%"
      width={35}
      height={35}
      handleClick={onClick}
      iconName="styledArrow"
    />
  </AbsoluteBox>
);

const defaultSettings = {
  appendDots,
  speed: 500,
  dots: true,
  swipe: false,
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
  infinite: true,
  slidesToShow: 4,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
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
