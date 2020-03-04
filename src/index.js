function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
   if (expr.search(/\(|\)/) ===-1) {
       let operands = expr.match(/\-?\d+\.?\d*/g);
      // console.log(operands);
       let operations = expr.match(/[*\/+-]/g);
      // console.log(operations);
       for (let i = 0; i < operands.length; i++) {
           if (operands[i]<0) operations.splice(i,1);
       }
      
        while (operations.includes('*') || operations.includes('/')) {                  // check * & /
            let index = operations.findIndex((item) => item == '*' || item == '/');     
            let tmp = binaryOperation(operations[index],+operands[index],+operands[index+1]); // intermediate result 
            operands.splice(index, 2, tmp);
            operations.splice(index, 1);
        }   
        //console.log(operands);
        //console.log(operations);   
        
        while (operations.length>0) {                                       // go with + & -
            let tmp = binaryOperation(operations[0],+operands[0],+operands[1]);
            operands.splice(0, 2, tmp);
            operations.splice(0,1);            
        }   

        return +operands[0];
    }
   else {
       while(!(expr.search(/\(|\)/) ===-1)) {
        if (expr.search(/\([^\(\)]*\)/) === -1) throw new Error('ExpressionError: Brackets must be paired');
        let exprInBrackets = expr.match(/\([^\(\)]*\)/)[0];
        exprInBrackets = exprInBrackets.slice(1, exprInBrackets.length-1);
        expr = expr.replace(/\([^\(\)]*\)/, expressionCalculator(exprInBrackets));
      //  console.log(expr);
       }
       return expressionCalculator(expr);
   }
}

module.exports = {
expressionCalculator
}

function binaryOperation(str, operand1, operand2) {
    switch (str) {
        case '*':{
            return operand1*operand2;
        }
        case '/': {
            if(operand2 == 0) throw new Error('TypeError: Division by zero.');
            return operand1/operand2;
        }
        case '+':{
            return operand1+operand2;
        }
        case '-': {
            return operand1-operand2;
        }
    }
}

//console.log(expressionCalculator(" 3 * 26 / (  (  75 / 18 * 91 * 38  ) / 53 - (  52 / 34 - (  10 * 67 - 50 - 78  ) * 51 + 58  )  ) + 73 "));
// console.log(expressionCalculator(" 60 + 29 / 57 - 85 "));
// console.log(expressionCalculator("2 + 2"));
 //console.log(expressionCalculator("2-2"));
// console.log(expressionCalculator("1/2"));
//console.log(expressionCalculator("1 / 0"));
// console.log(expressionCalculator(" 84 + 62 / 33 * 10 + 15 "));
// console.log(expressionCalculator(" 49 * 63 / 58 * 36 "));
// console.log(expressionCalculator(" 68 * 60 / 87 / 53 + 17 "));
//console.log(expressionCalculator("1 + 2) * 3"));
//console.log(expressionCalculator("(1 + 2) * 3"));
 //console.log(expressionCalculator(" 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) "));
//console.log(expressionCalculator(" (  68 - 85 / 75 * 64  ) / 15 + 73 "));
// console.log(expressionCalculator("2 + 2"));
// console.log(expressionCalculator("2 + 2"));
// console.log(expressionCalculator("2 + 2"));
// console.log(expressionCalculator("2 + 2"));
