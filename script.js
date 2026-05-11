document.addEventListener('DOMContentLoaded', () => {
    const resultEl = document.getElementById('calc-result');
    const expressionEl = document.getElementById('calc-expression');

    let current = '0';
    let previous = '';
    let operator = null;
    let freshInput = false;

    const updateDisplay = () => {
        resultEl.textContent = current.length > 10 
            ? parseFloat(current).toPrecision(6) 
            : current;
    };

   
    const runCalculation = () => {
        const num1 = parseFloat(previous);
        const num2 = parseFloat(current);
        if (isNaN(num1) || isNaN(num2)) return;

        let result;
        if (operator === '+') result = num1 + num2;
        else if (operator === '-') result = num1 - num2;
        else if (operator === '*') result = num1 * num2;
        else if (operator === '/') result = num2 !== 0 ? num1 / num2 : 'Error';
        current = result === 'Error' ? 'Error' : String(Number(result.toFixed(8)));
        freshInput = true;
    };

    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const value = btn.dataset.value;

            if (action === 'number') {
                if (current === '0' || freshInput) {
                    current = value;
                } else if (current.length < 12) {
                    current += value;
                }
                freshInput = false;
            } 
            
            else if (action === 'operator') {
                if (operator && !freshInput) runCalculation();
                previous = current;
                operator = value;
                freshInput = true;
                expressionEl.textContent = `${previous} ${operator}`;
            } 
            
            else if (action === 'equals') {
                if (!operator) return;
                expressionEl.textContent = `${previous} ${operator} ${current} =`;
                runCalculation();
                operator = null;
            } 
            
            else if (action === 'clear') {
                current = '0'; previous = ''; operator = null; freshInput = false;
                expressionEl.textContent = '';
            } 

            else if (action === 'decimal') {
                if (!current.includes('.')) current += '.';
            } 
            else if (action === 'sign') {
                current = String(parseFloat(current) * -1);
            } 
            else if (action === 'percent') {
                current = String(parseFloat(current) / 100);
            }

            updateDisplay();
        });
    });
});

        const targetDate = new Date().getTime() + (7*24*60*60*1000);

        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000*60*60*24));
            const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
            const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            const seconds = Math.floor((distance % (1000*60))/1000);

            document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
            document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById("countdown").innerHTML = "EXPIRED";
            }
        }, 1000);