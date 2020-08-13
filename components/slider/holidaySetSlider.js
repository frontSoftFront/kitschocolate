import Slider from 'react-slick';
import React, { useRef } from 'react';
// components
import Icon from '../../icons';
// ui
import { Img, Box, Flex } from '../../ui';
// slider
import { holidaySetSettings } from './settings';
// ////////////////////////////////////////////////

const HolidaySetSlider = ({ list }) => {
  const slider = useRef(null);
  const next = () => slider.current.slickNext();
  const prev = () => slider.current.slickPrev();

  return (
    <Box>
      <Flex mb={20} mr={20} ml="auto" width="max-content">
        <Icon iconName="arrow" handleClick={prev} />
        <Icon ml={20} iconName="styledArrow" handleClick={next} />
      </Flex>
      <Slider ref={slider} {...holidaySetSettings}>
        {list.map((imageUrl, index) => (
          <Img
            key={index}
            width="100%"
            height="40vw"
            src={imageUrl}
            maxHeight={500}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default HolidaySetSlider;
