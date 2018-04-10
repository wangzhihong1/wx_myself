const convertToStarsArray = function (stars) { // 评分公共函数
    // return 数组[1,1,1,2,0,0] ; 1代表一个星，2代表半颗星，0代表灰色的星
    var num1 = stars.toString().substr(0, 1);// 4
    //var num2 = stars.toString().substr(1, 1);// 5
    //console.log(num1);stras 的值只能是【05，10，15，20，25，30，35，40，45，50】
    //console.log(num2);
    var arr = [];
    
      for (var i = 1; i <= 5; i++) {
        if (i <= num1) {
          arr.push(1);
        } else {
          arr.push(0);
          // if(num2 = 5){
          //   arr.push(2);
          //   arr.push(0);
          //   arr.push(0);
          //   arr.push(0);
          //   arr.push(0);
          //   break;
          // }
        }
    }
    //arr.splice(5);
    
    return arr;

}
const http = function (url,callback){
  wx.request({
    url: url,
    success:function(res){
      //console.log(res);
      callback(res);
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http
}
