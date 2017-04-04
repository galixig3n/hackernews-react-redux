import React from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { openComments } from '../Actions/Actions';

class StoryCard extends React.Component{
  handleOpen = () => {
    this.props.openComments(this.props.kids);
  }
  render(){
    let time = convertTimestamp(this.props.time);
    return(
      <Card className='storycard'>
        <CardHeader
          className='title'
          title={this.props.title}
          subtitle={`${this.props.by} / ${time}`}
        />
        <CardActions>
          <FlatButton label="Go To URL" href={this.props.url}/>
          {this.props.kids ?
            <FlatButton label="Show Comments" onClick={this.handleOpen}/> :
            <FlatButton disabled label='No Comments'/>}
        </CardActions>

      </Card>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    openComments: (id) => dispatch(openComments(id))
  }
}

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}

export default connect(null, mapDispatchToProps)(StoryCard)