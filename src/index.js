import { createRoot } from 'react-dom/client'; 
import React from 'react';
const root = createRoot(document.querySelector('#root'));
import { Provider, connect } from 'react-redux';
import store, { fetchImages } from './store';

const App = connect(
  state => state,
  dispatch => {
    return {
      fetchImages: ()=> dispatch(fetchImages())
    }
  }
)(class App extends React.Component{
  async componentDidMount(){
    try {
      await this.props.fetchImages();
    }
    catch(ex){
      console.log(ex);
    }
  }
  render(){
    return <hr />;
  }
});

root.render(<Provider store={ store }><App /></Provider>);
