import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments.js';
import SearchAppointments from './SearchAppointments.js';
import ListAppointments from './ListAppointments.js';

import {without} from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state =  {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0
    };
    this.deletAppointment = this.deletAppointment.bind(this);
  }

  deletAppointment (apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    })
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 })
          return item;
        })
        this.setState({
          myAppointments: apts
        });
      });
  }

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments 
                  formDisplay = {this.state.formDisplay}
                />
                <SearchAppointments />
                <ListAppointments 
                  appointments={this.state.myAppointments} 
                  deletAppointment={this.deletAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
