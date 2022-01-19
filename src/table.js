import React , { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {  Table } from 'antd';


export default function TableData() {
    const [apiData, setApiData]= useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect( () => {
        fetchData(1);
    }, [])

    const fetchData = (page) => {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
        .then(res=>{
            res.json().then((response=>{
                setApiData(response.data)
                setTotalPages(response.totalPages)
            }))
        })
    }

    const columns = [
        {
          title: 'ID',
          dataIndex: '_id'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          width: '25%',
        },
        {
          title: 'Trips',
          dataIndex: 'trips',
          width: '25%',
        },
      ];

  return (<div>
      <Table
        columns={columns}
        dataSource={apiData}
        pagination={{
            pageSize : 10,
            total : totalPages,
            onChange: (page)=>{
                fetchData(page)
            }
        }}
      />
  </div>);
}

