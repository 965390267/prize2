// rem实现布局，动态设置HTML字体大小make by zzh 2018-9-4
! function (designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    var rem = width * 100 / designWidth;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();

  win.addEventListener("resize", function () {
    clearTimeout(tid); //防止执行两次
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function (e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }
}(750, 750);



// function Ajax(url,type,data,cb,err) {
//   data=data||{};
//     var xmlhttp;
//     if (window.XMLHttpRequest) {
//       //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
//       xmlhttp = new XMLHttpRequest();
//     } else {
//       // IE6, IE5 浏览器执行代码
//       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlhttp.onreadystatechange = function () {
     
//       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     
//         console.log('rrr');
        
//         var resdata=JSON.parse(xmlhttp.responseText)
//         cb && cb(resdata);
//       }else{   
//         console.log('errrr');
        
//         // console.log(xmlhttp);
//         err&&err(xmlhttp.responseText)
//       }
//     }
//     xmlhttp.open(type, url, true);
//     if(data){
//       xmlhttp.setRequestHeader('Authorization', data.value)
//     }

//     if(type=='POST'){
//       xmlhttp.send(data);
//     }else{
//       xmlhttp.send();
//     }
    
//   }


  function getUrlParms(url){
    //首先获取地址
              var url = url || window.location.href;
              //获取传值
              var arr = url.split("?");
              //判断是否有传值
              if (arr.length == 1) {
                  return null;
              }
              //获取get传值的个数
              var value_arr = arr[1].split("&");
              //循环生成返回的对象
              var obj = {};
              for (var i = 0; i < value_arr.length; i++) {
                  var key_val = value_arr[i].split("=");
                  obj[key_val[0]] = key_val[1];
              }
              return obj;
  }