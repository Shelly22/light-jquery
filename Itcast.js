//引入沙箱，减少变量的公开，防止变量污染
(function (window) {

//引入构造函数
    function F(selector) {
        [].push.apply(this, F.select(selector));//将select函数遍历的dom对象所形成的伪数组存入this中
    };

    //实例方法 放在构造函数的原型上的属性与方法，通过实例可以访问到 each 与 map
    F.prototype.each = function (callback) {//遍历this，包含dom元素的伪数组，用callback对遍历的伪数组进行处理
        return F.each(this, callback);//return this,实现链式编程
    }

    F.prototype.map = function (callback) {
        return F.map(this, callback);
    }
    //静态方法，挂载在构造函数上的，实例访问不到
    F.select = function (selector) {
        return document.querySelectorAll(selector);
    };

    //判断obj是否是类数组
    F.isArrayLike = function (obj) {
        if (Object.prototype.toString.call(obj) == '[object Array]') {
            return true;
        }
        ;//，判断obj是不是一个真数组
        var length = 'length' in obj && obj.length;
        return typeof length === 'number' && length >= 0;
    };//判断obj是不是一个伪数组

    //each 与 map方法
    F.each = function (arr, callback) {
        if (F.isArrayLike(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (callback.call(arr[i], i, arr[i]) === false) break;
            }//调用call方法，是为了模仿jq，将回调函数中的this指向当前遍历的元素，全等于false是，break，跳出循环，为了实现return false时，跳出函数
        } else {
            for (var key in arr) {
                if (callback.call(arr[key], key, arr[key]) === false) break;
            }
        }
        return arr;//each 方法可以返回被遍历的那个对象数组
    };

    F.map = function (arr, callback) {
        var newArr = [], tmp;
        if (F.isArrayLike(arr)) {
            for (var i = 0; i < arr.length; i++) {
                tmp = callback(arr[i], i);
                if (tmp != null) { //只有当新元素是存在的时候，才会组成新数组返回
                    newArr.push(tmp);
                }
            }
        } else {
            for (var key in arr) {
                tmp = callback(arr[key], key);
                if (tmp != null) {
                    newArr.push(tmp);
                }
            }
        }
        ;
        return newArr; // map 方法可以返回由回调函数对原数组中的元素处理过的新数组
    }

//引入工厂函数
    function I(selector) {
        return new F(selector)
    };
    window.I = I;
    window.F = F;
})(window);

