import * as R from 'ramda';
import { useDispatch } from 'react-redux';
import { useFirebase, actionTypes } from 'react-redux-firebase';
// helpers
import { showToastifyMessage, isNotNilAndNotEmpty } from '../helpers';
// //////////////////////////////////////////////////

export const useConstructorActions = ({ collection, handleCloseModal }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

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

  const handleSendItemByCollectionToApi = async values => {
    const imgUrl = R.or(
      R.prop('imgUrl', values),
      R.head(R.pathOr([], ['extraImages'], values))
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
      data = R.assoc('id', id, values);

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

  const handleChangeOrderStatus = async order => {
    const orderId = R.path(['orderId'], order);

    const path = `orders/${orderId}`;
    const ref = firebase.database().ref(path);

    await ref.update(order).then(() => {
      showToastifyMessage('success');
      dispatch({
        path,
        data: order,
        type: actionTypes.SET
      });
    });
  };

  return {
    handleRemoveItem,
    handleChangeOrderStatus,
    handleSendItemByCollectionToApi
  };
};
