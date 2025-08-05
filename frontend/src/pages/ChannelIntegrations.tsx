
import { Table } from 'react-bootstrap';

const ChannelIntegrations = () => {
  const channels = [
    { name: 'Web Chat', status: 'Connected' },
    { name: 'WhatsApp Business API', status: 'Disconnected' },
    { name: 'Instagram', status: 'Connected' },
    { name: 'TikTok', status: 'Connected' },
    { name: 'Facebook', status: 'Disconnected' },
    { name: 'API Connector', status: 'Connected' },
  ];

  return (
    <div>
      <h1>Channel Integrations</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {channels.map(channel => (
            <tr key={channel.name}>
              <td>{channel.name}</td>
              <td>{channel.status}</td>
              <td>
                <button>Configure</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ChannelIntegrations;
