import React, {useMemo} from "react";
import {CssBaseline} from "@mui/material";
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from "@mui/material/styles";
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import {ThemeOptions} from "@mui/material/styles/createTheme";

export default function ThemeProvider({children}: {
    children: React.ReactNode,
}) {
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette,
            shape: {borderRadius: 6},
            typography,
            shadows: shadows(),
        }),
        []
    );

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <>
                    <CssBaseline/>
                    <GlobalStyles theme={theme}/>
                    {children}
                </>
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
