let passwordLength = document.querySelector('[passwordlength]');
let slider = document.querySelector('[slider]') ; 
let generateButton = document.querySelector('[generateBtn]') ; 
let passwordgenerated = document.querySelector('[passwordgenerated]') ; 
let strenghtColor = document.querySelector('[strengthchecker]') ; 
let UpperCase = document.querySelector('[uppercase]');
let LowerCase = document.querySelector('[lowercase]');
let SymbolCase = document.querySelector('[symbol]');
let IntegerCase = document.querySelector('[integer]');
let symbols = ['!' , '@' , '#' , '$' , '%' , '&' , '*'] ; 
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let checkCount = 1 ; 




function handleSlideInput(){
    let value = slider.value ; 
    passwordLength.textContent = value ; 
}
function generateInRange(x , y){
   let value =  Math.floor(Math.random()*(y - x)) + x ; 
   return value ; 
}
function genrateRandomUpperCase(){
    let value =  generateInRange(65 , 90) ; 
    return String.fromCharCode(value) ; 
}
function genrateRandomLowerCase(){
    let value =  generateInRange(97 , 122) ; 
    return String.fromCharCode(value) ; 
}
function genrateRandomInteger(){
    let value =  generateInRange(0,9) ; 
    return value ; 
}
function genrateRandomSymbol(){
    let idx =  generateInRange(0,symbols.length) ; 
    return symbols[idx] ; 
}
function shufflePassword(str){
    let arr = Array.from(str) ; 
    let n = arr.length ; 

    for(let i = 0 ; i < n ; i++){
      let j = generateInRange(0, n) ; 
      let temp = arr[i] ; 
      arr[i] = arr[j] ; 
      arr[j] = temp ; 
    }

   str = "" ; 
   arr.forEach(e => {str += e ; }) ; 
   return str ; 
}
function strenghtChecker(str){
     if(str.length < 4 ){
       strenghtColor.style.color = "green" ; 
     }
     else if(str.length > 6 && UpperCase.checked  && LowerCase.checked && SymbolCase.checked && IntegerCase.checked){
      strenghtColor.style.color = "red" ; 
     }
     else{
      strenghtColor.style.color = "yellow" ; 
     }
}
function gntPassword(){


  if(checkCount === 0 ){
    passwordgenerated.textContent = "" ; 
    return ; 
  }
  let passlength = slider.value ; 
  if(passlength < checkCount){
    passlength = checkCount ; 
    slider.value = checkCount ; 
    handleSlideInput() ; 
  }
  let arr = [] ; 
  let password = "" ; 
  if(UpperCase.checked){
    arr.push(genrateRandomUpperCase) ; 
  }
  if(LowerCase.checked){
    arr.push(genrateRandomLowerCase) ; 
  }
  if(IntegerCase.checked){
    arr.push(genrateRandomInteger) ; 
  }
  if(SymbolCase.checked){
    arr.push(genrateRandomSymbol) ; 
  }

  for(let i = 0 ; i < arr.length ; i++){
        password += arr[i]() ; 
  }

  for(let i = 0 ; i < passlength - arr.length ;i++ ){
    let idx = generateInRange(0 , arr.length  ) ; 
    password += arr[idx]() ; 
  }
 
  password = shufflePassword(password) ; 
  passwordgenerated.textContent = password ; 

  strenghtChecker(password) ; 
}
function handleCheckBoxChange(){
   checkCount = 0 ; 
  allCheckBox.forEach(element => {
    if(element.checked) checkCount++; 
  });

}
slider.addEventListener('input' , handleSlideInput) ; 
generateButton.addEventListener('click' , gntPassword) ; 

allCheckBox.forEach( (checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
})