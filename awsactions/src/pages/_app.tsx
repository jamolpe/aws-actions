import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Roboto_Slab } from "next/font/google";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import styles from "../styles/styles.module.scss";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import Footer from "./Footer";
const roboto = Roboto_Slab({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: styles.appFont,
  },
  palette: {
    background: { paper: "#f6f6f6", default: "#f6f6f6" },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: styles.focusColor,
          },
          "& label.Mui-focused": {
            color: styles.focusColor,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: styles.focusColor,
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: styles.focusColor,
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: styles.focusColor,
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: styles.focusColor,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: styles.focusColor, // Change this to the color you want
          },
          "& label.Mui-focused": {
            color: styles.focusColor,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: styles.focusColor,
          },
          // focused color for input with variant='filled'
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: styles.focusColor,
          },
          // focused color for input with variant='outlined'
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: styles.focusColor,
            },
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <main
        className={roboto.className}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {loading ? <h1>Loading...</h1> : <Component {...pageProps} />}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
