const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#fff',
    lightgray: '#e1e2e3',
    backgroundPrimary: '#24292e',
    backgroundSecondary: '#dbdbdb',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  margins: {
    xsmall: 2,
    small: 4,
    medium: 8,
    large: 15,
  },
  paddings: {
    xsmall: 2,
    small: 5,
    medium: 10,
    large: 15,
    xlarge: 20,
  },
};

export default theme;
