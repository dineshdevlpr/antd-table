import React , { useEffect, useState, useContext } from 'react';
import 'antd/dist/antd.css';
import {  Table } from 'antd';
import  ContextFile  from './contextFile';


export default function TableData() {
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] =useState(false)
    const [searchField, setSearchField] = useState("")
    const [filteredEntries, setFilteredEntries] = useState([])

    //from context api
    const { apiData, setApiData } = useContext(ContextFile);

    const handleChange = async (e) =>{
        await setSearchField(e.target.value)
        await handleFilter()
    }


    const handleFilter = async () =>{
      let dataArray = JSON.parse(JSON.stringify(apiData))
      let filteredData = dataArray.filter( elem =>{
        if( elem.name.toLowerCase().includes(searchField.toLowerCase()) ){
              return elem
            }
        return null
      })
      setFilteredEntries(filteredData)
    }


    //making api call with useEffect
    useEffect( () => {
        fetchData();
        return
    }, [page,pageSize])
    

    const fetchData = async () => {
        setLoading(true)
        await fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`)
        .then(res=>{
            res.json().then((response=>{
                setApiData(response.data)
                setTotalPages(response.totalPages)
                setLoading(false)
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
      <input type="text" placeholder='Filter by name' name="search-field" className="search-field" onChange={handleChange} />
      
      {filteredEntries.length !==0
      ?
      <Table
        key={filteredEntries._id}
        columns={columns}
        dataSource={filteredEntries}
        loading={loading}
        pagination={{
            pageSize : pageSize,
            total : totalPages,
            onChange:(page,pageSize)=>{
                setPage(page)
                setPageSize(pageSize)
            }
        }}
      />
      :
      <Table
        key={apiData._id}
        columns={columns}
        dataSource={apiData}
        loading={loading}
        pagination={{
            pageSize : pageSize,
            total : totalPages,
            onChange:(page,pageSize)=>{
                setPage(page)
                setPageSize(pageSize)
            }
        }}
      />
      }
      
  </div>);
}