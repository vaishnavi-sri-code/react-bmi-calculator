import { useState } from 'react'
import './App.css'

function App() {

  const [ height, setHeight] = useState("");
  const [ weight, setWeight] = useState("");
  const [ bmi, setBmi] = useState(null);
  const [ bmiStatus, setBmiStatus] = useState("");
  const [ errorMessage, setErrorMessage] = useState("");

  const [bmiColor, setBmiColor] = useState("");
  
  const calculateBmi = () => {

    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight = /^\d+$/.test(weight);

    if (isValidHeight && isValidWeight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      if (bmiValue < 18.5) {
        setBmiStatus(" 🔵 Under Weight");
        setBmiColor("blue");
      }
      else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiStatus(" 🟢 Normal Weight");
        setBmiColor("green");
      }
      else if (bmiValue >= 25.0 && bmiValue < 29.9 ) {
        setBmiStatus(" 🟡 Over Weight" );
        setBmiColor("yellow");
      }
      else if (bmiValue >= 30.0 && bmiValue < 34.9 ) {
        setBmiStatus(" 🟠 Obese");
        setBmiColor("orange");
      }
      else{
        setBmiStatus(" 🔴 Extremely Obese");
        setBmiColor("red"); 
      }
      setErrorMessage("");
    } else {
      setBmi(null);
      setBmiStatus("");
      setErrorMessage("Please enter valid numeric values for height and weight.");
    }
  };

  const clearAll = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
    setBmiColor("");
  };

  return (
    <>
      <div className='bmi-calculator'>
        <div className='box'></div>
        <div className='data'>
            <h1> 💪 BMI Calculator</h1>

           {errorMessage && <p className= "error">{errorMessage} </p>}

            <div className='input-data'>
                <label for="weight">Weight (kg):</label>
                <input type="number" value={weight} id="weight" name="weight" onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className='input-data'>
                <label for="height">Height (cm):</label>
                <input type="number" value={height} id="height" name="height" onChange={(e) => setHeight(e.target.value)} />
            </div>
            <button onClick={calculateBmi} >Calculate BMI</button>
            <button onClick={clearAll} >Clear</button>
            {bmi !== null && (
              <div className='result'>
                <h4>Your BMI is: {bmi} </h4>
                <p>Status : 
                  <span style={{ color: bmiColor, fontWeight: "bold" }}>
                    {bmiStatus}
                  </span> 
                </p>
              </div>
            )}

        </div>
      </div>
    </>
  )
}

export default App
