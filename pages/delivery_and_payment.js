import React from 'react';
// components
import Layout from '../components/layout';
import ImageComponent from '../components/image';
// theme
import Theme from '../theme';
// ui
import {
  Text,
  Flex,
  Section,
  Article,
  ListItem,
  PageTitle,
  StyledLink,
  RelativeBox,
  SectionTitle,
  ArticleTitle
} from '../ui';
// ////////////////////////////////////////////////

const PaymentAndDelivery = () => (
  <Layout title="Payment And Delivery">
    <Flex
      mx="auto"
      maxWidth={1000}
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-around"
      my={Theme.styles.spacing.paddingY}
    >
      <PageTitle {...Theme.styles.mainPageTitle}>
        Доставка та
        <br />
        Оплата
      </PageTitle>
      <ImageComponent
        fill
        placeholder="blur"
        src="/nova_poshta.png"
        wrapperStyles={{
          mt: [20, 0],
          height: 250,
          width: ['100%', '45%']
        }}
      />
    </Flex>
    <Section mx="auto" maxWidth={1000}>
      <SectionTitle
        {...Theme.styles.pageTitle}
        width="100%"
        textAlign="center"
        mb={Theme.styles.spacing.paddingY}
      >
        Доставка
      </SectionTitle>
      <Article mx="auto" maxWidth={1000}>
        <ArticleTitle fontWeight={500}>Доставка по Львову:</ArticleTitle>
        <ul>
          <ListItem mt={10}>
            По Львову можлива кур'єрська доставка (здійснюється кур'єром Нової
            Пошти протягом 2-3 днів)
          </ListItem>
          <ListItem mt={10}>
            Експрес - доставка на протязі трьох годин - вартість послуги 250 грн
            (при умові повної передоплати)
          </ListItem>
        </ul>
      </Article>
      <Article mt={20}>
        <ArticleTitle fontWeight={500}>Доставка по Україні:</ArticleTitle>
        <Text mt={10} fontWeight={500}>
          Компанія Kitschocolate доставляє свою продукцію по всій території
          України через Нову Пошту (протягом 2-3 днів).
        </Text>
        <ul>
          <ListItem mt={10}>
            Безкоштовна доставка діє на замовлення від 500 грн.
          </ListItem>
          <ListItem mt={10}>
            Вартість доставки замовлення до 500 у відділення пошти складає 75
            грн
          </ListItem>
          <ListItem mt={10}>
            Вартість кур'єрської доставки по Україні здійснюється кур'єром Нової
            Пошти та складає 105 грн
          </ListItem>
          <Text mt={10} fontWeight={500}>
            Звертаємо Вашу увагу: замовлення зберігаються у відділенні Нової
            Пошти на протязі 5 робочих днів після надходження. По закінченню
            п'ятиденного терміну зберігання – відбувається автоматичне
            повернення посилки відправнику.
          </Text>
        </ul>
      </Article>
    </Section>
    <Section mx="auto" maxWidth={1000} my={Theme.styles.spacing.paddingY}>
      <SectionTitle
        {...Theme.styles.pageTitle}
        width="100%"
        textAlign="center"
        mb={Theme.styles.spacing.paddingY}
      >
        Оплата
      </SectionTitle>
      <Article mt={20}>
        <ArticleTitle fontWeight={500}>
          Оплата карткою VISA/MasterCard/Приват24
        </ArticleTitle>
        <Text mt={10} lineHeight={1.54}>
          Для оплати замовлення можна використати картку Visa або MasterCard
          будь-якого банку. Щоб скористатися цим способом, потрібно обрати
          "Карткою Visa/MasterCard" в пункті "Спосіб оплати". На сторінці оплати
          ви повинні ввести свої дані і дані банківської картки.
        </Text>
        <Text mt={10} lineHeight={1.54}>
          У разі успішної оплати ми автоматично визначимо це і вкажемо в
          замовленні для менеджера. Конфіденційність та безпека гарантуються
          серверами проведення транзакцій від
          <StyledLink
            ml="5px"
            target="_blank"
            fontWeight="bold"
            color={Theme.colors.blue}
            href="https://wayforpay.com/uk"
            hoveredTextDecoration="underline"
          >
            Wayforpay.
          </StyledLink>
        </Text>
      </Article>
      <Article mt={20}>
        <ArticleTitle fontWeight={500}>Оплата готівкою</ArticleTitle>
        <Text mt={10} fontWeight={500}>
          Ви можете здійснити оплату готівкою одним з нижчеперелічених способів:
        </Text>
        <ul>
          <ListItem mt={10}>
            Ви можете оплатити замовлення безпосередньо в момент доставки товару
            кур'єром. (Львів)
          </ListItem>
          <ListItem mt={10}>
            Ви оплачуєте товар, доставку і зворотний переказ грошей в офісі
            служби доставки "Нова Пошта" свого міста, або кур'єру при отриманні.
          </ListItem>
        </ul>
      </Article>
    </Section>
  </Layout>
);

export default PaymentAndDelivery;
