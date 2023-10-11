import * as R from 'ramda';
import { useState } from 'react';
import Select from 'react-select';
import Toggle from 'react-toggle';
// components
import Portal from '../components/portal';
import Layout from '../components/layout';
import ItemComponent from '../components/item';
import ImageComponent from '../components/image';
import { ChangeQuantity } from '../components/order-item';
import PricesSlider from '../components/slider/prices-slider';
// forms
import ItemForm from '../forms/item-form';
// helpers
import {
  notEquals,
  setDebounce,
  notIncludes,
  isNilOrEmpty,
  isNotNilAndNotEmpty
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
import { Box, Text, Span, Grid, Flex, Button, ModalWrapper } from '../ui';
// ////////////////////////////////////////////////

const tabs = [
  {
    title: 'Шоколад',
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
    formType: 'images',
    collection: 'images'
  }
];

const filterOptions = [
  { value: 'chocolates', label: 'Chocolates' },
  { value: 'recipes', label: 'Recipes' },
  { value: 'ingredients', label: 'Ingredients' }
];

const orderFilterOptions = [
  { value: 'ALL', label: 'Всі Замовлення' },
  { value: 'ACCEPTED', label: 'Підтвердженні Замовлення' },
  { value: 'PENDING', label: 'Нові Замовлення' },
  { value: 'COMPLETED', label: 'COMPLETED' },
  { value: 'DELIVERED', label: 'DELIVERED' },
];

const makeSortedByOrderArrayFromObject = R.compose(
  R.sortBy(R.prop('order')),
  R.values
);

const InfoPair = ({ ml, mr, mx, text, title }) => {
  if (isNilOrEmpty(text)) return null;

  const styles = R.filter(item => item, { ml, mr, mx });

  return (
    <Text {...styles}>
      {title} <Span fontWeight="bold">{text}</Span>
    </Text>
  );
};

const OrderDescription = ({
  call,
  email,
  shipTo,
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
    <Box mt="7px">{shipTo}</Box>
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
  const [filter, setFilter] = useState('ALL');
  const [openedOrders, setOpenedOrders] = useState([]);

  const handleCompleteOrder = order =>
    handleChangeOrderStatus(R.assoc('status', 'COMPLETED', order));
  const handleDeliverOrder = order =>
    handleChangeOrderStatus(R.assoc('status', 'DELIVERED', order));
  const handlePendingOrder = order =>
    handleChangeOrderStatus(R.assoc('status', 'PENDING', order));

  const mapped = R.compose(
    R.reverse,
    R.filter(item => {
      if (R.equals(filter, 'ALL')) return true;

      const { status, acceptedDate } = item;

      if (R.equals(filter, 'ACCEPTED')) return acceptedDate;

      return R.equals(status, filter);
    }),
    R.values,
    R.mapObjIndexed((item, orderId) => R.assoc('orderId', orderId, item))
  )(orders);

  return (
    <>
      <Box mb={20} width={300}>
        <Select
          options={orderFilterOptions}
          defaultValue={orderFilterOptions[0]}
          onChange={({ value }) => setFilter(value)}
        />
      </Box>
      {mapped.map((order, index) => {
        const {
          items,
          status,
          orderId,
          createdDate,
          acceptedDate,
          orderDescription = {}
        } = order;

        const openedOrder = R.includes(orderId, openedOrders);

        const total = R.compose(
          R.sum,
          R.values,
          R.map(R.prop('subtotal'))
        )(R.or(items, []));

        return (
          <div key={index}>
            <Flex my={10} alignItems="center">
              <InfoPair text={createdDate} title="Created Date: " />
              <InfoPair ml={10} text={acceptedDate} title="Accepted Date: " />
              <InfoPair mx={10} text={status} title="Status: " />
              <InfoPair mr={10} text={total} title="Total: " />
              {R.not(openedOrder) && (
                <Icon
                  iconName="arrowDown"
                  handleClick={() => setOpenedOrders(R.append(orderId))}
                />
              )}
              {openedOrder && (
                <Icon
                  iconName="arrowUp"
                  handleClick={() => {
                    setOpenedOrders(R.filter(notEquals(orderId)));
                  }}
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

const ImagesComponent = ({
  images,
  imagesFilter,
  setImagesFilter,
  handleRemoveImage
}) => {
  const filteredImages = R.values(R.prop(imagesFilter, images));
  const imagesTypeIngredients = R.equals(imagesFilter, 'ingredients');

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
          onChange={({ value }) => setImagesFilter(value)}
        />
      </Box>
      <Grid pt={20} gridGap="20px" gridTemplateColumns={gridTemplateColumns}>
        {filteredImages.map(({ id, url, type, filename }) => (
          <Flex key={id}>
            <ImageComponent
              fill
              src={url}
              placeholder="blur"
              wrapperStyles={{
                width: 300,
                height: imageHeight
              }}
            />
            <Icon
              width={25}
              height={25}
              right="25px"
              iconName="trash"
              background="white"
              position="relative"
              handleClick={() => handleRemoveImage({ id, type, filename })}
            />
          </Flex>
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
    handleRemoveItem,
    handleMarkAsFavoriteCategory
  } = props;

  const mappedCategories = R.compose(
    R.map(category => {
      const { chocolates } = category;

      const mappedChocolates = R.compose(
        R.filter(item => item),
        R.map(id => R.pathOr(null, [id], chocolateList))
      )(chocolates);

      return R.assoc('mappedChocolates', mappedChocolates, category);
    }),
    makeSortedByOrderArrayFromObject
  )(categories);

  return (
    <div>
      {mappedCategories.map((category, index) => {
        const {
          id,
          title,
          favorite,
          categoryName,
          mappedChocolates
        } = category;

        return (
          <PricesSlider
            key={index}
            categoryId={id}
            router={router}
            hideActionButton
            mt={[30, 40, 50]}
            favorite={favorite}
            categoryTitle={title}
            list={mappedChocolates}
            categoryName={categoryName}
            handleEditItem={() => handleEditItem(category)}
            handleRemoveItem={() => handleRemoveItem(category)}
            handleMarkAsFavoriteCategory={handleMarkAsFavoriteCategory}
          />
        );
      })}
    </div>
  );
};

const ChocolateActions = props => {
  const {
    item,
    handleEditItem,
    handleRemoveItem,
    handleSendItemByCollectionToApi
  } = props;

  const { id, active, quantity } = item;

  const handleActivateOrDeactivateItem = () =>
    handleSendItemByCollectionToApi(R.assoc('active', R.not(active), item));

  const handleChangeQuantity = value => {
    if (R.equals(value, quantity)) return;

    handleSendItemByCollectionToApi(R.assoc('quantity', value, item));
  };

  return (
    <Flex width="100%" alignItems="center" justifyContent="space-between">
      <Toggle
        icons={false}
        checked={active}
        id={`active.${id}`}
        onChange={handleActivateOrDeactivateItem}
      />
      <Icon
        w={20}
        h={20}
        iconName="pencil"
        handleClick={() => handleEditItem(item)}
      />
      <Icon
        w={20}
        h={20}
        iconName="trash"
        handleClick={() => handleRemoveItem(item)}
      />
      <ChangeQuantity
        quantity={quantity}
        handleChangeQuantity={setDebounce(handleChangeQuantity, 400)}
      />
    </Flex>
  );
};

const Content = ({ router, firebaseData }) => {
  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [imagesFilter, setImagesFilter] = useState('chocolates');

  const formType = R.path([activeTab, 'formType'], tabs);
  const collection = R.path([activeTab, 'collection'], tabs);

  const images = R.map(
    R.compose(
      R.map(R.prop('url')),
      R.values
    ),
    R.pathOr([], ['data', 'images'], firebaseData)
  );

  const chocolates = R.compose(
    R.sortBy(R.prop('order')),
    R.values,
    R.pathOr([], ['data', 'chocolates'])
  )(firebaseData);

  const categories = R.pathOr([], ['data', 'shop', 'categories'], firebaseData);

  const recipes = R.compose(
    R.sortBy(R.prop('order')),
    R.values,
    R.pathOr([], ['data', 'recipes'])
  )(firebaseData);

  const optionsForSelect = R.merge(images, {
    recipeOptions: R.values(recipes),
    chocolateOptions: R.values(chocolates)
  });

  const handleCloseModal = () => {
    setOpened(false);
    setInitialValues({});
    document.getElementsByTagName('body')[0].style.overflow = 'initial';
  };

  const handleOpenModal = item => {
    if (isNotNilAndNotEmpty(item)) setInitialValues(item);

    setOpened(true);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  };

  const constructorActions = useConstructorActions({
    collection,
    categories,
    chocolates,
    handleCloseModal
  });

  const {
    handleGetImages,
    handleRemoveItem,
    handleRemoveImage,
    handleChangeOrderStatus,
    handleMarkAsFavoriteCategory,
    handleSendItemByCollectionToApi,
    handleCreateQuestionAnswerFromCustomerQuestion
  } = constructorActions;

  const getSubmitAction = values => {
    if (R.propEq('collection', 'customer-questions', values)) {
      handleCreateQuestionAnswerFromCustomerQuestion(values);
    } else {
      handleSendItemByCollectionToApi(values);
    }
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
        {notEquals(activeTab, 3) ? (
          <Button
            {...Theme.styles.actionButton}
            ml="auto"
            height={39}
            width={150}
            onClick={() => handleOpenModal()}
          >
            Add
          </Button>
        ) : null}
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
              hideActionButton
              imgSize={{ width: '100%', height: 350 }}
              handleGoToDetailPage={id => router.push(`/shop/${id}`)}
              renderActions={() => (
                <ChocolateActions
                  item={item}
                  handleEditItem={handleOpenModal}
                  handleRemoveItem={handleRemoveItem}
                  handleSendItemByCollectionToApi={
                    handleSendItemByCollectionToApi
                  }
                />
              )}
            />
          ))}
        {R.equals(activeTab, 1) &&
          recipes.map((item, index) => (
            <ItemComponent
              px="0px"
              key={index}
              item={item}
              itemType="configurable"
              handleEditItem={handleOpenModal}
              handleRemoveItem={handleRemoveItem}
              imgSize={{ width: '100%', height: 350 }}
              handleGoToDetailPage={id => router.push(`/recipes/${id}`)}
            />
          ))}
      </Grid>
      {R.equals(activeTab, 2) && (
        <QuestionAnswers
          showCustomerQuestions
          firebaseData={firebaseData}
          handleEditItem={handleOpenModal}
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
          categories={categories}
          handleEditItem={handleOpenModal}
          handleRemoveItem={handleRemoveItem}
          handleMarkAsFavoriteCategory={handleMarkAsFavoriteCategory}
          chocolateList={R.pathOr({}, ['data', 'chocolates'], firebaseData)}
        />
      )}
      {R.equals(activeTab, 5) && (
        <ImagesComponent
          imagesFilter={imagesFilter}
          setImagesFilter={setImagesFilter}
          handleRemoveImage={handleRemoveImage}
          images={R.pathOr([], ['data', 'images'], firebaseData)}
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
              overflowY={notIncludes(activeTab, [2, 4]) ? 'auto' : 'unset'}
            >
              <Flex mb={20} alignItems="center" justifyContent="space-between">
                <Text fontSize={25}>Add Item</Text>
                <Icon
                  width="25px"
                  height="25px"
                  iconName="close"
                  handleClick={() => {
                    handleCloseModal();

                    if (R.equals(activeTab, 5)) handleGetImages();
                  }}
                />
              </Flex>
              <ItemForm
                formType={formType}
                initialValues={initialValues}
                submitAction={getSubmitAction}
                setInitialValues={setInitialValues}
                optionsForSelect={optionsForSelect}
                useSubmitBtn={notEquals(activeTab, 5)}
                uploadUrl={`https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/uploadFile?type=${imagesFilter}`}
              />
            </Box>
          </ModalWrapper>
        </Portal>
      )}
    </>
  );
};

const ConstructorPage = () => (
  <Layout
    title="Constructor"
    collections={[
      'chocolates',
      'recipes',
      'questions-answers',
      'customer-questions',
      'home',
      'orders',
      'images',
      { path: 'orders', queryParams: ['orderByChild=createdDate'] },
      { path: 'shop/categories', queryParams: ['orderByChild=order'] }
    ]}
  >
    {({ router, firebaseData }) => (
      <Content router={router} firebaseData={firebaseData} />
    )}
  </Layout>
);

export default ConstructorPage;
