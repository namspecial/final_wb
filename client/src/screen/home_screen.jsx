import React, { useState, useEffect } from "react";
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import Location from "../component/Location";
const { RangePicker } = DatePicker;
function homeScreen() {

  const [locations, setLocations] = useState([]);
  const [loading, setloading] = useState([]);
  const [fromdate, setfromdate] = useState([]);
  const [todate, settodate] = useState([]);
  const [duplicaterlocations, setduplicaterlocations] = useState([]);

  useEffect(() => {
    setloading(true)
    fetch('http://localhost:5000/api/locations/getalllocation',
    )
      .then(res => res.json())
      .then((data) => {
        console.log(data);

        setLocations(data);
        setduplicaterlocations(data);
        setloading(false);
      })
      .catch(
        err => console.log(err)
      )

  }, [])
  function fillterByDate(dates) {
    var templocations = [];
    var availability = false;
  
    for (const location of duplicaterlocations) {
      // Kiểm tra xem location.currentBookings có tồn tại và không phải là null
      if (location.currentBookings && location.currentBookings.length > 0) {
        for (const bookings of location.currentBookings) {
          const fromDate = new Date(bookings.fromdate);
          const toDate = new Date(bookings.todate);
          const startDate = new Date(dates[0].format('DD-MM-YYYY'));
          const endDate = new Date(dates[1].format('DD-MM-YYYY'));
  
          if (
            !(startDate.getTime() >= fromDate.getTime() && startDate.getTime() <= toDate.getTime()) &&
            !(endDate.getTime() >= fromDate.getTime() && endDate.getTime() <= toDate.getTime())
          ) {
            availability = true;
          }
        }
      } else {
        // Nếu không có booking, coi như có sẵn
        availability = true;
      }
  
      if (availability || (location.currentBookings && location.currentBookings.length === 0)) {
        templocations.push(location);
      }
    }
  
    setLocations(templocations);
    setfromdate(dates[0].format('DD-MM-YYYY'));
    settodate(dates[1].format('DD-MM-YYYY'));
  }


  // log để test fromdate có được lưu hay không thay cho debug
  // useEffect(() => {
  //   console.log("fromdate sau khi thiết lập:", fromdate);
  // }, [fromdate]);

  return (
    <div className="container">
      <div className="row mt-5" >

        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={fillterByDate} />


        </div>
      </div>


      <div className="row justify-content-center mt-5">
        {/* <div className="col-md-9 mt-2" > */}
        {loading ? (<h1>loading...</h1>
        ) : (
          locations.map((data, i) =>
          (
            <Location locationIndex={data} fromdate={fromdate} todate={todate} />
          )
          ))}
        {/* </div> */}
      </div>

    </div>
  )
}
export default homeScreen