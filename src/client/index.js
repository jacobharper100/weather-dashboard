import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [pingResponse, setPingResponse] = useState("");

  const pingBackend = () => {
    fetch("/api/ping", {
      method: "GET",
    })
      .then((response) =>
        response.text().then(function (text) {
          setPingResponse(text);
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={pingBackend}>Ping Backend</button>
        { pingResponse && <p>Backend Responded with &quot;{pingResponse}&quot;</p>}
      </header>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));