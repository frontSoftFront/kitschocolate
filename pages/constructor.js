import * as R from 'ramda';
import { useState } from 'react';
import Select from 'react-select';
import Dropzone from 'react-dropzone-uploader';
// components
import Portal from '../components/portal';
import Layout from '../components/layout';
import ItemComponent from '../components/item';
import ImageComponent from '../components/image';
import PricesSlider from '../components/slider/prices-slider';
// forms
import ItemForm from '../forms/item-form';
// helpers
import {
  notEquals,
  notContains,
  isNotNilAndNotEmpty,
  showToastifyMessage
} from '../helpers';
// hooks
import { useConstructorActions } from '../hooks/use-constructor-actions';
// icons
import Icon from '../icons';
// pages
import { QuestionAnswers } from './questions-answers';
// theme
import Theme from '../theme';
// ui
import { Box, Text, Grid, Flex, Button, ModalWrapper } from '../ui';
// ////////////////////////////////////////////////

const makeSortedByOrderArrayFromObject = R.compose(
  R.sortBy(R.prop('order')),
  R.values
);

const OrderDescription = ({
  call,
  email,
  comments,
  lastName,
  firstName,
  warehouse,
  paymentType,
  phoneNumber,
  shippingCity
}) => (
  <Box p="7px 10px">
    <Box fontWeight="bold">Order Description</Box>
    <Box mt="7px">
      {shippingCity.label}, {warehouse.value}
    </Box>
    <Box mt="7px">
      {lastName} {firstName}, {phoneNumber}, {email}
    </Box>
    {isNotNilAndNotEmpty(comments) && <Box mt="7px">{comments}</Box>}
    <Box mt="7px">
      Payment Type: {paymentType}, {call ? 'call' : 'not call'}
    </Box>
  </Box>
);

const Orders = ({ orders, handleRemoveItem, handleChangeOrderStatus }) => {
  const [openedOrders, setOpenedOrders] = useState([]);

  const handleCompleteOrder = order =>
    handleChangeOrderStatus(R.assoc('status', 'COMPLETED', order));
  const handleDeliverOrder = order =>
    handleChangeOrderStatus(R.assoc('status', 'DELIVERED', order));
  const handlePendingOrder = order =>
    handleChangeOrderStatus(R.assoc('status', 'PENDING', order));

  return (
    <>
      {R.keys(orders).map((orderId, index) => {
        const order = R.pathOr({}, [orderId], orders);

        const { date, status, items, orderDescription = {} } = R.pathOr(
          {},
          [orderId],
          orders
        );

        const openedOrder = R.contains(orderId, openedOrders);
        const total = R.compose(
          R.sum,
          R.values,
          R.map(R.prop('subtotal'))
        )(R.or(items, []));

        return (
          <div key={index}>
            <Flex my={10} alignItems="center">
              <Text>Date: {date}</Text>
              <Text mx={10}>Status: {status}</Text>
              <Text mr={10}>Total: {total}</Text>
              {R.not(openedOrder) && (
                <Icon
                  iconName="arrowDown"
                  handleClick={() => setOpenedOrders(R.append(orderId))}
                />
              )}
              {openedOrder && (
                <Icon
                  iconName="arrowUp"
                  handleClick={() =>
                    setOpenedOrders(R.filter(notEquals(orderId)))}
                />
              )}
              {notEquals(status, 'PENDING') && (
                <Button
                  {...Theme.styles.actionButton}
                  ml={10}
                  height={20}
                  width={100}
                  onClick={() => handlePendingOrder({ ...order, orderId })}
                >
                  PENDING
                </Button>
              )}
              {notEquals(status, 'COMPLETED') && (
                <Button
                  {...Theme.styles.actionButton}
                  ml={10}
                  height={20}
                  width={100}
                  onClick={() => handleCompleteOrder({ ...order, orderId })}
                >
                  COMPLETE
                </Button>
              )}
              {notEquals(status, 'DELIVERED') && (
                <Button
                  {...Theme.styles.actionButton}
                  ml={10}
                  height={20}
                  width={100}
                  onClick={() => handleDeliverOrder({ ...order, orderId })}
                >
                  DELIVERED
                </Button>
              )}
              <Icon
                w={20}
                h={20}
                ml={10}
                iconName="trash"
                height="max-content"
                handleClick={() => handleRemoveItem({ id: orderId })}
              />
            </Flex>
            {openedOrder && (
              <>
                {isNotNilAndNotEmpty(orderDescription) && (
                  <OrderDescription {...orderDescription} />
                )}
                <Box m="7px 10px" fontWeight="bold">
                  Items:
                </Box>
                {R.values(items).map(({ id, title, quantity }) => (
                  <Text p="7px 10px" key={id}>
                    {title} - {quantity}
                  </Text>
                ))}
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

const Standard = ({ filter }) => {
  const getUploadParams = () => {
    return {
      url: `https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/uploadFile?type=${filter}`
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    if (status === 'headers_received') {
      showToastifyMessage(`${meta.name} uploaded!`);
    } else if (status === 'aborted') {
      showToastifyMessage(`${meta.name}, upload failed...`, 'error');
    } else if (R.equals(status, 'removed')) {
      showToastifyMessage(`${meta.name}, removed...`);
    }
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      styles={{
        dropzone: { minHeight: 200, maxHeight: 250 },
        submitButtonContainerStyle: { display: 'none' }
      }}
    />
  );
};

const tabs = [
  {
    title: 'Шоколадки',
    formType: 'chocolate',
    collection: 'chocolates'
  },
  {
    title: 'Рецепти',
    formType: 'recipe',
    collection: 'recipes'
  },
  {
    title: 'Питання - Відповіді',
    formType: 'questionsAnswers',
    collection: 'questions-answers'
  },
  {
    title: 'Замовлення',
    collection: 'orders'
  },
  {
    title: 'Магазин',
    formType: 'category',
    collection: 'shop/categories',
    submitActionName: 'handleSendCategoryToApi'
  },
  {
    title: 'Images',
    collection: 'images'
  }
];

const ImagesComponent = ({ images, filter, setFilter }) => {
  const filterOptions = [
    { value: 'chocolates', label: 'Chocolates' },
    { value: 'recipes', label: 'Recipes' },
    { value: 'ingredients', label: 'Ingredients' }
  ];
  const filteredImages = R.pathOr([], [filter], images);
  const imagesTypeIngredients = R.equals(filter, 'ingredients');
  const imageHeight = imagesTypeIngredients ? 50 : 270;
  const gridTemplateColumns = imagesTypeIngredients
    ? 'repeat(auto-fill, minmax(50px, 1fr))'
    : 'repeat(auto-fill, minmax(200px, 1fr))';

  return (
    <>
      <Box width={300}>
        <Select
          options={filterOptions}
          defaultValue={filterOptions[0]}
          onChange={({ value }) => setFilter(value)}
        />
      </Box>
      <Grid pt={20} gridGap="20px" gridTemplateColumns={gridTemplateColumns}>
        {filteredImages.map((src, index) => (
          <ImageComponent
            src={src}
            key={index}
            width="100%"
            placeholder="blur"
            height={imageHeight}
          />
        ))}
      </Grid>
    </>
  );
};

const CategoriesComponent = props => {
  const {
    router,
    categories,
    chocolateList,
    handleEditItem,
    handleRemoveItem
  } = props;

  const mappedCategories = R.compose(
    R.map(category => {
      const { chocolates } = category;

      const mappedChocolates = R.map(
        id => R.path([id], chocolateList),
        chocolates
      );

      return R.assoc('mappedChocolates', mappedChocolates, category);
    }),
    makeSortedByOrderArrayFromObject
  )(categories);

  return (
    <div>
      {mappedCategories.map((category, index) => {
        const { id, title, categoryName, mappedChocolates } = category;

        return (
          <PricesSlider
            key={index}
            categoryId={id}
            router={router}
            hideActionButton
            mt={[30, 40, 50]}
            categoryTitle={title}
            list={mappedChocolates}
            categoryName={categoryName}
            handleEditItem={() => handleEditItem(category)}
            handleRemoveItem={() => handleRemoveItem(category)}
          />
        );
      })}
    </div>
  );
};

const Content = ({ router, firebaseData }) => {
  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [imagesFilter, setImagesFilter] = useState('chocolates');

  const formType = R.path([activeTab, 'formType'], tabs);
  const images = R.map(
    R.values,
    R.pathOr([], ['data', 'images'], firebaseData)
  );
  const collection = R.path([activeTab, 'collection'], tabs);
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
  const optionsForSelect = R.merge(images, {
    recipeOptions: R.values(recipes),
    chocolateOptions: R.values(chocolates)
  });
  const handleClose = () => {
    setOpened(false);
    setInitialValues({});
  };
  const handleEditItem = item => {
    setOpened(true);
    setInitialValues(item);
  };
  const constructorActions = useConstructorActions({
    collection,
    handleCloseModal: handleClose
  });

  const {
    handleRemoveItem,
    handleChangeOrderStatus,
    handleSendItemByCollectionToApi
  } = constructorActions;

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
        {notEquals(activeTab, 3) && (
          <Button
            {...Theme.styles.actionButton}
            ml="auto"
            height={39}
            width={150}
            onClick={() => setOpened(true)}
          >
            Add
          </Button>
        )}
      </Flex>
      <Grid
        pt={10}
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
      {R.equals(activeTab, 2) && (
        <QuestionAnswers
          firebaseData={firebaseData}
          handleEditItem={handleEditItem}
          handleRemoveItem={handleRemoveItem}
        />
      )}
      {R.equals(activeTab, 3) && (
        <Orders
          handleRemoveItem={handleRemoveItem}
          handleChangeOrderStatus={handleChangeOrderStatus}
          orders={R.pathOr([], ['data', 'orders'], firebaseData)}
        />
      )}
      {R.equals(activeTab, 4) && (
        <CategoriesComponent
          router={router}
          handleEditItem={handleEditItem}
          handleRemoveItem={handleRemoveItem}
          chocolateList={R.pathOr({}, ['data', 'chocolates'], firebaseData)}
          categories={R.pathOr(
            [],
            ['data', 'shop', 'categories'],
            firebaseData
          )}
        />
      )}
      {R.equals(activeTab, 5) && (
        <ImagesComponent
          images={images}
          filter={imagesFilter}
          setFilter={setImagesFilter}
        />
      )}
      {opened && (
        <Portal selector="#modal">
          <ModalWrapper>
            <Box
              p={30}
              width="90vw"
              maxWidth={1000}
              maxHeight="90vh"
              borderRadius="4px"
              background={Theme.colors.white}
              boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
              overflowY={notContains(activeTab, [2, 4]) ? 'auto' : 'unset'}
            >
              <Flex mb={20} alignItems="center" justifyContent="space-between">
                <Text fontSize={25}>Add Item</Text>
                <Icon
                  width="25px"
                  height="25px"
                  iconName="close"
                  handleClick={() => {
                    setOpened(false);
                    setInitialValues({});
                  }}
                />
              </Flex>
              {notEquals(activeTab, 5) && (
                <ItemForm
                  formType={formType}
                  initialValues={initialValues}
                  setInitialValues={setInitialValues}
                  optionsForSelect={optionsForSelect}
                  submitAction={handleSendItemByCollectionToApi}
                />
              )}
              {R.equals(activeTab, 5) && <Standard filter={imagesFilter} />}
            </Box>
          </ModalWrapper>
        </Portal>
      )}
    </>
  );
};

const ConstructorPage = ({ router, firebaseData }) => (
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
      'orders',
      'images',
      'shop'
    ]}
  >
    <Content router={router} firebaseData={firebaseData} />
  </Layout>
);

export default ConstructorPage;
