
import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// The MenuItem interface now includes an optional array of children
interface MenuItem {
  id: number;
  name: string;
  path: string;
  children?: MenuItem[];
}

// A recursive component to render menu items and their children
const SubMenu = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  const toggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Nav.Item>
      {hasChildren ? (
        <Nav.Link onClick={toggle} style={{ cursor: 'pointer' }}>
          {item.name}
          {hasChildren && (isOpen ? '  -' : '  +')}
        </Nav.Link>
      ) : (
        <Nav.Link as={Link} to={item.path}>
          {item.name}
        </Nav.Link>
      )}
      {hasChildren && isOpen && (
        <Nav className="flex-column" style={{ paddingLeft: '20px' }}>
          {item.children!.map(child => (
            <SubMenu key={child.id} item={child} />
          ))}
        </Nav>
      )}
    </Nav.Item>
  );
};

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Fetch the hierarchical menu data from the backend
    fetch('http://localhost:8000/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link as={Link} to="/">AISA</Nav.Link>
      </Nav.Item>
      {/* Map over the root menu items and render them using the SubMenu component */}
      {menuItems.map(item => (
        <SubMenu key={item.id} item={item} />
      ))}
    </Nav>
  );
};

export default Sidebar;
