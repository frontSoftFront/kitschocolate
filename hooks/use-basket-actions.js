import { useState } from 'react';
import { useSelector } from 'react-redux';
// lib
import { makeSelectBasket } from '../lib/redux';
// helpers
import * as H from '../helpers';
// //////////////////////////////////////////////////

export const useBasketActions = () => {
  const [basketOpened, setBasketOpened] = useState(false);

  const handleCloseBasket = () => {
    setBasketOpened(false);
    document.getElementsByTagName('body')[0].style.overflow = 'initial';
  };

  const { basketList, basketCount } = useSelector(makeSelectBasket);

  const handleOpenBasket = () => {
    if (H.isNotNilAndNotEmpty(basketList)) {
      setBasketOpened(true);
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  };

  return {
    basketList,
    basketCount,
    basketOpened,
    setBasketOpened,
    handleOpenBasket,
    handleCloseBasket
  };
};
