import React, {Component} from 'react';

import CityCondition from './CityCondition';
import Forecaster    from './Forecaster';
import { fetchConditionData, fetchForecast } from '../api/weather';

// responsible for maintain necessary data (from API response) in the state
// pass them down to child 
export default class WeatherChannel extends Component {
    constructor(props) {
        super(props);
        // use static data to fill initial state first
        this.state = {
            currentCity:"Brisbane",
            condition: {
                // city:  'Brisbane, Au',
                // temp: '12c',
                // weather: 'Clear'
            },
            forecast:  [
                // {weekday: 'Wed', high:23, low:18, icon:'http://icons.wxug.com/i/c/k/clear.gif'},
                // {weekday: 'Thu', high:29, low:18, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                // {weekday: 'Fri', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'}
            ]
        }
    }

    render() {
      return (
        <main>
          {/* <Toolbar /> */}
          <section id="left">
            <CityCondition city={this.state.condition.city}
            temp={this.state.condition.temp}
            weather={this.state.condition.weather} />
          </section>
          <section id="right">
            <Forecaster forecast={this.state.forecast}/>
          </section>
        </main>
      )
    }

    // handleCondition(data){
    //   console.log(data);
    //   const condition ={
    //     city: data.display_location.full,
    //     weather: data.weather,
    //     temp: data.temp_c
    //   }
    //   this.setState({condition});
    // }

    componentDidMount(){
      fetchConditionData(this.state.currentCity,(data)=>{
        const condition ={
          city: data.display_location.full,
          weather: data.weather,
          temp: data.temp_c
        }
        this.setState({condition});
    });
      fetchForecast(this.state.currentCity,(forecast)=>{
        const data = forecast.map(item=>{
          return{
            weekday: item.date.weekday_short,
            high: item.high.celsius,
            low: item.low.celsius,
            icon: item.icon_url
          }
        })
        this.setState({forecast:data});
      });
    }
}