import * as R from 'ramda';
import { useState } from 'react';
// components
import Layout from '../components/layout';
// forms
import CustomerQuestionsForm from '../forms/customer-questions-form';
// icons
import Icon from '../icons';
// theme
import Theme from '../theme';
// ui
import { Box, Img, Flex, Section, SectionTitle } from '../ui';
// ////////////////////////////////////////////////

const QuestionAnswer = ({ answer, question }) => {
  const [opened, setOpened] = useState(false);

  return (
    <Box
      width="45%"
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
        borderBottom="1px solid"
        justifyContent="space-between"
        color={Theme.colors.woodyBrown}
        borderColor={Theme.colors.lightBlue}
      >
        {question}
        <Icon iconName={opened ? 'arrowUp' : 'arrowDown'} />
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

const Content = ({ firebaseData }) => {
  const columns = R.compose(
    R.values,
    R.groupBy(R.prop('column')),
    R.pathOr([], ['data', 'questions-answers'])
  )(firebaseData);

  return (
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
        <Flex
          p={50}
          borderRadius="16px"
          background="#F8FBFC"
          justifyContent="space-between"
        >
          {R.map(
            column =>
              column.map((item, index) => (
                <QuestionAnswer key={index} {...item} />
              )),
            columns
          )}
        </Flex>
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
};

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
