import { useEffect, useState } from "react";
import { fetchCoffees, createCoffee } from "./utils/apis";
import { useNavigate } from "react-router-dom";
import "./App.css";
import reactImg from "./assets/react.svg";

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [coffeeID, setCoffeeID] = useState("");
  const [name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [availability, setAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoffees().then(data => setCoffees(data.Items || []));
  }, []);

  const handleAddCoffee = async () => {
    if (!coffeeID || !name || !Price) {
      alert("Please fill all fields");
      return;
    }
    const newCoffee = { coffeeID, name, Price: Number(Price), availability };
    await createCoffee(newCoffee);
    setCoffees([...coffees, newCoffee]);
    setCoffeeID("");
    setName("");
    setPrice("");
    setAvailable(false);
  };

  return (
    <div className="container">
      <h1>Coffee List</h1>
      <div className="add-coffee-form">
        <input className="styled-input" type="text" placeholder="Coffee ID" value={coffeeID} onChange={(e) => setCoffeeID(e.target.value)} />
        <input className="styled-input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="styled-input" type="number" placeholder="Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
        <label>
          <input type="checkbox" checked={availability} onChange={(e) => setAvailable(e.target.checked)} /> Available
        </label>
        <button onClick={handleAddCoffee}>Add Coffee</button>
      </div>
      <div className="coffee-list">
        {coffees.map(coffee => (
          <div key={coffee.coffeeID} className="coffee-card" onClick={() => navigate(`/details/${coffee.coffeeID}`)}>
            <h3>{coffee.name}</h3>
            <img src={reactImg} alt="React Logo" />
            <p>Price: ${coffee.Price}</p>
            <p>{coffee.availability ? "Available" : "Not Available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;