import react, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import { format } from "timeago.js";

function App() {
  const [viewport, setViewport] = useState({
    width: 100 + "%",
    height: 98 + "vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [showPopup, setShowPopup] = useState("");
  const [pin, setPin] = useState([]);

  //show/hide pin popup
  const handlePinMarker = (id) => {
    setShowPopup(id);
  };

  //getting all pins
  const getPins = () => {
    const url = `http://localhost:4000/api/pin`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPin(data));
  };

  useEffect(() => {
    getPins();
  }, []);
  console.log(pin);
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibnltMDIiLCJhIjoiY2tub2JvaDBmMTY1cjJwbW92ZDA1b3FueSJ9.sEEexKBxgfbkrGAGmnIQkA"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/nym02/ckqict3y901hm18k8lkgt91qz"
      >
        {pin.map((pin) => (
          <>
            <Marker
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => handlePinMarker(pin?._id)}
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
                latitude={37.78}
                longitude={-122.41}
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
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
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
      </ReactMapGL>
    </>
  );
}

export default App;
