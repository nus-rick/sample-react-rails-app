import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from "react-router-dom";

function Photos(props) {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    fetch('/api/v1/photos')
      .then(response => response.json())
      .then(data => setPhotos(data))
  }, [])

  const photoList = photos.map(photo => {
    return (
      <Grid item xs={4} key={photo.id}>
        <Card >
          <CardMedia
            component="img"
            image={photo.url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {photo.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  })

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid container item spacing={4}>
            <Grid item xs={4}>
              <Link to='/photos/new'>New photo</Link>
            </Grid>
          </Grid>
          <Grid container item spacing={4} sx={{marginTop: '1px'}}>
            {photoList}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Photos