class Calculator{
    constructor(prevNumElement, curNumElement){
        this.prevNumElement = prevNumElement;
        this.curNumElement = curNumElement;
        this.clear();
    }

    clear(){
        this.curNum = '';
        this.prevNum = '';
        this.operation = '';
    }

    delete(){
        this.curNum = this.curNum.slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.curNum.indexOf('.') !== -1) return;
        this.curNum = this.curNum.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.curNum == null) return;
        if(this.prevNum != null) {
            this.compute();
        }

        this.prevNum = this.curNum;
        this.operation = operation;
        this.curNum = '';
    }

    compute(){
        let res;
        const prev = parseFloat(this.prevNum);
        const cur = parseFloat(this.curNum);
        if(isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case '+':
              res = prev + cur
              break
            case '-':
              res = prev - cur
              break
            case '*':
              res = prev * cur
              break
            case '÷':
              res = prev / cur
              break
            default:
              return
        }

        this.curNum = res;
        this.prevNum = '';
        this.operation = undefined;
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }

    updateDisplay(){
        this.curNumElement.innerText = this.getDisplayNumber(this.curNum);
        if(this.operation){
            this.prevNumElement.innerText = `${this.getDisplayNumber(this.prevNum)} ${this.operation}`
        }else {
            this.prevNumElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
