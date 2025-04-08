import React from 'react';

class ReactAppView extends React.Component {
    constructor(props){
        super(props);
        this.state = {yourName: ''};
    }
    handleChange(event){
        this.setState({yourName: event.target.value});
    }
    render(){
        // return React.createElement('div', null, 'Hello ReactJS! from a component');
        // let label = React.createElement('label', null, 'Нэр: ');
        // let input = React.createElement('input', 
        //     {type: 'text', 
        //     value: this.state.yourName,
        //     onChange: (event)=>this.handleChange(event)});
        // let h1 = React.createElement('h1', null, 'Сайн уу, ' + this.state.yourName + '!');
        // return React.createElement('div', null, label, input, h1);
        return (
            <div>
                <label>Нэр: </label>
                <input type="text" 
                    value={this.state.yourName} 
                    onChange={(event)=>this.handleChange(event)} />
                <h1>Сайн уу, {this.state.yourName}!</h1>
            </div>
        );
    }
}
export default ReactAppView;