import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
    return (
        <Navbar variant="light" sticky="top" bg="light" className="shadow-sm mb-4">
            <Container>
                <Navbar.Brand href="/" className="fw-bold text-warning">
                    Koncert Webshop
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/" className="text-dark">
                        Főoldal
                    </Nav.Link>
                    <Nav.Link href="/UjKoncertek" className="text-dark">
                        Új koncert
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
