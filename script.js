const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-Clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousTextElement = document.querySelector('[data-previous-operand]')
const currentTextElement = document.querySelector('[data-current-operand]')
class Calculator{
    constructor(previousTextElement,currentTextElement){
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.Clear();
    }
//Clears all 
    Clear(){
        this.currentOperand =0
        this.previousOperand =''
        this.operation = undefined
    }
//deletes last operand
    delete(){
        this.currentOperand=this.currentOperand.toString()
        if(this.currentOperand.length>1)
        {
            this.currentOperand = this.currentOperand.slice(0,-1)
        }
    }
//appends numbers
    appendNumber(number){
        if(number==='.'&&this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
//to choose operation 
    chooseOperation(operation){
        if(this.currentOperand ===' ')return
        if(this.previousOperand !==' '){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand
        this.currentOperand =' '
    }
//calculation
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(curr))return

        switch(this.operation){
            case '+':
                computation = prev+curr
                break;
            case '-':
               computation = prev-curr
               break;
            case '*':
                computation = prev*curr
                break;
            case '/':
                computation = prev/curr
                break;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand =''
        
    }
//to get comma in between big numbers
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay =''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
//to update the display
    updateDisplay(){
        this.currentTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.previousTextElement.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(previousTextElement,currentTextElement)

numberButton.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log(button.innerText);
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',()=>{
    calculator.Clear()
    calculator.updateDisplay()
})