import * as R from 'ramda';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
// components
import Menu from '../menu';
import Portal from '../portal';
import { BasketModal } from '../basket';
import ToggleIcon from '../menu/toggle-icon';
// lib
import { makeSelectBasket } from '../../lib/redux';
// constants
import * as C from '../../constants';
// helpers
import * as H from '../../helpers';
// hooks
import { useWindowSize } from '../../hooks/use-window-size';
import { useBasketActions } from '../../hooks/use-basket-actions';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Flex } from '../../ui';
// feature header
import { Nav, NavItem, BasketCount, StyledHeader } from './ui';
// //////////////////////////////////////////////////

const BasketIcon = ({ mb = 10, router }) => {
  const {
    basketList,
    basketCount,
    basketOpened,
    handleOpenBasket,
    handleCloseBasket
  } = useBasketActions();

  const renderBasketIcon = useCallback(
    () => (
      <Flex mb={mb}>
        <Icon iconName="basket" handleClick={handleOpenBasket} />
        {R.gt(basketCount, 0) ? <BasketCount>{basketCount}</BasketCount> : null}
      </Flex>
    ),
    [mb, basketCount]
  );

  return (
    <BasketModal
      router={router}
      basketList={basketList}
      basketOpened={basketOpened}
      renderComponent={renderBasketIcon}
      handleOpenBasket={handleOpenBasket}
      handleCloseBasket={handleCloseBasket}
    />
  );
};

const DesktopHeader = ({
  router,
  activeNavItem,
  userAuthorized,
  handleNavigate
}) => {
  return (
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
        <Icon iconName="logo" handleClick={() => handleNavigate('/')} />
        <Nav
          mb={10}
          mx="auto"
          width="calc(100% - 180px)"
          justifyContent="space-between"
          maxWidth={userAuthorized ? 800 : 650}
        >
          {R.tail(C.NAV_ITEMS).map(({ link, title }, index) => (
            <NavItem
              key={index}
              fontSize={[12, 12, 14, 16]}
              active={activeNavItem(link)}
              onClick={() => handleNavigate(link)}
              display={
                R.and(R.not(userAuthorized), R.equals(link, '/constructor'))
                  ? 'none'
                  : undefined
              }
            >
              {title}
            </NavItem>
          ))}
        </Nav>
        <BasketIcon router={router} />
      </Flex>
    </StyledHeader>
  );
};

const MobileHeader = ({
  router,
  firebaseData,
  activeNavItem,
  handleNavigate
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
        <Icon h={50} iconName="logo" handleClick={() => handleNavigate('/')} />
        <Flex>
          <BasketIcon mb={0} router={router} />
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
  userAuthorized,
  activeNavItem,
  handleNavigate
}) => {
  const { width } = useWindowSize();

  const headerProps = {
    router,
    firebaseData,
    activeNavItem,
    userAuthorized,
    handleNavigate
  };

  if (R.lt(width, 650)) return <MobileHeader {...headerProps} />;

  return <DesktopHeader {...headerProps} />;
};

export default Header;
