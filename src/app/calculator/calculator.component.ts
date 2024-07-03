import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  expression: string = '';
  result: string = '';
  isDarkMode=false;
  showHistory=false;
  lastThreeOperations: string[] = [];

   toggleHistory(){
    this.showHistory = !this.showHistory;

  }

  addOperationToHistory(operation: string) {
    this.lastThreeOperations.unshift(operation);
    if (this.lastThreeOperations.length > 3) {
      this.lastThreeOperations.pop();
    }
  }




  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

  }

  calculate() {
    try {
      this.result = eval(this.expression.replace('×', '*').replace('÷', '/')).toString();
      this.addOperationToHistory(this.expression + ' = ' + this.result);
    } catch (e) {
      this.result = 'Error';
    }
  }
  appendNumber(num: number) {
    if (this.expression === '0') {
      this.expression = String(num);
    } else {
      this.expression += String(num);
    }
  }

  appendOperator(operator: string) {
    if (this.expression === '0' && operator !== '+/-' && operator !== '×' && operator !== '÷') {
      return; // Eğer ekran değeri 0 ise ve eklenen operatör değiştirme işlemi değilse, işlem yapma
    }

    const lastChar = this.expression[this.expression.length - 1];
    if (['+', '-', '×', '÷'].includes(lastChar) && ['+', '-', '×', '÷'].includes(operator)) {
      this.expression = this.expression.slice(0, -1) + operator;
    } else {
      this.expression += operator;
    }
  }

  clear() {
    this.expression = '0';
    this.result = '';
  }

  toggleSign() {
    if (this.expression === '0') {
      this.expression = '0';
    } else if (this.expression.startsWith('-')) {
      this.expression = this.expression.substring(1);
    } else {
      this.expression = '-' + this.expression;
    }
  }
  appendZeroes(num:number) {
    if (this.expression !== '0') {
      this.expression += '00';
    }else{
      return;
    }
  }

}
