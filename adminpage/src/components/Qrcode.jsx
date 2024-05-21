import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL;


function Qrcode() {
    const [qrimage, setqrimage] = useState('')
    const [uploadqr, setuploadqr] = useState(false)
   
    const [file, setFile] = useState()
    function handleChange(event) {
        setFile(event.target.files[0])
        console.log(file)
      }
      async function upload(formdata){
        try {
            let res= await axios.post(`${baseURL}/api/v1/form/qr`,formdata)
            setuploadqr(false)
            console.log(res)
        } catch (error) {
            console.log(error)
            
        } 
      }
    const handleSubmit=()=>{     
        
        console.log('fn call')
        let formdata=new FormData()
        // console.log(e.target.qrcode)
        formdata.append('qrcode',file)
        upload(formdata)        
       }

    useEffect(()=>
    { async function getqr(){
        let res=await axios.get(`${baseURL}/api/v1/form/qr`)
        console.log(res.data)
        setqrimage(res.data.qrcode)
      }
      getqr()
     },[])
  return (
    <div style={{width:'200px',margin:'50px auto'}}>
        <div >
            <img src={`${import.meta.env.VITE_API_URL}${qrimage}`} alt="qr Code for payment" width={200} />
        </div>
        <button onClick={()=>setuploadqr(!uploadqr)}
        style={{color:'white',background:'blue',
        margin:'20px auto', borderRadius:'10px',padding:'5px 20px'}} > CHANGE QR CODE</button>
        {uploadqr && <div>
            <div >
                <input type="file" name="qrcode" id="QR" accept="image/*" required onChange={handleChange}  />
            
                <button style={{color:'white',background:'blue',
        margin:'20px auto', borderRadius:'10px',padding:'5px 20px'}}
        onClick={handleSubmit}
                > UPLOAD QR</button>
            </div>            
            </div>}
       
    </div>
  )
}

export default Qrcode