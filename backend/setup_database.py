import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

db = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)

# Use a dictionary cursor to access rows by column name
cursor = db.cursor(dictionary=True)

# Drop the old tables if they exist to start fresh
cursor.execute('DROP TABLE IF EXISTS menus')
cursor.execute('DROP TABLE IF EXISTS admin_users')

# Create the new menus table with a self-referencing foreign key for parent-child relationships
cursor.execute('''
CREATE TABLE menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255),
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE CASCADE
)
''')

# Create admin_users table
cursor.execute('''
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)
''')

# A nested dictionary to represent the menu structure.
# This makes it easy to manage the hierarchy.
menus_data = {
    'Dashboard Overview': {
        'path': '/dashboard',
    },
    'User Management': {
        'path': '/users',
        'children': {
            'Admin Accounts': '/users/admins',
            'Roles': '/users/roles',
            'Agent / Reseller Account': '/users/agents',
            'Customer Profiles': '/users/customers',
            'Customer Access Control': '/users/customer-access',
        }
    },
    'Chatbot Management': {
        'path': '/chatbots',
        'children': {
            'Create / Edit AI Bots': '/chatbots/edit',
            'Training Data Management': '/chatbots/training-data',
            'Knowledge Base': '/chatbots/knowledge-base',
            'Language Management': '/chatbots/languages',
            'Bot Personality Settings': '/chatbots/personality',
            'Channel Integrations': '/chatbots/channels',
            'Automation & Workflow Rules': {
                'path': '/chatbots/automation',
                'children': {
                    'Trigger-based Actions': '/chatbots/automation/triggers',
                    'Routing Rules': '/chatbots/automation/routing',
                    'Integrations with CRM/ERP systems': '/chatbots/automation/integrations',
                }
            }
        }
    },
    'Conversation Management': {
        'path': '/conversations',
        'children': {
            'Live Chat Dashboard': '/conversations/live-chat',
            'Conversation Logs': '/conversations/logs',
            'AI Suggestions for Agents': '/conversations/ai-suggestions',
            'Tagging & Categorization of chats': '/conversations/tagging',
            'Escalation Management': '/conversations/escalation',
        }
    },
    'Payments & Billing': {
        'path': '/billing',
        'children': {
            'Payment Gateway Settings': '/billing/gateway',
            'Transaction Logs': '/billing/transactions',
            'Subscription Plan Management': '/billing/subscriptions',
            'Quota Management': '/billing/quota',
            'Invoice Generation': '/billing/invoices',
        }
    },
    'Quota & Addon': {
        'path': '/quota',
        'children': {
            'Product list': '/quota/products',
            'Shopping cart': '/quota/cart',
            'Quota & Limits': '/quota/limits',
        }
    },
    'Analytics & Reports': {
        'path': '/analytics',
        'children': {
            'Customer Interaction Reports': '/analytics/customer-interaction',
            'AI Accuracy Reports': '/analytics/ai-accuracy',
            'Channel Performance Analytics': '/analytics/channel-performance',
            'Export Reports': '/analytics/export',
            'Scheduled Reporting Automation': '/analytics/scheduled-reporting',
        }
    },
    'System Settings': {
        'path': '/settings',
        'children': {
            'General Settings': '/settings/general',
            'Notification Settings': '/settings/notifications',
            'Data Privacy & Compliance Settings': '/settings/privacy',
            'Backup & Restore Options': '/settings/backup',
        }
    },
    'Support Tools': {
        'path': '/support',
        'children': {
            'Knowledge Base Access for Admins': '/support/knowledge-base',
            'Troubleshooting Logs': '/support/logs',
            'Support Tickets Management': '/support/tickets',
            'Admin Help Guide / Documentation': '/support/docs',
        }
    }
}

# A recursive function to insert menus and their children
def insert_menus(menu_dict, parent_id=None):
    for name, data in menu_dict.items():
        path = None
        children = None
        if isinstance(data, dict):
            path = data.get('path')
            children = data.get('children')
        else:
            path = data

        # Insert the menu item
        sql = "INSERT INTO menus (name, path, parent_id) VALUES (%s, %s, %s)"
        cursor.execute(sql, (name, path, parent_id))
        new_parent_id = cursor.lastrowid

        # If there are children, insert them recursively
        if children:
            insert_menus(children, new_parent_id)

# Start the insertion from the top-level menus
insert_menus(menus_data)

# Insert sample admin users
admin_users_data = [
    ('admin', 'admin@example.com', 'password123'),
    ('john.doe', 'john.doe@example.com', 'securepass'),
]
sql_admin_users = "INSERT INTO admin_users (username, email, password) VALUES (%s, %s, %s)"
cursor.executemany(sql_admin_users, admin_users_data)

db.commit()

# Use cursor.rowcount to see how many rows were affected in the last execute.
# Since we are doing multiple inserts, we can't get a total count this way.
# We can, however, get a count of all menus inserted.
cursor.execute("SELECT COUNT(*) as count FROM menus")
menu_count = cursor.fetchone()['count']
print(f"{menu_count} menu items inserted.")

cursor.execute("SELECT COUNT(*) as count FROM admin_users")
admin_user_count = cursor.fetchone()['count']
print(f"{admin_user_count} admin users inserted.")

db.close()