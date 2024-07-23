import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    mobile: true;
    tablet: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const themeSettings = (themeMode: boolean) => {

  const theme = createTheme({
    typography: {
      fontSize: 14,
    },
    
    breakpoints: {
      values: {
        xs: 425,
        mobile: 640,
        sm: 768,
        tablet: 920,
        md: 1024,
        lg: 1280,
        xl: 1440
      },
    },
    palette: {
      mode: themeMode ? 'dark' : 'light',    
    }
  });

  return {
    theme,
  }

}

export default themeSettings;


