
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./read.css"
import { db } from '../backend/firestore';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Read = () => {

  const [data,setData] = useState([]);
  const [error,setError] = useState('');

  async function getData(){

    const userCollection = collection(db, 'users');

    const res = await getDocs(userCollection);
    const result = res.docs.map((doc) => (
        {
            ...doc.data(),
            _id: doc.id
        }
    )); 

    console.log(result);
      
    if( !result){
      console.log(result.message);
      setError(result.message);
      setData([]);
    }
    else{
      setData(result);
    }
  }

  useEffect( ()=>{
    getData();
  },[]);

  const handleDelete = async (id) => {

    try{
        
        const result = await deleteDoc( doc( db, 'users', id));

        setError("User deleted Successfully");
        toast.error("User deleted Successfully");

        setTimeout(() => {
          setError("");
          getData();
        }, 2000);
    }
    catch(e){
      setError("Cannot delete The User");
      toast.error("Cannot delete The User");
      setTimeout(() => {
        setError("");
        getData();
      }, 1800);
    }

  }


  return (
    <div className='container my-2 all'>

    {
        error && <div class="alert alert-danger" role="alert">
        {error}
        </div>
    }

      <div className="row">    

        <div className="col">

        {
          data.length > 0 ? <div className="post">All Posts</div> :
          <div className='post'>Please Enter Some User</div>
        }

        {
          data.length > 0 ? (
            
            
            data.map( (user) => (
              <div className="card my-4" key={user._id}>
                <div className="card-body">
                  <h5 className="card-title">
                    Name : {user.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    age : {user.age}
                  </h6>
                  <p className="card-text">
                    Email : {user.email}
                  </p>
                  <a className="btn btn-danger mx-2"
                  onClick={ () => {handleDelete(user._id)}}
                  >Delete</a>
                  <Link to={`/${user._id}`} className="btn btn-primary mx-2">Edit</Link>
                </div>
              </div>
            ))
            
          ):(
            <div className=""></div>
          )
        }

        </div>

      </div>
      
    </div>
  )
}

export default Read
