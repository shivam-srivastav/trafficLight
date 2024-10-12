"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
const RED = '#C62E2E';
const GREEN = "#06D001";
const YELLOW = "#F4CE14";
export default function Home() {
  const [defaultTime, setDefaultTime] = useState({
    red: 15,
    green: 10,
    yellow: 5
  });
  const [adocTime, setAdocTime] = useState({
    value: 0,
  })
  const [toggle, setToggle] = useState({
    counter: 0,
    color: RED
  })
  useEffect(() => {
    if (toggle.counter)
      automateColor(toggle.counter, toggle.color)
  }, [toggle.counter])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setToggle((prev) => ({
        ...prev,
        counter: prev.counter + 1,
      }));
    }, 1000);

    return () => clearInterval(intervalId);  // Cleanup interval on unmount
  }, []);
  const automateColor = (counter: any, color: any) => {
    switch (color) {
      case RED:
        if ((counter) % ADD(defaultTime.red, adocTime.value) === 0) {
          handleLightChange(YELLOW);
          setAdocTime({ value: 0 });
        }
        break;
      case YELLOW:
        if ((counter) % ADD(defaultTime.yellow, adocTime.value) === 0) {
          handleLightChange(GREEN);
          setAdocTime({ value: 0 });
        }
        break;
      case GREEN:
        if ((counter) % ADD(defaultTime.green, adocTime.value) === 0) {
          handleLightChange(RED);
          setAdocTime({ value: 0 });
        }
        break;
      default:
        setToggle({
          counter: 0,
          color: RED
        })
    }9

  }
  const handleLightChange = (color: any) => {
    setToggle({
      color: color,
      counter: 0
    })
  }
  const handleAdocTime = (e: any) => {
    e.preventDefault()
    setAdocTime((prev) => ({
      ...prev,
      value: e.target['adoc'].value
    }));
  }
  const ADD = (num1: any, num2: any) => (Number(num1) + Number(num2))
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="h2 text-lg">Traffic Light System</h2>

      <Main>
        <AdocTime $color={toggle.color}>
          <h1>Adoc Time : {adocTime.value} Second</h1>
          <form onSubmit={(e) => handleAdocTime(e)}>
            <input type="text" name="adoc" placeholder="Enter the Seconds to Adoc" />
            <button>Submit</button>
          </form>
          <div>
            <button onClick={() => {
              console.log("5 sec")
              setAdocTime({ value: 5 }

              )
            }}>Add 5 Sec</button>
            <button onClick={() => {
              console.log("10 sec")
              setAdocTime({ value: 10 })
            }} >Add 10 Sec</button>
          </div>
        </AdocTime>
        <TrafficBox>
          <List $color={RED} $active={toggle.color === RED}>
            <span>
              {toggle.color === RED && toggle.counter + 1}
            </span>
          </List>
          <List $color={YELLOW} $active={toggle.color === YELLOW} >
            <span>
              {toggle.color === YELLOW && toggle.counter + 1}
            </span>
          </List>
          <List $color={GREEN} $active={toggle.color === GREEN}>
            <span>
              {toggle.color === GREEN && toggle.counter + 1}
            </span>
          </List>


        </TrafficBox>
        <Controller>
          <Button onClick={() => handleLightChange(RED)}>Red</Button>
          <Button onClick={() => handleLightChange(GREEN)}>Green</Button>
          <Button onClick={() => handleLightChange(YELLOW)}>Yellow</Button>
        </Controller>
      </Main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <hr></hr>
        <ContactMe>
          <li><a href="https://www.linkedin.com/in/shivam1534/">LinkedIn</a> </li> |
          <li><a href="https://github.com/shivam-srivastav/">GitHub</a> </li> |
          <li><a href="mailto:shivam.mkp@gmail.com">Gmail (shivam.mkp@gmail.com)</a> </li> |
          <li><a href="https://www.instagram.com/shiiivaam._/">Instagram</a> </li>
        </ContactMe>
      </footer>
    </div>
  );
}
const TrafficBox = styled.div`
display:flex;
justify-content:center;
li{
list-style:none;
}

`
const List = styled.li`
margin:1rem;
border:${props => `1px solid ${props.$color}`};
background: ${props => props.$color};
width:5rem;
height:5rem;
border-radius:1000%;
box-shadow:${props => props.$active ? " 0 0 10px 10px #fff" : ' 0 0 10px -10px #fff'};
display:flex;
justify-content:center;
align-items:center;
span {
color:#001;
font-weight:600;
font-size:20px;
}
`
const Button = styled.button`
padding:0.5rem;
margin:1rem;
border-radius:4px;
border:1px solid;
 &:hover{
 background:blue;
 }`
const Controller = styled.div`
padding:4px;
margin:3rem;`
const Main = styled.div`
text-align:center;
`
const AdocTime = styled.div`
  div{
  margin:1rem;
    button {
    border:1px solid;
    }
  }
    input{
    color:#000;
    padding:4px;}
  button {
    border:1px solid;
    margin:4px;
    padding:4px;
    color:#000;
    background: ${props => props.$color}
    }

`
const ContactMe = styled.div`

list-style:none;
display:flex;
justify-content:space-between;
li{
padding:0 4px;
margin:0 1rem;
}`