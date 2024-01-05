import React, { useState, useEffect, Component } from 'react'
import { Tabs } from 'antd';


const { TabPane } = Tabs;

function Admin_screen() {
    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/home'
        }


    },[]
    )
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 className='text-center' style={{ fontsize: '30px' }}><b>Admin Panel</b></h1>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key="1">
                    <Bookings />

                </TabPane>
                <TabPane tab="Places" key="2">
                    <Location />

                </TabPane>
                <TabPane tab="Add Places" key="3">
                    <Addplace />

                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />

                </TabPane>





            </Tabs>



        </div>

    )
}


export default Admin_screen

// Booking list Components

export function Bookings() {
    const [bookings, setBookings] = useState([])

    const user = JSON.parse(localStorage.getItem("currentUser"))


    useEffect(() => {
        try {
            fetch(`http://localhost:5000/api/bookings/getbookingsbyuserid/${user._id}`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    setBookings(data)
                })
                .catch(
                    (err) => console.log(err)
                )
        } catch (error) {
            console.log(error);

        }

        console.log(bookings)

    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1> Bookings</h1>

                <table className='table table-bordered table-dark'>

                    <thead className='bs '>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Place </th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>


                        </tr>

                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(Bookings => {
                            return <tr>
                                <td>{Bookings._id}</td>
                                <td>{Bookings.userid}</td>
                                <td>{Bookings.location}</td>
                                <td>{Bookings.fromdate}</td>
                                <td>{Bookings.todate}</td>
                                <td>{Bookings.status}</td>



                            </tr>



                        }))}

                    </tbody>


                </table>



            </div>


        </div>
    )
}

// Places list Components
export function Location() {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/api/locations/getalllocation',
        )
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setLocations(data)
                setLoading(false);
            })
            .catch(
                err => console.log(err)
            )

    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1> Places</h1>

                <table className='table table-bordered table-dark'>

                    <thead className='bs '>
                        <tr>
                            <th>Location Id</th>
                            <th>Name</th>
                            <th>Type </th>
                            <th>Max Count</th>
                            <th>Phone number</th>

                        </tr>

                    </thead>
                    <tbody>
                        {locations.length && (locations.map(Location => {
                            return <tr>
                                <td>{Location._id}</td>
                                <td>{Location.name}</td>
                                <td>{Location.type}</td>
                                <td>{Location.maxCount}</td>
                                <td>{Location.phoneNumber}</td>


                            </tr>

                        }))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
// Users list Components

export function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/api/users/getallusers',
        )
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setUsers(data)
                setLoading(false);
            })
            .catch(
                err => console.log(err)
            )

    }, []);
    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Users </h1>
                <table className="table table-dark table-bordered">

                    <thead className='bs'>
                        <th>User Id</th>
                        <th>Name</th>
                        <th> Email</th>
                        <th>Is Admin</th>
                    </thead>
                    <tbody>
                        {users.length && (users.map(User => {
                            return <tr>
                                <td>{User._id}</td>
                                <td>{User.name}</td>
                                <td>{User.email}</td>
                                <td>{User.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>

                        }))}
                    </tbody>

                </table>


            </div>



        </div>
    )

}




// Add Place Components


export function Addplace() {

    const [name, setname] = useState('')
    const [maxCount, setmaxCount] = useState()
    const [description, setdescription] = useState()
    const [phoneNumber, setphoneNumber] = useState()
    const [type, settype] = useState()
    const [price, setprice] = useState()
    const [imageUrls1, setimageUrls1] = useState()
    const [imageUrls2, setimageUrls2] = useState()
    const [imageUrls3, setimageUrls3] = useState()

    function addPlace() {
        const newPlace = {
            name,
            maxCount,
            phoneNumber,
            price,
            type,
            imageUrls: [imageUrls1, imageUrls2, imageUrls3],           
            description


        }
        const options = {
            method: 'POST', //ham gui data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlace,)
        };

        fetch('http://localhost:5000/api/locations/addPlaces', options
        )
            .then(res => res.json())
            .then((data) => {

            })
            .catch(
                err => console.log(err)
            )
            window.location.href = '/home'

    }
    return (
        <div className='row'>
            <div className='col-md-5'>
                <input type="text" className='form-control' placeholder='Place name'
                    value={name} onChange={(e) => { setname(e.target.value) }} />

                <input type="text" className='form-control' placeholder='Max count'
                    value={maxCount} onChange={(e) => { setmaxCount(e.target.value) }} />
                <input type="text" className='form-control' placeholder='price'
                    value={price} onChange={(e) => { setprice(e.target.value) }} />

                <input type="text" className='form-control' placeholder='description'
                    value={description} onChange={(e) => { setdescription(e.target.value) }} />
                <input type="text" className='form-control' placeholder='Phone number'
                    value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />



            </div>
            <div className="col-md-5">
                <input type="text" className='form-control' placeholder='Type'
                    value={type} onChange={(e) => { settype(e.target.value) }} />
                <input type="text" className='form-control' placeholder='Image URL 1'
                    value={imageUrls1} onChange={(e) => { setimageUrls1(e.target.value) }} />
                <input type="text" className='form-control' placeholder='Image URL 2'
                    value={imageUrls2} onChange={(e) => { setimageUrls2(e.target.value) }} />
                <input type="text" className='form-control' placeholder='Image URL 3'
                    value={imageUrls3} onChange={(e) => { setimageUrls3(e.target.value) }} />
                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addPlace}> Add Place</button>
                </div>

            </div>

        </div>
    )
}

