(function (window, undefined) {
    var god = {};
    /*
    存储飞船对象
     */
    god.spaceshipObject = [];
    /*
    无线电介质
     */
    var contain = basicFunction.getElement("#contain");
    god.createSpaceship = function (orbitId) {
        //1秒后发送创建飞船消息
        setTimeout(function() {
            //一定概率（30%）丢包
            if(Math.random() <= 0.3) {
                basicFunction.showMessage("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
                return;
            }
            basicFunction.showMessage("向轨道" + (orbitId + 1) + "发送 create 指令成功！", "green");
            god.spaceshipObject.push(new Spaceship(orbitId));
            var spaceshipDiv = document.createElement("div");
            spaceshipDiv.id = "spaceship" + orbitId;
            spaceshipDiv.className = "space-ship orbit-ship" + orbitId;
            spaceshipDiv.innerHTML = "<div></div><p>100%</p>";
            contain.appendChild(spaceshipDiv);
        }, 1000);
    };
    god.Mediator = {
        sendMessage: function (message) {
            //1秒后发送消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    basicFunction.showMessage("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
                    return;
                }
                basicFunction.showMessage("向轨道" + (message.id + 1) + "发送 " + message.command + " 指令成功！", "green");
                for(var i = 0; i < god.spaceshipObject.length; i++) {
                    //已销毁的飞船不处理
                    if(god.spaceshipObject[i].destroyed) {
                        continue;
                    }
                    //向飞船发送消息
                    god.spaceshipObject[i].radioSystem.recieveMessage(message);
                }
            }, 1000);
        }
    };
    window.god = god;
})(window);