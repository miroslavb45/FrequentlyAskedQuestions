import React, { Component } from 'react'

class Answer extends Component {
    render() {
        return (
            <div>
                <p>{this.props.content}</p>
                <p>{this.props.author}</p>
                <p>{this.props.id}</p>
                <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
            </div>
        )
    }

}

export default Answer
