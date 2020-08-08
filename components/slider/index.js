import * as R from 'ramda';
import Slider from 'react-slick';
import React, { useRef } from 'react';
// components
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Text, Flex } from '../../ui';
// ////////////////////////////////////////////////

const images = [
  '../static/home/chocolates/1.png',
  '../static/home/chocolates/2.png',
  '../static/home/chocolates/3.png',
  '../static/home/chocolates/4.png',
  '../static/home/chocolates/1.png',
  '../static/home/chocolates/2.png',
  '../static/home/chocolates/3.png',
  '../static/home/chocolates/4.png'
];

const settings = {
  speed: 500,
  dots: false,
  infinite: true,
  initialSlide: 0,
  slidesToShow: 4,
  slidesToScroll: 1,
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

const HomeSlider = props => {
  const slider = useRef(null);
  const next = () => slider.current.slickNext();
  const prev = () => slider.current.slickPrev();
  return (
    <Box>
      <Flex mb={20} mr={20} ml="auto" width="max-content">
        <Icon iconName="arrow" handleClick={prev} />
        <Icon ml={20} iconName="styledArrow" handleClick={next} />
      </Flex>
      <Slider ref={slider} {...settings}>
        {images.map((item, index) => (
          <Box key={index} px={20}>
            <Img src={item} width="100%" height="100%" maxHeight={400} />
            <Box mx="auto" mt={40} width="90%">
              <Text
                fontSize={18}
                fontWeight={600}
                textAlign="center"
                color={Theme.colors.congoBrown}
              >
                Молочний Шоколад з Кокосом
              </Text>
              <Text
                mt={10}
                fontSize={18}
                fontWeight="bold"
                textAlign="center"
                color={Theme.colors.congoBrown}
              >
                78 грн
              </Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HomeSlider;
