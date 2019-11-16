import React, { Component } from 'react';

class Dates extends Component {
    render() {
        return (
            <div>
                   <input  type="date" onChange={this.props.handleDateInput} />
            </div>
        );
    }
}

export default Dates;