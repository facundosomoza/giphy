import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ShowGiphy = ({ giphyData, count }) => {
  /*   const getGhipos = () => {
    const giphos = [];
    const total = count && giphyData.length > 0 ? count : giphyData.length;

    for (let i = 0; i < total; i++) {
      giphos.push(
        <img className="ml-2" src={giphyData[i].images.original.url}></img>
      );
    }

    return giphos;
  }; */

  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {giphyData.slice(0, count).map((giphy) => (
          <Col className="my-2">
            <img src={giphy.images.original.url} className="w-100"></img>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ShowGiphy;
