function handleFormat(price,time){
    let Time = time === 'month' ? '/mo' :'/yr';
    let Price = time === 'month' ? price[0] : price[1];
    return {Price,Time};
  }
  function updateStorage(step,active) {
 console.log(step);
    if(localStorage.getItem(step) !== null){
      localStorage.removeItem(step);
    } 
    localStorage.setItem(step,JSON.stringify(active));
   
  }
export {handleFormat, updateStorage};