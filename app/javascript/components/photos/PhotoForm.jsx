import React, { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"

function PhotoForm({handleSubmit, shouldReset, setShouldReset}) {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)

  const renderFileName = () => {
    if (file) {
      return <span style={{marginLeft: '1rem'}}>{file.name}</span>
    }
    return <span style={{marginLeft: '1rem'}}>No file chosen</span>
  }

  useEffect(() => {
    if (shouldReset) {
      console.log(23)
      setTitle("")
      setFile(null)
      setShouldReset(false)
    }
  }, [shouldReset])

  return (
    <React.Fragment>
      <h2>Create new photo</h2>
      <form onSubmit={e => handleSubmit(e, title, file)}>
        <div style={{marginBottom: '1rem'}}>
          <TextField label="Title" name="title" onChange={e => setTitle(e.target.value)} value={title}/>
        </div>
        <div>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" type="file" style={{display: 'none'}}
              onChange={e => setFile(e.target.files[0])}
            />
            <Button variant="contained" component="span" color='info'>
              Upload
            </Button>
            {renderFileName()}
          </label>
        </div>
        <div style={{marginTop: '1rem'}}>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}

export default PhotoForm
