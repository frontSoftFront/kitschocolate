import React from 'react';
// components
import Header from '../header';
import Footer from '../footer';
// ui
import { PageWrapper } from '../../ui';
// //////////////////////////////////////////////////

const Layout = ({ children }) => (
  <PageWrapper>
    <Header />
    {children}
    <Footer />
  </PageWrapper>
);

export default Layout;
