import * as R from 'ramda';
// components
import Layout from '../components/layout';
import { ContactUs } from './partnership';
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

const Content = ({ shop, router, chocolates }) => {
  return (
    <>
      <Box py={Theme.styles.spacing.paddingY}>
        <Flex justifyContent="space-between">
          <Section
            mx="auto"
            display="flex"
            maxWidth={1200}
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <PageTitle {...Theme.styles.mainPageTitle} mt={20}>
              Вітаємо в Kit’s chocolate
            </PageTitle>
            <Button
              mt={20}
              height={40}
              order={[3, 0]}
              border="2px solid"
              width={[200, 250, 300]}
              fontSize={[16, 18, 20]}
              textTransform="uppercase"
              color={Theme.colors.woodyBrown}
              onClick={() => router.push('/shop')}
            >
              Обрати шоколад
            </Button>
            <Img
              mt={[20, 0]}
              maxWidth={644}
              maxHeight={364}
              src="/images/1.jpeg"
              width={['100%', '46vw']}
              height={['auto', '26vw']}
            />
          </Section>
          <Img
            width="34vw"
            height="100%"
            maxWidth={476}
            maxHeight={616}
            src="/images/2.jpeg"
            display={['none', 'block']}
          />
        </Flex>
      </Box>
      {/* <Section py={Theme.styles.spacing.paddingY}>
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
      </Section> */}
      <Section
        mx="auto"
        display="flex"
        flexWrap="wrap"
        maxWidth={1000}
        alignItems="center"
        justifyContent="space-around"
        py={Theme.styles.spacing.paddingY}
      >
        <SectionTitle
          width="100%"
          {...Theme.styles.pageTitle}
          mb={Theme.styles.spacing.paddingY}
        >
          Оберіть подарунковий набір
        </SectionTitle>
        <Img
          height="100%"
          maxHeight={400}
          src="/images/3.jpeg"
          width={['100%', '100%', '40%']}
        />
        <Article
          mt={[20, 20, 0]}
          lineHeight={1.54}
          fontSize={[12, 14, 15, 16]}
          width={['100%', '100%', '45%']}
          color={Theme.colors.congoBrown}
        >
          Ми залюбки підготуємо для вас та ваших рідних подарунковий набір з
          нашим шоколадом та естетичними подарунками від наших друзів: свічкою,
          чашкою, блокнотом, тощо. Напишіть нам
          <ContactUs mt={20} mx="unset" text="Contact Us" />
        </Article>
        {/* <HolidaySetSlider list={holidaySet} /> */}
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
