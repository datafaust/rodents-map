import React, { Component } from 'react';
import Leaf from './Leaf';
import Dates from './Dates';
import StatCard from './StatCard';
import Graph from './Graph';
import classes from './app.module.css';
import Navigator from './Navigator';
import Pop from './Pop';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie
} from 'recharts';
import { Container, Row } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cleanData: [],
      graphData: [],
      pieGraphData:[],
      totalCount:{},
      topCount:[],
      dateInputStart: '2019-11-01',
      dateInputEnd: '2019-11-18',
      loading: false,
      totalInspections: null,
      calculate: false,
      open: true,
      showModal:true
    };
  }

  componentDidMount() {
    try {
      this.fetchData();
      if (this.state.data.length != 0) {
        this.calculateInspections();
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false
      })
    }

  }


  // componentDidUpdate () {
  //   if(this.state.data.length != 0) {
  //     this.calculateInspections();
  //   }
  //  }

  fetchData = async () => {
    const requestData = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$limit=50000`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ data: res })
        )
    }

    const requestDayCounts = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=date_trunc_ymd(INSPECTION_DATE) as day,count(*)&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$group=day&$order=day`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ graphData: res, loading: true })
        )
    }

    const requestBoroughCounts = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=borough as name,count(*) as value&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$group=borough&$order=borough`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ pieGraphData: res })
        )
    }

    const requestTotalCount = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=count(*) as value&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ totalCount: res })
        )
    }

    const requestTop = () => {
      fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json?$select=inspection_type,count(*) as value&$where=latitude > 39 AND latitude< 45 AND inspection_date >= '${this.state.dateInputStart}'  AND inspection_date <= '${this.state.dateInputEnd}'&$group=inspection_type&$order=inspection_type`)
        .then(res => res.json())
        .then(res =>
          //console.log(res)
          this.setState({ topCount: res })
        )
    }


    //this.setState({calculate: true})
    //call the function
    await requestData();
    await requestDayCounts();
    await requestBoroughCounts();
    await requestTotalCount();
    await requestTop();
    this.calculateInspections();





  }

  calculateInspections = () => {
    this.setState({ totalInspections: this.state.data.length })
  }

  handleDateInputStart = (e) => {
    console.log(e.target.value);
    this.setState({ dateInputStart: e.target.value, loading: false }) //update state with the new date value
    this.updateData();
  }

  handleDateInputEnd = (e) => {
    console.log(e.target.value);
    this.setState({ dateInputEnd: e.target.value, loading: false }) //update state with the new date value
    this.updateData();
  }

  updateData = () => {
    this.fetchData();
  }

  LoadingMessage = () => {
    return (
      <div className={classes.splash_screen}>
        <div className={classes.loader}></div>
      </div>
    );
  }

  averageScores =({avg, n}, slangTermInfo) => {
    return {
        avg: (parseInt(slangTermInfo.count) + n * avg) / (n + 1),
        n:   n + 1,
    };
  }

  closeModal = () => {
    this.setState({showModal : false})
  }

  //inspection_date >= '${this.state.dateInput}'& 
  // https://data.cityofnewyork.us/resource/p937-wjvj.json?$where=inspection_date >= '2019-10-10T12:00:00' 

  render() {

    //parse datat for borough graph 
    let data03 = this.state.pieGraphData.map(item => {item["value"] = parseInt(item["value"]); return item})

    //produce average per day
    
      const initialVals = {avg: 0, n: 0};
      const averagePday = Math.round(this.state.graphData.reduce(this.averageScores, initialVals).avg);
      console.log(averagePday);
    


    let z = [{value:"6448"}]
    console.log(this.state.topCount)

    return (
      <div>
        {!this.state.loading ?
        this.LoadingMessage() :
        <div >
          <Navigator />
          <Pop 
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            />
        <div className={classes.container}>
          <StatCard value={`Total Inspections: ${this.state.totalCount[0] ? this.state.totalCount[0].value : 0}`} open={this.state.open} />
          <StatCard value={`Average Inspections per Day: ${Math.round(this.state.graphData.reduce(this.averageScores, initialVals).avg)}`} open={this.state.open} />
          <StatCard value={`Top Inspection Type: ${this.state.topCount[0]? this.state.topCount[0].inspection_type : 0}`} open={this.state.open} />
        </div>

        <div className={classes.dateContainer}>
          <Dates title={'Start Date: '} value={this.state.dateInputStart} handleDateInput={this.handleDateInputStart} />
          <Dates title={'End Date: '} value={this.state.dateInputEnd} handleDateInput={this.handleDateInputEnd} />
        </div>
        <div style = {{backgroundColor: '#343a40', height: "750px"}}>
        <Leaf data={this.state.data} />
        </div>
        <div className={classes.graphContainer}>
        <Graph 
          title={'Total Poops per Day'}
          graph=
          {<LineChart
            data={this.state.graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="day" angle={0} textAnchor="end"  tick={{ fontSize: 13, fill:"white" }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="white" activeDot={{ r: 8 }} />
          </LineChart>}
        />
        
        <Graph
          title={'Total Poops per Day'}
          graph=
          {	<PieChart width={400} height={400}>
          <Pie 
            dataKey="value" 
            isAnimationActive={false} 
            data={this.state.pieGraphData} 
            cx={200} 
            cy={200} 
            outerRadius={80} 
            fill="#8884d8" label />
          <Tooltip />
        </PieChart>}
        />
        </div>
      </div>
        }
      </div>
      
    );
  }
}

export default App;


/**olf code
 * 
 *    <Leaf data={this.state.data} />
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