import React from 'react';
import { Navbar, NavbarBrand, Container } from "reactstrap";

// Componente para a nav bar
export const NavBar = () => {

    return (
        <Navbar style={{ backgroundColor: "#89D964", height: "4rem" }} dark>
            <Container>
                <NavbarBrand href="/" >Tem Dinheiro?</NavbarBrand>
            </Container>
        </Navbar>
    );
}

export default NavBar;
