import React from 'react';
import './App.css';
import objeto from './posts.json';

class Post extends React.Component{
  render(){
    return(
      <div>
        <div>ID: {this.props.id}</div>
        <img className="imagem" src= {this.props.url_imagem}/>
        <div>Titulo: {this.props.titulo}</div>
        <button onClick={() => this.props.excluir(this.props.id)}>Excluir</button>
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('kk eae man'); }}>
        {this.props.value}
      </button>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: objeto.posts
    }

    this._excluirPost = this._excluirPost.bind(this)

  }
  
  _excluirPost(id){
    var posts = this.state.posts.filter(function(valor){
      return valor.id != id;
    });
    this.setState({posts})
  }
 
  render(){
    return (
      <div className="App">
        {
          //foreach posts as post
          this.state.posts.map((post, i) => 
          <Post 
              key = {i}
              id = {post.id}
              url_imagem = {post.url} 
              titulo = {post.titulo}
              excluir = {this._excluirPost}
            />
          )
        }

        <Square value="rafa legal" msg="oi rafa"/>
      </div>
    );
  }
}

export default App;
