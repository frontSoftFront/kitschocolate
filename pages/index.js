import React from 'react';
// store
import { wrapper } from '../store';
// ////////////////////////////////////////////////

const HomePage = props => {
  return <div>Home Page</div>;
};

export const getStaticProps = wrapper.getStaticProps();

export default HomePage;
