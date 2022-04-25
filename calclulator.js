//localStorage.removeItem('colorIndex')

const calculatorController= (()=> {

    const colorLocalStorage = {

        setColorIndex: colorIndex=>{

            localStorage.setItem('colorIndex',colorIndex)
        },

        getColorIndex: ()=>{
            return localStorage.getItem('colorIndex')
        },
    };

    if (colorLocalStorage.getColorIndex()===null) {

        colorLocalStorage.setColorIndex(0)
        
    }

    const calMemoryLocalStorage = {

        setCalMemory: colorIndex=>{

            localStorage.setItem('calMemory',colorIndex)
        },

        getCalMemory: ()=>{
            return localStorage.getItem('calMemory')
        },
    };


    return{

        getColorLocalStorage:colorLocalStorage,
        getCalMemoryLocalStorage:calMemoryLocalStorage,

        addColorIndexOnLocalStorage(index){
             

            colorLocalStorage.setColorIndex(index)

        },

        addCalMemoryToLocalStorage(screenValue){

            calMemoryLocalStorage.setCalMemory(screenValue)

        }

    }
    
})();


const UIController=(()=>{

    const domItems={

        toggle: document.getElementById('colorCtrl').firstElementChild,


        // calculator backgrounds

        toggleBackground:document.getElementById('colorCtrl'),
        main:document.getElementById('calContainer'),
        keypadBackground: document.getElementById('calBody'),
        screenBackground: document.getElementById('calDisplay'),

        // calculator keys

        calDeleteButton: document.getElementById('delete'),
        calResetButton: document.getElementById('reset'),
        calEqualsButton: document.getElementById('equals'),
        operanstsAndOperators:document.getElementsByClassName('operanstsAndOperators'),
        operationsButtons: document.getElementsByClassName('operationsButtons'),
        
    }

    return{

        getDomItems:domItems,
        value:'',
        equalsClicked:false,
        backgroundsColorObject:{

            main:['hsl(222, 26%, 31%)','hsl(0, 0%, 90%)','hsl(268, 75%, 9%)'],
           toggleBackground:['hsl(223, 31%, 20%)','hsl(0, 5%, 81%)','hsl(268, 71%, 12%)'],
            keypadBackground:['hsl(223, 31%, 20%)','hsl(0, 5%, 81%)','hsl(268, 71%, 12%)'],
            screenBackground:['hsl(224, 36%, 15%)','hsl(0, 0%, 93%)','hsl(268, 71%, 12%)']
        },

        nonOperationKeysBackground:{

            calDeleteButton:['hsl(225, 21%, 49%)','hsl(185, 42%, 37%)','hsl(281, 89%, 26%)'],
            calResetButton:['hsl(225, 21%, 49%)','hsl(185, 42%, 37%)','hsl(281, 89%, 26%)'],
            calEqualsButton:['hsl(6, 63%, 50%)','hsl(25, 98%, 40%)','hsl(176, 100%, 44%)'],
            toggle:['hsl(6, 63%, 50%)','hsl(25, 98%, 40%)','hsl(176, 100%, 44%)'],
        },

        nonOperationKeysShadow:{

            calDeleteButton:['hsl(224, 28%, 35%)','hsl(185, 58%, 25%)','hsl(285, 91%, 52%)'],
            calResetButton:['hsl(224, 28%, 35%)','hsl(185, 58%, 25%)','hsl(285, 91%, 52%)'],
            calEqualsButton:['hsl(6, 70%, 34%)','hsl(25, 99%, 27%)','hsl(177, 92%, 70%)'],
            toggle:['hsl(6, 70%, 34%)','hsl(25, 99%, 27%)','hsl(177, 92%, 70%)'],
        },

        operationsKeysBackground:['hsl(30, 25%, 89%)','hsl(45, 7%, 89%)','hsl(268, 47%, 21%)'],
        operationsKeysShadow:['hsl(28, 16%, 65%)','hsl(35, 11%, 61%)','hsl(290, 70%, 36%)'],
        operationsKeysText:['hsl(221, 14%, 31%)','hsl(60, 10%, 19%)','hsl(52, 100%, 62%)'],
        
        mainTextColor:['white','hsl(60, 10%, 19%)','hsl(52, 100%, 62%)'],

        equalsButtonColor:['white','white','hsl(60, 10%, 19%)'],

        toggleDistance:[0 ,16,32],

        
        getCalDisplayValue(button,screenValueToLocalStorage){

            if (!button) {

                domItems.screenBackground.innerHTML=localStorage.getItem('calMemory');

                this.value=localStorage.getItem('calMemory');

                this.equalsClicked=true

                return;
                
            }

            if (button.classList.contains('operants')) {

                // this is to take care of the next key pressed after equals symbol 
                (this.equalsClicked && typeof(button.innerText=='number') && Number(this.value[this.value.length-1]) && domItems.screenBackground.innerHTML !=='Syntax Error' )? this.operatorClicked=false : null;
                
                if (!this.equalsClicked || (this.operatorClicked && this.equalsClicked)) {

                
                    if (this.operatorClicked && this.equalsClicked) {

                        this.operatorClicked=false;
                        this.equalsClicked=false
                        
                    }
                    
                } else {

                    this.value= ''                
                }

                this.value= `${this.value}${button.innerText}`;               
                domItems.screenBackground.innerHTML= this.value;
                this.equalsClicked=false
                
            }else if(button.classList.contains('equals')){

                try {

                    this.equalsClicked=true;
                    domItems.screenBackground.innerHTML= Number(eval(this.value));
                    this.value=`${eval(this.value)}`;
                    
                } catch (error) {

                    domItems.screenBackground.innerHTML= 'Syntax Error';                 
                }

            }else {

                this.value= `${this.value} ${button.innerText} `;
                domItems.screenBackground.innerHTML= this.value;
                this.operatorClicked=true;

            }

            return screenValueToLocalStorage(domItems.screenBackground.innerHTML)

        },

        deleteCalDisplayValue(){

            const calDisplayValue=`${domItems.screenBackground.innerHTML }`
            let newCalDisplayValue;
            if (calDisplayValue[calDisplayValue.length-1]===' ') {
    
                newCalDisplayValue=calDisplayValue.slice(0,calDisplayValue.length-3)
                
            }else{

                newCalDisplayValue=calDisplayValue.slice(0,calDisplayValue.length-1)
            }
            domItems.screenBackground.innerHTML=newCalDisplayValue
            this.value=newCalDisplayValue
        },

        resetCal(){

            domItems.screenBackground.innerHTML='';
            this.value='';
            this.equalsClicked=false;
            this.operatorClicked=false;

        },

        changeCalTheme(index=localStorage.getItem('colorIndex'),indexToStorage){

            domItems.toggle.style.transform=`translate(${this.toggleDistance[index]}px,0)`;

            domItems.main.style.color=`${this.mainTextColor[index]}`;
            domItems.calEqualsButton.style.color=`${this.equalsButtonColor[index]}`

            Object.keys(this.backgroundsColorObject).forEach(item=>{

                domItems[item].style.backgroundColor=`${this.backgroundsColorObject[item][index]}`
                
            });

            Object.keys(this.nonOperationKeysBackground).forEach(key=>{

                domItems[key].style.backgroundColor=`${this.nonOperationKeysBackground[key][index]}`;
                domItems[key].style.boxShadow=`-1px 1px ${this.nonOperationKeysShadow[key][index]}`;
            })

            Array.prototype.forEach.call(domItems.operanstsAndOperators, button=>{

                button.style.backgroundColor=`${this.operationsKeysBackground[index]}`;
                button.style.boxShadow=`-1px 1px ${this.operationsKeysShadow[index]}`;
                button.style.color=`${this.operationsKeysText[index]}`
            })

            return indexToStorage? indexToStorage(index): null
                            
        }
    }

})();


const controller=((calContrl, UIContrl)=> {

    const selectDomItems= UIContrl.getDomItems; let i= Number(localStorage.getItem("colorIndex"));

    Array.prototype.forEach.call(selectDomItems.operationsButtons, button=> {
        button.addEventListener('click', ({target})=> UIContrl.getCalDisplayValue(target,calContrl.addCalMemoryToLocalStorage))
    })
    
    selectDomItems.calDeleteButton.addEventListener('click',()=> UIContrl.deleteCalDisplayValue())

    selectDomItems.calResetButton.addEventListener('click',()=> UIContrl.resetCal())

    selectDomItems.toggle.addEventListener('click',()=> {
        i===2? i=0: i++
        UIContrl.changeCalTheme(i,calContrl.addColorIndexOnLocalStorage)
    })

    UIContrl.changeCalTheme(); UIContrl.getCalDisplayValue()

})(calculatorController,UIController);