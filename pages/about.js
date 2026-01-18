import React from 'react';
// components
import Layout from '../components/layout';
import { ContactUs } from './partnership';
import ImageComponent from '../components/image';
// theme
import Theme from '../theme';
// ui
import { Img, Text, Button, Section, Article, SectionTitle } from '../ui';
// images
import Image4 from '../public/images/4.jpeg';
// ////////////////////////////////////////////////

const AboutPage = () => (
  <Layout title="About" collections={['shop', 'chocolates']}>
    {({ router }) => (
      <>
        <Section
          mx="auto"
          display="flex"
          maxWidth={1000}
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="space-between"
          py={Theme.styles.spacing.paddingY}
        >
          <ImageComponent
            src={Image4}
            alt="image4"
            placeholder="blur"
            layout="responsive"
            wrapperStyles={{
              width: ['100%', '100%', '50%']
            }}
          />
          <Article
            mb={[20, 30, 0]}
            fontSize={[12, 14, 15, 16]}
            width={['100%', '100%', '45%']}
            color={Theme.colors.congoBrown}
          >
            <SectionTitle {...Theme.styles.pageTitle}>Про Нас</SectionTitle>
            <Text mt={20} textAlign="justify" lineHeight={1.54}>
              Kit's Chocolate — це шоколад із чистим складом і справжнім смаком, який об’єднує людей. Ми дбаємо про кожен етап виробництва — від какао-боба до плитки — щоб в результаті ви отримували не просто шоколад, а привід зупинитися й провести час разом.
            </Text>
            <Text mt={20} textAlign="justify" lineHeight={1.54}>
              Наш шоколад — про розмови за чашкою кави чи чаю, про теплі вечори з близькими, про моменти, які залишаються у пам’яті. Ми створюємо продукт, який дарує задоволення без компромісів і допомагає формувати щасливі спогади вже сьогодні.
            </Text>
            {/* <Text mt={20} lineHeight={1.54} textAlign="justify">
              Кожен шматочок Kit's Chocolate - це плоди нашої праці, якою ми
              пишаємось.
            </Text>
            <Text mt={20} lineHeight={1.54} textAlign="justify">
              Наша мета виходить за межі лише створення шоколадних продуктів. Ми
              націлені на зміну уявлень про шоколад в Україні, спонукаючи
              споживачів бачити в ньому більше, ніж просто солодощі. Ми віримо у
              важливість натуральних інгредієнтів та вишуканості смаку, і готові
              ділитися цією радістю з вами. Ваша підтримка та довіра Kit's
              Chocolate - це те, що надихає нас продовжувати нашу місію та
              дарувати вам найкраще.
            </Text> */}
          </Article>
        </Section>
        <Section
          mx="auto"
          display="flex"
          flexWrap="wrap"
          maxWidth={1000}
          alignItems="stretch"
          justifyContent="space-between"
        >
          <Article width="45%" textAlign="center">
            <Text mb={20} lineHeight={1.54} fontSize={[12, 14, 15, 16]}>
              Маєте бажання дізнатися більше або розпочати співпрацю? Звертатися
              до нас. З нетерпінням чекаємо на ваші листи!
            </Text>
            <ContactUs text="Напишіть Нам" />
          </Article>
          <Section
            width="45%"
            display="flex"
            textAlign="center"
            flexDirection="column"
            fontSize={[12, 14, 15, 16]}
            justifyContent="space-between"
          >
            <Text lineHeight={1.54} fontSize={[12, 14, 15, 16]}>
              Або просто насолоджуйтесь нашим шоколадом
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
          </Section>
        </Section>
      </>
    )}
  </Layout>
);

export default AboutPage;
