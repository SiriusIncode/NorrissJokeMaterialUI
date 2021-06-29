import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(0, 150, 50)"
    },
    secondary: {
      main: "rgb(194, 160, 58)",
      contrastText: "#fff"
    }
  },
  typography: {
    fontSize: 12
  }
});

console.log(theme);

export default theme;
