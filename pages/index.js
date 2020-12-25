import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
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
  ArticleTitle,
  PageTitleComponent
} from '../ui';
// ////////////////////////////////////////////////

const Content = ({ data, router }) => {
  const { images, recurringOrders } = data;
  const { section1, holidaySet } = images;
  const { left, right } = section1;
  const holidaySetList = R.values(holidaySet);
  const recurringOrderList = R.values(recurringOrders);

  return (
    <>
      <Box py={50} borderBottom="2px solid" borderColor={Theme.colors.quincy}>
        <Flex justifyContent="space-between">
          <Section
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <PageTitleComponent
              mt={20}
              mr={10}
              text="Welcome to Kit’s Chocolate"
            />
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
          <PricesSlider router={router} list={recurringOrderList} />
        </Box>
      </Section>
    </>
  );
};

const HomePage = ({ router }) => {
  useFirebaseConnect('home');
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'home'], state)
  );
  const loading = R.isNil(data);

  return (
    <Layout title="Home" router={router} loading={loading}>
      <Content data={data} router={router} />
    </Layout>
  );
};

export default HomePage;
