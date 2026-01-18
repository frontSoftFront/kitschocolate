import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
// components
import ImageComponent from '../image';
// ui
import { Flex } from '../../ui';
// //////////////////////////////////////////////////

const OrderImage = ({ extraImages }) => {
  const initialImage = R.head(extraImages);

  const [activeImage, setActiveImage] = useState(initialImage);

  useEffect(() => setActiveImage(initialImage), [extraImages]);

  const condition = R.gte(R.length(extraImages), 5);

  const list = condition ? R.without(activeImage, extraImages) : extraImages;

  return (
    <Flex
      width="100%"
      maxWidth={[350, 400, 400]}
      mx={['auto', 'auto', 'unset']}
      alignItems={['center', 'center', 'unset']}
      flexDirection={['column-reverse', 'column-reverse', 'row']}
    >
      <Flex
        mr={[0, 0, 20]}
        mt={[20, 20, 0]}
        maxHeight={[100, 80, 430]}
        width={['100%', '100%', 70]}
        justifyContent="space-between"
        height={['20%', '20%', '100%']}
        flexDirection={['row', 'row', 'column']}
      >
        {list.map((img, index) => (
          <ImageComponent
            fill
            src={img}
            key={index}
            cursor="pointer"
            placeholder="blur"
            onClick={() => setActiveImage(img)}
            wrapperStyles={{
              width: ['20%', '20%', '100%'],
              height: ['100%', '100%', '23%']
            }}
          />
        ))}
      </Flex>
      <ImageComponent
        fill
        src={activeImage}
        placeholder="blur"
        wrapperStyles={{
          maxWidth: 300,
          maxHeight: 430,
          height: [350, 350, 'auto'],
          width: ['100%', '100%', '80%']
        }}
      />
    </Flex>
  );
};

export default OrderImage;
