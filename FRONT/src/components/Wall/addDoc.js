import { useSelector, useDispatch } from 'react-redux';
import Input from "../inputForm/inputs";
import ListInput from "../inputForm/listInput";
import Textarea from "../inputForm/textarea";
import Select from "../inputForm/select";
import FileInput from "../inputForm/file";
import { updateDocName, updateFileName, postLink, deleteLink } from "src/actions/element";
import { validateForm, validateField, checkUrl } from "src/components/inputForm/validate";
import { postDoc } from "src/actions/element";

import './style.scss';
//FORMULAIRE D'AJOUT DE DOCUMENT
const addDocForm = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements);

  const { id, name, description, type, currentLink, link, src } = elements;
  //maj champs valeurs
  const inputChange = (e) => {
    dispatch(updateDocName(e.target.value, e.target.name));
  }
  //ajout dans la liste de liens
  const addLink = (e) => {
    if (currentLink.trim().length && checkUrl(e.target.previousElementSibling.firstChild.firstChild)) dispatch(postLink(currentLink));
  }
  //suppression liens
  const suppLink = (e) => {
    dispatch(deleteLink(e.target.previousElementSibling.textContent));
  }
  //ajout image
  const fileChange = (e) => {
    dispatch(updateFileName(e.target.files[0], e.target.name));
  }

  const selectChange = (e) => {
    dispatch(updateDocName(e.target.value, e.target.name));
  }

  const submitDoc = (e) => {
    e.preventDefault();
    if (checkForm(e.target.elements)) {
      dispatch(postDoc());
    }
  }
  //validation de formulaire
  const checkForm = (formEl) => {
    if (validateForm(formEl)) return true;
  }
  //controle de champs
  //intervient après 1er submit
  const formChange = (e) => {
    validateField(e.target);
  }
  //liste des liens
  const linksListJSX = link.map((lien) => {
    return(
      <div key={lien}>
        <div className="field">
          {lien}
        </div>
        <button className="btn supp" type="button" onClick={suppLink}></button>
      </div>
    );
  });

  return (
    <div className="panel-form">
      <h2 className="form-title">Nouveau Document</h2>
      <form className="add-doc-form" onSubmit={submitDoc} onChange={formChange} encType="multipart/form-data" noValidate>
        <Input classes="required" type="text" label="Nom" name="name" value={name} changeInput={inputChange}/>
        <Textarea classes="required" name="description" label="Description" value={description} changeInput={inputChange}/>
        <Select classes="required"  name="type" label="Type de document" value={type} changeInput={selectChange} options={['image', 'texte']} />
        {type == 'image' && <FileInput classes="required" label="charger une image" value={src}  name="src" changeInput={fileChange}/>}
        {type == 'texte' && <Textarea classes="required" name="src" label="Rédiger un texte" value={src} changeInput={inputChange}/>}
        <div className="input-list">
          <ListInput type="url" label="Lien" name="currentLink" value={currentLink} changeInput={inputChange} action={addLink}/>
          {linksListJSX}
        </div>
        <input className="btn btn-submit-txt" type="submit" value="Valider" />
      </form>
    </div>
  )
};
export default addDocForm;
