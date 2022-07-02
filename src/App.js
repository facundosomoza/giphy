import React, { useEffect, useState } from "react";

import ShowGiphy from "./ShowGiphy";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const App = () => {
  const [giphy, setGiphy] = useState("");
  const [giphyData, setGiphyData] = useState([]);

  const [showClearButton, setShowClearButton] = useState(false);

  const [button, setButton] = useState(true);

  const [trending, setTrending] = useState([]);

  const API_KEY = "oR6GC6Gs6xLU5zQllmTN5ypKLnHo9JQM";

  function getGiphy() {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${giphy}&limit=25&offset=0&rating=g&lang=en`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGiphyData(data.data);
        console.log(data);
      });
  }

  useEffect(getTrending, []);

  function getTrending() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=g`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrending(data.data);
      });
  }

  const handleGiphy = (event) => {
    setGiphy(event.target.value);
  };

  const handleSearch = () => {
    if (giphy.trim() === "") {
      alert("you must enter a name");
    } else {
      getGiphy();
      setTrending([]);
      setShowClearButton(true);
      setButton(false);
    }
  };

  const handleGiphyData = () => {
    return (
      <>
        <ShowGiphy giphyData={giphyData}></ShowGiphy>
        {button ? (
          <Row className="my-3">
            <Col>
              <h2 className="text-center title-section">Trendings</h2>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <ShowGiphy giphyData={trending} count={5}></ShowGiphy>
      </>
    );
  };

  const buttonFalse = () => {
    setShowClearButton(false);
    setGiphyData([]);
    setGiphy("");
    getTrending();
    setButton(true);
  };

  return (
    <Container>
      <Row className="mb-4 justify-content-center align-items-center">
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <img
            src="https://logovtor.com/wp-content/uploads/2021/05/giphy-logo-vector.png"
            className="w-75"
          ></img>
        </Col>
        <Col xs={9} md={4}>
          <input
            className="form-control my-4"
            onChange={handleGiphy}
            value={giphy}
          ></input>
        </Col>
        <Col xs={1} md={2}>
          <Button variant="danger" className="my-4 mr-2" onClick={handleSearch}>
            Search
          </Button>
          {showClearButton ? (
            <Button variant="dark" onClick={buttonFalse}>
              Clear
            </Button>
          ) : (
            <></>
          )}
        </Col>

        <Row>
          <Col>{handleGiphyData()}</Col>
        </Row>
      </Row>
    </Container>
  );
};

export default App;
