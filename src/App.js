import './App.css';
import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from './dashboard';
import converters from './converters';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">File Converter</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                    {(converters || []).map(converter =>
                      <Nav.Link key={converter.route} href={converter.route}>
                        {converter.title}
                      </Nav.Link>
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <Container fluid>
          <Row>
            <Col>
              <Routes>
                  <Route exact path="/" element={<Navigate to="/dashboard" />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  {(converters || []).map(converter =>
                    <Route key={converter.route} path={converter.route} element={<converter.component/>}>
                      {converter.title}
                    </Route>
                  )}
              </Routes>
            </Col>
          </Row>
      </Container>
      </div>
    </Router>
  );
}

export default App;
