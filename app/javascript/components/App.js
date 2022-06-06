import React from "react"
import Photos from "./photos/Photos"
import PhotoForm from "./photos/PhotoForm"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Photos />}></Route>
          <Route path="photos">
            <Route path="new" element={<PhotoForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App
