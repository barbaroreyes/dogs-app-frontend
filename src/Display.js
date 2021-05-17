import React from "react";

const Display = ({dogs,selectDog,history,deletedDog}) => {
  const loaded =() => {
    return <div className="dogs">
  
    {dogs.map((item,i)=>{
     return(<div key={i} className='dog'>
             <h2>Name : {item.name}</h2>
              <img src={item.img} alt={item.name}/>
              <h3>Age : {item.age}</h3>
              <button onClick={() => {
            selectDog(item)
            history.push("/edit")
          }}>
            edit
          </button>
          <button
          onClick={()=>{
            deletedDog(item)
            
          }}
          >delete</button>
            </div>)})}
          </div>
  }
  const loading =() => <h3>Loading...</h3>
  return dogs ? loaded() :loading();
};

export default Display;
