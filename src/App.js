import React, { Component } from 'react';
import Leaf from './Leaf';
import Dates from './Dates';
import StatCard from './StatCard';
import classes from './app.module.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
      cleanData:[],
      dateInput: '2019-10-01',
      loading: false,
      totalInspections: null,
      calculate: false
    };
  }

  componentDidMount() {
    try {
      this.fetchData();

    } catch (err) {
      console.log(err);
      this.setState({
        loading: false
      })
    }

  }


     //componentDidUpdate () {
     //  if(this.state.calculate) {
     //    this.setState({totalInspections: this.state.data.length})
     //  }
    // }

  fetchData= async ()=>{
    const requestData = () => {
     fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInput}'&$limit=50000`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
           this.setState({ data: res, loading: true})
        )
    }
    
    //this.setState({calculate: true})
    //call the function
    await requestData();
   
  }

  calculateInspections =() => {
    this.setState({totalInspections: this.state.data.length})
  }

  handleDateInput = (e) => {
    console.log(e.target.value);
    this.setState({dateInput:e.target.value, loading: false}) //update state with the new date value
    this.updateData();
    //this.processGraph(e.target.value)
  }

  updateData =() => {
    this.fetchData();
  }

  LoadingMessage=()=> {
    return (
      <div className={classes.splash_screen}>
        <div className={classes.loader}></div>
      </div>
    );
  }


  //inspection_date >= '${this.state.dateInput}'& 
 // https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=inspection_date >= '2019-10-10T12:00:00' 

  render() {



    return (
      <div>

        <div>{!this.state.loading ? 
              this.LoadingMessage() : 
              <div></div>}
        </div>
          
        {this.state.totalInspections && <StatCard totalInspections={this.state.totalInspections} /> } 
          
          <Dates handleDateInput={this.handleDateInput}/>
          <Leaf data={this.state.data} />
          
      </div>
    );
  }
}

export default App;


/**olf code
 * 
 *   updateData =() => {
    //populate clean data
      this.state.data.map(data=>{
        this.setState({
          cleanData: this.state.cleanData.push([data.latitude, data.longitude, 1])
        })
    }) 
  }

  {this.state.cleanData ? console.log(this.state.cleanData) : <div>hello</div>}

 */