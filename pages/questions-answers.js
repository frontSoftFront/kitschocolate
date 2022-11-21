import is from 'is_js';
import * as R from 'ramda';
import { useState } from 'react';
// components
import Layout from '../components/layout';
// forms
import CustomerQuestionsForm from '../forms/customer-questions-form';
// helpers
import { isNotNilAndNotEmpty } from '../helpers';
// icons
import Icon from '../icons';
// theme
import Theme from '../theme';
// ui
import { Box, Img, Text, Flex, Section, SectionTitle } from '../ui';
// ////////////////////////////////////////////////

const QuestionAnswer = props => {
  const [opened, setOpened] = useState(R.pathOr(false, ['customer'], props));

  const {
    id,
    column,
    answer,
    question,
    handleEditItem,
    handleRemoveItem
  } = props;

  return (
    <Box
      cursor="pointer"
      overflowY="hidden"
      maxHeight={opened ? 400 : 51}
      transition="all 0.5s ease-out"
      onClick={() => setOpened(R.not)}
    >
      <Flex
        py={15}
        fontSize={16}
        fontWeight={500}
        alignItems="center"
        wordBreak="break-all"
        borderBottom="1px solid"
        justifyContent="space-between"
        color={Theme.colors.woodyBrown}
        borderColor={Theme.colors.lightBlue}
      >
        <Text maxWidth="90%" title={question} withEllipsis>
          {question}
        </Text>
        <Flex>
          <Icon iconName={opened ? 'arrowUp' : 'arrowDown'} />
          {is.function(handleEditItem) && (
            <Icon
              w={16}
              h={16}
              ml={10}
              iconName="pencil"
              handleClick={() =>
                handleEditItem({ id, column, answer, question })
              }
            />
          )}
          {is.function(handleRemoveItem) && (
            <Icon
              w={16}
              h={16}
              ml={10}
              iconName="trash"
              handleClick={() => handleRemoveItem({ id })}
            />
          )}
        </Flex>
      </Flex>
      <Box
        py={10}
        color="#878DA4"
        maxHeight={320}
        overflowY="auto"
        lineHeight="28px"
      >
        {answer}
      </Box>
    </Box>
  );
};

export const QuestionAnswers = ({
  firebaseData,
  handleEditItem,
  handleRemoveItem
}) => {
  const customerQuestions = R.path(
    ['data', 'customer-questions'],
    firebaseData
  );
  const columns = R.compose(
    R.values,
    R.groupBy(R.prop('column')),
    R.values,
    R.pathOr([], ['data', 'questions-answers'])
  )(firebaseData);

  return (
    <>
      <Flex
        p={50}
        borderRadius="16px"
        background="#F8FBFC"
        justifyContent="space-between"
      >
        {columns.map((column, columnIndex) => (
          <Box width="45%" key={columnIndex}>
            {R.values(column).map((item, index) => (
              <QuestionAnswer
                {...item}
                key={index}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </Box>
        ))}
      </Flex>
      {isNotNilAndNotEmpty(customerQuestions) ? (
        <>
          <Text my={20} fontSize={18} textAlign="center" fontWeight="bold">
            Customer Questions
          </Text>
          <Flex
            p={50}
            flexWrap="wrap"
            borderRadius="16px"
            background="#F8FBFC"
            justifyContent="space-between"
          >
            {R.keys(customerQuestions).map((id, index) => (
              <Box key={index} width="45%">
                <QuestionAnswer
                  {...R.pathOr({}, [id], customerQuestions)}
                  customer
                  key={index}
                  question={R.path([id, 'email'], customerQuestions)}
                  answer={R.path([id, 'question'], customerQuestions)}
                  handleEditItem={() =>
                    handleEditItem({
                      ...R.pathOr({}, [id], customerQuestions),
                      id,
                      collection: 'customer-questions',
                      question: R.path([id, 'question'], customerQuestions),
                    })
                  }
                  handleRemoveItem={() =>
                    handleRemoveItem({
                      id,
                      collection: 'customer-questions'
                    })
                  }
                />
              </Box>
            ))}
          </Flex>
        </>
      ) : null}
    </>
  );
};

const Content = ({ firebaseData }) => (
  <>
    <Section my={50}>
      <Img
        width="100%"
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fquestions-answers%2F_MG_4971%201.png?alt=media&token=b516cdfe-95d4-4be3-adcb-7b82c294e644"
      />
    </Section>
    <Section>
      <SectionTitle
        mb={50}
        fontSize={32}
        fontWeight={500}
        textAlign="center"
        fontFamily="Montserrat"
        color={Theme.colors.woodyBrown}
      >
        We answer all questions
      </SectionTitle>
      <QuestionAnswers firebaseData={firebaseData} />
    </Section>
    <Section my={50} mx="auto" maxWidth={660}>
      <SectionTitle
        mb={50}
        fontSize={32}
        textAlign="center"
        fontFamily="Montserrat"
        color={Theme.colors.woodyBrown}
      >
        Do you have any question?
      </SectionTitle>
      <CustomerQuestionsForm />
    </Section>
  </>
);

const QuestionsAnswersPage = ({ router, firebaseData }) => (
  <Layout
    title="About"
    router={router}
    firebaseData={firebaseData}
    collections={['questions-answers']}
  >
    <Content firebaseData={firebaseData} />
  </Layout>
);

export default QuestionsAnswersPage;
