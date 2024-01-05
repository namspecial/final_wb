import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;


function Profile_screen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }


    }, [])

    return (
        <div className='ml-3 mt-3 bs'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h2>Name : {user.name}</h2>
                    <h2>Email: {user.email}</h2>
                    <h2>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h2>
                </TabPane>
                <TabPane tab="Booking" key="2">
                    <h1>My Bookings</h1>
                    <MyBookings />
                </TabPane>





            </Tabs>

        </div>
    )
}

export default Profile_screen


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [getData, setData] = useState([])
    useEffect(() => {
        try {
            fetch(`http://localhost:5000/api/bookings/getbookingsbyuserid/${user._id}`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    setData(data)
                })
                .catch(
                    (err) => console.log(err)
                )
        } catch (error) {
            console.log(error);

        }

        console.log(getData)

    }, []);


    async function cancelBooking(userid, locationid) {
        const options = {
            method: 'POST', //ham gui data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid: userid, locationid: locationid })
        };

        try {
            const result = await fetch('http://localhost:5000/api/bookings/cancelBooking/', options)
            console.log(result);

        } catch (error) {
            console.log(error);

        }




    }
    return (

        <div >
            <div className="row">
                <div className="col-md-1"></div>
                {
                    getData.map((data, i) => (
                        <div className='bs'>
                            <h3><b>Place</b> :{data.location}</h3>
                            <p> <b>Booking id</b> : {data.locationid}</p>

                            <p> <b>Start</b> :{data.fromdate} </p>
                            <p> <b>End</b> : {data.todate}</p>
                            <p> <b>Amount</b>: {data.totalamount}</p>
                            <p> <b>Status</b>: {data.status == 'booked' ? 'CONFIRMED' : 'CANCELED'}</p>
                            <div style={{ float: "right" }}>
                                {data.status ? <button className='btn btn-primary' onClick={() => { cancelBooking(data._id, data.locationid) }}> CANCEL BOOKING</button>
                                    : null}
                            </div>
                        </div>

                    )
                    )
                }






            </div>



        </div>

    )
}