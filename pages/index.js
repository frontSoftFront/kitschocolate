import React from 'react';
// components
import Layout from '../components/layout';
// theme
import Theme from '../theme';
// store
import { wrapper } from '../store';
// ui
import {
  Img,
  Box,
  Flex,
  Text,
  Button,
  Section,
  Article,
  PageTitle,
  SectionTitle,
  ArticleTitle
} from '../ui';
// ////////////////////////////////////////////////

const images = [
  '../static/home/chocolates/1.png',
  '../static/home/chocolates/2.png',
  '../static/home/chocolates/3.png',
  '../static/home/chocolates/4.png'
];

const HomePage = () => (
  <Layout title="Home">
    <Box
      pt={50}
      pb={100}
      borderBottom="2px solid"
      borderColor={Theme.colors.quincy}
    >
      <Flex justifyContent="space-between">
        <Section
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-between"
        >
          <PageTitle
            mt={20}
            fontSize={40}
            lineHeight={1.33}
            fontWeight="bold"
            textAlign="center"
            color={Theme.colors.woodyBrown}
          >
            Welcome to Kit’s Chocolate
          </PageTitle>
          <Button
            my={20}
            width={300}
            height={40}
            fontSize={20}
            border="2px solid"
            textTransform="uppercase"
            color={Theme.colors.woodyBrown}
          >
            Shop Online
          </Button>
          <Img
            width="46vw"
            height="26vw"
            maxWidth={644}
            maxHeight={364}
            src="../static/home/section/1st.png"
          />
        </Section>
        <Img
          width="34vw"
          height="100%"
          maxWidth={476}
          maxHeight={616}
          src="../static/home/section/2nd.png"
        />
      </Flex>
    </Box>
    <Section
      pt={50}
      pb={100}
      borderBottom="2px solid"
      borderColor={Theme.colors.quincy}
    >
      <SectionTitle
        mt={30}
        fontSize={45}
        textAlign="center"
        color={Theme.colors.congoBrown}
      >
        З’явився  новий  шоколад
      </SectionTitle>
      <Article mt={50}>
        <ArticleTitle fontSize={25} color={Theme.colors.congoBrown}>
          Великоднім наборам бути!
        </ArticleTitle>
        <Text
          mt={20}
          fontSize={20}
          fontWeight={300}
          color={Theme.colors.congoBrown}
        >
          Недивлячись на цей непростий час, ми вирішили, що таким чином дамо змогу привітати один одного дистанційно, яскраво і шоколадно. Ми розробили 3 набори: 
        </Text>
      </Article>
      <Img
        mt={110}
        width="100%"
        height={648}
        src="../static/home/section/3th.png"
      />
    </Section>
    <Section pt={50} pb={100}>
      <SectionTitle
        fontSize={45}
        textAlign="center"
        color={Theme.colors.congoBrown}
      >
        Найчастіше замовляють
      </SectionTitle>
      <Flex mt={100} justifyContent="space-between">
        {images.map((item, index) => (
          <Box key={index} width="25%">
            <Img src={item} width="100%" height="28vw" maxHeight={400} />
            <Box mx="auto" mt={40} width="90%">
              <Text
                fontSize={18}
                fontWeight={600}
                textAlign="center"
                color={Theme.colors.congoBrown}
              >
                Молочний Шоколад з Кокосом
              </Text>
              <Text
                mt={10}
                fontSize={18}
                fontWeight="bold"
                textAlign="center"
                color={Theme.colors.congoBrown}
              >
                78 грн
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Section>
  </Layout>
);

export const getStaticProps = wrapper.getStaticProps();

export default HomePage;
