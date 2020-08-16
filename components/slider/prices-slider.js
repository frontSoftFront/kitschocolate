import Slider from 'react-slick';
import React, { useRef } from 'react';
// components
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Text, Flex } from '../../ui';
// slider
import { priceSettings } from './settings';
// ////////////////////////////////////////////////

const PricesSlider = ({ mt, list, title }) => {
  const slider = useRef(null);
  const next = () => slider.current.slickNext();
  const prev = () => slider.current.slickPrev();

  return (
    <Box mt={mt}>
      <Flex px={20} mb={20} alignItems="center" justifyContent="space-between">
        {title && (
          <Text
            fontSize={25}
            lineHeight={1.2}
            textDecoration="underline"
            color={Theme.colors.quincy}
          >
            {title}
          </Text>
        )}
        <Flex ml="auto" width="max-content">
          <Icon iconName="arrow" handleClick={prev} />
          <Icon ml={20} iconName="styledArrow" handleClick={next} />
        </Flex>
      </Flex>
      <Slider ref={slider} {...priceSettings}>
        {list.map(({ price, title, imageUrl }, index) => (
          <Box key={index} px={20}>
            <Img width="100%" height="100%" src={imageUrl} maxHeight={400} />
            <Box mx="auto" mt={40} width="90%">
              <Text
                fontSize={18}
                fontWeight={600}
                textAlign="center"
                color={Theme.colors.congoBrown}
              >
                {title}
              </Text>
              <Text
                mt={10}
                fontSize={18}
                fontWeight="bold"
                textAlign="center"
                color={Theme.colors.congoBrown}
              >
                {price} грн
              </Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PricesSlider;
