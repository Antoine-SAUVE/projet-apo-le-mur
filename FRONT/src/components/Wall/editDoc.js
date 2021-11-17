import { useSelector, useDispatch } from 'react-redux';
import Input from "../inputForm/inputs";
import ListInput from "../inputForm/listInput";
import Textarea from "../inputForm/textarea";
import Select from "../inputForm/select";
import FileInput from "../inputForm/file";
import { updateDocName, updateFileName, postLink, deleteLink } from "src/actions/element";
import { validateForm, validateField, checkUrl } from "src/components/inputForm/validate";
import { changeDoc } from "src/actions/element";

import './style.scss';

const editDocForm = ({  closePanel }) => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements);

  const { name, description, type, currentLink, link, src } = elements;
  const imgName = src.substring(src.lastIndexOf('/') + 1);

  const inputChange = (e) => {
    dispatch(updateDocName(e.target.value, e.target.name));
  }

  const addLink = (e) => {
    if (currentLink.trim().length && checkUrl(e.target.previousElementSibling.firstChild.firstChild)) dispatch(postLink(currentLink));
  }

  const suppLink = (e) => {
    dispatch(deleteLink(e.target.previousElementSibling.textContent));
  }

  const fileChange = (e) => {
    dispatch(updateFileName(e.target.files[0], e.target.name));
  }

  const selectChange = (e) => {
    dispatch(updateDocName(e.target.value, e.target.name));
  }

  const submitDoc = (e) => {
    e.preventDefault();
    if (checkForm(e.target.elements)) {
      dispatch(changeDoc());
    }
  }

  const checkForm = (formEl) => {
    if (validateForm(formEl)) return true;
  }

  const formChange = (e) => {
    validateField(e.target);
  }
  
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
      <h2 className="form-title">Modifier le Document</h2>
      <form className="add-doc-form" onSubmit={submitDoc} onChange={formChange} encType="multipart/form-data">
        <div className="inner-form">
          <Input classes="required" type="text" label="Nom" name="name" value={name} changeInput={inputChange}/>
          <Textarea classes="required" name="description" label="Description" value={description} changeInput={inputChange}/>
          <Select classes="required"  name="type" label="Type de document" value={type} changeInput={selectChange} options={['image', 'texte']} />
          {type == 'image' && <FileInput label="charger une image" value={imgName}  name="src" changeInput={fileChange}/>}
          {type == 'texte' && <Textarea classes="required" name="src" label="Rédiger un texte" value={src} changeInput={inputChange}/>}
          <div className="input-list">
            <ListInput type="url" label="Lien" name="currentLink" value={currentLink} changeInput={inputChange} action={addLink}/>
            {linksListJSX}
          </div>
          <input className="btn btn-submit-txt" type="submit"  value="Valider"/>
        </div>
      </form>
    </div>
  )
};
export default editDocForm;
