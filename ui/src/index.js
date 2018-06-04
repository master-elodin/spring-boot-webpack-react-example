import React from 'react';
import ReactDOM from 'react-dom';

require('./styles/styles.scss');

var jQuery = require("jquery-ajax");


class ServerPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: "nothing"};
        jQuery.ajax({
            url: './greeting',
            method: 'GET'
        }).then((data) => {
            this.setState({data: data});
        });
    }
    render() {
        return(
            <h2 class='server-message'>{this.state.data}</h2>
        );
    }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <h2 class='initial-message'>I've received the following message from the server:</h2><br/>
        < ServerPart />
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));