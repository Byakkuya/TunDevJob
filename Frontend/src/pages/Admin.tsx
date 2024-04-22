import React, { useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import {
  DesktopOutlined,
  WarningOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Button } from 'antd';
import { deleteImageFromSupabase, deleteResumeFromSupabase } from '../lib/supabase';
import { Modal } from 'antd';


const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  
  getItem('Users', 'sub1', <UserOutlined />, [
    getItem('All', '1'),
    getItem('Developers', '3'),
    getItem('Companies', '4'),
    
  ]),
  getItem('Messages', '5', <MessageOutlined />),
  getItem('Reports', '6', <WarningOutlined />),
];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  email: string;
  role: string;
  id : number;
  userId: number;
  city: string;
  fullAddress : string;
  currentPosition : string;

}
const DeleteUser = (id : any) => {
  console.log('handleDelete is called with id:', id);
  const namePDF = id + '.pdf';
const nameJPG = id + '.jpg';
console.log('Before Modal.confirm');
  Modal.confirm({
    title: 'Are you sure you want to delete this account?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await axiosInstance.delete(`/users/${id}`);
        deleteImageFromSupabase(nameJPG);
        deleteResumeFromSupabase(namePDF);
        message.success({
          content: 'Your account has been deleted successfully',
          duration: 6,
          style: {
            marginTop: '10vh',
          },
        });
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      } catch (error) {
        message.error({
          content: 'Something went wrong please try again',
          duration: 3,
          style: {
            marginTop: '10vh',
          },
        });
      }
    },
  });
};
const DeleteDeveloper = (id : any) => {
  const namePDF = id + '.pdf';
  const nameJPG = id + '.jpg';
console.log('Before Modal.confirm');
  Modal.confirm({
    title: 'Are you sure you want to delete this account?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await axiosInstance.delete(`/users/developer/${id}`);
        deleteImageFromSupabase(nameJPG);
        deleteResumeFromSupabase(namePDF);
        message.success({
          content: 'developer deleted  successfully',
          duration: 6,
          style: {
            marginTop: '10vh',
          },
        });
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      } catch (error) {
        message.error({
          content: 'Something went wrong please try again',
          duration: 3,
          style: {
            marginTop: '10vh',
          },
        });
      }
    },
  });
};
const DeleteCompany = (id : any) => {
  const namePDF = id + '.pdf';
  const nameJPG = id + '.jpg';
console.log('Before Modal.confirm');
  Modal.confirm({
    title: 'Are you sure you want to delete this account?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await axiosInstance.delete(`/users/company/${id}`);
        deleteImageFromSupabase(nameJPG);
        
        message.success({
          content: 'Company deleted  successfully',
          duration: 6,
          style: {
            marginTop: '10vh',
          },
        });
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      } catch (error) {
        message.error({
          content: 'Something went wrong please try again',
          duration: 3,
          style: {
            marginTop: '10vh',
          },
        });
      }
    },
  });
};
const DeleteMessage = (id : any) => {
 
  Modal.confirm({
    title: 'Are you sure you want to delete this meesage?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await axiosInstance.delete(`/messages/${id}`);
        ;
        message.success({
          content: 'Message has been deleted successfully',
          duration: 6,
          style: {
            marginTop: '10vh',
          },
        });
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      } catch (error) {
        message.error({
          content: 'Something went wrong please try again',
          duration: 3,
          style: {
            marginTop: '10vh',
          },
        });
      }
    },
  });
};
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <a>{id}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text: string) => {
        let color;
        switch(text) {
            case 'COMPANY':
                color = 'blue';
                break;
            case 'DEVELOPER':
                color = 'green';
                break;
            case 'ADMIN':
                color = 'red';
                break;
            default:
                color = 'black';
        }
        return <Tag color={color} key={text}>{text.toUpperCase()}</Tag>;
    },
},
  
  
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
     
        
        <Button type="primary" danger onClick={() => DeleteUser(record.id)}>Delete</Button>
              
    ),
  },
];
const columns1: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <a>{id}</a>,
  },
  {
    title : 'UserID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
{
  title: 'City',
  dataIndex: 'city',
  key: 'city',
},
{
  title: 'Full Address',
  dataIndex: 'fullAddress',
  key: 'fullAddress',
}

  ,
  {
    title: 'Current Position',
    dataIndex: 'currentPosition',
    key: 'currentPosition',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" danger onClick={() => DeleteDeveloper(record.userId)}>Delete</Button>

      </Space>
    ),
  },
];
const columns2: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <a>{id}</a>,
  },
  {
    title : 'UserID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
{
  title: 'City',
  dataIndex: 'city',
  key: 'city',
},
{
  title: 'Full Address',
  dataIndex: 'fullAddress',
  key: 'fullAddress',
}

  ,
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" danger onClick={() => DeleteCompany(record.userId)}>Delete</Button>

      </Space>
    ),
  },
];
const reports: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <a>{id}</a>,
  },

  
  
  
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        
        <Button type="primary" danger>Delete</Button>
      </Space>
    ),
  },
];
const messages: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <a>{id}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        
        <Button type="primary" danger onClick={() => DeleteMessage(record.id)}>Delete</Button>
      </Space>
    ),
  },
];
function Admin() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const admins ="";

const {data: users, isLoading} = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
      const response = await axiosInstance.get("/users");
      //@ts-ignore
      return response.data.filter(user => user.role !== 'ADMIN');
  },
});




const {data: developers, isLoading : isloading1,refetch} = useQuery({
  queryKey: ["developers"],
  queryFn: async () => {
      const response = await axiosInstance.get("/developers");
      return response.data  ;
      
  },
  
  
});

const {data: companies, isLoading : isloading2} = useQuery({
  queryKey: ["companies"],
  queryFn: async () => {
      const response = await axiosInstance.get("/companies");
      return response.data  ;
      
  },
  
  
});
const {data: messagess, isLoading : isloading3, } = useQuery({
  queryKey: ["messages"],
  queryFn: async () => {
      const response = await axiosInstance.get("/messages");
      return response.data  ;
      
  }
  
});

const [selectedKey, setSelectedKey] = useState('1');

const getDataSource = (key: any) => {
  // Return the data source based on the key.
  // This is just a placeholder. Replace it with your actual logic.
  switch (key) {
    case '1':
      return users;
    case '2':
      return admins;
    case '3':
      return developers;
    case '4':
      return companies;
    case '5':
      return messagess;
    default:
      return [];
  }
};
function getColumns(key: any) {
  switch (key) {
    case '1':
    case '2':
      return columns;
    case '3':
      return columns1;
    case '4':
      return columns2;
    case '5':
      return messages;  
    default:
      return [];
  }
}


  return (
    <div className='mt-20'>
       <Layout   style={{ minHeight: '100vh' }}>
      <Sider  theme='light'>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onSelect={({ key }) => setSelectedKey(key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Table columns={getColumns(selectedKey)} dataSource={getDataSource(selectedKey)} loading={isLoading} />

        </Content>
       
      </Layout>
    </Layout>
    </div>
  )
}

export default Admin