import React, { useState } from "react"
import { Card, Button, Alert, Form } from "react-bootstrap"
import { useAuthentication } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import Navigation from "./Navigation"
import '../styles/Derivative.css'
import Footer from "./Footer"
import { collection, setDoc, doc } from "firebase/firestore"
import { db, auth } from "../firebase"

export default function Derivative() {
  const [variable, setVariable] = useState("");
  const [polynomial, setPolynomial] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("")
  const { records } = useAuthentication();

  async function handleSubmit(){
    
    const fieldsTosave = {
      uid: auth.currentUser.uid,
      variable: variable,
      polynomial: polynomial,
      derivative: result,
    };
    await setDoc(doc(collection(db, 'calculator')), fieldsTosave)
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    try {
      const derivative = calculateDerivative(polynomial, variable);
      setResult(derivative);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult("");
    }
    handleSubmit();
  };

  const calculateDerivative = (poly, variable) => {
    const cleanedPolynomial = poly.replaceAll(' ', '');
    const terms = cleanedPolynomial.split(/(?=[+-])/);
    const derivativeTerms = terms.map((term) => {
      const coefficientMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)${variable}?(\\^(\\d+))?`));
      if (coefficientMatch) {
        const coefficientStr = coefficientMatch[1];
        const exponentStr = coefficientMatch[3];
  
        const coefficient = coefficientStr !== undefined && coefficientStr !== ""
          ? parseFloat(coefficientStr)
          : (term.startsWith('-') ? -1 : 1);
        const exponent = exponentStr !== undefined ? parseInt(exponentStr) : (term.includes(variable) ? 1 : 0);
  
        if (exponent === 0) {
          return ''; // Term is a constant, derivative is 0
        } else {
          const newCoefficient = coefficient * exponent;
          const newExponent = exponent - 1;
  
          if (newExponent === 0) {
            return `${newCoefficient}`;
          } else {
            return `${newCoefficient}${variable}${newExponent !== 1 ? '^' + newExponent : ''}`;
          }
        }
      } else {
        throw new Error('Invalid polynomial term');
      }
    }).filter(term => term !== '');
  
    if (derivativeTerms.length === 0) {
      return '0';
    }
  
    return derivativeTerms.join(' + ').replace(/\+\s*-/g, '- ').replace(/\s+/g, '');
  };
  
  
  
  


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
            <strong>Derivative:</strong> {record.derivative}
        
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
            // onClick={handleSubmit}
            >
              Differentiate
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
        <p>Consider a polynomial <i>P(x) = ax<sup>n</sup> + bx<sup>m</sup> + cx<sup>p</sup> + d</i>. To find its derivative <i>P'(x)</i>:</p>
<ul>
  <li>Apply the power rule to each term: <i>d/dx [x<sup>n</sup>] = n x<sup>n-1</sup></i></li>
  <li>For the first term, <i>ax<sup>n</sup></i>: derivative is <i>nax<sup>n-1</sup></i></li>
  <li>For the second term, <i>bx<sup>m</sup></i>: derivative is <i>mbx<sup>m-1</sup></i></li>
  <li>For the third term, <i>c &middot; x<sup>p</sup></i>: derivative is <i>pcx<sup>p-1</sup></i></li>
  <li>The fourth term is a constant: derivative is 0</li>
  <li>Combine these derived terms to get the derivative <i>P'(x)</i></li>
</ul>


        </Card.Body>
      </Card>
      </div>
      <div className="d-flex flex-column card-flex-aside card-margin">
      <h2 className="text-center mb-4">Examples</h2>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
            <p><strong>Example 1:</strong> Find the derivative of the polynomial <i>3x<sup>2</sup> + 2x + 1</i>.</p>
            <p><strong>Ans:</strong><i> 6x + 2</i></p>

          </Card.Body>
        </Card>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
            <p><strong>Example 2:</strong> Find the derivative of the polynomial <i>5x<sup>3</sup> + 4x<sup>2</sup> + 3x + 2</i>.</p>
            <p><strong>Ans:</strong><i> 15x<sup>2</sup> + 8x + 3</i></p>
          </Card.Body>
        </Card>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
            <p><strong>Example 3:</strong> Find the derivative of the polynomial <i>2x<sup>4</sup> + 3x<sup>3</sup> + 4x<sup>2</sup> + 5x + 6</i>.</p>
            <p><strong>Ans:</strong><i> 8x<sup>3</sup> + 9x<sup>2</sup> + 8x + 5</i></p>
          </Card.Body>
        </Card>
      </div>
      </div>
      </div>
      <Footer />
    </>
  )
}
