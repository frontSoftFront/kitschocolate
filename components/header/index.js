import * as R from 'ramda';
import Link from 'next/link';
import { useState } from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// components
import Menu from '../menu';
import Portal from '../portal';
import Basket from '../basket';
import ToggleIcon from '../menu/toggle-icon';
// constants
import * as C from '../../constants';
// helpers
import * as H from '../../helpers';
// hooks
import { useWindowSize } from '../../hooks/use-window-size';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Flex } from '../../ui';
// feature header
import { Nav, NavItem, BasketCount, StyledHeader } from './ui';
// //////////////////////////////////////////////////

const makeSelectBasket = createSelector(
  ({ basket }) => basket,
  ({ basketList }) => {
    let basketCount = R.compose(
      R.sum,
      R.map(R.prop('quantity')),
      R.values
    )(basketList);

    if (R.gt(basketCount, 100)) basketCount = 100;

    return { basketList, basketCount };
  }
);

const BasketIcon = ({ router }) => {
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

  return (
    <>
      <Flex mb={10}>
        <Icon iconName="basket" handleClick={handleOpenBasket} />
        {R.gt(basketCount, 0) ? <BasketCount>{basketCount}</BasketCount> : null}
      </Flex>
      {basketOpened ? (
        <Portal selector="#modal">
          <Basket
            router={router}
            basketList={basketList}
            handleCloseBasket={handleCloseBasket}
          />
        </Portal>
      ) : null}
    </>
  );
};

const DesktopHeader = ({ router, activeNavItem, handleGoToHomePage }) => (
  <StyledHeader px={[25, 25, 50, 75]}>
    <Flex
      py={15}
      mx="auto"
      maxWidth={1440}
      alignItems="flex-end"
      borderBottom="1px solid"
      justifyContent="space-between"
      borderColor={Theme.colors.lighterGrey}
    >
      <Icon iconName="logo" handleClick={handleGoToHomePage} />
      <Nav
        mb={10}
        mx="auto"
        maxWidth={650}
        // maxWidth={750}
        width="calc(100% - 180px)"
        justifyContent="space-between"
      >
        {R.tail(C.NAV_ITEMS).map(({ link, title }, index) => (
          <Link key={index} href={link} legacyBehavior>
            <NavItem
              textTransform="uppercase"
              fontSize={[12, 12, 14, 16]}
              active={activeNavItem(link)}
            >
              {title}
            </NavItem>
          </Link>
        ))}
      </Nav>
      <BasketIcon router={router} />
    </Flex>
  </StyledHeader>
);

const MobileHeader = ({
  router,
  firebaseData,
  activeNavItem,
  handleGoToHomePage
}) => {
  const [mounted, setMounted] = useState(false);
  const [menuOpened, toggleMenu] = useState(false);
  const [animationName, setAnimationName] = useState('');

  const handleToggleMenu = () => {
    if (menuOpened) {
      setAnimationName('slide-left');

      toggleMenu(false);
      setTimeout(() => setMounted(false), 400);

      document.getElementsByTagName('body')[0].style.overflow = 'initial';
    } else {
      toggleMenu(true);
      setMounted(true);
      setAnimationName('slide-right');

      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  };

  return (
    <StyledHeader px={[25, 25, 50, 75]}>
      <Flex py={15} alignItems="center" justifyContent="space-between">
        <ToggleIcon menuOpened={menuOpened} action={handleToggleMenu} />
        <Icon h={50} iconName="logo" handleClick={handleGoToHomePage} />
        <Flex>
          <BasketIcon router={router} />
          <Flex ml={25}>
            {mounted && (
              <Portal selector="#menu">
                <Menu
                  router={router}
                  activeNavItem={activeNavItem}
                  animationName={animationName}
                  handleToggleMenu={handleToggleMenu}
                  data={R.pathOr([], ['data'], firebaseData)}
                />
              </Portal>
            )}
          </Flex>
        </Flex>
      </Flex>
    </StyledHeader>
  );
};

const Header = ({
  router,
  firebaseData,
  activeNavItem,
  handleGoToHomePage
}) => {
  const { width } = useWindowSize();

  const headerProps = {
    router,
    firebaseData,
    activeNavItem,
    handleGoToHomePage
  };

  if (R.lt(width, 650)) return <MobileHeader {...headerProps} />;

  return <DesktopHeader {...headerProps} />;
};

export default Header;
