import React, {useEffect} from 'react';
import './App.css';
import {connect} from 'react-redux'
import userAPI from './requests/index'

function App(props) {
  useEffect(() => {
    userAPI.getYear()
    .then(res => {
      props.setYear(res.data.year)
    })
    .catch(err => console.log("Error: ", err))
  }, [])
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
        <h3> Value is {props.year} </h3>
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
