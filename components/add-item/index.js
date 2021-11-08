import * as R from 'ramda';
import Link from 'next/link';
import Dropzone, { defaultClassNames } from 'react-dropzone-uploader';
import { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
// actions
import actions from '../../store/actions';
// forms
import ItemForm from '../../forms/item-form';
// helpers
import * as H from '../../helpers';
// hooks
import { useActions } from '../../hooks/use-actions';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import {
  Img,
  Box,
  Flex,
  Text,
  Input,
  Button,
  StyledLink,
  ModalWrapper
} from '../../ui';
// //////////////////////////////////////////////////

const SelectFiles = ({ placeholder, fileCount = 1 }) => {
  const handleChangeStatus = (some, status) => {
    console.log(status, some);
  };

  const handleSubmit = (files, allFiles) => {
    debugger;
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <Dropzone
      maxFiles={fileCount}
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      submitButtonDisabled={files => files.length < fileCount}
      inputContent={R.or(placeholder, `Select ${fileCount} Files`)}
      inputWithFilesContent={files => `${fileCount - files.length} more`}
    />
  );
};

const AddItem = ({ router, basketList, handleClose }) => {
  const firebase = useFirebase();

  // debugger;
  return (
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
            handleClick={handleClose}
          />
        </Flex>
        <ItemForm />
        <Box mt={20}>
          <SelectFiles fileCount={4} placeholder="Select 4 Images" />
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default AddItem;
