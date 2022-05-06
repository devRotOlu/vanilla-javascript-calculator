
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

    if (calMemoryLocalStorage.getCalMemory()===null) {

        calMemoryLocalStorage.setCalMemory('')
        
    }

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
        screenContainer: document.getElementById('calDisplay').firstElementChild,


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
        operatorClicked:false,
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

        toggleDistance:[0,16,32],

        storageValuesAreEqual:false,

        removeCommas(value){

            return value.split('').filter(item=> item !==',').join('')

        },

        separateValuesIntoHundreds(value){// comma seperates values into hundreds

            let displayValue=value

            if (displayValue.includes(',')) { // removes commas if present

               displayValue= this.removeCommas(displayValue)
                
            }

            return  displayValue.split(' ').map(item=>{

                        if (Number(item)) {

                            const containsDecimal=item.includes('.')

                            if (containsDecimal) {

                                const decimalPointIndex= item.split('').reverse().join('').indexOf('.')

                                return item.split('').reverse().map((number,index)=>{

                                    if (index>decimalPointIndex) {

                                        const newIndexForNumber= index-decimalPointIndex

                                        return ( newIndexForNumber>=4 && newIndexForNumber%3===1)? `${number},`:number
                                        
                                    }

                                    return number

                                }).reverse().join('')
                                 
                            }

                            return item.split('').reverse().map((number,index)=>{

                                return (index>=3 && (index+1)%3===1)? `${number},`:number

                            }).reverse().join('')
                            
                        }

                        return item

                    }).join(' ')
        },

        modifyZeros(button){ // modifies zeros 

            let valueArray, valueArrayMaxIndex, prevValuesAllZeros;
            valueArray= this.value.split(' ');
            valueArrayMaxIndex=valueArray.length - 1
            prevValuesAllZeros= (valueArray[valueArrayMaxIndex]).split('').every(value=> value=='0')

            if (prevValuesAllZeros) {

                if (button.innerText=='.') {

                    return this.value= valueArray.map((value,index)=>(index===valueArrayMaxIndex)?`0`:value).join(' ')
                    
                }
                
                this.value= valueArray.map((value,index)=>(index===valueArrayMaxIndex)?'':value).join(' ')
                        
            }

        },

        parseThisValue(button,evaluatedValue){

            if (!button) {

                this.value= localStorage.getItem('calMemory'); 

                this.storageValuesAreEqual=true
                
                return
                
            }

            const value= this.value.endsWith(' ') || !this.value.length

            if (button.innerText=='.') {

                let decimalInArrayMaxIndex,valueArray,valueArrayMaxIndex;

                valueArray= this.value.split(' ');
                valueArrayMaxIndex=valueArray.length - 1
                this.value.length? decimalInArrayMaxIndex=valueArray[valueArrayMaxIndex].includes('.'): null;
                
                if (value) {

                    this.value=`${this.value}0.`

                }
                else if(!decimalInArrayMaxIndex){

                    this.modifyZeros(button)

                    this.value= `${this.value}${button.innerText}`

                }

                return;

            } else if( Number(button.innerText) > 0){

                if (value) {

                   return this.value= `${this.value}${button.innerText}`
                    
                }

                this.modifyZeros(button)
                return this.value= `${this.value}${button.innerText}`
                
            }else if(button.classList.contains('equals')){

                return this.value=evaluatedValue;

            }else if(button.classList.contains('operators')){

                return this.value= `${this.value} ${button.innerText} `

            }

            this.value= `${this.value}${button.innerText}`       
        },

        evaluateValue(value){

            const evaluatedValue=`${(eval(this.removeCommas(value)))}`

            if (evaluatedValue.includes('-')) {/// spaces the minus symbol from the figures 

                return evaluatedValue.split('-').map(item=>(item==='')? '-':item).join(' ')                      
            }

            return evaluatedValue

        },

        checkConditions(button){

            const operant= button.classList.contains('operants');

            let conditionIsTrue= this.equalsClicked && operant && !this.value.endsWith(' ') && domItems.screenContainer.innerHTML !=='Syntax Error'

            // this is to take care of the next key pressed after equals key is pressed 
            conditionIsTrue? this.operatorClicked=false : null;

            conditionIsTrue= !this.equalsClicked || (this.operatorClicked && this.equalsClicked) || this.storageValuesAreEqual
                
            if (conditionIsTrue) {

            
                if (this.operatorClicked && this.equalsClicked) {

                    this.operatorClicked=false;
                    this.equalsClicked=false
                    
                }
                
            } else {

                this.value= ''                
            }

        },
      
        passValueToDisplay(button,screenValueToLocalStorage){

            let screenContainer= domItems.screenContainer;

            
            if (!button) {

                screenContainer.innerHTML=this.separateValuesIntoHundreds(localStorage.getItem('calMemory'));

                this.parseThisValue()

                this.equalsClicked=true

                return;
                
            }

            if (button.classList.contains('operants')) {

                this.checkConditions(button);
                this.parseThisValue(button)
                screenContainer.innerHTML= this.separateValuesIntoHundreds(this.value);
                this.equalsClicked=false
                
            }else if(button.classList.contains('equals')){

                try {

                    this.equalsClicked=true;
                    const evaluatedValue=this.evaluateValue(this.value)
                    screenContainer.innerHTML= this.separateValuesIntoHundreds(evaluatedValue);
                    this.parseThisValue(button,evaluatedValue)
                    
                } catch (error) {

                    screenContainer.innerHTML= 'Syntax Error';                 
                }

            }else { 

                this.parseThisValue(button);
                screenContainer.innerHTML=this.separateValuesIntoHundreds(this.value)
                this.operatorClicked=true;

            }

            if (screenContainer.innerHTML==='Syntax Error') {

                screenValueToLocalStorage(this.value);
                this.storageValuesAreEqual=true
            } else {

                screenValueToLocalStorage(screenContainer.innerHTML);
                this.storageValuesAreEqual=false
                
            }
        },


        deleteDisplayValue(valueToLocalStorage){

            let storageValuesAreEqual,condtionIsTrue; 

            condtionIsTrue= this.equalsClicked && !this.value.endsWith(' ');

            if (this.storageValuesAreEqual) {

                condtionIsTrue= false;
                storageValuesAreEqual=true
                
            }else{

                storageValuesAreEqual=false;
            }

            
            if (condtionIsTrue) {/// ensures answers cannot be edited. answers can only be edited if page is refreshed

                return this.resetCal(valueToLocalStorage)
                
            }

            let calDisplayValue, valueArrayMaxIndex, arrayValuesAllZeros,indexOfValueToDelete;

            valueArrayMaxIndex= this.value.split(' ').length-1;
            arrayValuesAllZeros= this.value.split(' ')[valueArrayMaxIndex].split('').every(value=> value==='0');
            indexOfValueToDelete= this.value.lastIndexOf(this.value.split(' ')[valueArrayMaxIndex])

            
            if (this.value.endsWith(' ')) {
    
                calDisplayValue=this.value.slice(0,this.value.length-3)
                
            }else if(arrayValuesAllZeros){

                calDisplayValue=this.value.slice(0,indexOfValueToDelete)

            }
            else{

                calDisplayValue=this.value.slice(0,this.value.length-1)
            }

            domItems.screenContainer.innerHTML= this.separateValuesIntoHundreds(calDisplayValue)
            this.value= calDisplayValue

            if (storageValuesAreEqual) {

                valueToLocalStorage(this.value);
                this.storageValuesAreEqual=true;
                
            } else {

                valueToLocalStorage(domItems.screenContainer.innerHTML);
                this.storageValuesAreEqual=false;
                
            }
        },

        resetCal(valueToLocalStorage){

            domItems.screenContainer.innerHTML='';
            this.value='';
            this.equalsClicked=false;
            this.operatorClicked=false;
            this.storageValuesAreEqual=true;

            return valueToLocalStorage(domItems.screenContainer.innerHTML)

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
        button.addEventListener('click', ({target})=> {

            UIContrl.passValueToDisplay(target,calContrl.addCalMemoryToLocalStorage);

        })
    })
    
    selectDomItems.calDeleteButton.addEventListener('click',()=> UIContrl.deleteDisplayValue(calContrl.addCalMemoryToLocalStorage))

    selectDomItems.calResetButton.addEventListener('click',()=> UIContrl.resetCal(calContrl.addCalMemoryToLocalStorage))

    selectDomItems.toggle.addEventListener('click',()=> {
        i===2? i=0: i++
        UIContrl.changeCalTheme(i,calContrl.addColorIndexOnLocalStorage)
    })

    UIContrl.changeCalTheme(); UIContrl.passValueToDisplay()

})(calculatorController,UIController);