import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/images/gotchibg.gif"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="SanDAIs XP Dashboard"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a
              href="https://github.com/froid1911/aavegotchi-xp-dashboard/issues"
              target="_blank"
              rel="noreferer"
            >
              Found Bug? Need Feature? Create Issue!
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
