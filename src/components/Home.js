import React, {useEffect, useState}from "react"
import { Card, Image, Col, Row, Container } from "react-bootstrap";
import { Link} from "react-router-dom";
import { highlight,url} from "./global";
import axios from "axios";
function Home(){
    

    return (
      <React.Fragment>
      <Cards category={"fullkit"}/>
      <Content/>
      <Cards category={"switch"}/>
      <Content1/>
      <Cards category={"keycaps"}/>
      <Content2/>
    </React.Fragment>
    )
}
function Cards(kategori){
    const [isLoading, setIsLoading] = useState(true);
    const [dataProduk, setDataProduk] = useState([]);
    
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
      }, []); // Replace this with your actual asynchronous operation
    if (isLoading) {
     return (
       <div className="spinner-container">
       <div className="loading-spinner"></div>
     </div>
     )
  }
  return (
    <React.Fragment>
    <div className="cards">
      <div className="row d-flex justify-content-center">
      {dataProduk.filter((item) => item.category === kategori.category).slice(0,3).map((item) =>(
        <Col md={3} className="d-flex">
        <Card className="movieImage flex-grow-1" as={Link} to={`/detail/${item.Id_Product}`}>
                <Image src={`/assets/images/${item.category}/${item.image}.jpg`} alt="Dune Movies" style={{height:200}}/>
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
      </div>
      </div>

  </React.Fragment>
  
  
  )
}

function Content(){
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false);
        }, 150);
    })
    if (isLoading) {
        return (
          <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
        )
     }
  const teks = <p style={{textAlign:"justify",textJustify:"inter-word",fontSize:"1.3rem"}}>&nbsp;&nbsp;Mechanical Keyboard adalah 
  papan ketik yang digunakan untuk mengimput data dengan menggunakan mekanisme 
  mekanik dalam merespon input dari user. 
  Perbedaannya dengan keyboard biasa adalah mekanismenya. 
  Mechanical keyboard menggunakan mekanisme 
  fisik dalam merespon inputan berbentuk switch untuk 
  menghubungkan arus didalam keyboard, Sedangkan Keyboard biasa mekanismenya menggunakan 
  rubber yang menghubungkan arus didalam keyboard. 
  </p>;
  return(
      <div>
      <Container fluid className="p-5 mt-5 overflow-hidden">
              <Row className="overflow-hidden">
                  <Col className="m-4" xs={{order:2}} md={{order:1}}>
                      <h2>Apa itu Mechanical Keyboard ?</h2>
                      <Row>
                          {teks}
                      </Row>
                  </Col>
                  <Col className="d-flex justify-content-end" xs={{order:1}}><Image src={"/assets/images/background1.png"} className="foto"/></Col>
              </Row>
      </Container>
      <hr/>
      </div>
  )
}

function Content1(){
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false);
        }, 150);
    })
    if (isLoading) {
        return (
          <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
        )
     }
  const teks = <p style={{textAlign:"justify",textJustify:"inter-word",fontSize:"1.3rem"}}>
      &nbsp;&nbsp;Switch merupakan bagian yang berada di bawah 
      keycaps dan berfungsi untuk menekan tombol 
      untuk menginput perintah. Switch terbagi menjadi 3 Tipe yaitu Linear , Tactile , dan Clicky. Pada setiap tipenya memiliki feel dan 
      experience mengetik yang berbeda - beda.

  </p>;
  const teks1 = <p style={{textAlign:"left",fontSize:"1.3rem"}}>
  Switch yang tidak memiliki tonjolan               

  </p>;

  const teks2 = <p style={{textAlign:"left",fontSize:"1.3rem"}}>
  Switch yang memiliki tonjolan & Tidak Berisik
  
  </p>;
  const teks3 = <p style={{textAlign:"left",fontSize:"1.3rem"}}>
  Switch yang memiliki tonjolan & Berisik
  
  </p>;
  return(
      <div>
      <Container className="p-0 mt-5 mb-5 overflow-hidden">
              <Row>
                  <Col className=" p-5" md={5}>
                      <h2>Tipe - Tipe Switch Mechanical Keyboard</h2>
                      <Row>
                          {teks}
                      </Row>
                  </Col>
                  <Col className="d-flex justify-content-center p-5">
                      <Row>
                          <Col md={4} className="switch">
                              <Card className="movieImage" >
                              <Image src={`/assets/images/linear.png`} alt="Dune Movies" className="images-switch" />
                              <div className="bg-dark switch-desc">
                                  <div className="p-2  text-white">
                                  <Card.Title className="text-center">Linear</Card.Title>
                                  <Card.Text className="text-right d-flex border-top ">
                                      {teks1}
                                  </Card.Text>
                                  </div>
                              </div>
                              </Card>
                          </Col>
                          <Col md={4} className="switch">
                              <Card className="movieImage" >
                              <Image src={`/assets/images/tactile.png`} alt="Dune Movies" className="images-switch" />
                              <div className="bg-dark switch-desc">
                                  <div className="p-2  text-white">
                                  <Card.Title className="text-center">Tactile</Card.Title>
                                  <Card.Text className="text-right border-top ">
                                      {teks2}
                                  </Card.Text>
                                  </div>
                              </div>
                              </Card>
                          </Col>
                          <Col md={4} className="switch">
                              <Card className="movieImage">
                              <Image src={`/assets/images/clicky.png`} alt="Dune Movies" className="images-switch" />
                              <div className="bg-dark switch-desc">
                                  <div className="p-2  text-white">
                                  <Card.Title className="text-center">Clicky</Card.Title>
                                  <Card.Text className="text-right border-top ">
                                      {teks3}
                                  </Card.Text>
                                  </div>
                              </div>
                              </Card>
                          </Col>
                      </Row>
                  </Col>
              </Row>
      </Container>
      <hr/>
      </div>
  )
}

function Content2(){
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false);
        }, 150);
    })
    if (isLoading) {
        return (
          <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
        )
     }
  const teks1 = <p style={{textAlign:"justify",textJustify:"inter-word",fontSize:"1.3rem"}}>
      &nbsp;&nbsp;&nbsp;Mechanical Keyboard memiliki berbagai macam 
      layout yang dapat digunakan sesuai dengan referensi 
      dan kegunaannya masing masing. Contohnya penggunaan 
      keyboard untuk gaming, kerja , dan melakukan 
      perhitungan membutuhkan beberapa tombol dan beberapa 
      tidak membutuhkan beberapa tombol. Sehingga layout 
      keyboard ini 
      penting sesuai dengan kebutuhan masing - masing.

  </p>;
  return(
      <div>
      <Container fluid className="p-0 mt-5 mb-5 overflow-hidden">
              <Row className="p-5">
                  <Col className="m-4 d-flex flex-column" xs={{order:2}} md={{order:1}}>
                      <h2 className="align-self-center">Layout Keyboard</h2>
                      <Row>
                          <Col></Col>
                          <Col md={8}>{teks1}</Col>
                          <Col></Col>
                      </Row>
                  </Col>
              </Row>
              <Container>
              <Row>
                  <Col md={4} className="d-flex" style={{marginTop:20}}>
                      <Card className="movieImage flex-grow-1">
                          <Image src={`/assets/images/100.png`} alt="Dune Movies" className="images" />
                          <div className="bg-dark flex-grow-1">
                              <div className="p-3  text-white">
                              <Card.Title className="text-center">100%</Card.Title>
                              <Card.Text className="text-left feature">
                                  <p style={{textAlign:"justify", textJustify:"inter-word"}}>Layout ini merupakan layout 
                                  full function key tanpa ada pengurangan key yang biasa digunakan pada keyboard kantor</p>
                              </Card.Text>
                              </div>
                          </div>
                      </Card>
                  </Col>
                  <Col md={4} className="d-flex" style={{marginTop:20}} >
                      <Card className="movieImage flex-grow-1">
                          <Image src={`/assets/images/tkl.png`} alt="Dune Movies" className="images" />
                          <div className="bg-dark flex-grow-1">
                              <div className="p-3  text-white">
                              <Card.Title className="text-center">TEN KEY LESS (TKL)</Card.Title>
                              <Card.Text className="text-left feature">
                                  <p style={{textAlign:"justify", textJustify:"inter-word"}}>Layout ini merupakan layout 
                                  full function key namun terdapat pengurangan key yaitu numpad sebelah kanan</p>
                              </Card.Text>
                              </div>
                          </div>
                      </Card>
                  </Col>
                  <Col md={4} className="d-flex" style={{marginTop:20}}>
                      <Card className="movieImage flex-grow-1">
                          <Image src={`/assets/images/84.png`} alt="Dune Movies" className="images" />
                          <div className="bg-dark">
                              <div className="p-3  text-white">
                              <Card.Title className="text-center">84%</Card.Title>
                              <Card.Text className="text-left feature">
                                  <p style={{textAlign:"justify", textJustify:"inter-word"}}>Layout ini merupakan layout 
                                  compact (ringkas) dari TKL yang setiap keynya tidak diberikan jarak terutama function key dan
                                  media key</p>
                              </Card.Text>
                              </div>
                          </div>
                      </Card>
                  </Col>

                  <Col md={4} className="d-flex" style={{marginTop:20}}>
                      <Card className="movieImage flex-grow-1">
                          <Image src={`/assets/images/75Exploded.png`} alt="Dune Movies" className="images" />
                          <div className="bg-dark flex-grow-1">
                              <div className="p-3  text-white">
                              <Card.Title className="text-center">75% Exploaded</Card.Title>
                              <Card.Text className="text-left feature">
                                  <p style={{textAlign:"justify", textJustify:"inter-word"}}>Layout ini merupakan layout compact
                                  (ringkas) dari TKL namun masih diberikan jarak antara function key dan media key akan tetapi 
                                  ada beberapa media keys yang dikurangkan</p>
                              </Card.Text>
                              </div>
                          </div>
                      </Card>
                  </Col>

                  <Col md={4} className="d-flex" style={{marginTop:20}}>
                      <Card className="movieImage flex-grow-1">
                          <Image src={`/assets/images/68.png`} alt="Dune Movies" className="images" />
                          <div className="bg-dark flex-grow-1">
                              <div className="p-3  text-white">
                              <Card.Title className="text-center">68%</Card.Title>
                              <Card.Text className="text-left feature">
                                  <p style={{textAlign:"justify", textJustify:"inter-word"}}>Layout ini merupakan layout lebih compact dari
                                  layout 84% yaitu menghilangkan function key yang ada pada keyboard</p>
                              </Card.Text>
                              </div>
                          </div>
                      </Card>
                  </Col>

                  <Col md={4} className="d-flex" style={{marginTop:20}}>
                      <Card className="movieImage flex-grow-1">
                          <Image src={`/assets/images/60.png`} alt="Dune Movies" className="images" />
                          <div className="bg-dark flex-grow-1">
                              <div className="p-3  text-white">
                              <Card.Title className="text-center">60%</Card.Title>
                              <Card.Text className="text-left feature">
                                  <p style={{textAlign:"justify", textJustify:"inter-word"}}>Layout ini merupakan layout paling compact
                                  dan masih tetap functional dengan menyisakan beberapa function media dan alphabet. Keyboard ini cocok untuk 
                                  gamer yang menginginkan keyboard kecil dan tetap fungsional</p>
                              </Card.Text>
                              </div>
                          </div>
                      </Card>
                  </Col>
              </Row>
              </Container>
      </Container>
      </div>
  )
}


export{Home, Cards, Content1,Content2}