import React, { useEffect, useRef, useState } from "react";
import Data from "../../data/data.json";
import advanced from "../../assets/images/icon-advanced.svg";
import arcade from "../../assets/images/icon-arcade.svg";
import pro from "../../assets/images/icon-pro.svg";
import Buttons from "../Buttons";
import { updateStorage, handleFormat } from "../../utils";
import "./index.css";
import { useAppContext } from "../../App";
import MotionSection from "../MotionSection";
import MotionDiv, { child } from "../MotionDiv";
import {motion} from 'framer-motion';

function Plans() {
  const [active, setActive] = useState({ 0: true });
  const { dispatch, time } = useAppContext();
  const plans = useRef({});
  const { heading, subHeading, card } = Data["Plans"];
  const imgSrc = [advanced, arcade, pro];
  function handleChange(){
    if(time === 'month'){
      dispatch({type:'time', payload:"year"});
      return;
    }
    dispatch({type:'time',payload:"month"});
  }
  useEffect(() => {
    let localPlans = localStorage.getItem("plans");
    if (localStorage.getItem("plans") !== null) {
      let parsedPlans = JSON.parse(localPlans);
      let index = card.findIndex(
        (item, index) => (Object.keys(parsedPlans)[0] == index)
      );
      if (index !== -1) {
        const { title, month, year } = card[index];
        const { Price, Time } = handleFormat([month, year], time);
        plans.current = { title, price: Price, time: Time };
        setActive({ ...parsedPlans });
      }
    }
  }, []);

  function handleSummaryUpdate() {
   
    if(!Object.keys(plans.current).length){
      let index = Object.keys(active)[0];
      const { title, month, year } = card[index];
        const { Price, Time } = handleFormat([month, year], time);
        plans.current = { title, price: Price, time: Time };
    }
    updateStorage("plans", active);
    dispatch({ type: "plans", payload: plans.current });
  }

  function handleSelect(index, title, price) {
    let inActive = {};
    Object.keys(active).map((item) => {
      if (!active[item]) {
        inActive[item] = active[item];
      }
    });
    const { Price, Time } = handleFormat(price, time);
    plans.current = { title, price: Price, time: Time };
    setActive({ ...inActive, [index]: true });
  }
  return (
   <MotionSection className={'plans__container'}>
      <h1 className="plans__heading">{heading}</h1>
      <h3 className="plans__sub--heading">{subHeading}</h3>
      <MotionDiv className={"plans__card--container"}>
        {card.map((item, index) => (
          <motion.div
          variants={child}
            key={index}
            className={`plans__card ${
              active[index.toString()] ? "plans__card--active" : ""
            }`}
            onClick={() =>
              handleSelect(index.toString(), item.title, [
                item.month,
                item.year,
              ])
            }
          >
            <figure className="plans__card--img">
              <img src={`${imgSrc[index]}`} alt={`${item.title}`} />
            </figure>
            <div className="plans__card--text">
              <h2 className="plans__card--title">{item.title}</h2>
              <p className="plans__card--price">{`+$${
                time === "month" ? `${item.month}/mo` : `${item.year}/yr`
              }`}</p>
              <p className="plans__card--discount">{`${
                (time === "year") ? "2 months free" :''
              }`}</p>
            </div>
          </motion.div>
        ))}
      </MotionDiv>
      <div className="plans__slider--container">
        <h3 className={`plans__slider--text ${ time === 'month' ? 'slider__text--active': ''}`}>Monthly</h3>
        <label className="plans__switch">
          <input type="checkbox" className="plans__input"  onChange={handleChange} checked={time === 'month' ? false : true}/>
          <span className="plans__slider slider__round"></span>
        </label>
        <h3 className={`plans__slider--text ${ time === 'year' ? 'slider__text--active' :""}`}>Yearly</h3>
      </div>
      <Buttons handleSummaryUpdate={handleSummaryUpdate} disabled={false} />
      </MotionSection>


  );
}

export default Plans;
