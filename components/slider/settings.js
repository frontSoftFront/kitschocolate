// components
import Icon from '../../icons';
// ui
import { AbsoluteBox } from '../../ui';
// //////////////////////////////////////////////////

const appendDots = dots => <div style={{ bottom: -40 }}>{dots}</div>;

const PrevArrow = ({ onClick }) => (
  <AbsoluteBox
    top="35%"
    zIndex={20}
    left={[0, -20, -30, -40]}
    display={['none', 'block']}
  >
    <Icon
      w="100%"
      h="100%"
      width={35}
      height={35}
      color="#644543"
      handleClick={onClick}
      iconName="arrowLeftSimple"
    />
  </AbsoluteBox>
);

const NextArrow = ({ onClick }) => (
  <AbsoluteBox
    zIndex={20}
    top="35%"
    display={['none', 'block']}
    right={[0, -20, -30, -40]}
  >
    <Icon
      w="100%"
      h="100%"
      width={35}
      height={35}
      color="#644543"
      handleClick={onClick}
      iconName="arrowRightSimple"
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
      breakpoint: 1100,
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
