import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Tag, Row, Col, Typography } from "antd";

const { Title, Link } = Typography;

const CardTitle = () => {
  return (
    <Link href=''><Title level={4} style={{ margin: 0 }}>Assignments</Title></Link>
  )
}

export default function Navbar() {
  return (
    <div className="site-page-header-ghost-wrapper">
      <Row>
        <Col xs={0} sm={24} md={24} lg={24} xl={24}>
          <PageHeader
            title={<CardTitle/>}
            ghost={false}
            className="site-page-header"
            subTitle="() => dump homework here"
            tags={<Tag color="red">Testing</Tag>}
            style={{ border: "1px solid rgb(235, 237, 240)" }}
          />
        </Col>
        <Col xs={24} sm={0} md={0} lg={0} xl={0}>
          <PageHeader
            title={<CardTitle/>}
            ghost={false}
            className="site-page-header"
          />
        </Col>
      </Row>
    </div>
  );
}