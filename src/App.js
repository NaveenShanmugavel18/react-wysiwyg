import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  
  state = { editorState: EditorState.createEmpty()  }
  
  onChange = (editorState) => this.setState({editorState});
  
  handleSubmit = (e) => {
  	e.preventDefault();
  	var convertedData = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  	var theDiv = document.getElementById("appended-html-content");
		var content = document.createTextNode(convertedData);
		theDiv.appendChild(content);
  	this.setState({editorState: EditorState.createEmpty()})
  }
  
  render() {
    return (
      <div className="App">
        <Editor 
					editorState={this.state.editorState} 
					wrapperClassName="demo-wrapper" 
					editorClassName="editer-content"
					onEditorStateChange={this.onChange}
				/>
				<div id="comment-button-div">
        	<Button onClick={this.handleSubmit} id="comment-submit-button" color="teal">Submit</Button>
      	</div>
      	<div id="appended-html-content">
      	</div>
      </div>
      
    );
  }
}

export default App;
