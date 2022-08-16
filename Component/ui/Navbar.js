import React, { useState, useEffect } from "react";
import Logo from "../../public/logo.png";
import { Collapse, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { signOut, userSession, useSession } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const { data: session } = useSession();

  async function getUserData() {
    let data = await axios.post("api/userProfile");
    setName(data.data.data);
  }

  useEffect(() => {
    if (session) {
      getUserData();
    }
  }, []);

  function logoutHandler() {
    signOut();
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg top-nav navbar-light bg-light">
          <div className="container-fluid" id="fluid-set">
            <a className="navbar-brand" href="/" id="href-set">
              {" "}
              <img id="logo-id" style={{ marginLeft: "-10px", width:"15%" }} src={Logo.src} />
            </a>
            {/* <button
              onClick={() => setOpen(!open)}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <Collapse in={open}>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{ justifyContent: "flex-end", position:"absolute", right:"3%", marginRight:"0px !important", margin:"0" }}
              >
                <ul
                  className="navbar-nav mb-2 mb-lg-0"
                  style={{ marginLeft: "auto !important" }} */}
            {/* > */}
            {/*
                  {session ? (
                    <li className="nav-item">
                      <Link href={"/dashboard"}>
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          DASHBOARD
                        </a>
                      </Link>
                    </li>
                  ) : null}
                  {session ? (
                    <li className="nav-item">
                      <Link href={"/funds"}>
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          FUNDS
                        </a>
                      </Link>
                    </li>
                  ) : null}

                  {session ? (
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        SETTING
                      </a>
                    </li>
                  ) : null}
                  {session ? (
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        WELCOME {name?.firstName}{" "}
                      </a>
                    </li>
                  ) : null}*/}

            {/* {session ? (
                    <li className="nav-item">
                      <Link href={"/login"}>
                        <button
                          onClick={logoutHandler}
                          className="btn btn-outline-success border-btn"
                          style={{ marginRight: "10px" }}
                          type="submit"
                        >
                          Logout
                        </button>
                      </Link>
                    </li>
                  ) : null}

                  {!session ? (
                    <li className="nav-item">
                      <Link href={"/"}>
                        <button
                          className="btn btn-outline-success border-btn"
                          type="submit"
                        >
                          LOGIN / SIGNUP
                        </button>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </Collapse>  */}

            {/* {session ? (
                    <li className="nav-item">
                      <Link href={"/login"}>
                        <button
                          onClick={logoutHandler}
                          className="btn btn-outline-success border-btn"
                          style={{ marginRight: "10px" }}
                          type="submit"
                        >
                          Logout
                        </button>
                      </Link>
                    </li>
                  ) : null} */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
