import { useEffect, useState } from 'react'
import axios from 'axios'
import LogChart from './components/LogChart'

function App() {
  const [logs, setLogs] = useState([])

  const fetchLogs = (level) => {
    const url = level
      ? `http://localhost:3000/api/logs?level=${level}`
      : "http://localhost:3000/api/logs";
    axios.get(url)
      .then(res => setLogs(res.data))
  }

  useEffect(() => {
    fetchLogs("")
  }, [])



  return (
    <>
      <h1>Logs</h1>

      <select onChange={(e) => fetchLogs(e.target.value)}>
        <option value="">All</option>
        <option value="error">Error</option>
        <option value="info">Info</option>
      </select>

      <LogChart logs={logs} />

      {logs.map(log => (
        <div key={log.id}>
          {log.service} - {log.level} - {log.message}
        </div>
      ))}

    </>
  )
}

export default App
