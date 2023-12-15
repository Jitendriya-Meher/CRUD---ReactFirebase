
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../backend/firestore';
import toast from 'react-hot-toast';

const Create = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState();

    const [error,setError] = useState('');

    const navigator = useNavigate();

    console.log(name,age,email);

    const handleSubmit = async(e) => {

        e.preventDefault();

        if( !name || !age || !email){
            toast.error("please enter all required fields");
            return;
        }

       try{
            const addUser = {name,email,age};

            const result = await addDoc( collection(db, 'users'),addUser);
            
            console.log("result 1 = ",result);

            
                setError("");
                setName("");
                setEmail("");
                setAge();

                toast.success("user created successfully");
                navigator("/all");
            
       }
       catch(e){
        console.log("error while creating user: " , e);
        setError(e);
        toast.error(e.message);
       }

    }

  return (
    <div classNameName='container my-2'>

    {
        error && <div class="alert alert-danger" role="alert">
        {error}
        </div>
    }

    <h2 classNameName='text-center'>Enter The Data</h2>

    <form className='container' onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" placeholder='Jitendriya Meher' className="form-control" value={name} onChange={(e)=>{
                setName(e.target.value);
            }}/>
            
        </div>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" placeholder='jitenkvk@gmail.com'  className="form-control" value={email} onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            
        </div>
        <div className="mb-3">
            <label className="form-label">age</label>
            <input type="number" placeholder='21'  className="form-control" value={age} onChange={(e)=>{
                setAge(e.target.value);
            }}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      
    </div>
  )
}

export default Create
