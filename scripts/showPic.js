/*1.页面加载完毕时执行多个函数*/
function addLoadEvent(func){
   var oldOnload=window.onload;
   if(typeof window.onload!="function"){
      window.onload=func;
   }
   else{
      window.onload=function(){
         oldOnload();
         func();
      }
   }
}

/*2.在已有元素后面插入一个新元素*/
function insertAfter(newElement,targetElement){
   var parent=targetElement.parentNode;
   if(parent.lastChild==targetElement){
      parent.appendChild(newElement);
   }
   else{
      parent.insertBefore(newElement,targetElement.nextSibling);
   }
}

/*3.创建一个img元素和一个p元素，并通过调用insertAfer函数将其插入到图片库里节点清单的后面*/
function preparePlaceholder(){
   if(!document.createElement) return false;
   if(!document.createTextNode) return false;
   if(!document.getElementById) return false;
   if(!document.getElementById("imageGallery")) return false;
   var placeholder=document.createElement("img");
   placeholder.setAttribute("id","placeholder");
   placeholder.setAttribute("src","images/timg.jpg");
   placeholder.setAttribute("alt","my image gallery");
   var description=document.createElement("p");
   description.setAttribute("id","description");
   var desctext=document.createTextNode("Choose an image");
   description.appendChild(desctext);
   var gallery=document.getElementById("imageGallery");
   insertAfter(placeholder,gallery);
   insertAfter(description,placeholder);
}

/*4.把“占位符”图片切换为目标图片*/
function showPic(whichPic){
   if(!document.getElementById("placeholder")) return false;
   var source=whichPic.getAttribute("href");
   var placeholder=document.getElementById("placeholder");
   if(placeholder.nodeName!="IMG") return false;
   placeholder.setAttribute("src",source);
   if(document.getElementById("description")){
      var text=whichPic.getAttribute("title")?whichPic.getAttribute("title"):"";
      var description=document.getElementById("description");
      if(description.firstChild.nodeType==3){
         description.firstChild.nodeValue=text;
      }      
   }
   return true;
}
/*遍历图片库里的每个链接，点击链接时调用showPic函数*/
function prepareGallery(){
   if(!document.getElementById||!document.getElementsByTagName) return false;
   if(!document.getElementById("imageGallery")) return false;
   var gallery=document.getElementById("imageGallery");
   var link=gallery.getElementsByTagName("a");
   for(var i=0;i<link.length;i++){
      link[i].onclick=function(){
         return showPic(this)?false:true;
      }
   }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

/*点击链接弹出指定大小的新窗口*/
// window.onload=prepareLinks;
// function prepareLinks(){
//    if(!document.getElementsByTagName) return false;
//    var links=document.getElementsByTagName("a");
//    for(var i=0;i<links.length;i++){
//       if(links[i].getAttribute("class")=="popup"){
//          links[i].onclick=function(){
//             popUp(this.getAttribute("href"));
//             return false;
//          }   
//       }
//    }
// }
// function popUp(winURL){
//    window.open(winURL,"popup","width=600,height=480");
// }

//window.onload=countBodyChildren;
// function countBodyChildren(){
//    var body_element=document.getElementsByTagName("body")[0];
//    alert(body_element.nodeType);
// }