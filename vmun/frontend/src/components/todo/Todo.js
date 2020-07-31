import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col, Card, Space, message } from "antd";
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

async function postData(url = '', data = {}) {
  let csrftoken = getCookie('csrftoken');

  const formData = new FormData();
  formData.append('method', data.method);
  formData.append('title', data.title);
  formData.append('memo', data.memo);
  formData.append('idx', data.idx);

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
  postDeleteData(('/task/' + kid + '/'), { method: 'delete', keyid: kid})
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
      tasks: []
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMemoChange = this.handleMemoChange.bind(this);
  }

  formRef = React.createRef();

  componentDidMount() {
    fetch("/task/api/task/")
      .then(response => {
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
    postData(('/task/' + kid + '/'), {
      title: this.state.title, memo: this.state.memo,
      method: 'update', idx: idx
    })
    .then(task => {
      if (task.success) {message.success('Todo item updated!');}
      
    });
  }

  render() {
    return (
      <Space direction="vertical" size={20}
        style={{ paddingTop: 20, display: "block", marginLeft: "auto",
          marginRight: "auto", maxWidth: 500 }}>
        {this.state.tasks.map((task, index) => {
          return (
            <Card title={"Todo #" + (index+1)} key={ task.key } size="small" extra={ task.date }>
              <Form {...layout} style={{ marginLeft: -10, marginRight: 10 }}
                onFinish={(event) => this.handleSubmit(event, task.key)}>
                <p>{ task.title }</p>
                <Form.Item label="Title" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="title" onChange={(event) => this.handleTitleChange(event, task)} 
                    rules={[{ required: true, message: "Title cannot be empty" }]}
                    initialValue={ task.title }>
                    <Input placeholder="Title" />
                  </Form.Item>
                </Form.Item>
                <p>{ task.memo }</p>
                <Form.Item label="Memo" style={{ marginBottom: 0}}>
                  <Form.Item
                    name="memo" onChange={this.handleMemoChange} 
                    rules={[{ required: true, message: "Memo cannot be empty" }]}
                    initialValue={ task.memo }>
                    <Input.TextArea placeholder="Memo" />
                  </Form.Item>
                </Form.Item>
                <Row justify="end" align="top" style={{ marginBottom: -21 }} gutter={[8, 0]}>
                  <Col style={{ marginTop: -9 }}>
                    <Button danger onClick={() => confirm(task.key)}>Delete</Button>
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