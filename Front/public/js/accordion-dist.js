"use strict";function Accordion(e){this.container=e.container,this.mainTitle=e.mainTitle,this.panels=e.panels}Accordion.prototype.start=function(){var e=document.getElementById(this.container);if(this.mainTitle){var t=document.createElement("h1");t.className="accordion-main-title",t.innerHTML=this.mainTitle,e.appendChild(t)}if(0<this.panels.length){var s=document.createElement("div");s.className="panels-wrapper",this.panels.forEach(function(e,t){var n=document.createElement("div");n.className="panel";var a=document.createElement("i");a.className="material-icons",a.innerHTML="expand_more",n.appendChild(a);var i=document.createElement("h2");if(i.className="panel-title",i.innerHTML=e.title,n.appendChild(i),e.subtitle){var l=document.createElement("h3");l.className="panel-subtitle",l.innerHTML=e.subtitle,n.appendChild(l)}var c=document.createElement("div");c.className="panel-content";var r=(new DOMParser).parseFromString(e.content,"text/html").body.childNodes;Array.from(r).forEach(function(e){c.appendChild(e)}),n.appendChild(c),n.addEventListener("click",function(){for(var e=s.children,t=0;t<e.length;t++)this===e[t]?this.classList.toggle("active"):(e[t].classList.remove("active"),e[t].getElementsByTagName("i")[0].innerHTML="expand_more")}),s.appendChild(n)})}e.appendChild(s)};