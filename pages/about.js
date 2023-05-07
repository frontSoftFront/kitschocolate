import React from 'react';
import * as R from 'ramda';
// components
import Layout from '../components/layout';
import { FavoriteProducts } from './index';
// theme
import Theme from '../theme';
// ui
import {
  Img,
  Text,
  Section,
  Article,
  PageTitle,
  SectionTitle,
  ArticleTitle,
  DescriptionTitle
} from '../ui';
// ////////////////////////////////////////////////

const reasons = [
  '♥ Лаконічний склад, адже істинний шоколад містить лише какао-боби і цукор.',
  '♥ Рідкісний сорт какао-бобів Criollo, які роблять шоколад особливо ніжним та ароматним.',
  '♥ Крафтова технологія виготовлення, яка створює правдивий шоколад і зберігає корисні властивості бобів какао.',
  '♥ Довершені рецепти, здатні подарувати насолоду як поціновувачам класики, так і любителям експериментів.',
  '♥ Естетика у всьому: від шоколаду до упакування.'
];

const AboutPage = ({ router, firebaseData }) => (
  <Layout
    title="About"
    router={router}
    firebaseData={firebaseData}
    collections={['shop', 'chocolates']}
  >
    <Article py={Theme.styles.spacing.paddingY}>
      <PageTitle {...Theme.styles.mainPageTitle}>Наша Місія</PageTitle>
      <Text
        mt={20}
        fontWeight={500}
        textAlign="center"
        fontSize={[14, 16, 17, 18]}
      >
        Змінити культуру споживання шоколаду в Україні. Окрім цього, є й інші
        причини, чому ми варті вашої любові.
      </Text>
    </Article>
    <Section
      mx="auto"
      display="flex"
      flexWrap="wrap"
      maxWidth={1000}
      alignItems="center"
      justifyContent="space-between"
    >
      <Img
        height="100%"
        maxHeight={250}
        width={['100%', '100%', '45%']}
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fhome%2Fsection%2F1st.png?alt=media&token=c8dfbb7f-cb21-4b32-9285-647eaff842b3"
      />
      <Article
        mt={[20, 20, 0]}
        fontSize={[12, 14, 15, 16]}
        width={['100%', '100%', '45%']}
        color={Theme.colors.congoBrown}
      >
        <SectionTitle {...Theme.styles.pageTitle}>Про Нас</SectionTitle>
        <Text mt={20} textAlign="justify" lineHeight={1.54}>
          Усе найкраще починається з любові. Саме так сталось із Kit`s chocolate
          та продовжується досі. Самостійно обсмажуємо крупинки любові із
          відбірними какао-бобами та відправляємо на наступні етапи виготовлення
          правдивого шоколаду. Весь процес відбувається у Львові, де ми працюємо
          із витонченістю смаку, чесністю складників та мистецтвом естетичного
          пакування.
        </Text>
        <Text mt={20} textAlign="justify" lineHeight={1.54}>
          Минає час. Чиясь доня кумедно смакує вже улюблений молочний, а в цей
          час в іншому куточку країни хтось отримує шоколад з мигдалем і
          морською сіллю в подарунок. А ще хтось насолоджується білим з
          чорницею, та в шафці береже екстрачорний з вишнею, на особливі
          випадки.
        </Text>
        <Text mt={20} fontWeight={500} lineHeight={1.54} textAlign="justify">
          Kit`s chocolate завжди біля тебе. Бо він — любов.
        </Text>
      </Article>
    </Section>
    <Section
      mt={50}
      mx="auto"
      display="flex"
      maxWidth={1000}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <SectionTitle
        {...Theme.styles.pageTitle}
        width="100%"
        textAlign="center"
        mb={Theme.styles.spacing.paddingY}
      >
        5 ПРИЧИН ЗАКОХАТИСЬ У KIT’S CHOCOLATE
      </SectionTitle>
      {reasons.map((reason, index) => (
        <Article key={index} mb={15} width={['100%', '100%', '45%']}>
          <ArticleTitle fontWeight={500} lineHeight={1.54}>
            {reason}
          </ArticleTitle>
        </Article>
      ))}
    </Section>
    <Article mt={20} ml="auto" width={['100%', 'max-content']}>
      <ArticleTitle
        fontWeight={500}
        lineHeight={1.54}
        fontSize={[14, 16, 17, 18]}
        color={Theme.colors.congoBrown}
      >
        Та слова не замінять майстерного шматочка. <br /> Спробуй шоколадну
        істину, спробуй Kit`s chocolate.
      </ArticleTitle>
    </Article>
    <Section
      mx="auto"
      display="flex"
      maxWidth={1000}
      flexWrap="wrap"
      justifyContent="space-between"
      mt={Theme.styles.spacing.paddingY}
    >
      <SectionTitle
        {...Theme.styles.pageTitle}
        width="100%"
        textAlign="center"
        mb={Theme.styles.spacing.paddingY}
      >
        Наша Команда
      </SectionTitle>
      {[1, 2, 3, 4].map(item => (
        <Article mx="auto" key={item} maxWidth={200} textAlign="center">
          <Img
            mx="auto"
            width={120}
            height={120}
            display="block"
            src="/profile.png"
          />
          <ArticleTitle mt={15} mb="6px">
            Johnny Silverhand
          </ArticleTitle>
          <DescriptionTitle color={Theme.colors.mediumWood}>
            The Legend of Night City
          </DescriptionTitle>
        </Article>
      ))}
    </Section>
    <FavoriteProducts
      router={router}
      shop={R.pathOr({}, ['data', 'shop'], firebaseData)}
      chocolates={R.pathOr({}, ['data', 'chocolates'], firebaseData)}
    />
  </Layout>
);

export default AboutPage;
