## **1.svg基础**

### 1.svg的命名空间

### 2.svg中的标签    text、circle、rect、line、polyLine、polyGen

### 3.单独使用svg标签画图

### 4.在HTML中通过js创建svg元素(document.createElementNS)

```javascript
document.onload = (function (){
            var div1 = document.querySelector("#div1");
            var svgT= document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgT.setAttribute("width", "100%");
            svgT.setAttribute("height", "400");
            svgT.setAttribute("fill", 'red');
            div1.appendChild(svgT);
            var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle1.setAttribute("id", "circle1");
            circle1.setAttribute("cx", "500");
            circle1.setAttribute("cy", "200");
            circle1.setAttribute("r", "50");
            circle1.setAttribute("fill", "transparent");
            circle1.setAttribute("stroke-width", "5");
            circle1.setAttribute("stroke", "red");
            svgT.appendChild(circle1);
            var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text1.setAttribute("id", "text1");
            text1.innerHTML = "科鲁兹";
            text1.setAttribute("x", '480');
            text1.setAttribute("y", '204');
            text1.setAttribute("fill", 'black');
            text1.setAttribute("anchor", 'middle');
            // text1.setAttribute("transform", "translate(-26,0)")
            svgT.appendChild(text1);
            var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line1.setAttribute("id", "line1");
            line1.setAttribute("x1", '500');
            line1.setAttribute("y1", '80');
            line1.setAttribute("x2", '500');
            line1.setAttribute("y2", '150');
            line1.setAttribute("stroke", 'black');
            line1.setAttribute("stroke-width", '2');
            svgT.appendChild(line1);
            var smCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            smCircle1.setAttribute("id", "smCircle1");
            smCircle1.setAttribute("cx", "500");
            smCircle1.setAttribute("cy", "40");
            smCircle1.setAttribute("r", "40");
            smCircle1.setAttribute("fill", "white");
            smCircle1.setAttribute("stroke-width", "5");
            smCircle1.setAttribute("stroke", "blue");
            svgT.appendChild(smCircle1);
            var smCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            smCircle2.setAttribute("id", "smCircle2");
            smCircle2.setAttribute("cx", "720");
            smCircle2.setAttribute("cy", "200");
            smCircle2.setAttribute("r", "40");
            smCircle2.setAttribute("fill", "white");
            smCircle2.setAttribute("stroke-width", "5");
            smCircle2.setAttribute("stroke", "blue");
            svgT.appendChild(smCircle2);
            var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("id", 'line2');
            line2.setAttribute("x1", '550');
            line2.setAttribute("y1", '200');
            line2.setAttribute("x2", '680');
            line2.setAttribute("y2", '200');
            line2.setAttribute("stroke", 'black');
            line2.setAttribute("stroke-width", '2');
            svgT.appendChild(line2);

            smCircle1.onmouseenter = function (){
                smCircle1.setAttribute("r", 50)    
            }
            smCircle1.onmouseleave = function (){
                smCircle1.setAttribute("r", 40)   
            }
            smCircle2.onmouseenter = function (){
                smCircle2.setAttribute("r", 50)   
            }
            smCircle2.onmouseleave = function (){
                smCircle2.setAttribute("r", 40)   
            }
    })();
```
