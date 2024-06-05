const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for( let select of dropdowns){
    for ( currcode in countryList ){
       let newOption=document.createElement("option");
       newOption.innerText=currcode;
       newOption.value=currcode;
       if(currcode==="USD" && select.name==="from"){
        newOption.selected="selected";
       }
       if(currcode==="INR" && select.name==="to"){
        newOption.selected="selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change", (e)=>{
        updateFlag(e.target);
    } );
}

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
if(amountVal==='' || amountVal<1 ){
    amountVal=1;
    amount.value="1";
}

const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response=await fetch(URL);
let finalResponse=await response.json();
console.log(finalResponse); //value is stored in an object similar to a 2d array
let rate=finalResponse[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

console.log(rate); //to print the value of exchange rate on the console 

let finalAmount=rate*amountVal;

msg.innerText=`${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag=(element)=>{
let currcode=element.value;
let countrycode=countryList[currcode];
let newSrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
}

button.addEventListener("click",async (e)=>{
e.preventDefault();
updateExchangeRate();

})

document.addEventListener("load",updateExchangeRate());