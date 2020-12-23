(function(){
    var myContext = document.querySelector('#myCanvas');
    var osContext = new OffscreenCanvas(500, 500);
    // console.log(myContext);
    if(myContext){
        var circle = myContext.getContext('2d');
        var osCircle = osContext.getContext('2d');
        var shapes = [];
        // var rect = myContext.getContext('2d');
        // var osRect = osContext.getContext('2d');
        // var stage = [];
        myContext.addEventListener('mousedown', function(e){
            dispatchEvent('MOUSEDOWN', e);
        })
        //绘制圆形
        // circle.beginPath();
        // circle.arc(290, 290, 50, 0, 2 * Math.PI);
        // circle.stroke();
        // stage.push(circle);
        // ctx.restore();

        //绘制矩形
        // rect.beginPath();
        // rect.strokeRect(160, 160, 160, 160);
        // rect.stroke();
        // stage.push(rect);
    }

    var helper = {
        id2rgba: function(id){
            return id.split('-');
        },

        rgba2id: function(rgba){
            return rgba.join('-');
        },

        generateId: function(){
            return Array(3).fill(0).map(()=>Math.ceil(Math.random() * 255)).concat(255).join('-');
        }
    };


    var eventSimulator = {
        listenerMap: {},
        //添加事件
        add: function(id, listener){
            //listener: {[eventName: string]: Listener[];},
            this.listenerMap[id] = listener;
        },
        //派发事件
        dispath: function(id, eventName, e){
            switch(eventName){
                case 'MOUSEDOWN':
                    this.fire(id, eventName, e);
            }
        },
        //触发事件
        fire: function(id, eventName, e){
            if(this.listenerMap[id] && this.listenerMap[id][eventName]){
                this.listenerMap[id][eventName].forEach(function(listener){
                    listener(e);
                })
            }
        },

        // //边际判断
        // judgePict: function(x, y){
        //     var rgba = Array.from(osCircle.getImageData(x, y).data);
        //     console.log(rgba);
        //     var id = helper.rgba2id(rgba);
        //     return id;
        // }
    };

    // console.log(helper.generateId);

    var Circle = {
        listener: {},
        id: helper.generateId(),
        drawContext: function(){
            circle.fillStyle = 'red';
            circle.beginPath();
            circle.arc(290, 290, 50, 0, 2 * Math.PI);
            circle.fill();
            osCircle.fillStyle = 'rgba('+helper.id2rgba(this.getId())[0] + ',' + helper.id2rgba(this.getId())[1] + ',' + helper.id2rgba(this.getId())[2]
            +','+helper.id2rgba(this.getId())[3]+')';
            osCircle.beginPath();
            osCircle.arc(290, 290, 50, 0, 2 * Math.PI);
            osCircle.fill();
        },
        getId: function(){
            return this.id;
        },
        getListener: function(){
            return this.listener;
        }
    };

    var Rect = {
        listener: {},
        id: helper.generateId(),
        drawContext: function(){
            circle.beginPath();
            circle.fillStyle = 'green';
            circle.fillRect(160, 160, 160, 160);
            circle.stroke();
            osCircle.fillStyle = 'rgba('+helper.id2rgba(this.getId())[0] + ',' + helper.id2rgba(this.getId())[1] + ',' + helper.id2rgba(this.getId())[2]
            +','+helper.id2rgba(this.getId())[3]+')';
            osCircle.beginPath();
            osCircle.fillRect(160, 160, 160, 160);
            osCircle.fill();
        },
        getId: function(){
            return this.id;
        },
        getListener: function(){
            return this.listener;
        },
        on: function(eventName, listener){
            switch(eventName){
                case 'MOUSEDOWN':
                    if(this.getListener()[eventName]){
                        this.getListener()[eventName].push(listener);
                    }else{
                        this.getListener()[eventName] = [listener];
                    }
            }
        }
    };

    // Rect.drawContext();
    // Circle.drawContext();
    Rect.on('MOUSEDOWN', function(){
        console.log('成功实现on的事件机制')
    })
    add(Rect);
    add(Circle);

    function add(shape){
        var id = shape.getId();
        eventSimulator.add(id, shape.getListener());
        shapes.push(id);
        shape.drawContext();
    }

    //派发事件
    function dispatchEvent(eventName, e){
        switch(eventName){
            case 'MOUSEDOWN':
                console.log('MOUSEDOWN', e);
                var x = e.offsetX;
                var y = e.offsetY;
                var id = judgePict(x, y);
                eventSimulator.dispath(id, 'MOUSEDOWN', e);
                break;
        }
    }

    //边际判断
    // rgba  <----->  id(id是怎么储存的)
    function judgePict(x, y){
        var rgba = Array.from(osCircle.getImageData(x, y, 1, 1).data);
        console.log(rgba);
        var id = helper.rgba2id(rgba);
        console.log(id, shapes);
        return id;
    }
})();