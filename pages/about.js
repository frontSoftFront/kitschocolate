import React from 'react';
import * as R from 'ramda';
// components
import Layout from '../components/layout';
import { ContactUs } from './partnership';
// theme
import Theme from '../theme';
// ui
import { Img, Text, Button, Section, Article, SectionTitle } from '../ui';
// ////////////////////////////////////////////////

const AboutPage = ({ router, firebaseData }) => (
  <Layout
    title="About"
    router={router}
    firebaseData={firebaseData}
    collections={['shop', 'chocolates']}
  >
    <Section
      mx="auto"
      display="flex"
      flexWrap="wrap"
      maxWidth={1000}
      alignItems="center"
      justifyContent="space-between"
      py={Theme.styles.spacing.paddingY}
    >
      <Img
        height="100%"
        maxHeight={500}
        src="/images/4.jpeg"
        width={['100%', '100%', '50%']}
      />
      <Article
        mt={[20, 20, 0]}
        fontSize={[12, 14, 15, 16]}
        width={['100%', '100%', '45%']}
        color={Theme.colors.congoBrown}
      >
        <SectionTitle {...Theme.styles.pageTitle}>Про Нас</SectionTitle>
        <Text mt={20} textAlign="justify" lineHeight={1.54}>
          Kit's Chocolate - місце, де народжується натуральний шоколад, що
          розкриває неперевершений смак та дарує справжню насолоду. Наша місія -
          створювати якісний і вишуканий шоколад, зберігаючи при цьому чистоту
          складу та натуральність.
        </Text>
        <Text mt={20} textAlign="justify" lineHeight={1.54}>
          Ми віримо в силу кожного какао-боба, і саме тому ми обираємо їх самі,
          контролюючи кожен етап відбору та виробництва - від боба до плитки.
          Наш підхід дозволяє створювати продукцію, яка несе в собі найкраще, що
          пропонує нам природа.
        </Text>
        <Text mt={20} lineHeight={1.54} textAlign="justify">
          Кожен шматочок Kit's Chocolate - це плоди нашої праці, якою ми
          пишаємось.
        </Text>
        <Text mt={20} lineHeight={1.54} textAlign="justify">
          Наша мета виходить за межі лише створення шоколадних продуктів. Ми
          націлені на зміну уявлень про шоколад в Україні, спонукаючи споживачів
          бачити в ньому більше, ніж просто солодощі. Ми віримо у важливість
          натуральних інгредієнтів та вишуканості смаку, і готові ділитися цією
          радістю з вами. Ваша підтримка та довіра Kit's Chocolate - це те, що
          надихає нас продовжувати нашу місію та дарувати вам найкраще.
        </Text>
      </Article>
      <Article
        textAlign="center"
        fontSize={[12, 14, 15, 16]}
        // color={Theme.colors.congoBrown}
        mt={Theme.styles.spacing.paddingY}
      >
        <Text mb={20} lineHeight={1.54}>
          Маєте бажання дізнатися більше або розпочати співпрацю? Звертатися до
          нас. З нетерпінням чекаємо на ваші листи!
        </Text>
        <ContactUs text="Contact Us" />
        <Text my={20} lineHeight={1.54}>
          Або просто насолоджуйтесь нашим шоколадом” додати перехід в магазин
          “купити шоколад
        </Text>
        <Button
          {...Theme.styles.actionButton}
          mx="auto"
          height={40}
          width={200}
          onClick={() => router.push('/shop')}
        >
          Обрати шоколад
        </Button>
      </Article>
    </Section>
    {/* <Section
      mx="auto"
      display="flex"
      flexWrap="wrap"
      maxWidth={1000}
      alignItems="center"
      justifyContent="space-between"
      py={Theme.styles.spacing.paddingY}
    >
      <Article
        lineHeight={1.54}
        fontSize={[12, 14, 15, 16]}
        width={['100%', '100%', '45%']}
        color={Theme.colors.congoBrown}
        my={Theme.styles.spacing.paddingY}
      >
        <Text mb={20} lineHeight={1.54}>
          Маєте бажання дізнатися більше або розпочати співпрацю? Звертатися до
          нас. З нетерпінням чекаємо на ваші листи!
        </Text>
        <ContactUs mx="unset" text="Contact Us" />
        <Text my={20} lineHeight={1.54}>
          Або просто насолоджуйтесь нашим шоколадом” додати перехід в магазин
          “купити шоколад
        </Text>
        <Button
          {...Theme.styles.actionButton}
          height={40}
          width={200}
          onClick={() => router.push('/shop')}
        >
          Обрати шоколад
        </Button>
      </Article>
      <Img
        height="100%"
        maxHeight={500}
        src="/images/1.jpeg"
        width={['100%', '100%', '50%']}
      />
    </Section> */}
  </Layout>
);

export default AboutPage;
