import * as R from 'ramda';
import { useState } from 'react';
// components
import Portal from '../components/portal';
import Layout from '../components/layout';
import AddItem from '../components/add-item';
import ItemComponent from '../components/item';
// theme
import Theme from '../theme';
// ui
import { Box, Grid, Flex, Button } from '../ui';
// ////////////////////////////////////////////////

const tabs = [
  {
    title: 'Шоколадки',
    collection: ['chocolates']
  },
  {
    title: 'Рецепти',
    collection: ['recipes']
  },
  {
    title: 'Питання - Відповіді',
    collection: ['questions-answers', 'customer-questions']
  },
  {
    title: 'Замовлення',
    collection: ['orders']
  },
  {
    title: 'Images',
    collection: ['orders']
  }
];

const Content = ({ router, firebaseData }) => {
  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const chocolates = R.compose(
    R.sortBy(R.prop('order')),
    R.values,
    R.pathOr([], ['data', 'chocolates'])
  )(firebaseData);
  const recipes = R.compose(
    R.sortBy(R.prop('order')),
    R.values,
    R.pathOr([], ['data', 'recipes'])
  )(firebaseData);
  const handleRemoveItem = item => {
    console.log('item', item);
  };
  const handleEditItem = item => {
    console.log('item', item);
  };

  return (
    <>
      <Flex
        mt={50}
        pb={10}
        width="100%"
        borderBottom="2px solid"
        borderColor={Theme.colors.woodyBrown}
      >
        {tabs.map(({ title }, index) => (
          <Box
            p={10}
            key={index}
            cursor="pointer"
            color={Theme.colors.quincy}
            onClick={() => setActiveTab(index)}
            boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
            fontWeight={R.equals(index, activeTab) ? 'bold' : 400}
          >
            {title}
          </Box>
        ))}
        <Button
          {...Theme.styles.actionButton}
          ml="auto"
          height={39}
          width={150}
          onClick={() => setOpened(true)}
        >
          Add
        </Button>
      </Flex>
      <Grid
        gridGap="20px"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {R.equals(activeTab, 0) &&
          chocolates.map((item, index) => (
            <ItemComponent
              px="0px"
              key={index}
              item={item}
              itemType="configurable"
              handleEditItem={handleEditItem}
              handleRemoveItem={handleRemoveItem}
              imgSize={{ width: '100%', height: 350 }}
              handleGoToDetailPage={id => router.push(`/shop/${id}`)}
            />
          ))}
        {R.equals(activeTab, 1) &&
          recipes.map((item, index) => (
            <ItemComponent
              px="0px"
              key={index}
              item={item}
              itemType="configurable"
              handleEditItem={handleEditItem}
              handleRemoveItem={handleRemoveItem}
              imgSize={{ width: '100%', height: 350 }}
              handleGoToDetailPage={id => router.push(`/recipes/${id}`)}
            />
          ))}
      </Grid>
      {opened && (
        <Portal selector="#modal">
          <AddItem
            handleClose={() => setOpened(false)}
          />
        </Portal>
      )}
    </>
  );
};

const AboutPage = ({ router, firebaseData }) => (
  <Layout
    title="About"
    router={router}
    firebaseData={firebaseData}
    collections={[
      'chocolates',
      'recipes',
      'questions-answers',
      'customer-questions',
      'home',
      'orders'
    ]}
  >
    <Content router={router} firebaseData={firebaseData} />
  </Layout>
);

export default AboutPage;
