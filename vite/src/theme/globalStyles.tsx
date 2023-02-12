import { GlobalStyles as MUIGlobalStyles, Theme } from "@mui/material";

export default function GlobalStyles({theme}: { theme: Theme }) {
    return (
        <MUIGlobalStyles
            styles={{
                "*": {
                    boxSizing: "border-box",
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    WebkitOverflowScrolling: "touch",
                },
                a: {
                    color: theme.palette.secondary.main,
                    textDecoration: "none",
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                },
                "#root": {
                    width: "100%",
                    height: "100%",
                },
                input: {
                    "&[type=number]": {
                        MozAppearance: "textfield",
                        "&::-webkit-outer-spin-button": {
                            margin: 0,
                            WebkitAppearance: "none",
                        },
                        "&::-webkit-inner-spin-button": {
                            margin: 0,
                            WebkitAppearance: "none",
                        },
                    },
                },
                img: {
                    display: "block",
                    maxWidth: "100%",
                },
                ul: {
                    margin: 0,
                    padding: 0,
                },
            }}
        />
    );
}
