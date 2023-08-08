import { useState, useEffect } from 'react';
import axios from 'axios';

const url = "https://delightful-lamb-jodhpurs.cyclic.app  ";
const userData = JSON.parse(localStorage.getItem("user"));
const boolUser = !!localStorage.getItem('user');


const GetUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get(`${url}/user`)
      .then(response => {
        setDataUser(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return {dataUser, isLoading};
};


const GetId_Order = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get(`${url}/getId_Order`)
      .then(response => {
        setDataOrder(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return {dataOrder,isLoading};
};

const GetOrderDetail = () => {
  const [dataOrderDetail, setOrderDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get(`${url}/getOrder`)
      .then(response => {
        setOrderDetail(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return {dataOrderDetail, isLoading};
};

function setLocalStorageWithTimeout() {
  // Save the value in localStorage
  // Set a timeout to remove the item after the specified time
  setTimeout(() => {
    localStorage.removeItem("user");
  }, 1800000);
}

const GetData = () => {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get(`${url}/user`)
      .then(response => {
        setDataUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return dataUser;
};

const GetCart = () => {
  const [dataCartDetail, setDataCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get(`${url}/cart`)
      .then(response => {
        setDataCart(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return {dataCartDetail, isLoading};
};

const GetProduk = () => {
  const [dataProduk, setDataProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedata = localStorage.getItem("produk");
    if (cachedata){
      setDataProduk(JSON.parse(cachedata));
      setIsLoading(false); 
    }
    else{
    axios.get(`${url}/produk`)
      .then(response => {
        setDataProduk(response.data);
        localStorage.setItem('produk', JSON.stringify(response.data));
        setIsLoading(false); 
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); 
      });
    }
  }, []);
  return {dataProduk, isLoading};
};


const highlight = (text) => {
  return text.split(';');
};

const deskripsi = (text) =>{
  return text.split("\\")
}

const GetIdCart = () =>{
      if(userData){
        const data = {
            Id_User : userData[0].Id_User,
        };
        // Make the POST request
        axios.post(`${url}/getId_Cart`, data)
          .then((response) => {
            // Handle the response from the server
            if(response.data.length === 0){
                userData[0].Id_Cart = `ct${userData[0].Id_User.slice(0, 3)}${Math.floor(
                    Math.random() * (999 - 100 + 1) + 100
                  )}`;
                  localStorage.setItem('user', JSON.stringify(userData));
            }
            else{
                userData[0].Id_Cart = response.data[0].Id_Cart;
                localStorage.setItem('user', JSON.stringify(userData));
            }
            
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error.message);
          });
    };
}

const submitData  = (item,qty) =>{
  const data1 = JSON.parse(localStorage.getItem("user"));
  console.log(data1[0].Id_Cart);
  const data = {
      Id_Cart: data1[0].Id_Cart,
      Qty : qty,
      Id_User: data1[0].Id_User ,
      Id_Product: item.Id_Product,
  };

  axios.post(`${url}/checkout`, data)
  .then(response => {
      console.log('Data submitted successfully');
      console.log(response.data);
      // Perform any additional actions if needed
  })
  .catch(error => {
      console.error('Error submitting data:', error);
});
};




export { url, 
  setLocalStorageWithTimeout, 
  userData, boolUser, 
  GetCart,GetId_Order, GetOrderDetail,
  GetData,GetProduk,GetUser,
  highlight, GetIdCart,deskripsi, submitData};
