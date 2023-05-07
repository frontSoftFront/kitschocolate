import * as R from 'ramda';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
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
import { Flex, StyledLink } from '../../ui';
// feature header
import { Nav, NavItem, BasketCount, StyledHeader } from './ui';
// //////////////////////////////////////////////////

const BasketIcon = ({ router }) => {
  const [basketOpened, setBasketOpened] = useState(false);
  const handleCloseBasket = () => {
    setBasketOpened(false);
    document.getElementsByTagName('body')[0].style.overflow = 'initial';
  };
  const basketList = useSelector(state => state.basket.basketList);
  const handleOpenBasket = () => {
    if (H.isNotNilAndNotEmpty(basketList)) {
      setBasketOpened(true);
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  };
  let count = R.compose(
    R.sum,
    R.map(R.prop('quantity')),
    R.values
  )(basketList);
  if (R.gt(count, 100)) count = 100;

  return (
    <>
      <Flex mb={10}>
        <Icon iconName="basket" handleClick={handleOpenBasket} />
        {R.gt(count, 0) && <BasketCount>{count}</BasketCount>}
      </Flex>
      {basketOpened && (
        <Portal selector="#modal">
          <Basket
            router={router}
            basketList={basketList}
            handleCloseBasket={handleCloseBasket}
          />
        </Portal>
      )}
    </>
  );
};

const DesktopHeader = ({ router, activeNavItem, handleGoToHomePage }) => (
  <StyledHeader>
    <Flex
      py={15}
      alignItems="flex-end"
      borderBottom="1px solid"
      justifyContent="space-between"
      borderColor={Theme.colors.lighterGrey}
    >
      <Icon iconName="logo" handleClick={handleGoToHomePage} />
      <Nav
        mb={10}
        mx="auto"
        maxWidth={750}
        width="calc(100% - 180px)"
        justifyContent="space-between"
      >
        {C.NAV_ITEMS.map(({ link, title }, index) => (
          <Link key={index} href={link} legacyBehavior>
            <NavItem
              textTransform="uppercase"
              fontSize={[12, 13, 14, 16]}
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
  mounted,
  menuOpened,
  firebaseData,
  animationName,
  activeNavItem,
  handleToggleMenu,
  handleGoToHomePage
}) => {
  if (R.not(R.path(['requested', 'shop'], firebaseData))) {
    useFirebaseConnect('shop');
  }

  return (
    <header>
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
    </header>
  );
};

const Header = ({
  router,
  firebaseData,
  activeNavItem,
  handleGoToHomePage
}) => {
  const { width } = useWindowSize();

  const [mounted, setMounted] = useState(false);
  const [menuOpened, toggleMenu] = useState(false);
  const [animationName, setAnimationName] = useState('');
  const handleToggleMenu = () => {
    if (menuOpened) {
      setAnimationName('slide-left');

      toggleMenu(false);
      setTimeout(() => setMounted(false), 400);
    } else {
      toggleMenu(true);
      setMounted(true);
      setAnimationName('slide-right');
    }
  };

  const headerProps = {
    router,
    mounted,
    toggleMenu,
    menuOpened,
    firebaseData,
    animationName,
    activeNavItem,
    handleToggleMenu,
    handleGoToHomePage
  };

  if (R.lt(width, 600)) return <MobileHeader {...headerProps} />;

  return <DesktopHeader {...headerProps} />;
};

export default Header;
