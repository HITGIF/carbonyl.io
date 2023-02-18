import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ModelView from "@/components/ModelView";
import { Canvas } from "react-three-fiber";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

const StyledRoot = styled("div")(({theme}) => ({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    backgroundColor: theme.palette.primary.main,
}));

const Main = styled("div")(({theme}) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

const CitationContainer = styled("div")`
  align-items: center;
  position: absolute;
  bottom: 15px;
  left: 20px;
  display: flex;
  flex-direction: row;
  transition: .2s;

  .citation {
    color: white;
    margin-left: 10px;
    font-size: 15px;
    opacity: 0;
    transition: .2s;
  }

  &:hover {
    .citation {
      opacity: 1;
    }
  }
`;

const InfoIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 15px;
  opacity: 0.5;
`;

export default function HomeLayout() {
    return (
        <StyledRoot>
            <Canvas linear flat style={{
                width: "100vw",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
            }}>
                <directionalLight intensity={3}/>
                <ambientLight intensity={1}/>
                <ModelView play={isMobile}/>
            </Canvas>
            <Main>
                <Outlet/>
            </Main>
            <CitationContainer>
                <InfoIcon icon={faInfoCircle}/>
                <span className={"citation"}>
                    Copyright &copy; {new Date().getFullYear()} Carbonyl <br/>
                    Model made by
                    <a href="https://sketchfab.com/iKuroiNeko"> iKuroiNeko </a>
                    /
                    <a href="https://creativecommons.org/licenses/by/4.0/"> CC BY </a>
                </span>
            </CitationContainer>
        </StyledRoot>
    );
}
