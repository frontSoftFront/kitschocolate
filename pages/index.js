import * as R from 'ramda';
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

const Content = ({ data, router, chocolates }) => {
  const { images, recurringOrders } = data;
  const { section1, holidaySet } = images;
  const { left, right } = section1;

  const recurringOrderList = R.map(
    id => R.path([id], chocolates),
    recurringOrders
  );

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
            <PageTitle {...Theme.styles.mainPageTitle} mt={20} mr={10}>
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
          З’явився новий шоколад
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
            Недивлячись на цей непростий час, ми вирішили, що таким чином дамо
            змогу привітати один одного дистанційно, яскраво і шоколадно. Ми
            розробили 3 набори:
          </Text>
        </Article>
        <HolidaySetSlider list={holidaySet} />
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

const HomePage = ({ router, firebaseData }) => {
  const home = R.pathOr({}, ['data', 'home'], firebaseData);
  const chocolates = R.pathOr({}, ['data', 'chocolates'], firebaseData);

  return (
    <Layout
      title="Home"
      router={router}
      firebaseData={firebaseData}
      collections={['home', 'chocolates']}
    >
      <Content data={home} router={router} chocolates={chocolates} />
    </Layout>
  );
};

export default HomePage;
