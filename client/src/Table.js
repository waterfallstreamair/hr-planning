import React from 'react'
import './index.css'

const Table = ({ cells }) => {
    if (!cells) {
        return <div>No data</div>
    }
    return <table>
            <tbody>
                <tr>
                    <td>Table Name</td>
                    <td>Planning Level</td>
                    <td>FTE_2019</td>
                    <td>FTE_2020</td>
                    <td>FTE_2021</td>
                    <td>FTE_2022</td>
                    <td>FTE_2023</td>
                </tr>
                <tr>
                    <td>{cells.tableName}</td>
                    <td>{cells.planningLevel}</td>
                    <td>{cells.FTE_2019}</td>
                    <td>{cells.FTE_2020}</td>
                    <td>{cells.FTE_2021}</td>
                    <td>{cells.FTE_2022}</td>
                    <td>{cells.FTE_2023}</td>
                </tr>
            </tbody>
        </table>
}

export default Table;