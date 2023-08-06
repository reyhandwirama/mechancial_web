import { Container, Row, Col , Image } from "react-bootstrap"
import { ButtonIncrease } from "./Cart";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetIdCart,setLocalStorageWithTimeout, highlight,userData,deskripsi, submitData, GetProduk} from "./global";
function Detail(){
    setLocalStorageWithTimeout();
    let {id_produk} = useParams();
    const [qty, setQty] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dataProduk = GetProduk() ;

    useEffect(() => {
        // Simulate an asynchronous operation (e.g., fetching data)
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Replace this with your actual asynchronous operation
      }, []);
    useEffect(() => {
        GetIdCart();
      }, []);


    if (isLoading) {
        return (
            <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
          )
    }
    
    const handleVariablesChange = (count) =>{
        setQty(count);
    }

    const handleCheckout = (item,qty) =>{
        if(userData){
        submitData(item,qty);
        alert("Barang Berhasil Dimasukkan Ke Keranjang")
        }
        else{
            alert("Silahkan Login Terlebih Dahulu !");
            navigate("/profile/login");
        }
    }
    return(
        <React.Fragment>
        <Container fluid className="p-5">
            {dataProduk.filter((item) => item.Id_Product === id_produk).map((item) => (
            <Row>
                <Col md={4} className="d-flex justify-content-center">
                    <Image src={`/assets/images/${item.category}/${item.image}.jpg`} className="img-fluid" style={{height:300, borderRadius:10}}/>
                </Col>
                <Col>
                    <Row><h2>{item.title}</h2></Row>
                    <Row>
                        <p>Rp {item.price.toLocaleString()}</p>
                        <p>65% Keys Hot-swap RGB 2 Connection Mechanical Keyboard</p>
                        <ul style={{listStylePosition:"inside"}}>
                            {highlight(item.highlight).map ((item,index)=> (
                            <li key={index} style={{marginTop:5}}>{item}</li>
                            ))}
                        </ul>
                    </Row>
                    <Row className="">
                        <Col md={4} className="d-flex justify-content-start" style={{marginLeft:"-5%"}}><ButtonIncrease onVariablesChange={handleVariablesChange}/></Col>
                        <Col md={5} className="d-flex justify-content-center"><button className="btn btn-lg mt-3" style={{width:200, marginBottom:30, backgroundColor:"#78CF81"}} onClick={() => handleCheckout(item,qty)}>Checkout</button></Col>
                    </Row>
                </Col>
            </Row>
            ))}
        </Container>

        <Container className="p-4" style={{borderRadius:10,backgroundColor:"#F8F8F8",marginBottom:30}}>
        {dataProduk.filter((item) => item.Id_Product === id_produk).map((item) => (
            <React.Fragment>
            {highlight(item.description).map((item,index) => (
                <React.Fragment>
                    
                    <Row>
                        <p style={{textAlign:"justify",textJustify:"inter-word"}}>
                            <strong>{deskripsi(item)[0]}</strong>
                            </p>
                    </Row>
                    <Row>
                        <p style={{textAlign:"justify",textJustify:"inter-word"}}>
                            {deskripsi(item)[1]}
                        </p >
                    </Row>
                </React.Fragment>
            ))}
            </React.Fragment>
            ))}
            
        </Container>
        </React.Fragment>
    )
}

export {Detail}