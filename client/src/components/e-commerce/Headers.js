import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Headers = () => {
const {carts} = useSelector((state)=>state.allCart);


    return (
        <>
            <Navbar style={{ height: "60px", background: "#6d35b7", color: "white" }}>
                <Container>
                <NavLink to="/" className="text-decoration-none text-light mx-2">
                    <h3 className='text-light'>MediFlex</h3>
                </NavLink>
                    <NavLink to="/cart" className="text-decoration-none text-light mx-2">
                    <div id='ex4'>
                        <span className=' p1 fa-stack fa-2x has-badge' data-count={carts.length}>
                            <img style={{padding:"10px 10px 0px 0px"}} src='https://www.freeiconspng.com/uploads/basket-cart-icon-27.png' alt='cart' />
                        </span>
                    </div>
                    </NavLink>
                   
                </Container>
            </Navbar>
        </>
    )
}

export default Headers