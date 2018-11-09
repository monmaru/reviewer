import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#212121',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#919191',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
  typography: {
    fontFamily: [
      'Noto Sans',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
