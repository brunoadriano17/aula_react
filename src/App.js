import React from 'react';
import './App.css';
import objeto from './posts.json';
import Axios from 'axios';

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

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      titulo: "",
      url: ""
    }

    this._adicionarPost = this._adicionarPost.bind(this)
    this._excluirPost = this._excluirPost.bind(this)

    Axios.get('https://www.mocky.io/v2/5d7193e0330000f7cf7799a1').then((result) => {
      this.setState({posts: result.data.posts})
    })

    /*
    Axios.post('url', {
      //Data for post
    }) */
  }
 
  _excluirPost(id){
    var posts = this.state.posts.filter(function(valor){
      return valor.id != id;
    });
    this.setState({posts})
  }

  _adicionarPost(){
    console.log(this.state.url);
    var posts = this.state.posts;
    var id = 1;
    if(this.state.posts.length > 0){
      var id = this.state.posts[this.state.posts.length-1].id+1;
    }
    posts.push({
      "id": id,
      "titulo": this.state.titulo,
      "url": this.state.url
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

        <div className="form-control">

          <label for="titulo">Titulo</label>
          <input type="text" id="titulo" name="titulo" onChange={(e) => {
            this.setState({titulo: e.target.value})
          }}/>
          <label for="img">Url da Imagem</label>
          <input type="text" id="img" name="img" onChange={(e) => {
            this.setState({url: e.target.value})
          }}/>
          </div>
        <div>
          <button className="btn btn-success" onClick={() => this._adicionarPost()}>Adicionar</button>
        </div>

      </div>
    );
  }
}

export default App;
