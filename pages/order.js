import * as R from 'ramda';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { wrapper } from '../store';
// actions
import actions from '../store/action';
// ////////////////////////////////////////////////

const OrderPage = props => {
  const basket = useSelector(state => state.basket);
  const data = R.merge(basket, { sdaasd: 3232 });
  const dispatch = useDispatch();
  return (
    <div>
      <div onClick={() => dispatch(actions.basketActions.setBasketList(data))}>hello</div>
      <Link passHref href='/'>
        home
      </Link>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps();

export default OrderPage;
