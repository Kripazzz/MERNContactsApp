import { useContext } from "react";
import AuthContext from "../context/AuthContext"; 

const Navbar = ({ title = "CMS" }) => {
    const { user, setUser } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{title}</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor04"
                    aria-controls="navbarColor04"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor04">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                            <li className="nav-item">
                                    <a className="nav-link active" href="/mycontacts">All Contacts</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link active" href="/create">Create</a>
                                </li>




                                <li className="nav-item" 
                                onClick={() => {
                                    setUser(null);
                                    localStorage.clear();


                                }}
                                >
                                    <button className="btn btn-danger">LogOut</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;







