
var calculatorController= (()=> {
    
})();

var UIController=(()=>{

    const domItems={

        operantButtons: document.getElementsByClassName('operationsButton'),
        calDisplay: document.getElementById('calDisplay'),
        calDelete: document.getElementsByClassName('delete'),
        calReset: document.getElementsByClassName('reset'),
        themeControl: document.getElementById('colorCtrl').firstElementChild,
    }

    return{

        getDomItems:domItems,
        value:'',
        equalsClicked:false,
        operatorClicked:false,
        
        getCalDisplayValue(value){

            if (value.classList.contains('operants')) {

                (this.equalsClicked && typeof(value.innerText =='number') && Number(this.value[this.value.length-1]) && this.getDomItems.calDisplay.innerHTML !== 'Syntax Error' )? this.operatorClicked=false : null;
                
                if (!this.equalsClicked || (this.operatorClicked && this.equalsClicked)) {

                
                    if (this.operatorClicked && this.equalsClicked) {

                        this.operatorClicked=false;
                        this.equalsClicked=false
                        
                    }
                    
                } else {

                    this.value= ''                
                }

                this.value= `${this.value}${value.innerText}`;               
                this.getDomItems.calDisplay.innerHTML= this.value;
                this.equalsClicked=false
                
            }else if(value.classList.contains('equals')){

                try {

                    this.equalsClicked=true;
                    const evalValue=eval(this.value)
                    this.getDomItems.calDisplay.innerHTML= Number(evalValue);
                    this.value=`${eval(this.value)}`;
                    
                } catch (error) {

                    this.getDomItems.calDisplay.innerHTML= 'Syntax Error';                 
                }

            }else {

                this.value= `${this.value} ${value.innerText} `;
                this.getDomItems.calDisplay.innerHTML= this.value;
                this.operatorClicked=true;

            }

        },

        deleteCalDisplayValue(){

            const calDisplayValue=`${this.getDomItems.calDisplay.innerHTML}`
            let newCalDisplayValue;
            if (!Number(calDisplayValue[calDisplayValue.length-1])) {
    
                newCalDisplayValue=calDisplayValue.slice(0,calDisplayValue.length-3)
                
            }else{
    
                newCalDisplayValue=calDisplayValue.slice(0,calDisplayValue.length-1)
            }
            this.getDomItems.calDisplay.innerHTML=newCalDisplayValue
            this.value=newCalDisplayValue
        },

        resetCal(){

            this.getDomItems.calDisplay.innerHTML='';
            this.value='';
            this.equalsClicked=false;
            this.operatorClicked=false;

        }
    }

})();


var controller=((calContrl, UIContrl)=> {

    const selectDomItems= UIContrl.getDomItems;

    Array.prototype.forEach.call(selectDomItems.operantButtons, button=> {
        button.addEventListener('click', ({target})=> UIContrl.getCalDisplayValue(target))
    })
    
    selectDomItems.calDelete[0].addEventListener('click',()=>UIContrl.deleteCalDisplayValue())

    selectDomItems.calReset[0].addEventListener('click',()=>UIContrl.resetCal())

    selectDomItems.themeControl.addEventListener('drag',({target})=>{

        target.style.backgroundColor='yellow'
    })

})(calculatorController,UIController);

