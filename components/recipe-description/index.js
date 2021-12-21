import * as R from 'ramda';
// theme
import Theme from '../../theme';
// ui
import {
  Box,
  Img,
  Flex,
  Text,
  Input,
  Button,
  Article,
  Section,
  ArticleTitle
} from '../../ui';
// //////////////////////////////////////////////////

const weight = { small: 100, medium: 200 };

const RecipeDescription = props => {
  const {
    title,
    imgUrl,
    quantity,
    activeSize,
    description,
    setActiveSize,
    ingredientIcons,
    handleChangeQuantity
  } = props;

  const activeWeight = R.prop(activeSize, weight);
  const getActiveSizeBtnColor = btn =>
    R.equals(btn, activeSize)
      ? Theme.colors.mediumWood
      : Theme.colors.transparentBlue;

  return (
    <Section
      mt={50}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Img src={imgUrl} maxHeight={450} width="55%" />
      <Box ml={50} width="45%" maxWidth={450}>
        <Article>
          <ArticleTitle fontSize={25} fontWeight={500}>
            {title}
          </ArticleTitle>
          <Text
            my={20}
            fontSize={14}
            opacity="0.54"
            lineHeight={1.54}
            textAlign="justify"
          >
            {description}
          </Text>
        </Article>
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex>
              <Input
                pl={10}
                width={40}
                height={60}
                type="number"
                fontWeight={500}
                value={quantity}
                border="1px solid"
                borderColor={Theme.colors.lightBlue}
                onChange={event =>
                  handleChangeQuantity(event.currentTarget.value)
                }
              />
              <Box width={30} height={60} background={Theme.colors.quincy}>
                <Flex
                  height="50%"
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => handleChangeQuantity(R.inc(quantity))}
                >
                  <Box
                    width="0px"
                    height="0px"
                    borderBottom="5px solid white"
                    borderLeft="5px solid transparent"
                    borderRight="5px solid transparent"
                  />
                </Flex>
                <Flex
                  height="50%"
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => handleChangeQuantity(R.dec(quantity))}
                >
                  <Box
                    width="0px"
                    height="0px"
                    borderTop="5px solid white"
                    borderLeft="5px solid transparent"
                    borderRight="5px solid transparent"
                  />
                </Flex>
              </Box>
            </Flex>
            <Box ml={40} width="100%" maxWidth={300}>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex>
                  <Text color={Theme.colors.lightGrey}>Size:</Text>
                  <Text ml="5px" fontWeight={500} color={Theme.colors.quincy}>
                    {activeSize}
                  </Text>
                </Flex>
                <Flex>
                  <Text color={Theme.colors.lightGrey}>Weight:</Text>
                  <Text ml="5px" fontWeight={500} color={Theme.colors.quincy}>
                    {R.multiply(activeWeight, quantity)} gr
                  </Text>
                </Flex>
                <Flex>
                  <Img
                    mr="5px"
                    width={15}
                    height={15}
                    src="../dark-clock.svg"
                  />
                  {30} хв
                </Flex>
              </Flex>
              <Flex m="20px auto" width="max-content">
                <Button
                  mr={20}
                  width={90}
                  height={20}
                  border="1px solid"
                  textTransform="uppercase"
                  onClick={() => setActiveSize('small')}
                  color={getActiveSizeBtnColor('small')}
                  borderColor={getActiveSizeBtnColor('small')}
                >
                  mini
                </Button>
                <Button
                  ml={20}
                  width={90}
                  height={20}
                  border="1px solid"
                  textTransform="uppercase"
                  color={getActiveSizeBtnColor('medium')}
                  onClick={() => setActiveSize('medium')}
                  borderColor={getActiveSizeBtnColor('medium')}
                >
                  standart
                </Button>
              </Flex>
            </Box>
          </Flex>
        </>
        <Flex
          mt={20}
          p="0 0 10px 40px"
          borderRadius="16px"
          background="#F8FBFC"
        >
          {ingredientIcons.map((item, index) => (
            <Img
              mt={10}
              mr={40}
              src={item}
              key={index}
              width={50}
              height={50}
              alt={`ingredient-${item}`}
            />
          ))}
        </Flex>
      </Box>
    </Section>
  );
};

export default RecipeDescription;
