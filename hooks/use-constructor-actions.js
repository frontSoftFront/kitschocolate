import * as R from 'ramda';
import { useDispatch } from 'react-redux';
import { useFirebase, actionTypes } from 'react-redux-firebase';
// helpers
import { showToastifyMessage, isNotNilAndNotEmpty } from '../helpers';
// //////////////////////////////////////////////////

export const useConstructorActions = ({
  collection,
  categories,
  chocolates,
  handleCloseModal
}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  // console.log('chocolates', R.head(chocolates));

  // general
  const handleRemoveItem = async values => {
    const { id, shouldCloseModal } = values;

    const getCollection = R.pathOr(collection, ['collection'], values);

    const ref = firebase.database().ref(`${getCollection}/${id}`);

    await ref
      .remove()
      .then(() => {
        if (shouldCloseModal) handleCloseModal();

        showToastifyMessage('success');
        dispatch({
          type: actionTypes.REMOVE,
          path: `${getCollection}.${id}`
        });
      })
      .catch(() => showToastifyMessage(collection, 'error'));
  };

  const handleSendItemByCollectionToApi = async values => {
    const imgUrl = R.or(
      R.head(R.pathOr([], ['extraImages'], values)),
      R.prop('imgUrl', values)
    );

    let data = values;

    if (isNotNilAndNotEmpty(imgUrl)) {
      data = R.assoc('imgUrl', imgUrl, values);
    }

    const isEditMode = isNotNilAndNotEmpty(values.id);

    if (isEditMode) {
      const ref = firebase.database().ref(`${collection}/${values.id}`);

      await ref
        .update(data)
        .then(() => {
          handleCloseModal();
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

      data = R.assoc('id', id, data);

      await ref
        .set(data)
        .then(() => {
          handleCloseModal();
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

  // order
  const handleChangeOrderStatus = async order => {
    const { status, orderId } = order;

    // debugger

    const path = `orders/${orderId}`;
    const ref = firebase.database().ref(path);

    await ref.update(order).then(async () => {
      showToastifyMessage('success');
      dispatch({
        path,
        data: order,
        type: actionTypes.SET
      });

      if (R.equals(status, 'COMPLETED')) {
        const quantities = R.map(
          R.prop('quantity'),
          R.pathOr({}, ['items'], order)
        );

        const chocolatesWithNewQuantities = R.map(item => {
          const { id, quantity } = item;

          const newQuantity = R.pathOr(quantity, [id], quantities);

          return R.assoc('quantity', newQuantity, chocolates);
        }, R.indexBy(R.prop('id'), chocolates));

        const chocolatesRef = firebase.database().ref('chocolates');

        await chocolatesRef
          .update(R.head(chocolates))
          .then(() => {
            dispatch({
              path: 'chocolates',
              type: actionTypes.SET,
              chocolatesWithNewQuantities
            });
          })
          .catch(error => {
            console.log('error', error);
            showToastifyMessage('error', collection);
          });
      }
    });
  };

  // images
  const handleGetImages = () => {
    const ref = firebase.database().ref('images');

    ref.once('value', snapshot => {
      const data = snapshot.val();

      dispatch({
        data,
        path: 'images',
        type: actionTypes.SET
      });
    });
  };

  const handleRemoveImage = async ({ id, type, filename }) => {
    const storageRef = firebase.storage().ref(`images/${type}/${filename}`);

    await storageRef
      .delete()
      .then(async () => {
        const databaseRef = firebase.database().ref(`images/${type}/${id}`);

        await databaseRef.remove().then(() => {
          showToastifyMessage('removed');
          dispatch({
            type: actionTypes.REMOVE,
            path: `images.${type}/${id}`
          });
        });
      })
      .catch(error => {
        console.log('error', error);
        showToastifyMessage(type, 'error');
      });
  };

  // categories
  const handleMarkAsFavoriteCategory = async id => {
    const ref = firebase.database().ref(`shop/categories`);

    const data = R.map(item => {
      const favorite = R.propEq('id', id, item) ? R.not(item.favorite) : false;

      return R.assoc('favorite', favorite, item);
    }, categories);

    await ref
      .update(data)
      .then(() => {
        dispatch({
          data,
          type: actionTypes.SET,
          path: 'shop/categories'
        });
      })
      .catch(error => {
        console.log('error', error);
        showToastifyMessage('error', collection);
      });
  };

  // customer questions
  const handleCreateQuestionAnswerFromCustomerQuestion = async values => {
    const { id } = values;

    const ref = firebase
      .database()
      .ref()
      .child('questions-answers')
      .push();

    const { key } = ref;

    const data = {
      ...R.pick(['answer', 'column', 'question'], values),
      id: key
    };

    await ref
      .set(data)
      .then(() => {
        handleRemoveItem({
          id,
          shouldCloseModal: true,
          collection: 'customer-questions'
        });
        dispatch({
          data,
          type: actionTypes.SET,
          path: `${'questions-answers'}.${key}`
        });
      })
      .catch(err => {
        console.log('error', err);
        showToastifyMessage('customer-questions', 'error');
      });
  };

  return {
    handleGetImages,
    handleRemoveItem,
    handleRemoveImage,
    handleChangeOrderStatus,
    handleMarkAsFavoriteCategory,
    handleSendItemByCollectionToApi,
    handleCreateQuestionAnswerFromCustomerQuestion
  };
};
