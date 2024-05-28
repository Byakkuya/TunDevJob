import React, { useState } from 'react';
import { Avatar, Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import {
  WarningOutlined,
  UserOutlined,
  MessageOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Button } from 'antd';
import { deleteImageFromSupabase, deleteResumeFromSupabase } from '../lib/supabase';
import { Modal } from 'antd';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import { BarChart,LineChart, ComposedChart,Line,Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const {  Content, Sider } = Layout;

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
  createdAt : string;
  companyId : number;
  reason : string;
  message : string;
  company : string;
  testimonialId : number;
  rating : number;
  text : string;
  developerId : number;


}
const DeleteUser = (id : any) => {
  console.log('handleDelete is called with id:', id);
  const namePDF = id + '.pdf';
const nameJPG = id + '.jpg';
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
        await axiosInstance.delete(`/users/${id}`);
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
        await axiosInstance.delete(`/users/${id}`);
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
const DeleteReport = (id : any) => {
   
  Modal.confirm({
    title: 'Are you sure you want to delete this report?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await axiosInstance.delete(`/reports/${id}`);
        ;
        message.success({
          content: 'Report has been deleted successfully',
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
const DeleteTestimonial = (id : any) => {
   
  Modal.confirm({
    title: 'Are you sure you want to delete this testimonial?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await axiosInstance.delete(`/testimonials/${id}`);
        ;
        message.success({
          content: 'Testimonial has been deleted successfully',
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
}
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

//@ts-ignore
const TestimonialColumn = ({ testimonialId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testimonialData, setTestimonialData] = useState(null);

  const { data: testimonial, isLoading } = useQuery({
    queryKey: ["testimonial",testimonialId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/testimonials/row/${testimonialId}`);
      return response.data;
    },
  });
  
  const { data: dev, isLoading: load1 } = useQuery({
    queryKey: ["dev"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/developers/${testimonial?.developerId}`);
      return response.data;
    },
  });
  function showModal() {
    
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <a onClick={showModal}>click to see</a>
      <Modal title="Testimonial" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
       {isLoading ? <p>Loading...</p> : (
         <>
         
          <ReviewCard id={testimonialId} developerName={dev?.name} photo={dev?.profilePicture}  rating={testimonial?.rating} comment={testimonial?.text} userId={testimonial.userId} companyId={testimonial?.companyId} />
    
          </>
        )}

      </Modal>
    </>
  );
};
//@ts-ignore
const CompanyColumn = ({ companyId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testimonialData, setTestimonialData] = useState(null);

  const { data: comp, isLoading } = useQuery({
    queryKey: ["comp", companyId], // Use companyId as part of the queryKey
    queryFn: async () => {
      const response = await axiosInstance.get(`/companies/${companyId}`);
      return response.data;
    },
  });
  console.log(comp)
  function showModal() {
    
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <a onClick={showModal}>click to see</a>
      <Modal title="Company" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
       {isLoading ? <Loading/> : (
         <>
        
        <div className="flex flex-col px-6 py-4">
          <div className="flex flex-wrap items-center mb-4">
            <Avatar size={64} src={comp?.logo} />
            <div className="font-bold text-xl ml-4">{comp?.name}</div>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-base">{comp?.description}</p>
          </div>
          <div>
            <p className="text-gray-700 text-base">{comp?.fullAddress}</p>
            <p className="text-gray-700 text-base">{comp?.number}</p>
            <div className='flex flex-col '>
            <a href={comp?.linkedin} className="text-blue-500 hover:text-blue-700">LinkedIn</a>
            <a href={comp?.website} className="text-blue-500 hover:text-blue-700">Website</a>
            </div>
          </div>
        </div>
       </>
        )}

      </Modal>
    </>
  );
};
const reports: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <a>{id}</a>,
  },
  {
    title: 'Company',
    dataIndex: 'companyId',
    render: (companyId) => {
      return <CompanyColumn companyId={companyId} />;
    }
  },
 {
  title: 'Testimonial',
  dataIndex: 'testimonialId',
  render: (testimonialId, record) => <TestimonialColumn testimonialId={testimonialId} />,
 
 },
{
title: 'reason',
dataIndex: 'reason',
render: (reason) => <a>{reason}</a>,

},
{
  title:'created at',
  dataIndex: 'createdAt',
  render: (createdAt) => <a>{createdAt}</a>,
},
  
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        
      <Button type="primary" danger onClick={() => DeleteReport(record.id)}>delete report</Button>  
      <Button type="primary" danger onClick={() => DeleteTestimonial(record.testimonialId)}>Delete testimonial</Button>

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
//@ts-ignore
const developersn = users ? users.filter(user => user.role === 'DEVELOPER') : [];
const numberOfDevelopers = developersn.length;

//@ts-ignore
const compn = users ? users.filter(user => user.role === 'COMPANY') : [];
const numberOfCompanies = compn.length;


const chartData = [
  { name: 'Developers', value: numberOfDevelopers },
  { name: 'Companies', value: numberOfCompanies },
];

const {data: developers, isLoading : isloading1,} = useQuery({
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
      return response.data.sort((a: any, b: any) => a.property - b.property);
      
  }

  
});

const {data: reportss, isLoading : isloading4, } = useQuery({
  queryKey: ["reports"],
  queryFn: async () => {
      const response = await axiosInstance.get("/reports");
      return response.data.sort((a: any, b: any) => a.property - b.property); 
      
  }
  
});
console.log(reportss)


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
    case '6':
      return reportss;
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
    case '6':
      return reports; 
    default:
      return [];
  }
}

const COLORS = ['#00C49F', '#0088FE', '#0088FE', '#FF8042']; // Add more colors if you have more data points

// Function to get the last 7 days
const getLast7Days = () => {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().split('T')[0]); // Get the date part of the ISO string
  }
  return result;
};

// Get the last 7 days
const last7Days = getLast7Days();

// Filter messages to only include messages from the last 7 days
//@ts-ignore
let recentMessages = [];
if (!isloading3 && messagess) {
  // Filter messages to only include messages from the last 7 days
  //@ts-ignore
  recentMessages = messagess.filter(message => last7Days.includes(new Date(message.createdAt).toISOString().split('T')[0]));
}
// Group messages by date and count the number of messages for each date
//@ts-ignore
let groupedMessages = {};
if (recentMessages.length > 0) {
  //@ts-ignore
  groupedMessages = recentMessages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toISOString().split('T')[0]; // Get the date part of the createdAt string
    acc[date] = (acc[date] || 0) + 1; // Increment the count for this date
    return acc;
  }, {});
}

// Transform the groupedMessages object into an array of objects
//@ts-ignore
let messagesData: { name: string; messages: number }[] = [];
if (Object.keys(groupedMessages).length > 0) {
  messagesData = Object.entries(groupedMessages).map(([date, count]) => ({
    name: date,
    messages: count as number,
  }));
}
const maxTick = Math.max(...messagesData.map(item => item.messages));
const ticks = Array.from({length: Math.floor(maxTick / 5) + 1}, (_, i) => i * 5);



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
          {['1','3', '4'].includes(selectedKey) && (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          dataKey="value"
          data={chartData}
          fill="#8884d8"
          label={(entry) => entry.name}
        >
          {
            chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>


)}
{selectedKey === '5' && (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      {
        (() => {
          const sortedMessagesData = [...messagesData].sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());          const maxTick = Math.max(...sortedMessagesData.map(item => item.messages));
          const ticks = Array.from({length: Math.floor(maxTick / 5) + 1}, (_, i) => i * 5);
          return (
            <ComposedChart data={sortedMessagesData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="auto" />
              <YAxis tickFormatter={(tick) => tick.toString()} ticks={ticks} />
              <Tooltip />
              <Legend />
              <Bar dataKey="messages" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="messages" stroke="#ff7300" />
            </ComposedChart>
          );
        })()
      }
    </ResponsiveContainer>
  </div>
)}



{selectedKey === '6' && (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      {
        (() => {
          const sortedReportsData = [...reportss].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          const reportsByDate = sortedReportsData.reduce((acc: {[key: string]: number}, report: {createdAt: string}) => {
            const date = new Date(report.createdAt).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = 1;
            } else {
              acc[date]++;
            }
            return acc;
          }, {});

          const data = Object.entries(reportsByDate).map(([date, count]) => ({ date, count: Number(count) }));
          const maxTick = Math.max(...data.map((item: {date: string, count: number}) => item.count));
          const ticks = Array.from({length: Math.floor(maxTick / 5) + 1}, (_, i) => i * 5);

          return (
            <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(tick) => tick.toString()} ticks={ticks} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
            </ComposedChart>
          );
        })()
      }
    </ResponsiveContainer>
  </div>
)}
        </Content>
       
      </Layout>
    </Layout>
    </div>
  )
}

export default Admin