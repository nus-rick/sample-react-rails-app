import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { Alert, CardActions, IconButton, Snackbar } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'

function Photos(props) {
  const [photos, setPhotos] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    fetch('/api/v1/photos')
      .then(response => response.json())
      .then(data => setPhotos(data))
  }, [])

  const handleDelete = (id) => {
    fetch(`/api/v1/photos/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setPhotos(photos.filter(p => p.id !== data.id))
        handleOpenSnackBar()
      })
  }

  const handleOpenSnackBar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackBar = () => {
    setOpenSnackbar(false)
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
                  <IconButton color="error" component="span" onClick={() => handleDelete(photo.id)}>
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
        <Grid container spacing={4}>
          <Grid container item spacing={4}>
            <Grid item xs={4}>
              <Button component={Link} to="/photos/new" variant="contained">New photo</Button>
            </Grid>
          </Grid>
          <Grid container item spacing={4} sx={{marginTop: '1px'}}>
            {photoList()}
          </Grid>
        </Grid>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            Deleted successfully!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  )
}

export default Photos