import React, { useState } from 'react';
// ui
import { Img, Flex } from '../../ui';
// //////////////////////////////////////////////////

const OrderImage = ({ imageUrl, extraImages }) => {
  const [activeImage, setActiveImage] = useState(imageUrl);

  return (
    <Flex width="45%">
      <Flex
        mr={20}
        width="20%"
        height="100%"
        flexDirection="column"
        justifyContent="space-between"
      >
        {extraImages.map((img, index) => (
          <Img
            src={img}
            key={index}
            width="100%"
            height="20%"
            cursor="pointer"
            onClick={() => setActiveImage(img)}
          />
        ))}
      </Flex>
      <Img src={activeImage} width="80%" />
    </Flex>
  );
};

export default OrderImage;
