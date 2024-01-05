import React, { useState, useEffect, CSSProperties } from 'react'
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import StripeCheckout from 'react-stripe-checkout';




function Booking_screen() {
  const [locations, setLocations] = useState([])
  const [loading, setloading] = useState(true)

  const { locationId, fromdate, todate } = useParams();

  const totalamount = locations.price

  useEffect(() => {
    setloading(true)
    console.log(fromdate);
    if (!locationId) {
      console.log('No locationId');
      return;
    }

    console.log(`Location ID: ${locationId}`);
    fetch(`http://localhost:5000/api/locations/getLocationById/${locationId}`,
    )
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setTimeout(function () {

        }, 5000);

        setLocations(data)
        setloading(false)
      })
      .catch(
        err => console.log(err)
      )
  }, [locationId]);

  
  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      locations,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      token

    }

    const options = {
      method: 'POST', //ham gui data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails, )
    };

     fetch('http://localhost:5000/api/bookings/bookTour', options
    )
      .then(res => res.json())
      .then((data) => {
        setloading(false);
      })
      .catch(
        err => console.log(err)
      )

  }

  return (
    <div >
      {loading ? (<div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader
          color={"red"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>) : (<div>

        <div className="container p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container position-relative overflow-hidden">
                <h1>{locations.name}</h1>
                <div className="image-zoom">
                  <img
                    src={locations.imageUrls[0]}
                    className="bigimg img-fluid rounded"
                    alt="Location"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="booking-details">
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                  <p>From:{fromdate} </p>
                  <p>To: {todate} </p>
                  <p>Max Count: {locations.maxCount}</p>
                </b>
              </div>
              <div className="amount-details">
                <h1>Amount</h1>
                <hr />
                {/* Add your amount details here */}
                <b>
                  <p>Price : {locations.price}</p>
                  <p>Total Amount : {totalamount} </p>
                </b>
              </div>
              <div style={{ float: 'right' }}>


                <StripeCheckout //thanh toan bang stripe cong thanh toan cua USA

                  amount={totalamount * 100}
                  token={onToken}
                  currency='INR'
                  stripeKey="pk_test_51OP7zpGt1wcJcbrq8Af49xoVMhpalfBR3ff9qXqWNEaVfjAW4CNmUllljKVeiO9a0V2qCew5XE459DfLMSds2ZZd00HnrHH6YL"
                >


                  <button className='btn btn-primary' > Pay Now</button>
                </StripeCheckout>
              </div>

            </div>
          </div>
        </div>

      </div>)
      }



    </div>
  )
}

export default Booking_screen