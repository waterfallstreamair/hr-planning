import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import './index.css'
import Table from './Table'

const QUERY_USERS = gql`
  query {
    items {
      planningName
      planningDemand {
        tableName
        planningLevel
        FTE_2019
        FTE_2020
        FTE_2021
        FTE_2022
        FTE_2023
      }
      planningSupply {
        tableName
        planningLevel
        FTE_2019
        FTE_2020
        FTE_2021
        FTE_2022
        FTE_2023
      }
    }
  }
`
const calcDiff = (t1, t2) => {
  return {
    tableName: 'Result',
    planningLevel: 'Revenue',
    FTE_2019: t1.FTE_2019 - t2.FTE_2019,
    FTE_2020: t1.FTE_2020 - t2.FTE_2020,
    FTE_2021: t1.FTE_2021 - t2.FTE_2021,
    FTE_2022: t1.FTE_2022 - t2.FTE_2022,
    FTE_2023: t1.FTE_2023 - t2.FTE_2023,
  }
}

const App = () => {
  const [items, setItems] = useState(null)
  const [planning, setPlanning] = useState(null)
  const planningNames = items ?
    items.map(e => e.planningName) : []
  let item = null
  if (items && planning) {
    item = items.find(e => e.planningName === planning) || null
  }
  if (items && items[0] && !item) {
    item = items[0]
  }
  const planningDemand = item ? item.planningDemand : []
  const planningSupply = item ? item.planningSupply : []
  const [demand, setDemand] = useState('')
  const [supply, setSupply] = useState('')
  const handleDemand = e => {
    setDemand(e.target.value)
  }
  const handleSupply = e => {
    setSupply(e.target.value)
  }
  const handlePlanning = e => {
    setPlanning(e.target.value)
    setDemand('')
    setSupply('')
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>HR Planning</h1>
        <Query query={QUERY_USERS}>
          {props => {
            console.log(props)
            const { data, loading, error, refetch } = props
            if (loading) {
              return <div>Loading</div>
            }
            if (error) {
              return <div>An unexpected error occurred</div>
            }
            if (data && data.items) {
              setItems(data.items)
            }
            if (!items) {
              return <div>Loading</div>
            }
            return (
              <div>
                  <select onClick={handlePlanning}>
                    {planningNames.map(e => 
                      <option value={e} key={e}>{e}</option>
                    )}
                  </select>
                  <div>
                    <select onChange={handleDemand} value={demand}>
                      <option value="" key="not-selected">Not selected</option>
                      {planningDemand.map((e, i) => 
                        <option value={i} key={i}>{e.tableName}</option>
                      )}
                    </select>
                    <select onChange={handleSupply} value={supply}>
                      <option value="" key="not-selected">Not selected</option>
                      {planningSupply.map((e, i) => 
                        <option value={i} key={i}>{e.tableName}</option>
                      )}
                    </select>
                  </div>
                {!demand && !supply && 
                  <p>Please select table</p>
                }
                {demand && !supply && 
                  <Table cells={planningDemand[demand]} />}
                {supply && !demand && 
                  <Table cells={planningSupply[supply]} />}
                {demand && supply &&
                  <div>
                    <h3>Diff table</h3>
                    <Table 
                      cells={calcDiff(
                        planningDemand[demand],
                        planningSupply[supply]
                      )} />
                  </div>}
              </div>
            )
          }}
        </Query>
      </div>
    </div>
  )
}

export default App