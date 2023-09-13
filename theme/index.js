const colors = {
  white: '#fff',
  blue: '#2871a7',
  green: '#19ab27',
  quincy: '#62554a',
  lightBlue: '#e1e8ee',
  lightGrey: '#a9a9a9',
  woodyBrown: '#4c3434',
  congoBrown: '#644543',
  mediumWood: '#b89b86',
  lighterGrey: '#dadada',
  lightSlateGrey: '#818c96',
  transparentBlue: '#e6ebef',
  inputErrorColor: '#c72833',
  mainBlack: 'rgba(0, 0, 0, 0.87)'
};

export default {
  colors,
  styles: {
    spacing: {
      paddingY: [20, 30, 40, 50]
    },
    mainPageTitle: {
      lineHeight: 1.33,
      textAlign: 'center',
      color: colors.woodyBrown,
      fontSize: [25, 30, 35, 40]
    },
    pageTitle: {
      textAlign: 'center',
      color: colors.congoBrown,
      fontSize: [25, 30, 35, 40]
    },
    formSectionTitle: {
      fonSize: 20,
      color: colors.mainBlack
    },
    actionButton: {
      fontSize: 14,
      fontWeight: 500,
      color: colors.white,
      background: colors.mediumWood
    }
  }
};
