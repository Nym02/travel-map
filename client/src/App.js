import react, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Geocoder from "react-map-gl-geocoder";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import Modal from "react-modal";
import { format } from "timeago.js";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    width: 100 + "%",
    height: 98 + "vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [showPopup, setShowPopup] = useState("");
  const [pin, setPin] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [register, setRegister] = useState(false);

  //show/hide pin popup
  const handlePinMarker = (id, latitude, longitude) => {
    setShowPopup(id);
    setViewport({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
    });
  };

  //getting all pins
  const getPins = () => {
    const url = `http://localhost:4000/api/pin`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPin(data);
      });
  };

  useEffect(() => {
    getPins();
  }, [getPins?._id, getPins?.longitude]);
  console.log("pin", pin);
  const handleMarkerAdd = (e) => {
    // const [longitude, latitude] = e.lngLat;

    const longitude = e.lngLat[0];
    const latitude = e.lngLat[1];

    setNewPlace({
      latitude,
      longitude,
    });
  };

  //handling geocoder input
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // submitting new pin
  const handlePinSubmit = (e) => {
    e.preventDefault();

    let pinData = {
      username: "nym02",
      title,
      description,
      rating: parseInt(rating),
      latitude: newPlace?.latitude,
      longitude: newPlace?.longitude,
    };
    console.log(pinData);

    const url = `http://localhost:4000/api/pin`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(pinData),
    })
      .then((res) => console.log(res.json()))
      .then(() => setNewPlace(null))
      .then(() => getPins())
      .catch((err) => console.log(err));
  };

  //handling login modals

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //handling register modals

  console.log(title);
  console.log(description);
  console.log(rating);

  return (
    <>
      <ToastContainer />
      {/* login modal  */}
      {/* <button onClick={openModal}>Open Modal</button> */}

      {/* <div>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "15px",
            zIndex: "1",
          }}
        >
          {currentUser ? (
            <Button
              variant="contained"
              style={{ marginRight: "10px" }}
              color="primary"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                style={{ marginRight: "10px" }}
                color="primary"
                onClick={openModal}
              >
                Login
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "10px" }}
                color="secondary"
                onClick={() => setRegister(true)}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div> */}

      {/* login modal  */}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div style={{ textAlign: "right" }}>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            x
          </Button>
        </div>
        <>
          <Login />
        </>
      </Modal>

      {/* Register Modal  */}
      <Modal
        isOpen={register}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setRegister(false)}
          >
            x
          </Button>
        </div>
        <>
          <Register />
        </>
      </Modal>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibnltMDIiLCJhIjoiY2tub2JvaDBmMTY1cjJwbW92ZDA1b3FueSJ9.sEEexKBxgfbkrGAGmnIQkA"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/nym02/ckqict3y901hm18k8lkgt91qz"
        onDblClick={handleMarkerAdd}
        transitionDuration="200"
      >
        <GeolocateControl style={{ right: "55px", bottom: "55px" }} />
        {/* <Geolocation /> */}
        <Geocoder
          mapRef={mapRef}
          // containerRef={geocoderContainerRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoibnltMDIiLCJhIjoiY2tub2JvaDBmMTY1cjJwbW92ZDA1b3FueSJ9.sEEexKBxgfbkrGAGmnIQkA"
          position="top-left"
        />

        {pin.map((pin) => (
          <>
            <Marker
              latitude={pin?.latitude}
              longitude={pin?.longitude}
              offsetLeft={-viewport.zoom * 2.5}
              offsetTop={-viewport.zoom * 5}
              onClick={() =>
                handlePinMarker(pin?._id, pin?.latitude, pin?.longitude)
              }
            >
              <div>
                <RoomIcon
                  style={{
                    fontSize: viewport.zoom * 5,
                    cursor: "pointer",
                    color: "tomato",
                  }}
                />
              </div>
            </Marker>
            {pin?._id === showPopup && (
              <Popup
                latitude={pin?.latitude}
                longitude={pin?.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="top"
                onClose={() => setShowPopup("")}
              >
                <div className="card" style={{ width: "250px" }}>
                  <label
                    style={{
                      borderBottom: "1px solid red",
                      fontSize: "13px",
                      fontWeight: "600",
                      margin: "10px 0",
                    }}
                    htmlFor=""
                  >
                    Place
                  </label>
                  <p style={{ fonSize: "15px" }}>{pin?.title}</p>
                  <label
                    style={{
                      borderBottom: "1px solid red",
                      fontSize: "13px",
                      fontWeight: "600",
                      margin: "10px 0",
                    }}
                    htmlFor=""
                  >
                    Review
                  </label>
                  <p style={{ fonSize: "15px" }}>{pin.description}</p>
                  <label
                    style={{
                      borderBottom: "1px solid red",
                      fontSize: "13px",
                      fontWeight: "600",

                      margin: "10px 0",
                    }}
                    htmlFor=""
                  >
                    Rating
                  </label>
                  <div style={{ marginTop: "10px" }}>
                    {Array(pin?.rating).fill(<StarIcon />)}
                  </div>
                  <label
                    style={{
                      borderBottom: "1px solid red",
                      fontSize: "13px",
                      fontWeight: "600",

                      margin: "10px 0",
                    }}
                    htmlFor=""
                  >
                    Information
                  </label>
                  <p>
                    Created By: <strong>{pin.username}</strong>
                  </p>
                  <p>{format(pin.createdAt)}</p>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace?.latitude}
            longitude={newPlace?.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            onClose={() => setNewPlace(null)}
          >
            <div style={{ width: "300px", padding: "15px 10px" }}>
              <form onSubmit={handlePinSubmit}>
                <div>
                  <TextField
                    style={{ width: "100%", marginBottom: "10px" }}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    style={{ width: "100%", marginBottom: "10px" }}
                    id="outlined-basic"
                    label="Descirption"
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    <InputLabel htmlFor="filled-age-native-simple">
                      Rating
                    </InputLabel>
                    <Select
                      label="Rating"
                      variant="outlined"
                      native
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Add Pin
                  </Button>
                </div>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </>
  );
}

export default App;
