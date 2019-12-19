import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faRss, faFilePdf} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import './styles.css';

function Carbonyl () {
  return (
    <div className="root">
      <div className="menu">
        <FontAwesomeIcon
          color="#222222"
          className="menu_icon"
          icon={faBars}/>
      </div>
      <div className="button_container">
        <a href="https://carbonyl.io"
           rel="noopener noreferrer"
           target="_blank">
          <div className="button">
            <FontAwesomeIcon
              className="button_icon"
              icon={faRss}/>
          </div>
        </a>
        <div className="button">
          <FontAwesomeIcon
            className="button_icon"
            icon={faFilePdf}/>
        </div>
        <div className="button">
          <FontAwesomeIcon
            className="button_icon"
            icon={faGithub}/>
        </div>
      </div>
      < div
        className="title_block">
        <img
          className='title_img'
          alt="CARBONYL"
          src="title.svg"
          draggable="false"/>
        <div className="description">
          <p className="latin">
            Hi, this is Carbonyl, a software engineering
            student.
          </p>
          <p className="japanese">
            どもう、ソフトウェアエンジニアリング学生、カルボニルです。
          </p>
          <p className="chinese">
            嗨，这里是羰基，一个软件工程学生。
          </p>
        </div>
      </div>
    </div>
  );
}

export default Carbonyl;
