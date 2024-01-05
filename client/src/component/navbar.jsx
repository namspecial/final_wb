import React from "react";
function NavBar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login'
    }
    function admin(){
        window.location.href = '/admin'
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/home">Tourism</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i class="fa-solid fa-bars" style={{ color: 'white' }}></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav  mr-10">
                        {user ? (
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </button>
                                <ul class="dropdown-menu mr-50">
                                    <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={logout} >Log out</a></li>
                                    {
                                        user.isAdmin ? <li><a class="dropdown-item" href="/admin" onClick={admin} >Admin</a></li> : null
                                    }


                                </ul>
                            </div>

                        ) : (<>

                            <li className="nav-item active">
                                <a className="nav-link" href="/register">Register </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </>)}

                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;