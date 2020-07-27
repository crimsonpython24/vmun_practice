import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col, Card, Dropdown, Space, Menu } from "antd";
import jQuery from "jquery";

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}

async function postDeleteData(url = '', data = {}) {
  let csrftoken = getCookie('csrftoken');

  const formData = new FormData();
  formData.append('method', data.method);
  formData.append('keyid', data.keyid);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'same-origin',
    headers: {'X-CSRFToken': csrftoken,},
    body: formData
  });
  return response.json();
}

const confirm = (kid) => {
  console.log(kid);
  postDeleteData('/task/', { method: 'delete', keyid: kid})
    .then(data => {
      if (data.success) {window.location = '/task/';}
    })
};

const menu = (key) => (
  <Button danger onClick={() => confirm({ key })}>Danger Default</Button>
);

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], title: "", memo: "",
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMemoChange = this.handleMemoChange.bind(this);
  }

  formRef = React.createRef();

  componentDidMount() {
    fetch("/task/api/task/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(tasks => {
        this.setState(() => {return {tasks};});
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
      if (tasks.success) {window.location = ('/');}
    });
  }

  render() {
    console.log(">>>", this.state.tasks);
    return (
      <Space direction="vertical" size={20}
        style={{ paddingTop: 20, display: "block", marginLeft: "auto",
          marginRight: "auto", maxWidth: 500 }}>
        {this.state.tasks.map((contact, index) => {
          return (
            <Card title={"Todo #" + (index+1)} key={ contact.key } size="small" extra={ contact.date }>
              <Form {...layout} style={{ marginLeft: -10, marginRight: 10 }}>
                <Form.Item label="Title" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="title" onChange={this.handleTitleChange} 
                    rules={[{ required: true, message: "Title cannot be empty" }]}
                    initialValue={ this.state.tasks[index]['title'] }>
                    <Input placeholder="Title" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Memo" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="memo" onChange={this.handleMemoChange} 
                    rules={[{ required: true, message: "Memo cannot be empty" }]}
                    initialValue={ this.state.tasks[index]['memo'] }>
                    <Input.TextArea placeholder="Memo" />
                  </Form.Item>
                </Form.Item>
                <Row justify="end" align="top" style={{ marginBottom: -21 }} gutter={[8, 0]}>
                  <Col style={{ marginTop: -9 }}>
                    <Button danger onClick={() => confirm(contact.key)}>Delete</Button>
                  </Col>
                  <Col>
                    <Form.Item style={{ marginTop: -9 }}>
                      <Button htmlType="submit" type="primary">Submit</Button>
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