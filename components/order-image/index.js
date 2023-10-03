import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
// ui
import { Img, Flex } from '../../ui';
// //////////////////////////////////////////////////

const OrderImage = ({ extraImages }) => {
  const initialImage = R.head(extraImages);

  const [activeImage, setActiveImage] = useState(initialImage);

  useEffect(() => setActiveImage(initialImage), [extraImages]);

  return (
    <Flex
      width="100%"
      maxWidth={[350, 400, '45%']}
      mx={['auto', 'auto', 'unset']}
      flexDirection={['column-reverse', 'column-reverse', 'row']}
    >
      <Flex
        mr={[0, 0, 20]}
        mt={[20, 20, 0]}
        maxHeight={[100, 80, 'unset']}
        justifyContent="space-between"
        width={['100%', '100%', '20%']}
        height={['20%', '20%', '100%']}
        flexDirection={['row', 'row', 'column']}
      >
        {R.without(activeImage, extraImages).map((img, index) => (
          <Img
            src={img}
            key={index}
            cursor="pointer"
            width={['20%', '20%', '100%']}
            height={['100%', '100%', '20%']}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </Flex>
      <Img
        src={activeImage}
        height={[350, 350, 'auto']}
        width={['100%', '100%', '80%']}
      />
    </Flex>
  );
};

export default OrderImage;
