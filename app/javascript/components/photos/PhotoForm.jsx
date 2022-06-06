import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
function PhotoForm() {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  let navigate = useNavigate();

  const renderFileName = () => {
    if (file) {
      return file.name
    }
    return "No file chosen"
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("photo[title]", title);
    formData.append("photo[source]", file);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch('/api/v1/photos', options)
      .then(response => response.json())
      .then(data => navigate("/"))
  }

  return (
    <React.Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <div style={{marginBottom: '1rem'}}>
          <TextField label="Title" name="title" onChange={e => setTitle(e.target.value)} value={title}/>
        </div>
        <div>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" type="file" style={{display: 'none'}}
              onChange={e => setFile(e.target.files[0])}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
            {renderFileName()}
          </label>
        </div>
        <div style={{marginTop: '1rem'}}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}

export default PhotoForm
