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

const AboutPage = ({ router, firebaseData }) => (
  <Layout title="About" router={router}>
    <Article py={50}>
      <PageTitle {...Theme.styles.mainPageTitle}>Наша Місія</PageTitle>
      <Text mt={20} fontSize={18} textAlign="center" fontWeight={500}>
        Змінити культуру споживання шоколаду в Україні. Окрім цього, є й інші
        причини, чому ми варті вашої любові.
      </Text>
    </Article>
    <Section
      mx="auto"
      display="flex"
      maxWidth={1000}
      alignItems="center"
      justifyContent="space-between"
    >
      <Img
        width="45%"
        height="100%"
        maxHeight={250}
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fhome%2Fsection%2F1st.png?alt=media&token=c8dfbb7f-cb21-4b32-9285-647eaff842b3"
      />
      <Article width="45%" fontSize={16} color={Theme.colors.congoBrown}>
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
        mb={50}
        width="100%"
        textAlign="center"
      >
        5 ПРИЧИН ЗАКОХАТИСЬ У KIT’S CHOCOLATE
      </SectionTitle>
      <Article mb={15} width="45%">
        <ArticleTitle fontWeight={500} lineHeight={1.54}>
          ♥ Лаконічний склад, адже істинний шоколад містить лише какао-боби і
          цукор.
        </ArticleTitle>
      </Article>
      <Article mb={15} width="45%">
        <ArticleTitle fontWeight={500} lineHeight={1.54}>
          ♥ Рідкісний сорт какао-бобів Criollo, які роблять шоколад особливо
          ніжним та ароматним.
        </ArticleTitle>
      </Article>
      <Article mb={15} width="45%">
        <ArticleTitle fontWeight={500} lineHeight={1.54}>
          ♥ Крафтова технологія виготовлення, яка створює правдивий шоколад і
          зберігає корисні властивості бобів какао.
        </ArticleTitle>
      </Article>
      <Article mb={15} width="45%">
        <ArticleTitle fontWeight={500} lineHeight={1.54}>
          ♥ Довершені рецепти, здатні подарувати насолоду як поціновувачам
          класики, так і любителям експериментів.
        </ArticleTitle>
      </Article>
      <Article width="45%">
        <ArticleTitle fontWeight={500} lineHeight={1.54}>
          ♥ Естетика у всьому: від шоколаду до упакування.
        </ArticleTitle>
      </Article>
    </Section>
    <Article mt={20} ml="auto" width="max-content">
      <ArticleTitle
        fontSize={18}
        fontWeight={500}
        lineHeight={1.54}
        color={Theme.colors.congoBrown}
      >
        Та слова не замінять майстерного шматочка. <br /> Спробуй шоколадну
        істину, спробуй Kit`s chocolate.
      </ArticleTitle>
    </Article>
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
        mb={50}
        width="100%"
        textAlign="center"
      >
        Наша Команда
      </SectionTitle>
      {[1, 2, 3, 4].map(item => (
        <Article key={item} maxWidth={200} textAlign="center">
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
