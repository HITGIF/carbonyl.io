import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRss, faFilePdf, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {Canvas} from 'react-three-fiber'
import ModelView from "./ModelView";
import Menu from "./Menu";
import './res/styles.css';
import './res/menu.css';

export const BLOG_URL = "https://blog.carbonyl.io"
export const RESUME_URL = "https://carbonyl.io/resume.pdf"
export const GITHUB_URL = "https://github.com/HITGIF"

export default function Carbonyl () {

  let [open, setOpen] = useState(false);
  let [animate, setAnimate] = useState(false);

  function handleAnimationEnd () {
    setAnimate(false);
    setOpen(!open);
  }

  return (
    <div className="root">
      <div className='canvas-container'>
        <Canvas>
          <directionalLight intensity={3}/>
          <ambientLight intensity={1}/>
          <ModelView/>
        </Canvas>
        <div className="citation-container">
          <FontAwesomeIcon
            className="info_icon"
            icon={faInfoCircle}/>
          <span className='citation latin'>
            Copyright &copy; {new Date().getFullYear()} Carbonyl <br/>
          Model made by
          <a href="https://sketchfab.com/iKuroiNeko"> iKuroiNeko </a>
          /
          <a href="https://creativecommons.org/licenses/by/4.0/"> CC BY </a>
        </span>
        </div>
      </div>
      <div className="button-container">
        <a href={BLOG_URL}
           rel="noopener noreferrer"
           target="_blank">
          <div className="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="button-text-img" viewBox="0 0 66.729 75.846">
              <path className="button-text-img"
                    d="M19.266,22.843A6.834,6.834,0,0,0,21.645,17.5c0-4.719-3.861-7.8-8.619-7.8H2.34V37H13.806c4.875,0,8.814-3.159,8.814-7.995A7.049,7.049,0,0,0,19.266,22.843Zm-6.24-7.293a2.283,2.283,0,0,1,2.379,2.418,2.3,2.3,0,0,1-2.379,2.418H8.58V15.55Zm.78,15.6H8.58V25.924h5.226a2.467,2.467,0,0,1,2.574,2.613A2.467,2.467,0,0,1,13.806,31.15Zm25.974-.156V9.7H33.54V37H49.53V30.994ZM15.366,85.546a14.2,14.2,0,1,0,0-28.392,14.2,14.2,0,1,0,0,28.392Zm0-6.084a8.114,8.114,0,0,1,0-16.224,8.114,8.114,0,0,1,0,16.224ZM67.9,69.79H54.21v5.46H61.5c-.975,2.613-3.354,4.212-6.981,4.212-5.3,0-8.58-3.393-8.58-8.034a7.848,7.848,0,0,1,8.034-8.19,7.806,7.806,0,0,1,6.669,3.2l5.3-3.042a13.965,13.965,0,0,0-11.934-6.24A14.158,14.158,0,0,0,39.7,71.389c0,7.839,6.162,14.157,14.742,14.157,7.644,0,13.455-5.07,13.455-13.416Z"
                    transform="translate(-1.17 -9.7)"/>
            </svg>
            <FontAwesomeIcon
              className="button-icon"
              icon={faRss}/>
          </div>
        </a>
        <a href={RESUME_URL}
           rel="noopener noreferrer"
           target="_blank">
          <div className="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="button-text-img" viewBox="0 0 111.735 75.846">
              <path className="button-text-img"
                    d="M16.692,37H23.4L17.589,26.977A9,9,0,0,0,22.62,19.06,9.338,9.338,0,0,0,13.26,9.7H2.34V37H8.58V28.03h2.964ZM8.58,15.55h4.68a3.305,3.305,0,0,1,3.12,3.51,3.305,3.305,0,0,1-3.12,3.51H8.58ZM40.365,30.994V26.158h9.75V20.23h-9.75V15.706H51.09V9.7H34.125V37h17.16V30.994ZM72.15,37.546c5.928,0,10.14-3.12,10.14-8.385,0-5.772-4.641-7.215-8.775-8.463-4.251-1.287-4.914-2.145-4.914-3.393,0-1.092.975-2.067,2.925-2.067A4.784,4.784,0,0,1,76.245,18.4l5.265-3.081a10.589,10.589,0,0,0-9.984-6.162c-4.719,0-9.165,3.042-9.165,8.307,0,5.226,3.978,7.176,8.034,8.307,4.1,1.131,5.655,1.794,5.655,3.471,0,1.053-.741,2.223-3.705,2.223a5.718,5.718,0,0,1-5.733-3.783L61.23,30.8C62.751,34.816,66.417,37.546,72.15,37.546Zm31.395,0c6.006,0,10.53-3.51,10.53-9.36V9.7h-6.24V27.64c0,2.067-.975,3.822-4.29,3.822s-4.29-1.755-4.29-3.822V9.7h-6.24V28.186C93.015,34.036,97.539,37.546,103.545,37.546ZM29.64,57.7H23.4L15.99,69.829,8.58,57.7H2.34V85H8.58V69.127L15.639,80.71h.7L23.4,69.127V85h6.24ZM48.36,78.994V74.158h9.75V68.23H48.36V63.706H59.085V57.7H42.12V85H59.28V78.994Z"
                    transform="translate(-2.34 -9.154)"/>
            </svg>
            <FontAwesomeIcon
              className="button-icon"
              icon={faFilePdf}/>
          </div>
        </a>
        <a href={GITHUB_URL}
           rel="noopener noreferrer"
           target="_blank">
          <div className="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="button-text-img" viewBox="0 0 88.14 76.392">
              <path
                d="M29.367,21.79H15.678v5.46h7.293c-.975,2.613-3.354,4.212-6.981,4.212-5.3,0-8.58-3.393-8.58-8.034a7.848,7.848,0,0,1,8.034-8.19,7.806,7.806,0,0,1,6.669,3.2l5.3-3.042a13.965,13.965,0,0,0-11.934-6.24A14.158,14.158,0,0,0,1.17,23.389c0,7.839,6.162,14.157,14.742,14.157,7.644,0,13.455-5.07,13.455-13.416ZM40.677,9.7V37h6.24V9.7Zm37.05,0H57.447v6.006h7.02V37h6.24V15.706h7.02ZM17.16,57.7V68.152H8.58V57.7H2.34V85H8.58V74.158h8.58V85H23.4V57.7ZM46.215,85.546c6.006,0,10.53-3.51,10.53-9.36V57.7h-6.24V75.64c0,2.067-.975,3.822-4.29,3.822s-4.29-1.755-4.29-3.822V57.7h-6.24V76.186C35.685,82.036,40.209,85.546,46.215,85.546Zm39.741-14.7A6.834,6.834,0,0,0,88.335,65.5c0-4.719-3.861-7.8-8.619-7.8H69.03V85H80.5c4.875,0,8.814-3.159,8.814-8A7.049,7.049,0,0,0,85.956,70.843Zm-6.24-7.293a2.418,2.418,0,0,1,0,4.836H75.27V63.55Zm.78,15.6H75.27V73.924H80.5a2.613,2.613,0,0,1,0,5.226Z"
                transform="translate(-1.17 -9.154)"/>
            </svg>
            <FontAwesomeIcon
              className="button-icon"
              icon={faGithub}/>
          </div>
        </a>
      </div>
      <div
        className="title-block">
        <svg xmlns="http://www.w3.org/2000/svg" className="title-img" viewBox="0 0 431.64 570.52">
          <path
            d="M70.92,2.52c23.04,0,43.2-11.34,54-29.16l-24.84-14.4c-5.4,9.72-16.38,15.48-29.16,15.48C48.6-25.56,34.2-40.5,34.2-63s14.4-37.44,36.72-37.44c12.78,0,23.58,5.76,29.16,15.48l24.84-14.4c-10.98-17.82-31.14-29.16-54-29.16C32.94-128.52,5.4-100.08,5.4-63S32.94,2.52,70.92,2.52ZM254.52,0h31.5L243.18-126H206.46L163.62,0h31.5l6.3-19.8h46.8ZM210.06-46.8l14.76-46.26L239.58-46.8ZM399.06,0h30.96L403.2-46.26c13.86-7.02,23.22-21.06,23.22-36.54a43.1,43.1,0,0,0-43.2-43.2h-50.4V0h28.8V-41.4H375.3ZM361.62-99h21.6c7.92,0,14.4,7.02,14.4,16.2s-6.48,16.2-14.4,16.2h-21.6ZM88.92,155.66A31.542,31.542,0,0,0,99.9,131c0-21.78-17.82-36-39.78-36H10.8V221H63.72c22.5,0,40.68-14.58,40.68-36.9A32.535,32.535,0,0,0,88.92,155.66ZM60.12,122c6.66,0,10.98,4.68,10.98,11.16s-4.5,11.16-10.98,11.16H39.6V122Zm3.6,72H39.6V169.88H63.72c7.2,0,11.88,5.04,11.88,12.06S70.92,194,63.72,194Zm151.2,29.52c36.18,0,65.52-28.44,65.52-65.52S251.1,92.48,214.92,92.48,149.4,120.92,149.4,158,178.74,223.52,214.92,223.52Zm0-28.08c-20.52,0-36.72-14.94-36.72-37.44s16.2-37.44,36.72-37.44S251.64,135.5,251.64,158,235.44,195.44,214.92,195.44ZM402.84,95v68.4L354.24,95h-21.6V221h28.8V152.6l48.6,68.4h21.6V95ZM113.4,316H80.64L56.7,364.6,32.76,316H0l42.3,77.58V442H71.1V393.58ZM189,414.28V316H160.2V442H234V414.28Z"
            transform="translate(0 128.52)"/>
        </svg>
        <div className="description">
        </div>
      </div>
      <Menu animate={animate}
            open={open}
            endAnimation={handleAnimationEnd}/>
      <div className="menu-container"
           onClick={() => setAnimate(true)}>
        <div className={animate ? open ? 'line' : 'cross-R' : open ? 'cross-R' : 'line'}/>
        <div className={animate ? open ? 'line' : 'cross-L' : open ? 'cross-L' : 'line'}/>
      </div>
    </div>
  );
}
