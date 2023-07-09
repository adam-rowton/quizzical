import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




// https://www.npmjs.com/package/html-entities#user-content-decodetext-options
// https://www.npmjs.com/package/he#hedecodehtml-options
// https://opentdb.com/api_config.php
// https://www.figma.com/file/VXFKYqxpr35bTdN5RfSyEo/Quizzical-App-(Copy)?type=design&node-id=0-1&mode=design&t=4v89XDjlS3Hss4Ck-0


// https://www.youtube.com/watch?v=Rh3tobg7hEo&t=367s
// https://www.youtube.com/watch?v=SWYqp7iY_Tc

//changes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
