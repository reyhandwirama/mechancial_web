import { Nav, Container, Navbar, Row, Col, Card, Image } from "react-bootstrap";
import { useParams, Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { url, setLocalStorageWithTimeout,highlight} from "./global";
import axios from "axios";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container className="d-flex justify-content-center mt-3">
        <Nav>
          <Nav.Link as={Link} to={`/marketplace`}>
            Full Kit
          </Nav.Link>
          <Nav.Link as={Link} to={`/marketplace/${"switch"}`}>
            Switch
          </Nav.Link>
          <Nav.Link as={Link} to={`/marketplace/${"keycaps"}`}>
            Keycaps
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

function Item() {
  const [isLoading, setIsLoading] = useState(true);
  let { category } = useParams();
  const [dataProduk, setDataProduk] = useState([]);
  if (category === undefined) {
    category = "fullkit";
  }
  
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${url}/produk`);
            setDataProduk(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error(error);
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
    )
  }
  return (
    <div>
      <Container className="container-fluid" style={{ marginBottom: 100 }}>
        <Row>
          {dataProduk.filter((item) => item.category === category).map((item) => (
            <Col
              md={3}
              style={{ marginTop: 30 }}
              className="d-flex align-items-between" as={Link} 
            >
              <Card
                className="movieImage flex-grow-1"
                as={Link}
                to={`/detail/${item.Id_Product}`}
              >
                <Image
                  src={`/assets/images/${category}/${item.image}.jpg`}
                  alt="Dune Movies"
                  className="images"
                  style={{}}
                />
                <div className="bg-dark d-flex flex-column justify-content-between" style={{height:"100%"}}>
                <div>
                  <div className="p-2  text-white">
                    <div className="card-title text-left">{item.title}</div>
                    <div className="card-text text-left feature">
                      <ul>
                      {highlight(item.highlight)
                          .slice(0, 2)
                          .map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>
                </div>
                </div>
                <div className="p-2">
                    <div  className="card-text text-right text-white d-flex justify-content-end border-top ">
                      Rp {item.price.toLocaleString()}
                    </div>
                </div>
                  
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

function MarketPlace(){
    setLocalStorageWithTimeout()
      return(
        <React.Fragment>
        <Navigation/>
        <Item/>
        </React.Fragment>
      )
}
export { MarketPlace, Item };
