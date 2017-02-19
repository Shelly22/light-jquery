//����ɳ�䣬���ٱ����Ĺ�������ֹ������Ⱦ
(function (window) {

//���빹�캯��
    function F(selector) {
        [].push.apply(this, F.select(selector));//��select����������dom�������γɵ�α�������this��
    };

    //ʵ������ ���ڹ��캯����ԭ���ϵ������뷽����ͨ��ʵ�����Է��ʵ� each �� map
    F.prototype.each = function (callback) {//����this������domԪ�ص�α���飬��callback�Ա�����α������д���
        return F.each(this, callback);//return this,ʵ����ʽ���
    }

    F.prototype.map = function (callback) {
        return F.map(this, callback);
    }
    //��̬�����������ڹ��캯���ϵģ�ʵ�����ʲ���
    F.select = function (selector) {
        return document.querySelectorAll(selector);
    };

    //�ж�obj�Ƿ���������
    F.isArrayLike = function (obj) {
        if (Object.prototype.toString.call(obj) == '[object Array]') {
            return true;
        }
        ;//���ж�obj�ǲ���һ��������
        var length = 'length' in obj && obj.length;
        return typeof length === 'number' && length >= 0;
    };//�ж�obj�ǲ���һ��α����

    //each �� map����
    F.each = function (arr, callback) {
        if (F.isArrayLike(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (callback.call(arr[i], i, arr[i]) === false) break;
            }//����call��������Ϊ��ģ��jq�����ص������е�thisָ��ǰ������Ԫ�أ�ȫ����false�ǣ�break������ѭ����Ϊ��ʵ��return falseʱ����������
        } else {
            for (var key in arr) {
                if (callback.call(arr[key], key, arr[key]) === false) break;
            }
        }
        return arr;//each �������Է��ر��������Ǹ���������
    };

    F.map = function (arr, callback) {
        var newArr = [], tmp;
        if (F.isArrayLike(arr)) {
            for (var i = 0; i < arr.length; i++) {
                tmp = callback(arr[i], i);
                if (tmp != null) { //ֻ�е���Ԫ���Ǵ��ڵ�ʱ�򣬲Ż���������鷵��
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
        return newArr; // map �������Է����ɻص�������ԭ�����е�Ԫ�ش������������
    }

//���빤������
    function I(selector) {
        return new F(selector)
    };
    window.I = I;
    window.F = F;
})(window);

