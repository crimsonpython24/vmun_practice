import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col, Card, Dropdown, Space, Menu } from "antd";
import jQuery from "jquery";

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const menu = (
  <Menu>
    <Menu.Item key="1">Delete task</Menu.Item>
    <Menu.Item key="2">Reset values</Menu.Item>
  </Menu>
);

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
          return {
            tasks
          };
        });
        console.log(this.state.tasks);
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
      <Space direction="vertical" size={20}
        style={{ paddingTop: 20, display: "block", marginLeft: "auto",
          marginRight: "auto", maxWidth: 500 }}>
        {this.state.tasks.map(contact => {
          return (
            <Card title={"Todo #" + contact.key} key={ contact.key } size="small" extra={ contact.date }>
              <Form {...layout} style={{ marginLeft: -10, marginRight: 10 }}>
                <Form.Item label="Title" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="title" onChange={this.handleTitleChange} 
                    rules={[{ required: true, message: "Title cannot be empty" }]}
                    initialValue={ contact.title }>
                    <Input placeholder="Title" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Memo" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="memo" onChange={this.handleMemoChange} 
                    rules={[{ required: true, message: "Memo cannot be empty" }]}
                    initialValue={ contact.memo }>
                    <Input.TextArea placeholder="Memo" />
                  </Form.Item>
                </Form.Item>
                <Row justify="end" align="top" style={{ marginBottom: -21 }}>
                  <Col>
                    <Form.Item style={{ marginTop: -9 }}>
                      <Dropdown.Button htmlType="submit" overlay={menu} trigger={['click']}>
                        Submit
                      </Dropdown.Button>
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