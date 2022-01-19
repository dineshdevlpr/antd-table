import React , { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {  Table } from 'antd';


export default function TableData() {
    const [apiData, setApiData]= useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect( () => {
        fetchData();
    }, [page,pageSize])

    const fetchData = () => {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`)
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
            pageSize : pageSize,
            total : totalPages,
            onChange:(page,pageSize)=>{
                setPage(page)
                setPageSize(pageSize)
            }
        }}
      />
  </div>);
}

