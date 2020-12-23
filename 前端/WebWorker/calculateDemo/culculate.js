onmessage = function(num){
    var total = 0;
    for(var i = 0; i < parseInt(num.data) * 100000000; i++){
        total += parseInt(num.data);
    }
    postMessage(total);
}