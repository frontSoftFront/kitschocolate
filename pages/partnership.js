import * as R from 'ramda';
import React, { useState } from 'react';
// components
import Layout from '../components/layout';
import Portal from '../components/portal';
import ImageComponent from '../components/image';
// forms
import ContactUsForm from '../forms/contact-us-form';
// icons
import Icon from '../icons';
// theme
import Theme from '../theme';
// ui
import {
  Box,
  Text,
  Button,
  Section,
  Article,
  PageTitle,
  StyledLink,
  RelativeBox,
  SectionTitle,
  ArticleTitle,
  ModalWrapper
} from '../ui';
// ////////////////////////////////////////////////

const ContactUs = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => {
    setOpened(true);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setOpened(false);
    document.getElementsByTagName('body')[0].style.overflow = 'initial';
  };

  return (
    <>
      <Button
        {...Theme.styles.actionButton}
        mx="auto"
        height={40}
        width={200}
        onClick={handleOpenModal}
      >
        Анкета
      </Button>
      {opened ? (
        <Portal selector="#modal">
          <ModalWrapper>
            <Box
              p={30}
              maxWidth={700}
              maxHeight="90vh"
              overflowY="auto"
              borderRadius="4px"
              background={Theme.colors.white}
              boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
            >
              <Icon
                ml="auto"
                width="20px"
                height="20px"
                iconName="close"
                handleClick={handleCloseModal}
              />
              <SectionTitle
                my={10}
                fontSize={25}
                textAlign="center"
                fontFamily="Montserrat"
                color={Theme.colors.woodyBrown}
              >
                Команда Kit`s chocolate вітає вас
              </SectionTitle>
              <ContactUsForm handleCloseModal={handleCloseModal} />
            </Box>
          </ModalWrapper>
        </Portal>
      ) : null}
    </>
  );
};

const PartnershipPage = ({ router, firebaseData }) => (
  <Layout
    router={router}
    title="Partnership"
    firebaseData={firebaseData}
    collections={['chocolates']}
  >
    <PageTitle {...Theme.styles.mainPageTitle} my={50}>
      ПАРТНЕРАМ
    </PageTitle>
    <Article fontSize={16}>
      <ArticleTitle fontWeight={500}>
        <Icon mr={10} iconName="checkMark" display="inline-block" />
        Корпоративні замовлення
      </ArticleTitle>
      <ArticleTitle mt={20} fontWeight={500}>
        <Icon mr={10} iconName="checkMark" display="inline-block" />
        Подарункові набори
      </ArticleTitle>
      <Text mt={20}>
        Ми створюємо довершені подарунки за формулою: смак + естетика.
      </Text>
      <Text mt={20}>
        Дарувати Kit`s chocolate – це проявляти турботу. Адже ви зможете
        пригощати вишуканістю, насолодою, ніжністю та безпекою, створеною у
        Львові.
      </Text>
    </Article>
    <Section my={50} display="flex" justifyContent="space-between">
      <RelativeBox width="45%" height={250}>
        <ImageComponent
          layout="fill"
          placeholder="blur"
          src="/partnership.jpeg"
        />
      </RelativeBox>
      <Article width="45%" fontSize={16}>
        <ArticleTitle fontWeight={500}>Ми обіцяємо:</ArticleTitle>
        <Text mt={10}>
          <Icon mr={10} iconName="checkMark" display="inline-block" />
          ощадне використання вашого часу;
        </Text>
        <Text mt={10}>
          <Icon mr={10} iconName="checkMark" display="inline-block" />
          індивідуальний підхід;
        </Text>
        <Text mt={10}>
          <Icon mr={10} iconName="checkMark" display="inline-block" />
          регулювання бюджету від 200 грн;
        </Text>
        <Text mt={10}>
          <Icon mr={10} iconName="checkMark" display="inline-block" />
          можливість дегустації;
        </Text>
        <Text mt={10}>
          <Icon mr={10} iconName="checkMark" display="inline-block" />
          за бажанням – брендування;
        </Text>
        <Text mt={10}>
          <Icon mr={10} iconName="checkMark" display="inline-block" />
          вчасну логістику;
        </Text>
      </Article>
    </Section>
    <Article fontSize={16}>
      З подарунками Kit's вам вдасться проявити турботу по-особливому.
    </Article>
    <Article my={50} fontSize={16} lineHeight={1.54}>
      Бажаєте продавати шоколад Kit`s chocolate? Запрошуємо до співпраці. Ми
      завжди раді новим партнерам. Заповніть, будь ласка, коротку анкету, чи
      напишіть нам
      <StyledLink
        ml="5px"
        fontSize={17}
        fontWeight="bold"
        display="inline-block"
        color={Theme.colors.blue}
        href="mailto:kitschocolate@gmail.com"
        hoveredColor={Theme.colors.congoBrown}
      >
        kitschocolate@gmail.com
      </StyledLink>
    </Article>
    <ContactUs />
  </Layout>
);

export default PartnershipPage;
