import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Alert, AlertTitle, Button, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import PhotoForm from './PhotoForm'

function Photos(props) {
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState([])
  const [shouldReset, setShouldReset] = useState(false)
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false)
  const [photoIdWillDelete, setPhotoIdWillDelete] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  useEffect(() => {
    fetch('/api/v1/photos')
      .then(response => response.json())
      .then(data => setPhotos(data))
  }, [])

  const handleDelete = () => {
    fetch(`/api/v1/photos/${photoIdWillDelete}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setPhotos(photos.filter(p => p.id !== data.id))
        setPhotoIdWillDelete(null)
        setShouldOpenDialog(false)
        handleOpenSnackBar()
        setSnackbarMessage('Deleted successfully!')
      })
  }

  const handleSubmit = (e, title, file) => {
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
      .then((data) => {
        setPhotos([data, ...photos])
        setSnackbarMessage("Photo created!")
        setError([])
        setShouldReset(true)
        handleOpenSnackBar()
      })
      .catch(response => {
        response.json().then((json) => {
          setError(json)
        })
      })
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

  const handleOpenSnackBar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackBar = () => {
    setOpenSnackbar(false)
  }

  const openDialog = (photoId) => {
    setShouldOpenDialog(true)
    setPhotoIdWillDelete(photoId)
  }

  const closeDialog = () => {
    setShouldOpenDialog(false)
  }

  const photoList = () => {
    if (photos.length > 0) {
      return(
        photos.map(photo => {
          return (
            <Grid item lg={2} xs={4} key={photo.id}>
              <Card >
                <CardMedia
                  component="img"
                  image={photo.url}
                  height="194"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {photo.title}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton color="error" component="span" onClick={() => openDialog(photo.id)}>
                    <DeleteForever />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })
      )
    } else {
      return (
        <Grid item xs={12}>
          <Alert severity='info'>No photos yet</Alert>
        </Grid>
      )
    }
  }

  return (
    <div>
      <Container maxWidth="xl">
        {error && handleError()}
        <Grid container spacing={4}>
          <Grid container item spacing={4}>
            <Grid item xs={6}>
              {/* <Button component={Link} to="/photos/new" variant="contained">New photo</Button> */}
              <PhotoForm photos={photos} handleSubmit={handleSubmit} setShouldReset={setShouldReset} shouldReset={shouldReset} />
            </Grid>
          </Grid>
          <Grid container item spacing={4} sx={{marginTop: '1px'}}>
            {photoList()}
          </Grid>
        </Grid>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={shouldOpenDialog} onClose={closeDialog}>
          <DialogTitle>
            Are you sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently delete the photo. Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color='error'>Delete</Button>
            <Button onClick={closeDialog} autoFocus>
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  )
}

export default Photos