import React, { useState} from "react"
// importing the main component
import { Viewer } from '@react-pdf-viewer/core'; 
// importing plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
//importing the styling
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core'; 
import './App.css';

function App() {
  const [file,setFile] = useState('')
  const [name ,setName] = useState('')
  const [filedataurl,setFiledata] = useState('')
  const [pdfError,setpdfError] = useState(null)
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onFileChange = (event) => {
    setpdfError(null)
    setFile(event.target.files[0])
    setName(event.target.files[0].name)
    var fileNameError = (event.target.files[0].name).split('.')[1]
    setName(fileNameError)
    console.log(fileNameError)
    if(fileNameError !== "pdf"){
      setpdfError(`${fileNameError} files are not allowed`)
    }
  }

  const onFileUpload = async (e) => {
    e.preventDefault()
    if(name === "pdf" ){
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = async (e) => {
        var url = e.target.result;
        console.log(url)
        await setFiledata(url)
      }
      setFiledata('')
    }
  }

  return (
    <div className="container">
      <br></br>
      <form className="form-group" onSubmit={(e) => onFileUpload(e)} enctype="multipart/form-data">
        <input type="file" name="expenses" className="form-control" onChange={(event) => onFileChange(event)} required />
        <br></br>
        <p className="pdf-error">{pdfError}</p>
        <button type="submit" className="btn btn-success btn-lg">
          UPLOAD FILE
        </button>
      </form>
      <br></br>
      <div className = "head">
        <h4>MAIN CONTENT
        </h4>
        <h4>RELATED
        <p>click to pin</p>
        </h4>
        <h4>PINNED
        <p>click to unpin</p>
        </h4>
        
      </div>
      
      <div className="pdf-container">
        {
        filedataurl ?
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
            <Viewer fileUrl={filedataurl}
              plugins={[defaultLayoutPluginInstance]} />
          </Worker>
          : ""
        }
      </div>
    </div>
  );
}

export default App;