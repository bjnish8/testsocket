import React from 'react';
import './App.css';
import {connect} from 'react-redux'

function App(props) {
  return (
    <div className="App">
        <h3> Value is {props.year} </h3>
        <button onClick={props.increaseYear}> increase </button>
        <button onClick={props.decreaseYear}> decrease </button>
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
    decreaseYear: () => dispatch({type:'DECREASE'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
