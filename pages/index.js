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

export const FavoriteProducts = ({ shop, router, chocolates }) => {
  const favoriteChocolates = R.compose(
    R.map(id => R.prop(id, chocolates)),
    R.pathOr([], ['chocolates']),
    R.find(R.propEq('favorite', true)),
    R.values,
    R.pathOr([], ['categories'])
  )(shop);

  return (
    <Section py={Theme.styles.spacing.paddingY}>
      <SectionTitle {...Theme.styles.pageTitle}>
        Найчастіше замовляють
      </SectionTitle>
      <Box mt={Theme.styles.spacing.paddingY}>
        <PricesSlider router={router} list={favoriteChocolates} />
      </Box>
    </Section>
  );
};

const Content = ({ shop, data, router, chocolates }) => {
  const { images } = data;
  const { section1, holidaySet } = images;
  const { left, right } = section1;

  return (
    <>
      <Box py={Theme.styles.spacing.paddingY}>
        <Flex justifyContent="space-between">
          <Section
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <PageTitle {...Theme.styles.mainPageTitle} mt={20}>
              Welcome to Kit’s Chocolate
            </PageTitle>
            <Button
              my={20}
              border="2px solid"
              height={[30, 35, 40]}
              width={[200, 250, 300]}
              fontSize={[16, 18, 20]}
              textTransform="uppercase"
              color={Theme.colors.woodyBrown}
              onClick={() => router.push('/shop')}
            >
              Shop Online
            </Button>
            <Img
              src={left}
              maxWidth={644}
              maxHeight={364}
              width={['100%', '46vw']}
              height={['auto', '26vw']}
            />
          </Section>
          <Img
            src={right}
            width="34vw"
            height="100%"
            maxWidth={476}
            maxHeight={616}
            display={['none', 'block']}
          />
        </Flex>
      </Box>
      <Section py={Theme.styles.spacing.paddingY}>
        <SectionTitle {...Theme.styles.pageTitle}>
          З’явився новий шоколад
        </SectionTitle>
        <Article my={Theme.styles.spacing.paddingY}>
          <ArticleTitle
            fontSize={[15, 15, 20, 25]}
            color={Theme.colors.congoBrown}
          >
            Великоднім наборам бути!
          </ArticleTitle>
          <Text
            mt={20}
            fontWeight={300}
            fontSize={[14, 16, 18, 20]}
            color={Theme.colors.congoBrown}
          >
            Недивлячись на цей непростий час, ми вирішили, що таким чином дамо
            змогу привітати один одного дистанційно, яскраво і шоколадно. Ми
            розробили 3 набори:
          </Text>
        </Article>
        <HolidaySetSlider list={holidaySet} />
      </Section>
      <FavoriteProducts shop={shop} router={router} chocolates={chocolates} />
    </>
  );
};

const HomePage = ({ router, firebaseData }) => {
  const home = R.pathOr({}, ['data', 'home'], firebaseData);
  const shop = R.pathOr({}, ['data', 'shop'], firebaseData);
  const chocolates = R.pathOr({}, ['data', 'chocolates'], firebaseData);

  return (
    <Layout
      title="Home"
      router={router}
      firebaseData={firebaseData}
      collections={['home', 'shop', 'chocolates']}
    >
      <Content
        shop={shop}
        data={home}
        router={router}
        chocolates={chocolates}
      />
    </Layout>
  );
};

export default HomePage;
