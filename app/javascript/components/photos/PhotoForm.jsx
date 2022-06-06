import React, { useState } from "react"
import { Alert, AlertTitle, Button, Container, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

function PhotoForm() {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  let navigate = useNavigate();

  const renderFileName = () => {
    if (file) {
      return <span style={{marginLeft: '1rem'}}>{file.name}</span>
    }
    return <span style={{marginLeft: '1rem'}}>No file chosen</span>
  }

  const handleError = () => {
    return error.map((message, i) => {
      return(
        <Alert severity="error" key={i}>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("photo[title]", title)
    if(file) {
      formData.append("photo[source]", file) 
    }

    const options = {
      method: 'POST',
      body: formData
    }

    fetch('/api/v1/photos', options)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response)
      })
      .then(() => navigate("/"))
      .catch(response => {
        response.json().then((json) => {
          setError(json)
        })
      })
    }

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {error && handleError()}
        <h2>Create new photo</h2>
        <form onSubmit={e => handleSubmit(e)}>
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
      </Container>
    </React.Fragment>
  )
}

export default PhotoForm
