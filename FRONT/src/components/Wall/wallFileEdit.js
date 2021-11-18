import { useDispatch, useSelector } from "react-redux";
import * as React from "react";

import { saveAs } from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';
import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";

import { updateContents, setContents } from "src/actions/textEdit";

import "react-quill/dist/quill.snow.css";


const __ISIOS__ = navigator.userAgent.match(/iPad|iPhone|iPod/i) ? true : false;
let quillRef = null; 
let onKeyEvent = false;

const WallFileEdit = () => {
  const dispatch = useDispatch();
  const { contents, delta } = useSelector((state) => state.textEdit);

  
  React.useEffect(() => {
    console.log(contents);
    let htmlObject = document.createElement('div');
    htmlObject.innerHTML = contents;
    let imgNodeList = Array.from(htmlObject.querySelectorAll('img'));
    console.log(imgNodeList);
    let arrayB64 = [];
    imgNodeList.forEach((img) => {
      getBase64FromUrl(img.src).then((data)=>{
        img.src = data;
        dispatch(setContents(htmlObject.outerHTML));
      });
    });
  }, []);
  

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] }
        ],
        ["link", "image"],
        ["clean"]
      ],
    },
    clipboard: { matchVisual: false },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align"
  ];

  const onKeyUp = (event) => {
    if (!__ISIOS__) return;
    // enter
    if (event.keyCode === 13) {
      onKeyEvent = true;
      quillRef.blur();
      quillRef.focus();
      if (document.documentElement.className.indexOf("edit-focus") === -1) {
        document.documentElement.classList.toggle("edit-focus");
      }
      onKeyEvent = false;
    }
  };

  const onFocus = () => {
    if (
      !onKeyEvent &&
      document.documentElement.className.indexOf("edit-focus") === -1
    ) {
      document.documentElement.classList.toggle("edit-focus");
      window.scrollTo(0, 0);
    }
  };

  const onBlur = () => {
    if (
      !onKeyEvent &&
      document.documentElement.className.indexOf("edit-focus") !== -1
    ) {
      document.documentElement.classList.toggle("edit-focus");
    }
  };

  const doBlur = () => {
    onKeyEvent = false;
    quillRef.blur();
    // force clean
    if (document.documentElement.className.indexOf("edit-focus") !== -1) {
      document.documentElement.classList.toggle("edit-focus");
    }
  };
  let pdfContent;
  const onChangeContents = (content, delta, source, editor) => {
    dispatch(updateContents(content, editor.getContents()));
    pdfContent = editor.getContents();
  };
  
  const savePDF = async () => {
    console.log(delta);
    const pdfAsBlob = await pdfExporter.generatePdf(delta); 
    console.log('delta2',delta);
    saveAs(pdfAsBlob, 'pdf-export.pdf'); 
  }

  return (
    <div className="PDFpage">
      <button className="btn save-pdf" onClick={savePDF}>Sauvegarder</button>
      <div className="main-content">
        <ReactQuill
          onRef={(el) => (quillRef = el)}
          value={contents}
          onChange={onChangeContents}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onBlur={onBlur}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}

export default WallFileEdit;
