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

export const ContactUs = ({ mt, mx = "auto", text = 'Анкета' }) => {
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
        mx={mx}
        mt={mt}
        height={40}
        width={200}
        onClick={handleOpenModal}
      >
        {text}
      </Button>
      {opened ? (
        <Portal selector="#modal">
          <ModalWrapper>
            <Box
              width="90%"
              p={[20, 30]}
              maxWidth={700}
              maxHeight="90vh"
              overflowY="auto"
              borderRadius="4px"
              background={Theme.colors.white}
              boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
            >
              <Icon
                ml="auto"
                iconName="close"
                width={[16, 17, 18, 20]}
                height={[16, 17, 18, 20]}
                handleClick={handleCloseModal}
              />
              <SectionTitle
                my={10}
                textAlign="center"
                fontFamily="Montserrat"
                fontSize={[18, 20, 22, 25]}
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
    firebaseData={firebaseData}
    title="Корпоративна співпраця"
    collections={['shop', 'chocolates']}
  >
    <PageTitle
      {...Theme.styles.mainPageTitle}
      my={Theme.styles.spacing.paddingY}
    >
      ПАРТНЕРАМ
    </PageTitle>
    <Article fontSize={[12, 14, 15, 16]}>
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
    <Section
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      my={Theme.styles.spacing.paddingY}
    >
      <RelativeBox height={250} width={['100%', '45%']}>
        <ImageComponent
          layout="fill"
          placeholder="blur"
          src="/partnership.jpeg"
        />
      </RelativeBox>
      <Article width={['100%', '45%']} fontSize={[12, 14, 15, 16]}>
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
    <Article fontSize={[12, 14, 15, 16]}>
      З подарунками Kit's вам вдасться проявити турботу по-особливому.
    </Article>
    <Article
      lineHeight={1.54}
      fontSize={[12, 14, 15, 16]}
      my={Theme.styles.spacing.paddingY}
    >
      Бажаєте продавати шоколад Kit`s chocolate? Запрошуємо до співпраці. Ми
      завжди раді новим партнерам. Заповніть, будь ласка, коротку анкету, чи
      напишіть нам
      <StyledLink
        ml="5px"
        fontWeight="bold"
        display="inline-block"
        color={Theme.colors.blue}
        fontSize={[14, 15, 16, 17]}
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
