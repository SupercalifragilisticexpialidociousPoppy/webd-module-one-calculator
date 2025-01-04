let innum = [];
let expr = [];
let answ = 0;

function inpnum(x) {
    innum.push(x);
    showbig(innum);
    document.getElementById("small-display").textContent = expr.join(' ');
}

function numcom() {
    let s = 0; n = innum.length; j = innum.indexOf('.');
    
    if(j == -1){
        for(let i = 0; i < n; i++){
            s += innum[n-i-1]*10**i;
        }
    } else {
        for(let i = 0; i < j; i++){
            s += innum[j-i-1]*10**i;
        }
        for(let i = 1; i+j < n; i++){
            s += innum[i+j]*10**(-i);
        }    
    }

    innum = [];
    return s;
}

function oper(x){
    n = innum.length;
    
    if(n != 0){
        let s = numcom();

        if(isNaN(s) == false){
            expr.push(s); expr.push(x);
        } else {
            console.log("Invalid number. Try again.")
        }
        
    } else {
        expr[expr.length-1] = x
    }

    showexpr(expr); showbig(innum);
}

function execute() {
    n = innum.length;

    if(n != 0){
        let s = numcom();
        
        if(isNaN(s) == false){
            expr.push(s); let dc = 0; let mc = 0; let ac = 0; let sc = 0;

            showexpr(expr);

            for(let i = 0; i < expr.length; i++){
                if(expr[i] == '/') {
                    dc++;
                } if(expr[i] == '*') {
                    mc++;
                } if(expr[i] == '+') {
                    ac++;
                } if(expr[i] == '-') {
                    sc++;
                }
            }

            while(dc--) {
                for(let i =0; i < expr.length; i++) {
                    if(expr[i] == '/') {
                        expr[i-1] /= expr[i+1];
                        for(let j = i+2; j < expr.length; j++) {
                            expr[j-2] = expr[j];
                        }
                        expr.pop(); expr.pop();
                    }
                }
            }

            while(mc--) {
                for(let i =0; i < expr.length; i++) {
                    if(expr[i] == '*') {
                        expr[i-1] *= expr[i+1];
                        for(let j = i+2; j < expr.length; j++) {
                            expr[j-2] = expr[j];
                        }
                        expr.pop(); expr.pop();
                    }
                }
            }

            while(ac--) {
                for(let i =0; i < expr.length; i++) {
                    if(expr[i] == '+') {
                        expr[i-1] += expr[i+1];
                        for(let j = i+2; j < expr.length; j++) {
                            expr[j-2] = expr[j];
                        }
                        expr.pop(); expr.pop();
                    }
                }
            }

            while(sc--) {
                for(let i =0; i < expr.length; i++) {
                    if(expr[i] == '-') {
                        expr[i-1] -= expr[i+1];
                        for(let j = i+2; j < expr.length; j++) {
                            expr[j-2] = expr[j];
                        }
                        expr.pop(); expr.pop();
                    }
                }
            }

            if(expr.length === 1){
                let ans = [expr[0]]; showbig(ans);
            } else  {
                let ans = ["Invalid expression."]; showbig(ans);
            }           

        } else {
            let ans = ["Invalid number."]; showbig(ans)
        }
    } else {
        let ans = ["Invalid input."]; showbig(ans);
    }

    answ = expr[0]; expr = [];
}

function clear() {
    while(expr.length--) {
        expr.pop();
    }
    showexpr();
}

function clearnum() {
    innum = [];
    showbig(innum);
}

function backspace() {
    if(innum.length != 0){
        innum.pop();
        showbig(innum);
    } else{
        expr.pop(); expr.pop();
        document.getElementById("small-display").textContent = expr.join(' ');
    }
}

function answer() {
    innum.push(answ);
    showbig(innum);
    document.getElementById("small-display").textContent = expr.join(' ');
}

function showexpr(expr) {
    document.getElementById("small-display").textContent = expr.join(' ');
}

function showbig(a) {
    document.getElementById("big-display").textContent = a.join('');
}
