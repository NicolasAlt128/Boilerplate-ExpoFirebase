import React, { Component } from 'react';
import FormulaireCeremonie from './formulaireCeremonie.js';

class ObsequesSecondScreen extends Component {
  constructor(props){
    super(props);
    console.log("PROPS BORDEL MES COUILLES", props.route.params)
  }

  render() {
    return <FormulaireCeremonie props={this.props.route.params}/> ;
   }
}

export default ObsequesSecondScreen;
