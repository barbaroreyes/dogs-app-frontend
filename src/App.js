import React ,{useState,useEffect}from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const [dogs,setDogs] = useState([])
  const emptyDog = {
    name : '',
    age :0,
    img: ""

  }
  const [selectedDog, setSelectedDog] = useState(emptyDog)
  const url = 'http://localhost:4500'

    // Function to get list of Dogs
    const getDogs = () => {
      // make a get a request to this url
      fetch(url + "/dog/")
      // use .then to take action when the response comes in
      // convert data into js object
      .then((response) => response.json())
      // use the data from the response
      .then((data) => {
        setDogs(data)
      })
      }
  useEffect(()=>{
   getDogs()
  },[])
  const handleCreate = (newDog)=> {
  fetch(url + '/dog/',{
    method : "POST",
    headers: {
      "Content-Type": "application/json",
   },
    body: JSON.stringify(newDog)
  })
  .then(()=> {})
  }

  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dog)
    })
    .then(() => {})
  }

  //function to specifi a dog
  // function to specify which dog we are updated
const selectDog = (dog) => {
  setSelectedDog(dog)
}

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to='/create'>
        <button>Add Dog</button>
      </Link>
      <main>
      <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display {...rp} dogs={dogs} selectDog={selectDog} />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                dog={emptyDog}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              dog={selectedDog} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
