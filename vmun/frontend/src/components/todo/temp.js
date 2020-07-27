<Form
          {...layout} ref={this.formRef} name="control-ref" preserve={false}
          onFinish={() => this.handleSubmit(task.id)}
        >
          <Form.Item
            label="Title" style={{ marginBottom: 0}}
          >
            <Form.Item
              name="title" onChange={this.handleTitleChange}
              rules={[{ required: true, message: "Title cannot be empty" }]}>
              <Input placeholder="Title" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="memo" label="memoription"
            onChange={this.handlememoChange}
          > 
            <Input.TextArea placeholder="memoription" />
          </Form.Item>
          <Row justify="end" align="top">
            <Col>
              <Form.Item style={{ marginTop: -14 }}>
                <Button
                  type="primary" htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>