import React, { useEffect, useState } from "react"
import { Card, Button, Alert, Form } from "react-bootstrap"
import Navigation from "./Navigation"
import '../styles/Derivative.css'
import Footer from "./Footer"
import { collection, setDoc, doc, query, where, getDocs } from "firebase/firestore"
import { db, auth } from "../firebase"

export default function Integral() {
  const [variable, setVariable] = useState("");
  const [polynomial, setPolynomial] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("")
  const [records, setRecords] = useState(null);

  const getData = async () => {
    const q = query(collection(db, "calculator"), where("integral", "==", true));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const record = {
        uid: doc.id,
        polynomial: doc.get("polynomial"),
        variable: doc.get("variable"),

      };
      setRecords([...records, record]);
    })
  }

  async function handleSubmit(){
    
    const fieldsTosave = {
      uid: auth.currentUser.uid,
      variable: variable,
      polynomial: polynomial,
      integral: true,
    };
    await setDoc(doc(collection(db, 'calculator')), fieldsTosave)
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    try {
      const integral = calculateIntegral(polynomial, variable);
      setResult(integral);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult("");
    }
    handleSubmit();
  };

  const calculateIntegral = (poly, variable) => {
    const cleanedPolynomial = poly.replaceAll(' ', '');
    const terms = cleanedPolynomial.split(/(?=[+-])/);
    const integralTerms = terms.map((term) => {
      const coefficientMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)${variable}?(\\^(\\d+))?`));
      if (coefficientMatch) {
        const coefficientStr = coefficientMatch[1];
        const exponentStr = coefficientMatch[3];
  
        const coefficient = coefficientStr !== undefined && coefficientStr !== ""
          ? parseFloat(coefficientStr)
          : (term.startsWith('-') ? -1 : 1);
        const exponent = exponentStr !== undefined ? parseInt(exponentStr) : (term.includes(variable) ? 1 : 0);
  
        const newExponent = exponent + 1;
        const newCoefficient = coefficient / newExponent;
  
        const newCoefficientStr = newCoefficient === 1 ? '' : newCoefficient.toFixed(3);
        const newExponentStr = newExponent === 1 ? variable : `${variable}^${newExponent}`;
  
        return `${newCoefficientStr}${newExponentStr}`;
      } else {
        throw new Error('Invalid polynomial term');
      }
    }).filter(term => term !== '');
  
    if (integralTerms.length === 0) {
      return 'C'; // Constant of integration
    }
  
    return integralTerms.join(' + ').replace(/\+\s*-/g, '- ').replace(/\s+/g, '') + ' + C';
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navigation />
      <div
      className="d-flex justify-content-center container-bg w-100"
    >
      <div className="w-100 d-flex flex-row align-items-start">
        <div className="d-flex flex-column card-flex-aside card-margin">
      <h2 className="text-center mb-4">History</h2>
      {records ? (
  records.map((record, index) => (
    <Card key={index} style={{marginBottom: '20px'}}>
      <Card.Body>
        
            <strong>Variable:</strong> {record.variable} <br />
            <strong>Polynomial:</strong> {record.polynomial} <br />
            <strong>Integral:</strong> {calculateIntegral(record.polynomial, record.variable)}
        
      </Card.Body>
    </Card>
  ))
) : (
  <Card style={{marginBottom: '20px'}}>
    <Card.Body>
      <p>No history to display</p>
    </Card.Body>
  </Card>
)}
        </div>
        <div className="d-flex flex-column card-flex-middle card-margin">
        <Card style={{marginBottom: '20px'}}>
        <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleCalculate}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Variable</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter your variable"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Polynomial</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter your polynomial"
              value={polynomial}
              onChange={(e) => setPolynomial(e.target.value)}
              required />
            </Form.Group>
            <Button
            className="btn mt-3 w-100"
            type="submit"
            style={{backgroundColor: '#99F49E', border: '#99F49E', color: 'black'}}
            >
              Integrate
            </Button>
            {result && (
                    <Form.Group className="mb-3 text-center" style={{ paddingTop: '10px', fontSize: 'large' }}>
                      <Form.Label><strong>Ans:</strong> {result}</Form.Label>
                    </Form.Group>
            )}
          </Form>
        </Card.Body>
      </Card>
      <h2 className="text-center mb-4">Step-by-step guide</h2>
      <Card className="card-margin">
        <Card.Body>
        <p>Consider a polynomial <i>P(x) = ax<sup>n</sup> + bx<sup>m</sup> + cx<sup>p</sup> + d</i>. To find its integral <i>∫P(x)dx</i>:</p>
<ul>
  <li>Apply the power rule to each term: <i>∫x<sup>n</sup> dx = (x<sup>n+1</sup>)/(n+1) + C</i></li>
  <li>For the first term, <i>ax<sup>n</sup></i>: integral is <i>(a/(n+1))x<sup>n+1</sup></i></li>
  <li>For the second term, <i>bx<sup>m</sup></i>: integral is <i>(b/(m+1))x<sup>m+1</sup></i></li>
  <li>For the third term, <i>c &middot; x<sup>p</sup></i>: integral is <i>(c/(p+1))x<sup>p+1</sup></i></li>
  <li>The fourth term is a constant, <i>d</i>: integral is <i>dx</i></li>
  <li>Combine these integrated terms to get the integral <i>∫P(x)dx</i> and add the constant of integration, <i>C</i></li>
</ul>


        </Card.Body>
      </Card>
      </div>
      <div className="d-flex flex-column card-flex-aside card-margin">
      <h2 className="text-center mb-4">Examples</h2>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
          <p><strong>Example 1:</strong> Find the integral of the polynomial <i>3x<sup>2</sup> + 2x + 1</i>.</p>
          <p><strong>Ans:</strong><i> ∫(3x<sup>2</sup> + 2x + 1) dx = x<sup>3</sup> + x<sup>2</sup> + x + C</i></p>

          </Card.Body>
        </Card>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
          <p><strong>Example 2:</strong> Find the integral of the polynomial <i>5x<sup>3</sup> + 4x<sup>2</sup> + 3x + 2</i>.</p>
<p><strong>Ans:</strong><i> ∫(5x<sup>3</sup> + 4x<sup>2</sup> + 3x + 2) dx = 1.25x<sup>4</sup> + 1.3333x<sup>3</sup> + 1.5x<sup>2</sup> + 2x + C</i></p>

          </Card.Body>
        </Card>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
          <p><strong>Example 3:</strong> Find the integral of the polynomial <i>2x<sup>4</sup> + 3x<sup>3</sup> + 4x<sup>2</sup> + 5x + 6</i>.</p>
<p><strong>Ans:</strong><i> ∫(2x<sup>4</sup> + 3x<sup>3</sup> + 4x<sup>2</sup> + 5x + 6) dx = 0.4x<sup>5</sup> + 0.75x<sup>4</sup> + 1.3333x<sup>3</sup> + 2.5x<sup>2</sup> + 6x + C</i></p>
          </Card.Body>
        </Card>
      </div>
      </div>
      </div>
      <Footer />
    </>
  )
}
