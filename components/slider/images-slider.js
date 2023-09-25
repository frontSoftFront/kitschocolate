import * as R from 'ramda';
import Slider from 'react-slick';
// components
import ImageComponent from '../image';
// ui
import { Box } from '../../ui';
// slider
import { priceSettings } from './settings';
// ////////////////////////////////////////////////

const ImagesSlider = ({ pb, mt, mb, list }) => {
  const sliderSettings = R.assoc(
    'infinite',
    R.gt(R.length(4, list)),
    priceSettings
  );

  return (
    <Box mt={mt} mb={mb} pb={pb}>
      <Slider {...sliderSettings}>
        {list.map((src, index) => (
          <ImageComponent
            fill
            src={src}
            key={index}
            placeholder="blur"
            wrapperStyles={{
              mx: 10,
              // width: '100%',
              // cursor: 'pointer',
              height: [250, 250, 300, 350]
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ImagesSlider;
