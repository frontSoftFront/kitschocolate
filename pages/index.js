import * as R from 'ramda';
// components
import Layout from '../components/layout';
import { ContactUs } from './partnership';
import ImageComponent from '../components/image';
import PricesSlider from '../components/slider/prices-slider';
// theme
import Theme from '../theme';
// ui
import {
  Box,
  Flex,
  Button,
  Section,
  Article,
  PageTitle,
  SectionTitle
} from '../ui';
// images
import Image1 from '../public/images/1.jpeg';
import Image2 from '../public/images/2.jpeg';
import Image3 from '../public/images/3.jpeg';
// ////////////////////////////////////////////////

export const FavoriteProducts = ({ shop, router, chocolates }) => {
  const favoriteChocolates = R.compose(
    R.reject(item => R.or(R.isNil(item), R.isEmpty(item))),
    R.map(id => R.prop(id, chocolates)),
    R.pathOr([], ['chocolates']),
    R.find(R.propEq('favorite', true)),
    R.values,
    R.pathOr([], ['categories'])
  )(shop);

  if (R.isEmpty(favoriteChocolates)) return null;

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

const Content = ({ shop, router, chocolates }) => (
  <>
    <Flex
      mx="auto"
      maxWidth={1200}
      justifyContent="space-around"
      py={Theme.styles.spacing.paddingY}
    >
      <Section
        display="flex"
        maxWidth={644}
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
      >
        <PageTitle {...Theme.styles.mainPageTitle} mt={[0, 20]} mb={[20, 0]}>
          Вітаємо в Kit’s chocolate
        </PageTitle>
        <Button
          mt={20}
          height={40}
          mb={[0, 20]}
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
        <ImageComponent
          src={Image1}
          alt="image1"
          placeholder="blur"
          layout="responsive"
          wrapperStyles={{
            maxWidth: 644,
            width: ['80%', '46vw']
          }}
        />
      </Section>
      <ImageComponent
        src={Image2}
        alt="image2"
        placeholder="blur"
        layout="responsive"
        wrapperStyles={{
          maxWidth: 420,
          width: '34vw',
          display: ['none', 'block']
        }}
      />
    </Flex>
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
      <ImageComponent
        src={Image3}
        alt="image3"
        placeholder="blur"
        layout="responsive"
        wrapperStyles={{
          width: ['80%', '80%', '40%']
        }}
      />
      <Article
        mt={[20, 20, 0]}
        lineHeight={1.54}
        fontSize={[12, 14, 15, 16]}
        width={['100%', '100%', '45%']}
        color={Theme.colors.congoBrown}
      >
        Ми залюбки підготуємо для вас та ваших рідних подарунковий набір з нашим
        шоколадом та естетичними подарунками від наших друзів: свічкою, чашкою,
        блокнотом, тощо. Напишіть нам
        <ContactUs mt={20} text="Напишіть Нам" mx={['auto', 'unset']} />
      </Article>
    </Section>
    <FavoriteProducts shop={shop} router={router} chocolates={chocolates} />
  </>
);

const HomePage = () => (
  <Layout title="Home" collections={['shop', 'chocolates']}>
    {({ router, firebaseData }) => {
      const shop = R.pathOr({}, ['data', 'shop'], firebaseData);
      const chocolates = R.pathOr({}, ['data', 'chocolates'], firebaseData);

      return <Content shop={shop} router={router} chocolates={chocolates} />;
    }}
  </Layout>
);

export default HomePage;
