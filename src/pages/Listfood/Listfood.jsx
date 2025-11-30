import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import './ListFood.css'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Listfood = () => {
  const [list,setList] = useState([]);
  const fetchList = async ()=>{
      try{
        const response = await fetch(`${BASE_URL}/api/dishes/getAll`, {
          method: 'GET'
        });
        if(response.status==200){
        const data = await response.json(); 
        setList(data); 
        }
        else{
          toast.error("error fetching list");
        }
      }
      catch(error){
        console.log(error);
        toast.error('Error calling the list');
      }
  }
  useEffect(()=>{
    fetchList();
  },[]);

  const removeDish = async(id)=>{
    try{
        const response = await fetch(`${BASE_URL}/api/dishes/delete`, {
          method: 'DELETE',
          headers:{
            id:id,
          }
        });
        if(response.status==200){
          toast.success("successfully deleted");
          await fetchList()
        }
        else{
          toast.error("error fetching list");
        }
      }
      catch(error){
        console.log(error);
        toast.error('Error calling the list');
      }
  }
  return (
    <div className='py-5 row  justify-content-center'>
      <div className="col-11 card">
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item,ind)=>{
                return (
                  <tr key={ind}>
                    <td>
                      <img src={item.imageUrl} alt="" height={48} width={48} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>&#8377;{item.price}</td>
                    <td className='text-danger'>
                      <button type="button" class="btn btn-danger btn-sm" onClick={()=>removeDish(item.id)}>Remove</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Listfood   