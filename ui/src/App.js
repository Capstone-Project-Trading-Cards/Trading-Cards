import CardSoccer from "./components/CardSoccer/CardSoccer";

function App() {
  return (
    <div>
      <h1 className="text-center">Soccer</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
      <h1 className="text-center">Basketball</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
      <h1 className="text-center">NHL</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
      <h1 className="text-center">NFL</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardSoccer />
      </div>
    </div>
  );
}

export default App;
