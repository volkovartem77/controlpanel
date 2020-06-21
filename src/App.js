import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TabsContent from "./components/tabsContent";


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <runButton />
//       </header>
//     </div>
//   );
// }

class App extends Component{
    render() {
        return (
            <div className="App">
                <Container>
                    <Row className="Top">
                    </Row>
                    <TabsContent />
                </Container>
            </div>
        )
    }
}

export default App;