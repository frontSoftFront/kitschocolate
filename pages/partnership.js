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

// const HeartFilledIcon = () => (
//   <Icon
//     mr={10}
//     width={14}
//     height={14}
//     iconName="heartFilled"
//     display="inline-block"
//   />
// );

const HeartFilledIcon = () => (
  <Box mr="10px" display="inline-block">🖤</Box>
);

export const ContactUs = ({ mt, mx = 'auto', text = 'Залишити Заявку' }) => {
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
                // fontFamily="Montserrat"
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

const PartnershipPage = () => (
  <Layout title="Корпоративна співпраця" collections={['shop', 'chocolates']}>
    <PageTitle
      {...Theme.styles.mainPageTitle}
      my={Theme.styles.spacing.paddingY}
    >
      Бажаєте проявити турботу подарунком від Kit`s chocolate?
    </PageTitle>
    <Section
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      mb={Theme.styles.spacing.paddingY}
    >
      <ImageComponent
        fill
        placeholder="blur"
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fchocolates%2F%D0%BA%D0%BE%D1%80%D0%BF.jpg?alt=media&token=37f5a18e-3f84-4720-b02c-f05469b8ee65"
        wrapperStyles={{
          height: 250,
          width: ['100%', '45%']
        }}
      />
      <Article width={['100%', '45%']} fontSize={[12, 14, 15, 16]}>
        <ArticleTitle fontWeight={500}>Ми обіцяємо:</ArticleTitle>
        <Text mt={10}>
          <HeartFilledIcon />
          ощадне використання вашого часу;
        </Text>
        <Text mt={10}>
          <HeartFilledIcon />
          індивідуальний підхід;
        </Text>
        <Text mt={10}>
          <HeartFilledIcon />
          регулювання бюджету від 200 грн;
        </Text>
        <Text mt={10}>
          <HeartFilledIcon />
          можливість дегустації;
        </Text>
        <Text mt={10}>
          <HeartFilledIcon />
          за бажанням – брендування;
        </Text>
        <Text mt={10}>
          <HeartFilledIcon />
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
