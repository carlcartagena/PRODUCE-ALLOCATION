import React from 'react'
import './css/style.css'
import ProduceAllocation from './components/produceAllocation.component'

class App extends React.PureComponent {

  render() {
    return (
      <div
        className="topDiv"
      >
        <div
          className="centerDiv"
        >
          <ProduceAllocation />
        </div>
      </div>
    )
  }
}

export default App
