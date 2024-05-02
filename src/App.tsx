import "./App.css";
import Bookmarks from "./Components/Bookmarks/Bookmarks";
// import Greeting from "./Components/Greeting/Greeting";
import Time from "./Components/Time/Time";
import Todo from "./Components/Todo/Todo";
import Weather from "./Components/Weather/Weather";
import Crypto from "./Components/Crypto/Crypto";

function App() {
  return (
    <div className="app-wrapper bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="App">
        <div className="item1">
          <Bookmarks />
        </div>
        <div className="item2">
          <Time />
        </div>
        {/* <div className="item3">
          <Greeting />
        </div> */}
        <div className="item4">
          <Weather />
        </div>
        <div className="item5">
          <Todo />
        </div>
        <div className="item6">
          <Crypto />
        </div>
      </div>
    </div>
  );
}

export default App;
