import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col, Card, Divider, Space } from "antd";
import jQuery from "jquery";

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

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
      <Space direction="vertical" size={20} style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: 500 }}>
        {this.state.tasks.map(contact => {
          return (
            <Card key={contact.key}>
              <Form {...layout} style={{ marginLeft: -10, marginRight: 10 }}>
                <Form.Item label="Title" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="title" onChange={this.handleTitleChange} 
                    rules={[{ required: true, message: "Title cannot be empty" }]}>
                    <Input placeholder="Title" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Memo" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="memo" onChange={this.handleMemoChange} 
                    rules={[{ required: true, message: "Memo cannot be empty" }]}>
                    <Input.TextArea placeholder="Memo" />
                  </Form.Item>
                </Form.Item>
                <Divider style={{ marginTop: 0 }}/>
                <Row justify="end" align="top" style={{ marginBottom: -21 }}>
                  <Col>
                    <Form.Item style={{ marginTop: -14 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          );
        })}
      </Space>
    );
  }
}

export default Todo;