import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

export default class ArtistDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {props}
    console.log(this.state);
  }

  componentDidMount() {
    this.getArtistDetails()
    this.fetchingFilteredMovies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filteredMovies.length !== prevProps.filteredMovies.length) {
        this.fetchingFilteredMovies();
      }
    } 

    shouldComponentUpdate(nextProps) {
      if (this.props.filteredMovies.length !== nextProps.filteredMovies.length) {
        this.fetchingFilteredMovies();
      }

      return true;
    }

    fetchingFilteredMovies() {
        console.log('Updated state : ');
        console.log(this.props.filteredMovies.length);
          this.state.artistDetails = this.props.filteredMovies;
          console.log('this.state.artistDetails');
    }

    componentWillReceiveProps(props) {
      const refresh = [];
      if (props.filteredMovies.length !== refresh.length) {
        let revisedData = props.filteredMovies;
        this.setState({artistDetails: revisedData})
        console.log(revisedData);
      }
    }


  getArtistDetails() {
    axios.get('assets/samplejson/moviesData.json').then(response => {
      this.setState({artistDetails: response.data.feed.results})
    })
  };

  scrollToTop() {
      window.scrollTo(0, 0);
  }

  render() {
    if (!this.state.artistDetails)
      return (<p>Loading Data</p>)
    return (
      <div className="row">
      <div><span style={{fontSize: "20px"}}><b>Number of Results : {this.state.artistDetails.length}</b></span></div>
      <div className=" col-sm-12 col-md-12">
        {
          this.state.artistDetails.map((artist,index) => 
          <div className="customerdetails" key={index}>
      <Panel bsStyle="info" className="card">
        <Panel.Heading className="card-header">
          <Panel.Title componentClass="h3">{artist.artistName}</Panel.Title>
        </Panel.Heading>
        <Panel.Body className="card-body">
          <img src={artist.artworkUrl100} style={{borderRadius: "50%"}}/>
          <p>releaseDate : {artist.releaseDate}</p>
          <p>Kind : {artist.kind}</p>
          <span> Genres: 
              <ul>
                  {artist.genres.map(function(element, index) {
                      return <li  key={index} style={{ listStyleType: "none", display: "block", paddingRight: "10px" }}>
                      {element.name}</li>;
                  })}
              </ul>
          </span>
          <p>url : <a href={artist.url} target="_blank">-	Link to App Store </a></p>
          <p>name : {artist.name}, 
          <span style={{paddingLeft: "20px"}}><a href={artist.url} target="_blank">Link</a></span></p>
          <span><button className="btn btn-primary" onClick={this.scrollToTop}>Scroll to Top</button></span>
        </Panel.Body>
      </Panel>
    </div>)
        }
      </div>
      </div>)
  }
}
