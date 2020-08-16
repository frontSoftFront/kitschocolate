import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, useFirestoreConnect } from 'react-redux-firebase';
// components
import Layout from '../components/layout';
import PricesSlider from '../components/slider/prices-slider';
import HolidaySetSlider from '../components/slider/holidaySetSlider';
// theme
import Theme from '../theme';
// ui
import {
  Img,
  Box,
  Flex,
  Text,
  Button,
  Section,
  Article,
  PageTitle,
  SectionTitle,
  ArticleTitle
} from '../ui';
// ////////////////////////////////////////////////

const HomePage = () => {
  useFirebaseConnect('home');
  useFirestoreConnect('home');
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'home'], state)
  );
  const loading = R.isNil(data);
  if (loading) return <div>Loading...</div>;
  const { images, recurringOrders } = data;
  const { section1, holidaySet } = images;
  const { left, right } = section1;
  const holidaySetList = R.values(holidaySet);
  const recurringOrderList = R.values(recurringOrders);

  return (
    <Layout title="Home">
      <Box py={50} borderBottom="2px solid" borderColor={Theme.colors.quincy}>
        <Flex justifyContent="space-between">
          <Section
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <PageTitle
              mt={20}
              mr={10}
              fontSize={40}
              lineHeight={1.33}
              fontWeight="bold"
              textAlign="center"
              color={Theme.colors.woodyBrown}
            >
              Welcome to Kit’s Chocolate
            </PageTitle>
            <Button
              my={20}
              width={300}
              height={40}
              fontSize={20}
              border="2px solid"
              textTransform="uppercase"
              color={Theme.colors.woodyBrown}
            >
              Shop Online
            </Button>
            <Img
              src={left}
              width="46vw"
              height="26vw"
              maxWidth={644}
              maxHeight={364}
            />
          </Section>
          <Img
            src={right}
            width="34vw"
            height="100%"
            maxWidth={476}
            maxHeight={616}
          />
        </Flex>
      </Box>
      <Section
        py={50}
        borderBottom="2px solid"
        borderColor={Theme.colors.quincy}
      >
        <SectionTitle
          fontSize={45}
          textAlign="center"
          color={Theme.colors.congoBrown}
        >
          З’явився новий  шоколад
        </SectionTitle>
        <Article my={50}>
          <ArticleTitle fontSize={25} color={Theme.colors.congoBrown}>
            Великоднім наборам бути!
          </ArticleTitle>
          <Text
            mt={20}
            fontSize={20}
            fontWeight={300}
            color={Theme.colors.congoBrown}
          >
            Недивлячись на цей непростий час, ми вирішили, що таким чином дамо змогу привітати один одного дистанційно, яскраво і шоколадно. Ми розробили 3 набори: 
          </Text>
        </Article>
        <HolidaySetSlider list={holidaySetList} />
      </Section>
      <Section py={50}>
        <SectionTitle
          fontSize={45}
          textAlign="center"
          color={Theme.colors.congoBrown}
        >
          Найчастіше замовляють
        </SectionTitle>
        <Box mt={50}>
          <PricesSlider list={recurringOrderList} />
        </Box>
      </Section>
    </Layout>
  );
};

export default HomePage;
