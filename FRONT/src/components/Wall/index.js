import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';
import { updateDocName, emptyForm } from 'src/actions/element.js'
import { getWall, getWallInfo, updateWallInput, changePanel, toggleEye, displayMode, redirectPDF, backToStamp, menuMobbb } from 'src/actions/wall.js'
import { updateContents } from "src/actions/textEdit";
import Docs from './docs';
import AddDocForm from './addDoc';
import EditDocForm from './editDoc';
import InfoDocForm from './infoDoc';
import ChangeWallForm from './changeWall';
import InfoWallForm from './infoWall';

import './style.scss';

const Wall = ({ history }) => {
  const dispatch = useDispatch();

  // pour passer les infos du mur depuis la page Walls
  const location = useLocation();
  const { wallId } = location.state;
 
  const { title, docList, panel, displaysquare, menuMob } = useSelector((state) => state.wall);
  const currentUser = useSelector((state) => state.user.loggedUserInfos.id);
  //ouverture panneau latéral info/formulaires
  const slidePanel = () => {
    document.querySelector('.main').classList.add('on');
  }
  //fermeture panneau latéral
  //avec rafraichissement info/form si fermeture au clic bouton de fermeture panneau
  const closePanel = (e) => {
    if (e != undefined) {
      if ( panel == 'changeWallPanel') {
        dispatch(backToStamp());
      } else if ( panel == 'infoDocPanel' || panel == 'editDocPanel' ) {
        setTimeout(()=>{
          dispatch(emptyForm());
        },500);
        
      }
    }
    document.querySelector('.main').classList.remove('on');
  }

  useEffect(()=>{
    if (panel == false) {
      dispatch(changePanel(true));
      closePanel();
    }
  }, [panel]);
  //afficher le bon formulaire/résumé d'info dans le panneau latéral
  const displayPanel = (e) => {
    dispatch(changePanel(e.target.getAttribute('panel')));
    slidePanel();
  }
  //initialisation mur: récupération données mur/utilisateur et documents du mur
  //event désactivation bouton doc au clic page
  useEffect(() => {
    dispatch(updateWallInput(wallId, 'id'));
    dispatch(updateDocName(currentUser, 'owner_id'));
    dispatch(getWall());
    dispatch(getWallInfo());
    document.addEventListener('click', (e) => {
      if(!e.target.parentNode.parentNode.classList.contains('doc')) dispatch(toggleEye(-1));
    });
  },[]);
  //changer mode affichage de mur
  const displaySquare = (e) => {
    dispatch(displayMode());
  }
  //ouvrir/fermer menu mobile
  const triggerMenu = () => {
    dispatch(menuMobbb());
  }

  //transcrire mur info dans rich text editor 
  const editPdf = () => {
    let contents='';
    docList.forEach((doc) => {
      contents += `<h2 style="font-size:32px;text-align:center;font-family: Montserrat,sans-serif;font-weight:bold;">${doc.name}</h2>
        ${doc.type == 'image' ? `<img src=${doc.src} />` : `<p>${doc.src}</p>`}
        <p style="font-size:24px;">${doc.description}</p>
        <p style="font-size:24px;font-weight:bold;">Liens :</p>
        <ul>
       `;
      doc.link.forEach((link) => {
        contents += `<li><a href="${link}" style="font-size:24px;color:blue;text-decorations:none;">${link}</a></li>
        `;
      });
      contents += `</ul>
      `;
    });
     dispatch(updateContents(contents));
     history.push('/PDF');
  }

  return (
    
    <div className="wall">
      <div className="sub-header">
        <h1>{ title }</h1>
      </div>
      <div className="main">
        {/* {docList.length && <img src={getBase64Image(docList[5].src)}/>} */}
        <div className="dashboard">
          <div className="close-panel" onClick={closePanel}></div>
          <div className="fade-elem"></div>
          {panel == 'infoWallPanel' && <InfoWallForm />}
          {panel == 'changeWallPanel' && <ChangeWallForm />}
          {panel == 'infoDocPanel' && <InfoDocForm />}
          {panel == 'addDocPanel' && <AddDocForm />}
          {panel == 'editDocPanel' && <EditDocForm />}
        </div>
        <div className={menuMob ? "menu-bar on" : "menu-bar"}>
          <div className="icon menu-mob" onClick={triggerMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="icon info" panel="infoWallPanel" onClick={displayPanel}></div>
          <div className="icon add" panel="addDocPanel" onClick={displayPanel}></div>
          <div className="icon display" onClick={displaySquare}></div>
          <div className="icon pdf" onClick={editPdf}></div>
        </div>
        <div className={displaysquare ? "board-wrapper square" : "board-wrapper"}>
          <Docs docs={docList} getAction="infoDocPanel" getInfo={displayPanel} />
        </div>
      </div>
    </div>
  )
};
export default withRouter(Wall);
