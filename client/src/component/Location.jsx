import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';


function Location({ locationIndex, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let currentDate = new Date().toLocaleDateString('en-GB');
  console.log(currentDate);
  return (
    <div className='row bs' key={locationIndex._id}>
      <div className="col-md-4">
        <img src={locationIndex.imageUrls[0]} className='smallimg' />
      </div>
      <div className="col-md-7 ">
        <h1>{locationIndex.name}</h1>
        <b>
          <p> Max Count: {locationIndex.maxCount}</p>
          <p>Phone Number:{locationIndex.phoneNumber}</p>
          <p>Type: {locationIndex.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {/* check lại condition cho button book now. so sánh với ngày ở thời điểm hiện tại ko phải "1" */}
         
          {fromdate >= currentDate && todate >= currentDate ? (
            <Link to={`/book/${locationIndex._id}/${fromdate}/${todate}`}>
              <button className='btn btn-primary m-2'>Book now</button>
            </Link>
          ) : (
            <button className='btn btn-primary m-2' onClick={() => { 
              if (fromdate < currentDate && todate < currentDate) {
                alert(`Vui lòng nhập lại thông tin, quý khách chỉ được đặt phòng từ ${currentDate} đến tương lai`);
              } else {
                alert("Vui lòng nhập ngày tháng")
              }
              }}>
              Book now
            </button>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{locationIndex.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {locationIndex.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 bigimg" src={url} alt={`slide-${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{locationIndex.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Location;
