
import fs from 'fs';

const content = fs.readFileSync('e:/HealthCare/src/components/billing/BillingDashboard.jsx', 'utf8');
let stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let char of line) {
        if (char === '{' || char === '[' || char === '(') {
            stack.push({ char, line: i + 1 });
        } else if (char === '}' || char === ']' || char === ')') {
            if (stack.length === 0) {
                console.log(`Unmatched ${char} at line ${i + 1}`);
            } else {
                let open = stack.pop();
                if ((open.char === '{' && char !== '}') ||
                    (open.char === '[' && char !== ']') ||
                    (open.char === '(' && char !== ')')) {
                    console.log(`Mismatch: ${open.char} (line ${open.line}) with ${char} (line ${i + 1})`);
                }
            }
        }
    }
}
if (stack.length > 0) {
    stack.forEach(s => console.log(`Unclosed ${s.char} at line ${s.line}`));
}
