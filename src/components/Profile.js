import { Container, Row,Col, Nav,Card, Image, Form, Modal, Button} from "react-bootstrap";
import { useState, React, useEffect,useRef } from "react";
import { GetId_Order, GetOrderDetail,GetUser, GetProduk, boolUser,highlight,setLocalStorageWithTimeout, url, userData } from "./global";
import { Link,useNavigate, Navigate} from "react-router-dom";
import axios from "axios";
function Profile(){
    setLocalStorageWithTimeout();
    const navigate = useNavigate();
    const [kondisi, setKondisi] = useState('profile');
    const handleKondisi = (value) =>{
        setKondisi(value)
        
    }
    
    const handleLogout= () =>{
        localStorage.removeItem('user');
        navigate("/profile/login")
        window.location.reload();
        
    }
    if(!userData){
        return <Navigate to={"/profile/login"}/>
    }
      const handleUpdate = (username,email,notelp,password,alamat) =>{
            updateDataProfile(userData[0].Id_User,username,email,notelp,password,alamat);
      }
      if (userData[0].tipe === "user"){
        return(
            <Container style={{padding:50,backgroundColor:"#F5F5F5",marginTop:50, marginBottom:50}}>
                <Row>
                    <Col className="d-flex flex-column " md={3}>
                    <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#787872", color:"white",fontWeight:"bold"}} onClick={() => handleKondisi('profile')}>Update Profile</button>
                    <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#787872", color:"white",fontWeight:"bold"}} onClick={() => handleKondisi('order')}>My Order</button>
                    <Link to={'/profile/login'}>
                    <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#f44336", color:"white",fontWeight:"bold"}} onClick={() => handleLogout()}>Log Out</button>
                    </Link>
                    </Col>
                    <Col>
                        {kondisi === "profile"?  <FormProfile value={kondisi} onChanges={handleUpdate} /> : <Order/>}
                        
                    </Col>
                </Row>
            </Container>
        ) }
    else{
        return(
        <Container style={{padding:50,backgroundColor:"#F5F5F5",marginTop:50, marginBottom:50}}>
            <Row>
                <Col className="d-flex flex-column " md={3}>
                <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#787872", color:"white",fontWeight:"bold"}}>Order Detail</button>
                <Link to={'/profile/login'}>
                <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#f44336", color:"white",fontWeight:"bold"}} onClick={() => handleLogout()}>Log Out</button>
                </Link>
                </Col>
                <Col>
                    <Order/>
                    
                </Col>
            </Row>
        </Container>
    )}
}

function ProfileOrder(){
    setLocalStorageWithTimeout();
    const navigate = useNavigate();
    const [kondisi, setKondisi] = useState('order');
    const handleKondisi = (value) =>{
        setKondisi(value)
    }
    
    const handleLogout= () =>{
        localStorage.removeItem('user');
        navigate("/profile/login")
        window.location.reload();
        
    }
    if(!userData){
        return <Navigate to={"/profile/login"}/>
    }
      const handleUpdate = (username,email,notelp,password,alamat) =>{
            updateDataProfile(userData[0].Id_User,username,email,notelp,password,alamat);
      }
        return(
            <Container style={{padding:50,backgroundColor:"#F5F5F5",marginTop:50, marginBottom:50}}>
                <Row>
                    <Col className="d-flex flex-column " md={3}>
                    <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#787872", color:"white",fontWeight:"bold"}} onClick={() => handleKondisi('profile')}>Update Profile</button>
                    <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#787872", color:"white",fontWeight:"bold"}} onClick={() => handleKondisi('order')}>My Order</button>
                    <Link to={'/profile/login'}>
                    <button className="btn btn-lg mt-3" style={{width:"100%", backgroundColor:"#f44336", color:"white",fontWeight:"bold"}} onClick={() => handleLogout()}>Log Out</button>
                    </Link>
                    </Col>
                    <Col>
                        {kondisi === "profile"?  <FormProfile value={kondisi} onChanges={handleUpdate} /> : <Order/>}
                        
                    </Col>
                </Row>
            </Container>
        ) 
}
function Order(){
    const navigate = useNavigate();
    const {dataUser} = GetUser();
    const {dataProduk} = GetProduk();
    const {dataOrder} = GetId_Order();
    const {dataOrderDetail, isLoading} = GetOrderDetail();
    const [showWarning, setShowWarning] = useState(false);
    const [idOrder, setIdOrder] = useState('');


    setTimeout(()=>{
        window.location.reload();
    },120000)

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
      if (isLoading) {
        return (
          <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
        )
      }

      if(dataOrder.filter((item) => item.Id_User === userData[0].Id_User).length === 0 && userData[0].tipe === "user"){
        return(
            <div style={{margin:"auto"}}>
                <p>No Data Order</p>
            </div>
        )
    }
    
    const handleCancel = (props) =>{
        setIdOrder(props);
        setShowWarning(true);
      }
    
      const handleConfirmCancel = () =>{
        setShowWarning(false);
        const data = {
          Id_Order : idOrder,
        }
        axios.post(`${url}/removeOrder`,data)
        .then(response =>{
          console.log('Data Removed');
        })
        .catch(error =>{
          console.log("gagal remove");
        })
    
        navigate("/profile/order")
        window.location.reload();
      }
    
    const handleClose = () =>{
        setShowWarning(false);
    }
   
    return (
        <div>
        {(userData[0].tipe === "admin" ? dataOrder:dataOrder.filter((item) => item.Id_User === userData[0].Id_User)).map((item) =>(
        <Container fluid className="p-4" style={{transform:"scale(0.9)", backgroundColor:"white", borderRadius:10}}>
        <Link style={{textDecoration: 'none', color:"black"}} to={`/order/${item.Id_Order}`}>
        {new Date(item.batasorder).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'}) !== "Invalid Date" &&(
        <Row>
                <Col>
                </Col>
                <Col md={6} style={{padding:10, backgroundColor:"#f44336", color:"white", borderRadius:10}}>
                    batas Pembayaran : {new Date(item.batasorder).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta'})}
                </Col>
                </Row>
        )}
        <Row style={{marginTop:20}}>
                <Col>
                    <p>{`No_Resi : ${item.noresi}`}</p>
                    <p>{`Kurir : ${item.kurir}`}</p>
                    <p>{`Alamat : ${dataUser.filter((data) => data.Id_User === item.Id_User)[0].alamat}`}</p>
                </Col>
                <Col md={6}>
                <Row>
                        <p>{`Invoice : ${item.Id_Order}`}</p>
                    </Row>
                    <Row className="">
                    <div className="d-flex justify-content-end">
                            <p className={`p-2 ${background(item.status)}`}style={{borderRadius:10}}>{item.status}</p>
                        </div>
                    </Row>
                </Col>
                </Row>
        {dataOrderDetail.filter((items) => items.Id_Order === item.Id_Order ).map((item1)=>(
            <div>
        {dataProduk.filter((items) => items.Id_Product === item1.Id_Product).map((item2) =>(
        <Row>
            <Col md={1} className="d-flex justify-content-center m-auto">
            <Image src={`/assets/images/${item2.category}/${item2.image}.jpg`} style={{height:150}} />
            </Col>
            <Col md={8} className="text-wrap">
            <Card className="text-decoration-none border-0">
            <div className="p-2">
                <Card.Title className="text-left">{item2.title}</Card.Title>
                <Card.Text className="text-left feature">
                <p>{item2.category.toUpperCase()}</p>
                </Card.Text>
                <Card.Text className="text-left d-flex justify-content-start border-top overflow-wrap-break">
                    <ul>
                        {highlight(item2.highlight).slice(0,3).map((item)=>(
                            <li>{item}</li>
                        ))}
                    </ul>
                </Card.Text>
            </div>
            <p> {`Kuantitas : ${item1.Qty}`}</p>
        </Card>
            </Col >
        </Row>
        ))}
        </div>
        ))}

        <Row className="d-flex justify-content-between flex-column p-0">
                <Row>
                <Container fluid className="d-flex justify-content-end mt-5">
                    <div className="d-flex align-items-center flex-column">
                    <h4><strong>Total Belanja</strong></h4>
                    {dataOrderDetail.filter((items) => items.Id_Order === item.Id_Order).slice(0,1).map((item1)=>(
                    <h4>{`Rp ${item1.Ttl_Belanja.toLocaleString()}`}</h4>
                    ))}
                    </div>
                    </Container>
                </Row>
            </Row>
        </Link>
        {item.status !== "Dalam Perjalanan" &&(<Col md={4} className="ms-auto"><button className="btn btn-lg mt-3" style={{width:"100%", marginBottom:30, backgroundColor:"#f44336"}} onClick={() => handleCancel(item.Id_Order)}>Cancel Order</button></Col>)}
        </Container>
))}
    <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Peringatan !</Modal.Title>
                </Modal.Header>
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
            </Modal>
</div>

        

    )
}
function Login(){
    const [selectedValue, setSelectedValue] = useState('Login');
    const handleNavClick = (value) => {
        setSelectedValue(value);
      };
    return(
        <Container style={{padding:"10px 50px 10px 50px", backgroundColor:"#F5F5F5",
        marginTop:120, marginBottom:150, borderRadius:10, 
        } } className="col-12 col-md-8 col-lg-5">
            <Row>
                <Nav className="d-flex justify-content-center" >
                <Nav.Link className={selectedValue === 'Login' ? 'activated' : ''} style={{color:"black"}} onClick={() => handleNavClick('Login')}>Login</Nav.Link>
                <Nav.Link className={selectedValue === 'Register' ? 'activated' : ''} style={{color:"black"}} onClick={() => handleNavClick('Register')}>Register</Nav.Link>
                </Nav>
            </Row>
            <Formsubmit value={selectedValue}/>
            <Row className="d-flex justify-content-center" style={{marginTop:50}}>
                
            </Row>
        </Container>
    )
    
}

function Formsubmit(nilai){  
    if(nilai.value === "Login" || nilai.value ===""){
        return <FormLogin/>
    }
    else{
        return <FormRegister/>
    }
}

function FormLogin(){
    const navigate = useNavigate();
    const [usernamelog, setUsernameLog] = useState('');
    const [passwordlog, setPasswordLog] = useState('');
    const {dataUser} = GetUser();

    if(userData){
        navigate("/profile");
    }
    const handlePasswordLogChange = (event) => {
        setPasswordLog(event.target.value);
    };

    const handleUsernameLogChange = (event) => {
        setUsernameLog(event.target.value);
    };
    
    const filterData = (username,password) =>{
        return dataUser.filter((item) => item.username === username && item.password === password );
    }
    const handleSubmit = () => {
        if (!usernamelog.trim() || !passwordlog.trim()) {
            alert('Silahkan isi username dan password !');
            return;
        }
        else{
            if(filterData(usernamelog,passwordlog).length >0){
                localStorage.setItem('user', JSON.stringify(filterData(usernamelog,passwordlog)))
            }
            else{
                alert("Username dan Password Salah !")
            }
        }
        
        
    };
        return(
            <Row>
                <Form onSubmit={handleSubmit}>
                <div style={{marginTop:30}}>
                    <label htmlFor="username">USERNAME:</label>
                    <input
                    type="text"
                    id="username"
                    value={usernamelog}
                    onChange={handleUsernameLogChange}
                    style={{width:"100%", marginTop:10}} />
                </div>
                <div style={{marginTop:30}}>
                    <label htmlFor="password">PASSWORD:</label>
                    <input
                    type="password"
                    id="password"
                    value={passwordlog}
                    onChange={handlePasswordLogChange}
                    style={{width:"100%", marginTop:10}} />
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:30}}>
                <button className="btn btn-lg mt-3" style={{width:200, backgroundColor:"#2244AA", color:"white",fontWeight:"bold"}} type="submit">Login</button>
                </div>
                </Form>
        </Row>      
        )
}

function FormRegister(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notelp, setNotelp] = useState('');
    const [password, setPassword] = useState('');
    
    const buttonRef = useRef(null);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        buttonRef.current.click(); // Simulate button click
        }
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleNotelpChange = (event) => {

        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        if (numericValue.length >13) {
            alert("Nomor hanya boleh 13 digit !")
        }
        else{
            setNotelp(numericValue);
        }
        
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };    
    const handleSubmit = () => {
        submitDataRegister(username,password, email, notelp, navigate);
       
        
    };
        return(
            <Row>
                <div style={{marginTop:30}}>
                    <label htmlFor="username">USERNAME:</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    style={{width:"100%", marginTop:10}} />
                </div>
                <div style={{marginTop:30}}>
                    <label htmlFor="password">EMAIL:</label>
                    <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyPress={handleKeyPress}
                    style={{width:"100%", marginTop:10}} />
                </div>
                <div style={{marginTop:30}}>
                    <label htmlFor="notelp">NOMOR TELEPON:</label>
                    <input
                    type="text"
                    id="notelp"
                    value={notelp}
                    onChange={handleNotelpChange}

                    onKeyPress={event => {
                        // Allow only numeric characters (0-9)
                        const keyCode = event.which || event.keyCode;
                        const isValidKey = keyCode >= 48 && keyCode <= 57;
              
                        if (!isValidKey) {
                          event.preventDefault();
                          alert("Hanya Input Dengan Angka !");
                        }
                      }}
                    style={{width:"100%", marginTop:10}} />
                </div>
                <div style={{marginTop:30}}>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    style={{width:"100%", marginTop:10}} />
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:30}}>
                <button className="btn btn-lg mt-3" style={{width:200, backgroundColor:"#2244AA", color:"white",fontWeight:"bold"}} onClick={() => handleSubmit() } ref={buttonRef}>Register</button>
                </div>
        </Row>    
        )
}
function FormProfile(props){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (boolUser === false) {
          navigate('/profile/login');
        }
      }, [navigate]);
    const username1 = userData[0].username;
    const password1 = userData[0].password;
    const [data1, setData1] = useState([]);

    useEffect(() => {
        setTimeout(()=>{
        const data2 = {
          Username: username1,
          Password: password1,
        };
      
        const fetchDataFromAPI = async () => {
          try {
            const response = await axios.post(`${url}/login`, data2);
            console.log('Data submitted successfully');
            setData1(response.data);
            setIsLoading(false);
            // Perform any additional actions if needed
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
        };
        
        fetchDataFromAPI();
        
    },300)
      }, [username1,password1]);

      
    const kondisi = props.value;
    const [username, setUsername] = useState("");
    const [edit, setEdit] = useState(true);
    const [email, setEmail] = useState("");
    const [notelp, setNotelp] = useState("");
    const [password, setPassword] = useState("");
    const [alamat, setAlamat] = useState("");
    
    if (username === "" && data1.length > 0) {
        setUsername(data1[0].username);
        setEmail(data1[0].email);
        setNotelp(data1[0].notelp);
        setPassword(data1[0].password);
        setAlamat(data1[0].alamat);
    }


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleNotelpChange = (event) => {
        setNotelp(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleAlamatChange = (event) => {
        setAlamat(event.target.value);
    };

    const handleSubmit = () => {
        updateDataProfile(userData[0].Id_User,username,email,notelp, password, alamat);
    };

    const handleToggleReadOnly = () => {
        setEdit(!edit);
    };

    if (isLoading) {
        return (
          <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
        )
      }
    
    return(
            <Row>
            <form onSubmit={handleSubmit}>
                <div style={{marginTop:30}}>
                    <label htmlFor="username">USERNAME</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{width:"100%", marginTop:10}} readOnly={edit}/>
                </div>
                <div style={{marginTop:30}}>
                    <label htmlFor="password">EMAIL</label>
                    <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{width:"100%", marginTop:10}} readOnly={edit}/>
                </div>
                <div style={{marginTop:30}}>
                    <label htmlFor="notelp">NOMOR TELEPON</label>
                    <input
                    type="text"
                    id="notelp"
                    value={notelp}
                    onChange={handleNotelpChange}
                    style={{width:"100%", marginTop:10}} readOnly={edit}/>
                </div>

                <div style={{marginTop:30}}>
                    <label htmlFor="alamat">ALAMAT LENGKAP</label>
                    <textarea
                    type="text"
                    id="alamat"
                    value={alamat}
                    onChange={handleAlamatChange}
                    style={{width:"100%", marginTop:10}} readOnly={edit}/>
                </div>
                
                <div style={{marginTop:30}}>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{width:"100%", marginTop:10}} readOnly={edit}/>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:30}}>
                </div>

                <div className="d-flex justify-content-center">
                    {kondisi === "profile" && (
                        <button className="btn btn-lg mt-3" style={{width:200, backgroundColor:"#787872", color:"white",fontWeight:"bold"}} onClick={handleToggleReadOnly} type={edit === true ? "submit" : "button"}>{edit === false ? "Update Profile" : "Edit Akun"}</button>
                    )}
                    
                </div>
            </form>
            
        </Row>    
        )
}

const submitDataRegister = (username,password, email, notelp, navigate) =>{
    const data = {
        Username: username,
        Password: password,
        Email : email,
        Notelp : notelp,
        Alamat :"",
    };
    console.log(data)
    axios.post(`${url}/register`, data)
    .then(response => {
        alert("Data berhasil dibuat !, Silahkan login menggunakan username dan password yang sudah didaftarkan");
        window.location.href = '/profile/login';
        // Perform any additional actions if needed

    })
    .catch(error => {
        alert("Username sudah digunakan ! , silahkan gunakan username yang lain")
  });

};



const updateDataProfile = (id_user,username,email,notelp,password,alamat) =>{
    const data = {
        Id_User : id_user,
        Username: username,
        Password: password,
        Email : email,
        Notelp : notelp,
        Alamat :alamat,
    };
    axios.post(`${url}/update`, data)
    .then(response => {
        console.log('Data updated successfully');
        // Perform any additional actions if needed
    })
    .catch(error => {
        console.log('data gagal di update',error);
  });
};
export{Login, Profile,ProfileOrder}