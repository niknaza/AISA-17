import { Card, Col, Row } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard Overview</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Conversations</Card.Title>
              <Card.Text>1,234 (Today)</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Active Channels</Card.Title>
              <Card.Text>WhatsApp, Instagram, TikTok</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>AI Performance Metrics</Card.Title>
              <Card.Text>Response Time: 0.5s, Accuracy: 95%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Revenue Dashboard</Card.Title>
              <Card.Text>Chart Placeholder</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Active Users / Agents Online</Card.Title>
              <Card.Text>Figure Placeholder</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Alerts & Notifications</Card.Title>
              <Card.Text>No new alerts.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;