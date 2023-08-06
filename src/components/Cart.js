import { Row, Col, Container, Image, Card, Modal, Button} from "react-bootstrap"
import React, {useState, useEffect} from "react";
import axios from "axios";
import { GetCart, GetIdCart, GetId_Order, GetOrderDetail, GetProduk, GetUser, boolUser, setLocalStorageWithTimeout, url, highlight } from "./global";
import { useNavigate, useParams, Navigate,Link} from "react-router-dom";
import { userData } from "./global";
import firebase from "./firebase";
function Cart(){
  setLocalStorageWithTimeout();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] =useState(false);
  const dataCart = GetCart();
  const dataProduk = GetProduk();
  const dataUser = GetUser();
  GetIdCart();
  const showButton = dataCart.filter(item => item.Id_User === userData[0].Id_User).length > 0;
  let total_belanja = 0;
  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false);
    }, 300); // Replace this with your actual asynchronous operation
  }, []);

  if(!userData || userData === null){
    return <Navigate replace={true} to='/profile/login' />
  }

  const handleOrder = () =>{
    if(dataUser.filter((item) => item.Id_User === userData[0].Id_User)[0].alamat === ""){
      setShowWarning(true);
    }
    else{
      navigate('/checkout');
    }
    
  }

  const handleClose = () =>{
    setShowWarning(false);
    navigate('/profile');
  }

  // Check if still loading
  if (isLoading) {
    return (
      <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
    )
  }

    return(
        <React.Fragment>
        {dataCart.filter(item => item.Id_Cart === userData[0].Id_Cart).map((item)=>(
        <Container className="p-5 border-bottom border-dark border-1">
            {dataProduk.filter(item1 => item1.Id_Product === item.Id_Product).map((item1)=> (
                <p style={{display:"none"}}>{total_belanja = total_belanja + (item.Qty * item1.price)}</p>
            ))}
        {dataProduk.filter(item1 => item1.Id_Product === item.Id_Product).map((item1)=> (
        <Row>
            <Col md={3} className="d-flex justify-content-center m-auto">
            <Image src={`/assets/images/${item1.category}/${item1.image}.jpg`} style={{height:150}} />
            </Col>
            <Col md={4} className="text-wrap">
            <Card className="text-decoration-none border-0">
            <div className="p-2">
                <Card.Title className="text-left">{item1.title}</Card.Title>
                <Card.Text className="text-left feature">
                <p>{item1.category.toUpperCase()}</p>
                </Card.Text>
                <Card.Text className="text-left d-flex justify-content-start border-top overflow-wrap-break">
                    <ul>
                        {highlight(item1.highlight).slice(0,3).map((item)=>(
                            <li>{item}</li>
                        ))}
                    </ul>
                </Card.Text>
            </div>
        </Card>
            </Col >
            <Col md={5} className="d-flex justify-content-end flex-column">
                <div className="align-self-end">
                  <ButtonIncreaseCart value={[item.Qty,userData[0].Id_User,item1.Id_Product]}/>
                </div>
                <Row>
                <Container className="d-flex justify-content-end mt-5">
                    <div className="col-5 d-flex align-items-center flex-column">
                    <h4><strong>Total</strong></h4>
                    <h4>Rp {(item.Qty * item1.price).toLocaleString()}</h4>
                    </div>
                    </Container>
                </Row>
            </Col>
        </Row>
        ))}
        </Container>
        ))}

        {showButton ? (
          <React.Fragment>
          <Container fluid className="d-flex justify-content-end mt-5" style={{marginLeft:40}}>
          <div className="col-5 d-flex align-items-center flex-column">
          <h4><strong>Total Belanja</strong></h4>
          <h4>Rp {total_belanja.toLocaleString()}</h4>
          </div>
          </Container>
          <Container className="d-flex justify-content-end">
            <button className="btn btn-lg mt-3" style={{width:200, marginBottom:30, backgroundColor:"#78CF81"}} onClick={handleOrder}>Order</button>
          </Container>
          </React.Fragment>
        ) : (<Container className="p-5 border-bottom border-dark border-1 d-flex justify-content-center">
        <div>No checkout data</div>
      </Container>)}
        
      <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Kamu Belum Mengisi Alamat ! , Silahkan Mengisinya Terlebih Dahulu !
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        
        
</React.Fragment>
        
    )
}

ButtonIncrease.defaultProps ={
    quantity: 1
}
function ButtonIncrease({onVariablesChange,quantity}){
    const [count, setCount] = useState();
    const [showWarning, setShowWarning] = useState(false);
    useEffect(() => {
        if (count === undefined) {
          setCount(quantity);
        }
      }, [count, quantity]);

    useEffect(() => {
        if (quantity > 1) {
          setCount(quantity);
        }
      }, [quantity]);
    
    if (count === 1 ){

        onVariablesChange(1);
    }
    const increment = () => {
      setCount(count + 1);
      onVariablesChange(count + 1);
    };
  
    const decrement = () => {
        if (count <= 1) {
            setShowWarning(true);
          } else {
            // Perform the desired action
            setCount(count - 1);
            onVariablesChange(count - 1);
          }
    };
    const handleClose = () => {
        setShowWarning(false);
      };
    
    return(
        <React.Fragment>
        <Container>
           
            <div className="col-12">
            <div className="">
                <div className="d-flex justify-content-center">
                    <p className="text-dark"><strong>Kuantitas</strong></p>
                </div>
                <div className="input-group w-auto justify-content-center">
                    <button type="button" className="button-minus border rounded-circle  icon-shape icon-sm mx-1 " data-field="quantity" onClick={decrement}>-</button>
                    <input type="number" step="1" max="100" value={`${count}`} name="quantity" className="quantity-field border-0 text-center w-25"/>
                    <button type="button" className="button-plus border rounded-circle icon-shape icon-sm lh-0" data-field="quantity" onClick={increment}>+</button>
                </div>
            </div>
            </div>
            </Container>
            <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Quantity cannot be less than 1.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ya
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Tidak
                </Button>
                </Modal.Footer>
            </Modal>
            </React.Fragment>
    )
}

function ButtonIncreaseCart({value}){
  const [count, setCount] = useState(value[0]);
  const [showWarning, setShowWarning] = useState(false);
  
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    submitData(count+1, value[1], value[2]);
  };

  
  const decrement = () => {
    console.log(count);
    if (count <= 1) {
      setShowWarning(true);
    } else {
      setCount((prevCount) => prevCount - 1);
      submitData(count-1, value[1], value[2]);
    }
  };
  
  const handleClose = () => {
    setShowWarning(false);
  };
  
  const handleRemove = () => {
    submitRemove(value[1], value[2]);
    window.location.reload();
  };
  
  // This useEffect hook will be triggered whenever 'count' changes
  
    return(
        <React.Fragment>
        <Container>
           
            <div className="col-12">
            <div className="">
                <div className="d-flex justify-content-center">
                    <p className="text-dark"><strong>Kuantitas</strong></p>
                </div>
                <div className="input-group w-auto justify-content-center">
                    <button type="button" className="button-minus border rounded-circle  icon-shape icon-sm mx-1 " data-field="quantity" onClick={decrement}>-</button>
                    <input type="number" step="1" max="100" value={`${count}`} name="quantity" className="quantity-field border-0 text-center w-25" readOnly/>
                    <button type="button" className="button-plus border rounded-circle icon-shape icon-sm lh-0" data-field="quantity" onClick={increment}>+</button>
                </div>
            </div>
            </div>
            </Container>
            <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Peringatan !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Kamu yakin menghapus produk ini ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleRemove}>
                    Ya
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Tidak
                </Button>
                </Modal.Footer>
            </Modal>
            </React.Fragment>
    )
}

const submitData  = (count,user, produk) =>{
    const data = {
        quantity: count,
        Id_User : user,
        Id_Produk : produk,
    };

    axios.post(`${url}/quantity`, data)
    .then(response => {
        console.log('Data submitted successfully');
        return true
        // Perform any additional actions if needed
    })
    .catch(error => {
        console.error('Error submitting data:', error);
  });
};

const submitRemove  = (user, produk) =>{
    const data = {
        Id_User : user,
        Id_Produk : produk,
    };

    axios.post(`${url}/remover`, data)
    .then(response => {
        console.log('Data Succesfully Removed');
        // Perform any additional actions if needed
    })
    .catch(error => {
        console.error('Error submitting data:', error);
  });
};

const ShowCheckout =() =>{
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the data is loaded
    }, 300);
  }, []);

    
  if (isLoading) {
    return (
      <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
    )
  }

  return(
    <React.Fragment>
    <Checkout/>
    </React.Fragment>
  )
}

const Checkout =() =>{
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the data is loaded
    }, 300);
  }, []);

  
  const navigate = useNavigate();
  let total_belanja = 0;
  const dataCartDetail = GetCart();
  const dataProduk = GetProduk();
  const dataUser = GetUser();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!boolUser) {
      return <Navigate to={"/profile/login"} replace={true}/>
    }
  }, [navigate]);

  // Check if still loading
  const handleConfirmOrder =(props) =>{
        
        const id_order = `Order-${userData[0].Id_User.slice(0, 3)}${Math.floor(
          Math.random() * (999 - 100 + 1) + 100
        )}`;
        dataCartDetail.filter((item) => item.Id_User === userData[0].Id_User ).map((item) =>(
          submitOrder(id_order,userData[0].Id_User,item.Id_Product,item.Qty,props)
        ));
        navigate("/profile/order")
        window.location.reload();
    }

    const handleOrder =() =>{
      setShowWarning(true);
    }

    const handleClose =() =>{
      setShowWarning(false);
    }


    if (isLoading) {
      return (
        <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      )
    }
  return(
    <React.Fragment>
    <Container className="p-5" style={{transform:"scale(0.9)", backgroundColor:"#F5F5F5", borderRadius:10}}>
        <Row>
          <h3>Checkout</h3>
        </Row>
        <Row className="border-bottom mt-4">
          <h4>Alamat Pengiriman</h4>
        </Row>
        <Row className="p-0">
          <p><strong>{`${userData[0].username.toUpperCase()} `}</strong>{`${userData[0].notelp}`}</p>
        </Row>
          <p>{dataUser.length>0 && dataUser.filter((item) => item.Id_User === userData[0].Id_User)[0].alamat}</p>

        {dataCartDetail.filter((item) => item.Id_User === userData[0].Id_User).map((item)=> (
            <Row className="mt-1 border-bottom d-flex justify-content-end">
              {dataProduk.filter((items) => items.Id_Product === item.Id_Product ).map((item1)=> (
                <p style={{display:"none"}}>{total_belanja = total_belanja + (item.Qty * item1.price)}</p>
            ))}
              {dataProduk.filter((items) => items.Id_Product === item.Id_Product ).map((item1) =>(
                <React.Fragment>
            <Col md={1} className="d-flex justify-content-center m-auto">
            <Image src={`/assets/images/${item1.category}/${item1.image}.jpg`} style={{height:150}} />
            </Col>
            <Col md={8} className="text-wrap">
            <Card className="text-decoration-none border-0"style={{backgroundColor:"#F5F5F5"}}>
            <div className="p-2" >
                <Card.Title className="text-left">{item1.title}</Card.Title>
                <Card.Text className="text-left feature">
                <p>{item1.category}</p>
                </Card.Text>
                <Card.Text className="text-left feature">
                  <ul>
                          {highlight(item1.highlight).slice(0,3).map((item)=>(
                              <li>{item}</li>
                          ))}
                  </ul>
                </Card.Text>
            </div>
            <p > {`Kuantitas : ${item.Qty}`}</p>
        </Card>
            </Col >
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex flex-column align-items-center">
                      <h4><strong>Total</strong></h4>
                      <h4>Rp {(item.Qty * item1.price).toLocaleString()}</h4>
                      </div>
                    </div>
            </React.Fragment>
            
            ))}
        </Row>
        ))}
        <Row className="d-flex justify-content-between flex-column p-0">
                <Row>
                <Container fluid className="d-flex justify-content-end mt-5">
                    <div className="d-flex align-items-center flex-column">
                    <h4><strong>Total Belanja</strong></h4>
                    <h4>{`Rp ${total_belanja.toLocaleString()}`}</h4>
                    </div>
                    </Container>
                </Row>
        </Row>
        <Row className="mt-4">
          <button className="btn btn-lg mt-3" style={{width:"100%", marginBottom:30, backgroundColor:"#78CF81"}} onClick={() => handleOrder()}>Order</button>
        </Row>
        </Container>
        
        <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
              <Modal.Body>
                  Yakin Ingin Melanjutkan Pesanan ? 
              </Modal.Body>
              <Modal.Footer>
              <Button variant="primary" onClick={() =>handleConfirmOrder(total_belanja)}>
                  Ya
              </Button>
              <Button variant="primary" onClick={handleClose}>
                  Tidak
              </Button> 
              </Modal.Footer>
                
            </Modal>
        
        

    </React.Fragment>
  )
}

const Order = () =>{
  let { id_order } = useParams();
  const navigate = useNavigate();
  const[isLoading, setIsLoading] = useState(true);
  const [dataProduk, setDataProduk] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [noresi, setNoresi] = useState("");
  const [kurir, setKurir] = useState("");
  const [notes, setNotes] = useState("");
  const [ongkir, setOngkir] = useState();
  const [batasorder,setBatasOrder] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [image, setImage] = useState();
  const [prev_image, setPrev_Image] = useState();
  const dataUser = GetUser();
  let status;
  let title;
  let total_belanja =0;

  useEffect(() => {
    setTimeout(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/produk`);
        const response1 = await axios.get(`${url}/getId_Order`);
        const response2 = await axios.get(`${url}/getOrder`);
        setDataProduk(response.data);
        setDataOrder(response1.data);
        setDataOrderDetail(response2.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  },100)
  }, []);
  
  

  useEffect(() => {
    if (dataOrder.length>0 && !noresi && !kurir && !notes && !ongkir) {
      setNoresi(dataOrder.filter((item) => item.Id_Order === id_order)[0].noresi);
      setKurir(dataOrder.filter((item) => item.Id_Order === id_order)[0].kurir);
      setNotes(dataOrder.filter((item) => item.Id_Order === id_order)[0].status);
      setOngkir(dataOrder.filter((item) => item.Id_Order === id_order)[0].ongkir);
      setPrev_Image(dataOrder.filter((item) => item.Id_Order === id_order)[0].dataImage);
    }
  },[dataOrder, noresi,id_order,kurir,notes,ongkir]);

  useEffect(()=>{
    if (dataOrder.length>0){
      const orderData = dataOrder.filter((item) => item.Id_Order === id_order)[0].status
      if(orderData === "Dalam Perjalanan" ||orderData === "Pesanan Telah Sampai"){
        setShowWarning(false);
        setShowInfo(false);
      }
      else if(orderData !== "Belum Dibayar" && userData[0].tipe !== "admin"){
        setShowWarning(true);
        setShowInfo(true);
      }
    }
  }, [notes])

  useEffect(()=>{
    const sekarang = new Date();
    if(sekarang.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'}) === new Date(batasorder).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'})){
      handleConfirmCancel();
    }
  },[dataOrder,batasorder])

  useEffect(()=>{
    if(notes !== "Belum Dibayar" && notes!==""){
      setBatasOrder("");
    }
    else if(notes !== "Pembayaran Tidak Sesuai" && notes !== "Belum Dibayar"){
      setBatasOrder("");
    }
    else if(notes === "Sedang Diproses"){
      setBatasOrder(new Date(dataOrder.filter((item) => item.Id_Order === id_order)[0].batasorder).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'}))
    }
    else if(ongkir !== "" && notes !== "Proses Ongkir" && batasorder ===""){
      const sekarang = new Date();
      sekarang.setDate(sekarang.getDate()+1);
      const sekarang2 = sekarang.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'}).split(",");
      const bulan = sekarang2[0].split('/');
      const bulanfilter = `${bulan[2]}/${bulan[1]}/${bulan[0]} ${sekarang2[1].replaceAll('.',':')}`
      setBatasOrder(bulanfilter);
    }
  },[ongkir,notes,batasorder])

  if(!userData){
    return <Navigate to={"/profile/login"}/>
}
  const handleNoresi = (event) => {
    setNoresi(event.target.value);
  };

  const handleKurir = (event) => {
    if(kurir ===""){
      setNotes("Proses Ongkir");
    }
    else{
      if(kurir !== "" || ongkir!== 0){
        setNotes("Dalam Perjalanan");
      }
    }
    
    setKurir(event.target.value);
  };

  const handleOngkir = (event) => {
    if(ongkir !== null || ongkir !== 0){
      setNotes("Belum Dibayar");
    }
    setOngkir(event.target.value);
    if(ongkir.length<=1){
      setNotes("Proses Ongkir");
    }
  };

  const handleNotes= (event) => {
    setNotes(event.target.value);
  };

  function handleImage(e){
    setImage(e.target.files[0]);
  }

  const handleUpload = async () => {
    if(notes === "" || notes === "Dalam Perjalanan"){
      setNotes("Dalam Perjalanan")
    }
    if (!image) {
      alert("Silahkan Input foto !");
      return;
    }
    else{
      try{
        if(filteredPhoto(id_order)[0].dataImage !== "" || filteredPhoto(id_order)[0].dataImage !== null){
          try{
          const storageRef1 = firebase.storage().refFromURL(prev_image);
          await storageRef1.delete();
        } catch(error){
          console.log(error);
        }
        }
        const filename = `photo_${Date.now()}.jpg`;
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${filename}`);
        await imageRef.put(image);
        const imageUrl = await imageRef.getDownloadURL();
        const data = {
          Id_Order: id_order,
          Prev_Image:imageUrl,
        }
        try{
          await axios.post(`${url}/api/upload`,data);
          console.log('Image uploaded successfully!');
          window.location.reload();
        } catch(error){
          console.error('Error uploading the image',error);
        } } 
      catch(error){
        console.error('Error uploading image:', error);
        throw error;
      }
    }
  }

  

  const handleConfirm = async () => { 
    if((noresi === "" && kurir !== "") || (kurir === "" && noresi !== "")){
      alert("Silahkan Masukkan Noresi dan Kurir !")
    }
    else{
      if(!kurir && !noresi && !notes && !ongkir){
        alert("Masukkan Noresi dan Kurir")
      }
      else{
        const data = {
          Id_Order : id_order,
          Kurir: kurir,
          Resi : noresi,
          Notes : notes,
          Ongkir:ongkir,
          BatasOrder : batasorder,
        }
        axios.post(`${url}/updateOrder`, data)
          .then(response => {
              console.log('Data submitted successfully');
              window.location.reload();
              // Perform any additional actions if needed

          })
          .catch(error => {
              alert("Username dan Password salah !")
          });
      }
  }


  }
  const filteredPhoto = (value) =>{
    if(dataOrder.length>0){
    const filtered = dataOrder.filter(item => item.Id_Order === value);
    if(filtered[0].dataimage !== "" || filtered[0].dataimage !== undefined){
      return filtered;
    }
  }
  }

 const handleClose = () =>{
    setShowWarning(false);
  }

  const handleCloseInfo = () =>{
    navigate('/profile/order');
  }


  const handleConfirmCancel = () =>{
    setShowWarning(false);
    const data = {
      Id_Order : id_order,
    }
    axios.post(`${url}/removeOrder`,data)
    .then(response =>{
      console.log('Data Removed');
    })
    .catch(error =>{
      console.log("gagal remove");
    })

    navigate("/profile")
  }

  const background =(value) =>{
    if(value === "Belum Dibayar"){
        return "bg-secondary";
    }
    else if(value === "Sedang Diproses"){
        return "bg-warning";
    }
    else if(value === "Dalam Perjalanan"){
        return "bg-primary";
    }
    else{
        return "bg-info"
    }
  }

  const option =[
    {value:"Sicepat", label:"Sicepat"},
    {value:"J&T", label:"J&T"},
    {value:"JNE", label:"JNE"}
  ]

  const option1 =[
    {value:"Proses Ongkir", label:"Proses Ongkir"},
    {value:"Alamat Tidak Lengkap", label:"Alamat Tidak Lengkap"},
    {value:"Pembayaran Tidak Sesuai", label:"Pembayaran Tidak Sesuai"},
    {value:"Belum Dibayar", label:"Belum Dibayar"},
    {value:"Sedang Diproses", label:"Sedang Diproses"},
    {value:"Dalam Perjalanan", label:"Dalam Perjalanan"},
    {value:"Pesanan Telah Sampai", label:"Pesanan Telah Sampai"},
    
  ]


  if(notes === "Proses Ongkir"){
    title = "Pesanan sedang dalam proses penghitungan ongkir !"
    status = "Dimohon tunggu untuk perubahan status menjadi belum dibayar!";
  }
  else if(notes === "Alamat Tidak Lengkap"){
    title ="Alamat yang diinput tidak lengkap !"
    status = "Silahkan melengkapi alamat anda !. Masukan lebih detail seperti nama kota, kode pos, dan patokan lainnya !";
  }
  else if(notes === "Pembayaran Tidak Sesuai"){
    title = "Pembayaran yang dibayarkan tidak sesuai dengan nominal pembelian !"
    status = `silahkan melakukan pembayaran yang sesuai ! Atau Transfer Kekurangan Pembayaran `;
  }
  else if(notes === "Sedang Diproses"){
    title = "Pembayaran sedang dilakukan pengecekan !"
    status = `Silahkan menunggu status selanjutnya !`;
  }
  
  
  if (isLoading) {
    return (
      <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
    )
  }


  return(
    <React.Fragment> 
    <Container className="p-5" style={{transform:"scale(0.9)", backgroundColor:"#F5F5F5", borderRadius:10}}>
      <Row>
      
   
      
      <Row style={{marginBottom:20}}>
                <Col>
                <Link style={{textDecoration: 'none', color:"black"}} to={`/profile/order`}><button className="btn btn-lg bg-warning">&laquo;</button>   </Link>
                </Col>
                {dataOrder.length > 0 && new Date(dataOrder.filter((item) => item.Id_Order === id_order)[0].batasorder).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'}) !== "Invalid Date"&&(
                <Col md={4} style={{padding:10, backgroundColor:"#f44336", color:"white", borderRadius:10}}>
                    batas Pembayaran : {new Date(dataOrder.filter((item) => item.Id_Order === id_order)[0].batasorder).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'})} WIB
                </Col>
                )}
                </Row>
      
        <Col className="">
                    <div className="d-flex justify-content-end">
                            <p className={`p-2 ${background(notes)}`}style={{borderRadius:10}}>{notes}</p>
                        </div>
                    </Col>
        <h2>Pembayaran</h2>
      </Row>
      {(status !== "Belum Dibayar" || userData[0].tipe !== "user") ?(
        <Row className="d-flex justify-content-between flex-column p-0">
                <Row>
                  {userData[0].tipe === "user" ? 
                    <Col className="p-3">
                      <p>TRANSFER BANK BCA</p>
                      <p>No Rek : 1923834757</p>
                      <p>A/N Muhammad Reyhan Dwi Rama</p>
                    </Col>
                   : 
                   <div>
                   <Col className="p-3">
                   <label htmlFor="ongkir">Ongkir</label>
                      <input
                      type="number"
                      id="ongkir"
                      value={ongkir}
                      onChange={handleOngkir}
                      style={{width:"100%", marginTop:10}} />
                      <label htmlFor="noresi" style={{width:"100%", marginTop:10}}>No_Resi</label>
                      <input
                      type="text"
                      id="noresi"
                      value={noresi}
                      onChange={handleNoresi}
                      style={{width:"100%", marginTop:10}} />
                      <label htmlFor="kurir" style={{marginTop:20}}>Kurir</label>
                      <select id="kurir" value={kurir} onChange={handleKurir}  style={{width:"100%", marginTop:10}}>
                      <option value="">Select an option</option>
                      {option.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      </select>
                      <label htmlFor="notes" style={{marginTop:20}}>Notes</label>
                      <select id="notes" value={notes} onChange={handleNotes}  style={{width:"100%", marginTop:10}}>
                      <option value="">Select an option</option>
                      {option1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      </select>
                    </Col>
                    <Col>
                    <p>{`Alamat : ${dataUser.length > 0 && dataUser.filter((data) => data.Id_User === dataOrder.filter((item) => item.Id_Order === id_order)[0].Id_User)[0].alamat}`}</p>
                </Col>
                    </div>
                   }
                    <Col>
                      <Container fluid className="d-flex justify-content-end mt-5">
                          <div className="d-flex align-items-center flex-column">
                          <h4><strong>Total Belanja</strong></h4>
                          <h4>{`Rp ${dataOrderDetail.length >0 && (dataOrderDetail.filter((item)=>item.Id_Order === id_order)[0].Ttl_Belanja + dataOrder.filter((item) => item.Id_Order === id_order)[0].ongkir).toLocaleString()}`}</h4>
                          </div>
                      </Container>
                    </Col>
                </Row>
        </Row>
        ) : ""}
        {dataOrderDetail.filter((item) => item.Id_Order === id_order).map((item)=> (
            <Row className="mt-1 border-bottom d-flex justify-content-end">
              {dataProduk.filter((items) => items.Id_Product === item.Id_Product ).map((item1)=> (
                <p style={{display:"none"}}>{total_belanja = total_belanja + (item.Qty * item1.price)}</p>
            ))}
              {dataProduk.filter((items) => items.Id_Product === item.Id_Product ).map((item1) =>(
                <React.Fragment>
            <Col md={1} className="d-flex justify-content-center m-auto">
            <Image src={`/assets/images/${item1.category}/${item1.image}.jpg`} style={{height:150}} />
            </Col>
            <Col md={8} className="text-wrap">
            <Card className="text-decoration-none border-0"style={{backgroundColor:"#F5F5F5"}}>
            <div className="p-2" >
                <Card.Title className="text-left">{item1.title}</Card.Title>
                <Card.Text className="text-left feature">
                <p>{item1.category}</p>
                </Card.Text>
                <Card.Text className="text-left feature">
                  <ul>
                          {highlight(item1.highlight).slice(0,3).map((item)=>(
                              <li>{item}</li>
                          ))}
                  </ul>
                </Card.Text>
            </div>
            <p > {`Kuantitas : ${item.Qty}`}</p>
        </Card>
            </Col >
            </React.Fragment>
            
            ))}
        </Row>
        ))}
        {userData && userData[0].tipe!== "admin" ?(
        <Row style={{marginTop:20}}>
          <h4 style={{marginBottom:20}}>Upload Bukti Pembayaran</h4>
          <input type="file" name="file" accept="image/*" onChange={handleImage}/>
        </Row>
        ) : ""}
        
        <Row>
          {filteredPhoto(id_order) &&<img alt="belum upload foto" style={{width:700,height:700}} src={filteredPhoto(id_order) ? `${dataOrder.filter((item) => item.Id_Order === id_order)[0].dataImage}`:URL.createObjectURL(image)}/>}
          
        </Row>
        <Row className="mt-4">
          <Col><button className="btn btn-lg mt-3" style={{width:"100%", marginBottom:30, backgroundColor:"#78CF81"}} onClick={userData[0].tipe === "user" ? handleUpload : handleConfirm}>{userData[0].tipe === "user" ? "Order" : "Update Status"}</button></Col>
        </Row>
        </Container>

        <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{showInfo === false ?"Peringatan " : title}</Modal.Title>
                </Modal.Header>
                {showInfo === false ? (
                  <React.Fragment>
                <Modal.Body>
                    Anda yakin membatalkan pesanan?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleConfirmCancel}>
                    Ya
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Tidak
                </Button>
                </Modal.Footer>
                </React.Fragment>
                ) : <React.Fragment>

                <Modal.Body>
                    <p>{status}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={notes ==="Alamat Tidak Sesuai" || notes === "Proses Ongkir" ?handleCloseInfo:handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
                </React.Fragment>}
            </Modal>
        
    </React.Fragment>
  )
}
const submitOrder  = (id_order,id_user,id_product,qty,props) =>{
  const data = {
      Id_Order: id_order,
      Id_User : id_user,
      Id_Product: id_product,
      Qty: qty,
      Ttl_Belanja: props,

  };
  axios.post(`${url}/order`, data)
  .then(response => {
      console.log('Data submitted successfully');
      return true
      // Perform any additional actions if needed
  })
  .catch(error => {
      console.error('Error submitting data:', error);
});
};
export {Cart,ButtonIncrease,ShowCheckout, Order}
