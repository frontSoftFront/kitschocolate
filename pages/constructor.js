import * as R from 'ramda';
import { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone-uploader';
import { useFirebase, actionTypes } from 'react-redux-firebase';
// components
import Portal from '../components/portal';
import Layout from '../components/layout';
import ItemComponent from '../components/item';
import ImageComponent from '../components/image';
// forms
import ItemForm from '../forms/item-form';
// helpers
import {
  notEquals,
  isNotNilAndNotEmpty,
  showToastifyMessage
} from '../helpers';
// icons
import Icon from '../icons';
// theme
import Theme from '../theme';
// ui
import { Box, Text, Grid, Flex, Button, ModalWrapper } from '../ui';
// ////////////////////////////////////////////////

const Standard = ({ filter }) => {
  const getUploadParams = () => {
    return {
      url: `https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/uploadFile?type=${filter}`
    };
  };

  const handleChangeStatus = (props, status) => {
    if (status === 'headers_received') {
      showToastifyMessage(`${props.meta.name} uploaded!`);
    } else if (status === 'aborted') {
      showToastifyMessage(`${props.meta.name}, upload failed...`, 'error');
    } else if (R.equals(status, 'removed')) {
      debugger;
    }
  };

  const handleSubmit = (files, allFiles) => {
    debugger;
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
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

const Content = ({ router, firebaseData }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [imagesFilter, setImagesFilter] = useState('chocolates');

  const formType = R.path([activeTab, 'formType'], tabs);
  const images = R.path(['data', 'images'], firebaseData);
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
    recipeOptions: recipes,
    chocolateOptions: chocolates
  });

  const handleRemoveItem = async ({ id }) => {
    const ref = firebase.database().ref(`${collection}/${id}`);
    await ref
      .remove()
      .then(() => {
        showToastifyMessage('removed');
        dispatch({
          type: actionTypes.REMOVE,
          path: `${collection}.${id}`
        });
      })
      .catch(() => showToastifyMessage(collection, 'error'));
  };
  const handleClose = () => {
    setOpened(false);
    setInitialValues({});
  };
  const handleEditItem = item => {
    setOpened(true);
    setInitialValues(item);
  };
  const submitAction = async values => {
    const imgUrl = R.or(
      R.prop('imgUrl', values),
      R.head(R.pathOr([], ['extraImages'], values))
    );
    const isEditMode = isNotNilAndNotEmpty(values.id);
    if (isEditMode) {
      const ref = firebase.database().ref(`${collection}/${values.id}`);
      const data = R.assoc('imgUrl', imgUrl, values);

      await ref
        .update(data)
        .then(() => {
          handleClose();
          showToastifyMessage('success');
          dispatch({
            data,
            type: actionTypes.SET,
            path: `${collection}.${values.id}`
          });
        })
        .catch(() => showToastifyMessage(collection, 'error'));
    } else {
      const ref = firebase
        .database()
        .ref()
        .child(collection)
        .push();
      const id = ref.key;
      const data = R.merge(values, { id, imgUrl });

      await ref
        .set(data)
        .then(() => {
          handleClose();
          showToastifyMessage('success');
          dispatch({
            data,
            type: actionTypes.SET,
            path: `${collection}.${id}`
          });
        })
        .catch(() => showToastifyMessage(collection, 'error'));
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
      {R.equals(activeTab, 4) && (
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
              overflowY="auto"
              borderRadius="4px"
              background={Theme.colors.white}
              boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
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
              {R.equals(activeTab, 4) && <Standard filter={imagesFilter} />}
              {notEquals(activeTab, 4) && (
                <ItemForm
                  formType={formType}
                  submitAction={submitAction}
                  initialValues={initialValues}
                  setInitialValues={setInitialValues}
                  optionsForSelect={optionsForSelect}
                />
              )}
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
      'images'
    ]}
  >
    <Content router={router} firebaseData={firebaseData} />
  </Layout>
);

export default ConstructorPage;
