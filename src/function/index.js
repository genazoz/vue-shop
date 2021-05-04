const getTotalPrice = obj => {
  alert('1')
  var sum = 0;
  for( var el in obj ) {
    if(Object.prototype.hasOwnProperty.call( obj,  el ) ) {
      sum += parseInt( obj[el].quantity ) * parseInt(obj[el].price);
    }
  }
  return sum;
}

export { getTotalPrice }
