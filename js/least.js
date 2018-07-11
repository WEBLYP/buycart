/**
 * Created by WEB on 2017/11/20.
 */
/*------------------lyp修改于---20180623--------------------*/


var least=function () {

	/*选项卡*/
  this.tabs=function(dom,cla,pages,clas){
  	dom.click(function(){
  		var $index=$(this).index();
  		$(this).addClass(cla).siblings().removeClass(cla);
  		if(pages){pages.eq($index).show().siblings().hide()}
  		if(pages&&clas){
  			pages.eq($index).addClass(clas).siblings().removeClass(clas)
  		}
  	})
  };

  /*获取非行间样式*/
  this.getstyle=function(obj,json){
     if(obj.currentStyle){
     	return obj.currentStyle
     }else{
     	return getComputedStyle(obj,false)[attr]
     }
  };


  /*获取验证码*/
  this.getcode=function(codebtn){
  	var t=60;
  	codebtn.click(function(){
  		var that=codebtn;
        var timer=setInterval(function(){
        	that.attr('disabled',true);
        	t--;
        	if(t<0){t=60;clearInterval(timer);that.text('点击发送');that.attr('disabled',false)}else{that.text(t+'s后重新发送')}
        },1000)
  	})
  };

  /*日期或时间出现个位数时加0*/
  this.timeadd0=function(value){/*如传递的value为5，运算结果则为05*/
    return value<10?'0'+value:value;
  };
  

  /*隐藏卡号，给卡号间隔*/
  this.cardhide=function(cards){
      var reg;
      for(var i=0;i<cards.length;i++){
         /*判断储蓄卡号长度(一般为19/16位)*/
        /*隐藏卡号*/
        if(cards.eq(i).text().length==19){reg= /^(\d{6})\d{7}(\d{6})$/}else{reg= /^(\d{6})\d{4}(\d{6})$/};
        cards.eq(i).text(cards.eq(i).text().replace(reg, "$1****$2"));
         /*给卡号间隔*/
         /\S{5}/.test(cards.eq(i).text()) && cards.eq(i).text(cards.eq(i).text().replace(/\s/g,' ').replace(/(.{4})/g, "$1  "));
      }
  };

  /*截取卡号后4位*/
  this.cutcardnum=function(nums){/*nums为卡号*/
       nums.substr(nums.length-4)
  };

  /*判断是否出现滚动条*/
  this.overflow=function() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
  };


  /*隐藏手机号*/
  this.phonehide=function(dom){

      var reg = /^(\d{3})\d{4}(\d{4})$/;
      
    for(var i=0;i<dom.length;i++){
      dom.eq(i).text(dom.eq(i).text().replace(reg, "$1****$2"))
    }
  };
  

  /*关闭遮罩层*/
  this.close=function close() {
      $('.close_btn').click(function () {
          $('.shadow').addClass('hide')
      });
      $('.shadow').click(function () {
          $(this).addClass('hide')
      })
  };


  /*滚动渐变*/
  this.jianbian=function(dom,box) {
      /*dom为需要变色的，box是内容主体*/
      var x;
      box.scroll(function(e){
          var $this =$(this),
              viewH =$(this).height(),//可见高度
              contentH =$(this).get(0).scrollHeight,//内容高度
              scrollTop =$(this).scrollTop();//滚动高度
          x=parseInt((scrollTop/contentH)*10)*0.25;
          var change='rgba(255, 255, 255,'+ x +')';
          if(x==0){change='rgba(0, 0, 0,0.3)';dom.css('border','none')}
          if(x>=0.5){dom.css('border-bottom','1px solid #D7D6DC')}
          dom.css('background',change);
      });
  };

  /*运动框架*//*石川老师*/
  this.move=function(obj,json,fnEnd){
     clearInterval(obj.timer);
     obj.timer=setInterval(function(){
      var allstyle=true;
      for(attr in json){
          var getcss;/*获取css*/
          if(attr=='opacity'){/*针对没有opacity和color以及没有px单位的属性值*/
              getcss=parseFloat(getstyle(obj,attr)*100)
          }else{
              getcss=parseInt(getstyle(obj,attr))
          }
          speed=(json[attr]-getcss)/6;
          speed=speed>0?Math.ceil(speed):Math.floor(speed);
          if(getcss!=json[attr]){allstyle=false};
          if(attr=='opacity'){
              obj.style.filter='alpha(opacity:'+(getcss+speed)+')';
              obj.style.opacity=(getcss+speed)/100;
          }else{
              obj.style[attr]=getcss+speed+'px';
          }if(allstyle){
              clearInterval(obj.timer);
              if(fnEnd){fnEnd()}
          }
      }
     },30)
  };



  /*滚动加载更多*/
   this.scrollmore=function(dom){
	   var gd=null;
	   dom.scroll(function(e){
	    var $this =$(this),
	        viewH =$(this).height(),//可见高度
	        contentH =$(this).get(0).scrollHeight,//内容高度
	        scrollTop =$(this).scrollTop();//滚动高度

	    /*----↓----延迟加载更多---↓---*/
	    if(gd!=null){ clearInterval(gd);gd=null }
	    gd=setTimeout(function () {
	        if(scrollTop/(contentH -viewH)>=0.95){ //到达底部xxx时,加载新内容
                

                /*-------------------↓--------------加载完成的条件----------------↓-------------*/
	        	if(0){

              $('#seemore').text('加载完成').show();

              setTimeout(function () {

                $('#seemore').hide()

                },2000);

              return 
            };
	        	/*-------------------↑--------------加载完成的条件----------------↑-------------*/

               $('#seemore').show();
               setTimeout(function () {
                $('#seemore').hide();
               },1000);


               /*--------------↓-------ajax数据请求----------↓---------*/
               $.ajax({
               	url:'http://10.0.0.123/test.json',
               	type:'get',
               	success:function(res){
               		console.log(res)
               	}
               })

              /*--------------↑-------ajax数据请求----------↑---------*/
	        }

	    },500)

	   /*---↑-----延迟加载更多----↑--*/

	});

 };




    /*图片前端JS压缩并上传功能体验------------张鑫旭----------*/
   this.compress=function (dom) {/*dom是需要放置压缩后的容器*/
       var eleFile = document.querySelector('#file');

// 压缩图片需要的一些元素和对象
       var reader = new FileReader(), img = new Image();

// 选择的文件对象
       var file = null;

// 缩放图片需要的canvas
       var canvas = document.createElement('canvas');
       var context = canvas.getContext('2d');

// base64地址图片加载完毕后
       img.onload = function () {
           // 图片原始尺寸
           var originWidth = this.width;
           var originHeight = this.height;
           // 最大尺寸限制
           var maxWidth = 400, maxHeight = 400;
           // 目标尺寸
           var targetWidth = originWidth, targetHeight = originHeight;
           // 图片尺寸超过400x400的限制
           if (originWidth > maxWidth || originHeight > maxHeight) {
               if (originWidth / originHeight > maxWidth / maxHeight) {
                   // 更宽，按照宽度限定尺寸
                   targetWidth = maxWidth;
                   targetHeight = Math.round(maxWidth * (originHeight / originWidth));
               } else {
                   targetHeight = maxHeight;
                   targetWidth = Math.round(maxHeight * (originWidth / originHeight));
               }
           }

           // canvas对图片进行缩放
           canvas.width = targetWidth;
           canvas.height = targetHeight;
           // 清除画布
           context.clearRect(0, 0, targetWidth, targetHeight);
           // 图片压缩
           context.drawImage(img, 0, 0, targetWidth, targetHeight);
           // canvas转为blob
           canvas.toBlob(function (blob) {
		               // 图片ajax上传
		        var xhr = new XMLHttpRequest();
		        // 文件上传成功
		        xhr.onreadystatechange = function() {
		            if (xhr.status == 200) {
		                // xhr.responseText就是返回的数据
		            }
		        };
		        // 开始上传
		        xhr.open("POST", 'upload.php', true);
		        xhr.send(blob);

           },file.type || 'image/png');
           dom.append(canvas)
       };

// 文件base64化，以便获知图片原始尺寸
       reader.onload = function(e) {
           img.src = e.target.result;
       };
       eleFile.addEventListener('change', function (event) {
           file = event.target.files[0];
           // 选择的文件是图片
           if (file.type.indexOf("image") == 0) {
               reader.readAsDataURL(file);
           }
       });
   };

   
    /*点击下载图片*//*需要html2canvas*//*需要html2canvas*//*需要html2canvas*//*需要html2canvas*//*需要html2canvas*/
   this.downloadimg=function(dom,img){ /*dom为点击的元素，img为需要下载的图片*/
           /*需要html2canvas*/
      function download(img){

        html2canvas(img).then(function(canvas) {
           var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
           var a = document.createElement('a');
           var event = new MouseEvent('click');
           a.download = new Date().getTime()+ ".png";
           a.href = imgUri;
           a.dispatchEvent(event);

        });
        
      };

      dom.click(function(){
         download();
      });
   }


      /*打印*/
   this.print=function(dom,need){/*dom为点击的元素,need为需要打印的元素*/
     dom.click(function(){

         html2canvas(need).then(function(canvas) {
         var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

         var tpl='<img id="mysetimg" style="position: relative;display: block;top: 50%;transform: translateY(-50%);margin: 0 auto;" src='+imgUri+' />'
         document.body.innerHTML=tpl;
         setTimeout(function(){window.print();},1000)
         });
     })
   }


   
   /*表单验证*/
   this.formcheck=function(){
     $('form input').blur(function(){
         
          var that=$(this);
          var name=that.attr('name');

          switch(name){
             case 'name':
               if(that.val().length==0){
                console.log('输入姓名')
               }
          }
     })
   };
};