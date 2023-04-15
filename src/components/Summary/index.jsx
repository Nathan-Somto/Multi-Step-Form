import React,{useEffect,useState} from 'react'
import Data from '../../data/data.json';
import Buttons from '../Buttons';
import { useAppContext } from '../../App';
import './index.css';
function Summary() {
  const [sum, setSum] = useState(0);
  const{dispatch,summary:{plans,addons},time} = useAppContext();
  const {heading, subHeading} = Data['Summary'];
  function getSum(){
    return (+plans.price + addons.reduce((prev,curr)=> (prev + parseInt(curr.price)),0));
  }
  function handleSummaryUpdate(){
    return;
  }
  useEffect(()=>{
    setSum(getSum());
  },[]);
  return (
   <section className="summary__container">
    <h1 className='summary__heading' >{heading}</h1>
    <h3 className='summary__sub--heading'>{subHeading}</h3>
    <div className='summary__details'>
      <div className="summary__row">
        <div className="summary__text">
          <h2 className="summary__text--title">{plans.title}</h2>
          <a className='summary__text--btn' onClick={()=> dispatch({type:"page",payload:2})}>Change</a>
        </div>
        <p className='summary__price'>{'$'+plans.price +plans.time}</p>
      </div>
    <hr className='summary__divide'/>
    <div className='summary__bottom__details'>
    {addons.map((item,index)=> <div key={`${index}-${item.title}`} className="summary__row">
        <div className="summary__text">
          <h2 className="summary__bottom__text--title">{item.title}</h2>
        </div>
        <p className='summary__bottom__price'>{'+$'+item.price +item.time}</p>
      </div>)}
    </div>
    </div>
    <div className="summary__sum">
      <p className="summary__sum__month">Total(per {`${time}`})</p>
      <p className="summary__sum__amount">+${sum.toString()+ "/"+ (time === 'month' ? 'mo':'yr')}</p>
    </div>
    <Buttons handleSummaryUpdate={handleSummaryUpdate} disabled={false}/>
   </section>
  )
}

export default Summary;