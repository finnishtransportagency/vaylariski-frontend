import { Row, Col, Container } from "react-bootstrap";

export const Header = () => (
  <header>
    <Container fluid className="App-header">
      <Row>
        <Col>
          <p className="App-logo">
            <img
              style={{ height: "1.5em" }}
              src="/vaylariski_logo_no_text.png"
              alt="logo"
            />
            VäyläRiski
          </p>
        </Col>
        <Col className="version-col">
          <h5>Versio 1.0.0</h5>
        </Col>
      </Row>
    </Container>
  </header>
);
