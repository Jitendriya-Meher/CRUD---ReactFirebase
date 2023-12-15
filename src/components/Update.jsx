
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../backend/firestore';
import toast from 'react-hot-toast';

const Update = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState();

    const [error,setError] = useState('');

    const navigator = useNavigate();
    const {id} = useParams();

    const getSingleUser = async () => {

      try{

        const result = await getDoc( doc( db, 'users',id));

        const obj = result.data();

        console.log(result);

        setName(obj.name);
        setAge(obj.age);
        setEmail(obj.email);

      }
      catch(e){
        console.log(e);
        setError(e);
      }

    }

    async function handleEdit(e){

      e.preventDefault();

      try{

        const updatedUser = {name,email,age};

       const result = await updateDoc( doc(db, 'users',id), updatedUser);
            
        console.log("result updated = ",result);
        toast.success("user updated successfully");

        navigator("/all");
      }
      catch(e){
        console.log(e);
        setError(e);
        toast.error(e.message);
      }
    }

    useEffect(()=>{
      getSingleUser();
    },[]);

  return (
    <div classNameName='container my-2'>

    {
        error && <div class="alert alert-danger" role="alert">
        {error}
        </div>
    }

    <h2 classNameName='text-center'>Edit The Data</h2>

    <form className='container' onSubmit={handleEdit}>
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
        
        <button type="submit" className="btn btn-primary"> Edit </button>
        </form>
      
    </div>
  )
}

export default Update
