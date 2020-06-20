import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { wrapper } from '../store';
// actions
import actions from '../store/action';
// ////////////////////////////////////////////////

const HomePage = props => {
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();
  const handler = () =>
    dispatch(actions.basketActions.setBasketList({ some: 2 }));
  return (
    <div>
      <div onClick={() => dispatch(actions.basketActions.setBasketList({ some: 2 }))}>hello</div>
      <Link passHref href='/order'>
        order
      </Link>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps();

export default HomePage;
