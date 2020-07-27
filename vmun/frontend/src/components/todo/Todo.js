import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col } from "antd";
import jQuery from "jquery";

const layout = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      title: "",
      memo: "",
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMemoChange = this.handleMemoChange.bind(this);
  }

  formRef = React.createRef();

  componentDidMount() {
    fetch("/api/task/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(tasks => {
        this.setState(() => {
          console.log(tasks);
          return {
            tasks,
            loaded: true
          };
        });
      });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleMemoChange(event) {
    this.setState({ memo: event.target.value });
  }

  handleSubmit = (event, idx) => {
    event => event.preventDefault();
    posttasks('/', {
      title: this.state.title, memo: this.state.memo,
      method: 'update', idx: idx
    })
    .then(tasks => {
      if (tasks.success) {
        window.location = ('/');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.tasks.map(contact => {
          return (
            <div key={contact.key}>
              <Form></Form>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Todo;