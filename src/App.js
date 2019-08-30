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

class Form extends React.Component{
  render(){
    return(
      <div>
          <label>Id</label>
          <input type="text" id="id" name="id"></input>

          <label>Titulo</label>
          <input type="text" id="titulo" name="titulo"></input>

          <label>Url da Imagem</label>
          <input type="text" id="img" name="img"></input>

          <button onClick={() => this.props.addpost(
            document.getElementById("id").value,
            document.getElementById("titulo").value,
            document.getElementById("img").value
          )}>Adicionar</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: objeto.posts
    }

    this._adicionarPost = this._adicionarPost.bind(this)
    this._excluirPost = this._excluirPost.bind(this)

  }
  
  _excluirPost(id){
    var posts = this.state.posts.filter(function(valor){
      return valor.id != id;
    });
    this.setState({posts})
  }

  _adicionarPost(id, titulo, url_imagem){
    var posts = this.state.posts;
    posts.push({
      "id": id,
      "titulo": titulo,
      "url": url_imagem
    })
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
        <Form addpost = {this._adicionarPost}/>
      </div>
    );
  }
}

export default App;
