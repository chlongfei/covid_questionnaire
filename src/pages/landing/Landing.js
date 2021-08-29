import "./landing.css";
import questionBank from "./questionBank";

import React, {useState} from 'react';
import {Container} from 'react-bootstrap';

function Registeration(){
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const isValid = (fname.length > 0)&&(lname.length > 0)&&(email.length > 0)&&(phone.length > 0);

    function handleFNameChange(event){
        setFName(event.target.value);
    }
    function handleLNameChange(event){
        setLName(event.target.value);
    }
    function handleEmailchange(event){
        setEmail(event.target.value);
    }
    function handlePhoneChange(event){
        setPhone(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        localStorage.setItem("name", fname+" "+lname); //replace storage of name with session id before production
        localStorage.setItem("email", email); //replace storage of name with session id before production
        localStorage.setItem("phone", phone); //replace storage of name with session id before production
        window.location.reload();
    }

    return(            
        <div id="registeration">
            <div className="header">
                <h1 className="display-2">COVID-19 Questionnaire</h1>
                <p><b>This screening cannot diagnose you.</b> If you have medical questions, consult a health care provider. Follow the direction of your local public health unit over the advice in this tool.</p>
                <form onSubmit={handleSubmit}>
                    <p>Please provide your contact information for contact tracing purposes.</p>
                    <input type="text" name="fname" placeholder="First Name" onChange={handleFNameChange}/><br/>
                    <input type="text" name="lname" placeholder="Last Name" onChange={handleLNameChange}/><br/>
                    <input type="text" name="email" placeholder="Email" onChange={handleEmailchange}/><br/>
                    <input type="text" name="phone" placeholder="Phone Number" onChange={handlePhoneChange}/><br/>
                    <input className="btn btn-success" type="submit" value="Start Questionnaire >" disabled={!isValid}/>
                </form>
            </div>
            <sub>This questionnaire is adoped from the COVID-19 Customer Screening questionnaire created by the Ontario Ministry of Health (<a href="https://covid-19.ontario.ca/screening/customer/">https://covid-19.ontario.ca/screening/customer/</a>)</sub>
        </div>
    )
}

function Questions(){
    const [count, setCount] = useState(0);
    const [respYes, setYes] = useState(0);

    const q = questionBank.Questions.map(function (question){
        return question;
    });

    const totQ = q.length;

    function increment(){
        setCount(count + 1);
    }

    function handleResponse(event){
        event.preventDefault();
        increment();
    }

    function options(type){
        if(type === "yn"){
            return (
                <form onSubmit={handleResponse}>
                    <input className="btn btn-primary" type="submit" value="YES" onClick={() => setYes(respYes + 1)}/>
                    <input className="btn btn-primary" type="submit" value="NO"/>
                </form>
            )
        }else{
            return (
                <div>
                    No Responses Available
                </div>
            )
        }
    }

    function check(){
        if(respYes === 0){
            return(
                <Accepted/>
            ) 
        }else{
            return(
                <Denied/>
            ) 
        }
    }

    if(count < totQ){
        return(
            <div id="questions">
                <div className="question display-6">{q[count].question}</div>
                <div className="hint muted">{q[count].hint}</div>
                <div className="response">
                    {options(q[count].type)}
                </div>
            </div>
        )
    }else{
        return(
            <div id="result">
                <div className="display-5">COVID-19 SCREENING RESULT:</div>
                <div className="display-6 muted">{new Date().toLocaleString()}</div>
                {check()}
                <div className="disclaimers">
                    <p>You may take a screenshot of this as proof of screening status.
                        <br/>
                        sessionId: sessionidwillgohere
                        <br/>
                        {localStorage.getItem("name")}
                        <br/>
                        {localStorage.getItem("email")}
                        <br/>
                        {localStorage.getItem("phone")}
                    </p>
                    <p><b>This screening cannot diagnose you.</b><br/>If you have medical questions, consult a health care provider. Follow the direction of your local public health unit over the advice in this tool.</p>
                </div>
            </div>
        )
    }
}

function Accepted(){
    return(
        <div className="accepted">
            <div>Based on your screening results, you're</div>
            <p>GOOD TO GO!</p>
            <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
</svg>
        </div>
    )
}

function Denied(){
    return(
        <div className="denied">
            <div>Based on your screening results, you</div>
            <p>CAN NOT GO.</p>
            <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z" />
</svg>
        </div>
    )
}

export default function Landing(){
    function handleClearLS(){
        localStorage.clear();
        window.location.reload();
    }

    if(localStorage.getItem("name") != null){
        localStorage.setItem("qcount",0);
        return(
            <>
                <Container id="landing" fluid="sm">
                    <Questions/>
                    <input className="extScrn btn btn-secondary" type="submit" value="Exit Screening" onClick={()=>handleClearLS()}/>
                </Container>
            </>
        )
    }else{
        return(
            <div id="landing">
                <Registeration/>
            </div>
        )

    }
}