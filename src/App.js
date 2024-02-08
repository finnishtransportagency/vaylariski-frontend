import CalculateRIV from "./components/CalculateRIV";
import { Header } from "components/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { cssColorCodes } from "constants/enums";

const theme = createTheme({
  palette: {
    primary: {
      main: cssColorCodes.BLUE_100,
      light: cssColorCodes.LIGHT_BLUE_100,
      dark: cssColorCodes.DARK_BLUE_100,
    },
    success: {
      main: cssColorCodes.GREEN_100,
      light: cssColorCodes.LIGHT_GREEN_100,
    },
    error: {
      main: cssColorCodes.RED_100,
    },
    info: {
      main: cssColorCodes.BLUE_100,
    },
  },
  typography: {
    fontFamily: `"Exo 2 Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          minWidth: 1210,
        }}
      >
        <Header />
        <CalculateRIV />
      </div>
    </ThemeProvider>
  );
}

export default App;
