import React, {useEffect, useState} from 'react';
import './App.css';
import {connect} from 'react-redux'
import userAPI from './requests/index'
import socketIOClient from 'socket.io-client'

function App(props) {
  const [response, setResponse] = useState("");

  
  useEffect(() => {
    userAPI.getYear()
    .then(res => {
      props.setYear(res.data.year)
    })
    .catch(err => console.log("Error: ", err))
  }, [])
  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:8000');
    socket.on("FromAPI", data => {
      console.log("socket response ", data)
      setResponse(data);
    });
  }, []);
  const increaseYear = () => {
    userAPI.updateYear(props.year+1)
    .then(res => console.log(res.data))
    .then(props.increaseYear())
    .catch(err => console.log(err))
  }
  const decreaseYear = () => {
    userAPI.updateYear(props.year-1)
    .then(res => console.log(res.data))
    .then(props.decreaseYear())
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
            <p>
      It's {response}
    </p>
        <button onClick={increaseYear}> increase </button>
        <button onClick={decreaseYear}> decrease </button>
  
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    year: state.year
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseYear: () => dispatch({type:'INCREASE'}),
    decreaseYear: () => dispatch({type:'DECREASE'}),
    setYear: (year) => dispatch({type:'SET', payload:year})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
