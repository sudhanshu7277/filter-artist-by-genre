import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import ArtistDetails from './artistDetails'
import axios from 'axios'

export default class Artists extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedartist: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e){
    if(e.keyCode == 13){
       console.log('value', e.target.value);
       this.handleSubmit(e);
    }
 }

  handleSubmit(event) {
    event.preventDefault();
    const resultValue = [];
    if(this.input.value.length > 4) {
      let searchKey = this.input.value.toLowerCase();
      console.log('The value is: ' + searchKey);
      var finalDataSet = this.state.artistsList.data.feed.results.filter((artist, index) => {
        artist.genres.filter(function(element, index) {
          if(element.name.toLowerCase().indexOf(searchKey) != -1) {
            resultValue.push(artist);
          }
        })
      });
      this.input.value = '';
      this.refreshResultList(resultValue);
      return resultValue;
    }
    return false; 
  }

  refreshResultList(resultValue) {
    if(resultValue !== undefined) {
      this.setState({selectedartist: resultValue})
      console.log(this.state.selectedartist);
    }
    return resultValue;
    }

  componentDidMount() {
    this.getartistData();
  }

  getartistData() {
    axios.get('assets/samplejson/moviesData.json').then(response => {
      this.setState({artistsList: response})
    })
  };

  render() {
    if (!this.state.artistsList)
      return (<p>Loading data</p>)
    return (
      <div className="addmargin">
          <div className="col-md-3">
          <Panel bsStyle="info" className="centeralign">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Filter Artists by Any Genre</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <form className="example" style={{margin:"auto", maxWidth:"300px"}}>
                  <input type="text" placeholder="enter a genre to filter...." name="genre"
                  ref={(input) => this.input = input} value={this.state.value} onKeyDown={this.keyPress}/>
                  <button type="submit" className="btn btn-info"
                  onClick={this.handleSubmit}>Filter</button>
                </form>
            </Panel.Body>
            </Panel>
          </div>
          <div className="col-md-6">
            <ArtistDetails filteredMovies={this.state.selectedartist}/>
          </div>
    </div>)
  }

}
