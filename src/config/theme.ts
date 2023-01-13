import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3399FF',
    },
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Poppins'].join(','),
  },
});
