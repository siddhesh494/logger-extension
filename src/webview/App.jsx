import React, { useEffect, useState } from 'react';
import Terminal from './Terminal';
import './index.css'
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { filter, map } from 'lodash';
import TableViewers from './TableViewer';
import { extractData } from '../../utilsFn';

const App = () => {
  const [terminalContent, setTerminalContent] = useState(null)
  const [uniqueKeys, setUniqueKeys] = useState([])
  const [columns, setColumns] = useState([])
  const [searchDropdown, setSearchDropdown] = useState([])
  const [tableResult, setTableResult] = useState([])
  const IMPORTANT_COLUMNS = ['apiHash', 'apiName', 'logType', 'functionName','action', 'errorType', 'msg']

  function readLogs(){
    const {keys, keyValues, data} = extractData(terminalContent)
    setSearchDropdown(map(keyValues, k => ({name: k.key, value: '', options: map(k.values, (i) => i.value)})))
    setUniqueKeys(map(keys, k => ({key: k, val: IMPORTANT_COLUMNS.indexOf(k) > -1})))
    setColumns(keys)
    setTableResult(data)
  }

  function clearSearch(){
    const {keyValues, data} = extractData(terminalContent)
    setSearchDropdown(map(keyValues, k => ({name: k.key, value: '', options: map(k.values, (i) => i.value)})))
    setTableResult(data)
  }


  useEffect(() => {
    if(terminalContent) {
      readLogs()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminalContent])

  // set columns
  useEffect(() => {
    setColumns(map(filter(uniqueKeys, (f) => f.val), (i) => i.key))
  }, [uniqueKeys])

  const toggleLookupCriteria = (name) => {
    const temp = map(uniqueKeys, (item) => {
      if(item.key === name) {
        return {
          ...item,
          val: !item.val
        }
      } else {
        return item
      }
    })
    setUniqueKeys(temp)
  }

  const handleSearch = (name, value) => {
    const temp = map(searchDropdown, (item) => {
      if(item.name === name) {
        return {
          ...item,
          value: value
        }
      } else {
        return item
      }
    })
    const data = filter(tableResult, (item) => {
      if(item[name] === value) {
        return true
      } else {
        return false
      }
    })
    setTableResult([...data])
    setSearchDropdown(temp)
  }

    return (
      <div style={{ padding: '10px' }}>
        <h1>Paste the logs</h1>
        <Terminal 
          terminalContent={terminalContent}
          setTerminalContent={setTerminalContent}
        />

        <Button 
          style={{
            "margin": "10px 0px"
          }} 
          variant="contained" 
          size="large"
          onClick={() => {
            terminalContent && readLogs()
          }}
        >
          Compile Log
        </Button>

        {/* filter columns / lookup criteria */}
        {uniqueKeys.length ? <div className='lookup-criteria'>
          <h3>Filter Columns</h3>
          {map(uniqueKeys, (item, id) => {
            return (
              <FormControlLabel
                key={id}
                label={item.key}
                control={
                  <Checkbox
                    checked={!!item.val}
                    value={item.key}
                    inputProps={{
                      'aria-label': 'Checkbox A',
                    }}
                    onChange={(e) => {
                      toggleLookupCriteria(e.target.value)
                    }}
                  />
                }
              />
            )
          })}
        </div> : null}

        {/* search section */}
        {searchDropdown.length ? <div className='search-section'>
          <h3>Search</h3>
          <Button 
            style={{
              "marginBottom": "10px"
            }} 
            variant="contained" 
            onClick={() => {
              clearSearch()
            }}
          >
            Clear Search
          </Button>
          <Grid container spacing={2}>
            {map(searchDropdown, (item, id) => {
              return (
                <Grid item xs={6} md={4} key={id}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{item.name}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.value}
                      label="Age"
                      onChange={(e) => {
                        handleSearch(item.name, e.target.value)
                      }}
                    >
                      {map(item.options, (i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              )
            })}
          </Grid>
        </div>: null}

        <div className='table-section'>
          <TableViewers 
            columns={columns}
            tableResult={tableResult}
          />
        </div>
      </div>
    );
};

export default App;
