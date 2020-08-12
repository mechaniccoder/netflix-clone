import React, {useState, useEffect} from "react";
import styled from "styled-components";

const NavWrapper = styled.nav`
  &.show {
    background: #141414;
    opacity: 0.95;
  }
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 0;
  transition: all 0.5s ease-in;
  .nav__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
  }
  .nav__logo {
    width: 100px;
    margin-right: 30px;
    object-fit: contain;
  }
  .nav__links {
    cursor: default;
    display: flex;
    flex: 1;
    list-style: none;
    li {
      color: #e5e5e5;
      font-size: 0.8rem;
    }
    li:hover {
      color: white;
    }
    li + li {
      margin-left: 15px;
    }
  }
  .nav__pofile {
    width: 40px;
    object-fit: contain;
  }
`;

function Nav() {
  const [show, setShow]: any[] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavWrapper className={`nav ${show && "show"}`}>
      <div className="nav__wrapper ">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
          alt="logo"
        />
        <ul className="nav__links">
          <li>홈</li>
          <li>TV프로그램</li>
          <li>영화</li>
          <li>최신 콘텐츠</li>
          <li>내가 찜한 콘텐츠</li>
        </ul>
        <img
          className="nav__pofile"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6x9ruPboB7yXVyZ70HQ8HrRLEDipZdRPgAQ&usqp=CAU"
          alt=""
        />
      </div>
    </NavWrapper>
  );
}

export default Nav;
