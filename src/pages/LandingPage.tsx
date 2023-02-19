import { Helmet } from "react-helmet-async";
import { ButtonBase, Container, IconButton, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { ArrowRightAlt } from "@mui/icons-material";

const Root = styled(Container)(({theme}) => ({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
}));

const Panel = styled(Stack)(({theme}) => ({
    display: "flex",
    flexGrow: 1,
    overflow: "hidden",
    alignItems: "center",
}));

const StyledBox = styled(ButtonBase)(({theme}) => ({
    backgroundColor: alpha(theme.palette.common.white, 0),
    boxShadow: "inset 0 0 0 12px white",
    transition: "0.2s",
    "&& .MuiTouchRipple-child": {
        backgroundColor: theme.palette.primary.main,
    },
    tabIndex: 0,
}));

const smallBoxHeight = 16;
const totalHeight = smallBoxHeight * 3 + 10;

const SmallBox = styled(StyledBox)(({theme}) => ({
    height: theme.spacing(smallBoxHeight),
    width: theme.spacing(smallBoxHeight),
    "&:hover, &:focus": {
        boxShadow: "inset 0 0 0 0px white",
        height: theme.spacing(smallBoxHeight + 2),
        backgroundColor: theme.palette.common.white,
    },
}));

const BigBox = styled(StyledBox)(({theme}) => ({
    minHeight: theme.spacing(totalHeight),
    width: theme.spacing(totalHeight),
    maxWidth: "90%",
    userSelect: "text",
    cursor: "default",
    ".intro": {
        position: "absolute",
        transition: "0.2s",
        opacity: 0,
        margin: theme.spacing(8),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(4),
        }
    },
    ".title": {
        width: "100%",
        position: "absolute",
        transition: "0.2s",
        opacity: 1,
        padding: theme.spacing(6),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(3),
        }
    },
    "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "inset 0 0 0 20px white",
        ".intro": {
            opacity: 1,
        },
        ".title": {
            opacity: 0,
        },
    },
}));

const LeftPanel = styled(Panel)(({theme}) => ({
    height: theme.spacing(totalHeight),
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const RightPanel = styled(Panel)(({theme}) => ({
    justifyContent: "center",
}));

export default function LandingPage() {
    return (
        <>
            <Helmet>
                <title>
                    Carbonyl
                </title>
            </Helmet>
            <Root>
                <LeftPanel>
                    <SmallBox/>
                    <SmallBox/>
                    <SmallBox/>
                </LeftPanel>
                <RightPanel>
                    <BigBox disableRipple>
                        <Stack className={"title"} alignItems={"start"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 431.64 570.52"
                                 style={{
                                     fill: "white",
                                     maxHeight: (totalHeight - 15) * 8,
                                     maxWidth: "100%",
                                 }}>
                                <path
                                    d="M70.92,2.52c23.04,0,43.2-11.34,54-29.16l-24.84-14.4c-5.4,9.72-16.38,15.48-29.16,15.48C48.6-25.56,34.2-40.5,34.2-63s14.4-37.44,36.72-37.44c12.78,0,23.58,5.76,29.16,15.48l24.84-14.4c-10.98-17.82-31.14-29.16-54-29.16C32.94-128.52,5.4-100.08,5.4-63S32.94,2.52,70.92,2.52ZM254.52,0h31.5L243.18-126H206.46L163.62,0h31.5l6.3-19.8h46.8ZM210.06-46.8l14.76-46.26L239.58-46.8ZM399.06,0h30.96L403.2-46.26c13.86-7.02,23.22-21.06,23.22-36.54a43.1,43.1,0,0,0-43.2-43.2h-50.4V0h28.8V-41.4H375.3ZM361.62-99h21.6c7.92,0,14.4,7.02,14.4,16.2s-6.48,16.2-14.4,16.2h-21.6ZM88.92,155.66A31.542,31.542,0,0,0,99.9,131c0-21.78-17.82-36-39.78-36H10.8V221H63.72c22.5,0,40.68-14.58,40.68-36.9A32.535,32.535,0,0,0,88.92,155.66ZM60.12,122c6.66,0,10.98,4.68,10.98,11.16s-4.5,11.16-10.98,11.16H39.6V122Zm3.6,72H39.6V169.88H63.72c7.2,0,11.88,5.04,11.88,12.06S70.92,194,63.72,194Zm151.2,29.52c36.18,0,65.52-28.44,65.52-65.52S251.1,92.48,214.92,92.48,149.4,120.92,149.4,158,178.74,223.52,214.92,223.52Zm0-28.08c-20.52,0-36.72-14.94-36.72-37.44s16.2-37.44,36.72-37.44S251.64,135.5,251.64,158,235.44,195.44,214.92,195.44ZM402.84,95v68.4L354.24,95h-21.6V221h28.8V152.6l48.6,68.4h21.6V95ZM113.4,316H80.64L56.7,364.6,32.76,316H0l42.3,77.58V442H71.1V393.58ZM189,414.28V316H160.2V442H234V414.28Z"
                                    transform="translate(0 128.52)"/>
                            </svg>
                        </Stack>
                        <Stack className={"intro"} spacing={2} alignItems="center">
                            <Typography variant="h1">
                                🤟
                            </Typography>
                            <Typography variant="h5">
                                ぶんしゅかぶんしゅか ぶんぶんぶん<br/>(えいっ☆)
                            </Typography>
                            <IconButton
                                href={"https://youtu.be/7xKdRezA0vQ?t=45"}
                                target={"_blank"}
                            >
                                <ArrowRightAlt/>
                            </IconButton>
                        </Stack>
                    </BigBox>
                </RightPanel>
            </Root>
        </>
    );
}
