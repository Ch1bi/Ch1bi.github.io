(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?module.exports=t():typeof define==="function"&&define.amd?define(t):e.FakeXMLHttpRequest=t()})(this,function(){"use strict";var e=function d(e,t,r,s){this.type=e;this.bubbles=t;this.cancelable=r;this.target=s};e.prototype={stopPropagation:function(){},preventDefault:function(){this.defaultPrevented=true}};var t={100:"Continue",101:"Switching Protocols",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",300:"Multiple Choice",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",422:"Unprocessable Entity",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported"};function r(e){var t;if(typeof DOMParser!="undefined"){var r=new DOMParser;t=r.parseFromString(e,"text/xml")}else{t=new ActiveXObject("Microsoft.XMLDOM");t.async="false";t.loadXML(e)}return t}var s={"Accept-Charset":true,"Accept-Encoding":true,Connection:true,"Content-Length":true,Cookie:true,Cookie2:true,"Content-Transfer-Encoding":true,Date:true,Expect:true,Host:true,"Keep-Alive":true,Referer:true,TE:true,Trailer:true,"Transfer-Encoding":true,Upgrade:true,"User-Agent":true,Via:true};function n(e,t){t.addEventListener(e,function(r){var s=t["on"+e];if(s&&typeof s=="function"){s(r)}})}function i(){this._eventListeners={};var e=["loadstart","progress","load","abort","loadend"];for(var t=e.length-1;t>=0;t--){n(e[t],this)}}i.prototype={addEventListener:function y(e,t){this._eventListeners[e]=this._eventListeners[e]||[];this._eventListeners[e].push(t)},removeEventListener:function _(e,t){var r=this._eventListeners[e]||[];for(var s=0,n=r.length;s<n;++s){if(r[s]==t){return r.splice(s,1)}}},dispatchEvent:function v(e){var t=e.type;var r=this._eventListeners[t]||[];for(var s=0;s<r.length;s++){if(typeof r[s]=="function"){r[s].call(this,e)}else{r[s].handleEvent(e)}}return!!e.defaultPrevented},_progress:function E(t,r,s){var n=new e("progress");n.target=this;n.lengthComputable=t;n.loaded=r;n.total=s;this.dispatchEvent(n)}};function o(){i.call(this);this.readyState=o.UNSENT;this.requestHeaders={};this.requestBody=null;this.status=0;this.statusText="";this.upload=new i}o.prototype=new i;o.UNSENT=0;o.OPENED=1;o.HEADERS_RECEIVED=2;o.LOADING=3;o.DONE=4;var a={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4,async:true,withCredentials:false,open:function m(e,t,r,s,n){this.method=e;this.url=t;this.async=typeof r=="boolean"?r:true;this.username=s;this.password=n;this.responseText=null;this.responseXML=null;this.requestHeaders={};this.sendFlag=false;this._readyStateChange(o.OPENED)},setRequestHeader:function g(e,t){l(this);if(s[e]||/^(Sec-|Proxy-)/.test(e)){throw new Error('Refused to set unsafe header "'+e+'"')}if(this.requestHeaders[e]){this.requestHeaders[e]+=","+t}else{this.requestHeaders[e]=t}},send:function S(t){l(this);if(!/^(get|head)$/i.test(this.method)){if(!this.requestHeaders["Content-Type"]&&!(t||"").toString().match("FormData")){this.requestHeaders["Content-Type"]="text/plain;charset=UTF-8"}this.requestBody=t}this.errorFlag=false;this.sendFlag=this.async;this._readyStateChange(o.OPENED);if(typeof this.onSend=="function"){this.onSend(this)}this.dispatchEvent(new e("loadstart",false,false,this))},abort:function b(){this.aborted=true;this.responseText=null;this.errorFlag=true;this.requestHeaders={};if(this.readyState>o.UNSENT&&this.sendFlag){this._readyStateChange(o.DONE);this.sendFlag=false}this.readyState=o.UNSENT;this.dispatchEvent(new e("abort",false,false,this));if(typeof this.onerror==="function"){this.onerror()}},getResponseHeader:function T(e){if(this.readyState<o.HEADERS_RECEIVED){return null}if(/^Set-Cookie2?$/i.test(e)){return null}e=e.toLowerCase();for(var t in this.responseHeaders){if(t.toLowerCase()==e){return this.responseHeaders[t]}}return null},getAllResponseHeaders:function R(){if(this.readyState<o.HEADERS_RECEIVED){return""}var e="";for(var t in this.responseHeaders){if(this.responseHeaders.hasOwnProperty(t)&&!/^Set-Cookie2?$/i.test(t)){e+=t+": "+this.responseHeaders[t]+"\r\n"}}return e},overrideMimeType:function q(e){if(typeof e==="string"){this.forceMimeType=e.toLowerCase()}},_readyStateChange:function O(t){this.readyState=t;if(typeof this.onreadystatechange=="function"){this.onreadystatechange(new e("readystatechange"))}this.dispatchEvent(new e("readystatechange"));if(this.readyState==o.DONE){this.dispatchEvent(new e("load",false,false,this));this.dispatchEvent(new e("loadend",false,false,this))}},_setResponseHeaders:function w(e){this.responseHeaders={};for(var t in e){if(e.hasOwnProperty(t)){this.responseHeaders[t]=e[t]}}if(this.forceMimeType){this.responseHeaders["Content-Type"]=this.forceMimeType}if(this.async){this._readyStateChange(o.HEADERS_RECEIVED)}else{this.readyState=o.HEADERS_RECEIVED}},_setResponseBody:function k(e){h(this);c(this);f(e);var t=this.chunkSize||10;var s=0;this.responseText="";do{if(this.async){this._readyStateChange(o.LOADING)}this.responseText+=e.substring(s,s+t);s+=t}while(s<e.length);var n=this.getResponseHeader("Content-Type");if(this.responseText&&(!n||/(text\/xml)|(application\/xml)|(\+xml)/.test(n))){try{this.responseXML=r(this.responseText)}catch(i){}}if(this.async){this._readyStateChange(o.DONE)}else{this.readyState=o.DONE}},respond:function N(e,r,s){this._setResponseHeaders(r||{});this.status=typeof e=="number"?e:200;this.statusText=t[this.status];this._setResponseBody(s||"")}};for(var u in a){o.prototype[u]=a[u]}function l(e){if(e.readyState!==o.OPENED){throw new Error("INVALID_STATE_ERR")}if(e.sendFlag){throw new Error("INVALID_STATE_ERR")}}function h(e){if(e.readyState==o.DONE){throw new Error("Request done")}}function c(e){if(e.async&&e.readyState!=o.HEADERS_RECEIVED){throw new Error("No headers received")}}function f(e){if(typeof e!="string"){var t=new Error("Attempted to respond to fake XMLHttpRequest with "+e+", which is not a string.");t.name="InvalidBodyException";throw t}}var p=o;return p});(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?module.exports=t():typeof define==="function"&&define.amd?define("restli-utils",t):e["restli-utils"]=t()})(this,function(){"use strict";var e=/[,()':]/g;var t=/[,()':]/;var r={encode:function c(e){e=JSON.parse(JSON.stringify(e));if(typeof e!=="object"){throw new Error("You must pass either an array or an object to the encode function.")}return this._process(e,false)},reducedEncode:function f(e){e=JSON.parse(JSON.stringify(e));if(typeof e!=="object"){throw new Error("You must pass either an array or an object to the reducedEncode function.")}return this._process(e,true)},paramEncode:function p(e){e=JSON.parse(JSON.stringify(e));if(e instanceof Array||typeof e!=="object"){throw new Error("You must pass an object to the paramEncode function. Use arrayParamEncode.")}var t=[];for(var r in e){if(!e.hasOwnProperty(r)){continue}t.push(this._processPrimitive(r)+"="+this._process(e[r],false))}return t.join("&")},arrayParamEncode:function d(e){return this.paramEncode(this._arrayParamEncode(e))},_arrayParamEncode:function y(e){e=JSON.parse(JSON.stringify(e));if(!(e instanceof Array)){throw new Error("You must pass an array to the arrayParamEncode function.")}return e.reduce(function(e,t){if(!t||!t.hasOwnProperty("name")||!t.hasOwnProperty("value")){throw new Error("Objects passed to the arrayParamEncode function must have name and value properties.")}if(typeof t.value==="object"&&t.value!==null){throw new Error("Only primitives may be passed to arrayParamEncode as item values.")}var r=t.name;var s=e.hasOwnProperty(r);if(!s){e[r]=t.value}else if(s&&typeof e[r]==="object"&&e[r]!==null){e[r].push(t.value)}else{e[r]=[e[r],t.value]}return e},{})},_process:function _(e,t){if(e instanceof Array){return this._processArray(e,t)}else if(typeof e==="object"&&e!==null){return this._processObject(e,t)}else{return this._processPrimitive(e,t)}},_processArray:function v(e,t){var r=new Array(e.length);for(var s=0;s<e.length;s++){r[s]=this._process(e[s],t)}return"List("+r.join(",")+")"},_processObject:function E(e,t){var r=[];for(var s in e){if(!e.hasOwnProperty(s)){continue}r.push(this._processPrimitive(s,t)+":"+this._process(e[s],t))}return"("+r.join(",")+")"},_processPrimitive:function m(r,s){if(r===""){return"''"}else if(s&&typeof r==="string"&&t.test(r)){return r.replace(e,escape)}else if(!s){return encodeURIComponent(r).replace(e,escape)}else{return r}}};var s=function(){var e=function(e,t,r,s){for(r=r||{},s=e.length;s--;r[e[s]]=t);return r},t=[1,5],r=[1,6],s=[1,7],n=[1,8],i=[5,12,13],o=[1,17],a=[1,18],u=[12,13];var l={trace:function f(){},yy:{},symbols_:{error:2,wrapper:3,item:4,EOF:5,array:6,object:7,VALUE:8,EMPTYSTRING:9,"List(":10,items:11,")":12,",":13,"(":14,kvpairs:15,kvpair:16,key:17,":":18,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",8:"VALUE",9:"EMPTYSTRING",10:"List(",12:")",13:",",14:"(",18:":"},productions_:[0,[3,2],[4,1],[4,1],[4,1],[4,1],[6,3],[6,2],[11,1],[11,3],[7,3],[7,2],[15,1],[15,3],[17,1],[17,1],[16,3]],performAction:function p(e,t,r,s,n,i,o){var a=i.length-1;switch(n){case 1:return JSON.parse(i[a-1]);break;case 2:case 3:case 14:this.$=i[a];break;case 4:this.$='"'+s.restliUnescape(i[a],s.reduced).replace('"','\\"')+'"';break;case 5:this.$='""';break;case 6:this.$="["+i[a-1]+"]";break;case 7:this.$="[]";break;case 8:case 12:this.$=""+i[a];break;case 9:case 13:this.$=""+i[a-2]+","+i[a];break;case 10:this.$="{"+i[a-1]+"}";break;case 11:this.$="{}";break;case 15:this.$="";break;case 16:this.$='"'+s.restliUnescape(i[a-2],s.reduced).replace('"','\\"')+'":'+i[a];break}},table:[{3:1,4:2,6:3,7:4,8:t,9:r,10:s,14:n},{1:[3]},{5:[1,9]},e(i,[2,2]),e(i,[2,3]),e(i,[2,4]),e(i,[2,5]),{4:12,6:3,7:4,8:t,9:r,10:s,11:10,12:[1,11],14:n},{8:o,9:a,12:[1,14],15:13,16:15,17:16},{1:[2,1]},{12:[1,19],13:[1,20]},e(i,[2,7]),e(u,[2,8]),{12:[1,21],13:[1,22]},e(i,[2,11]),e(u,[2,12]),{18:[1,23]},{18:[2,14]},{18:[2,15]},e(i,[2,6]),{4:24,6:3,7:4,8:t,9:r,10:s,14:n},e(i,[2,10]),{8:o,9:a,16:25,17:16},{4:26,6:3,7:4,8:t,9:r,10:s,14:n},e(u,[2,9]),e(u,[2,13]),e(u,[2,16])],defaultActions:{9:[2,1],17:[2,14],18:[2,15]},parseError:function d(e,t){if(t.recoverable){this.trace(e)}else{var r=function s(e,t){this.message=e;this.hash=t};r.prototype=Error;throw new r(e,t)}},parse:function y(e){var t=this,r=[0],s=[],n=[null],i=[],o=this.table,a="",u=0,l=0,h=0,c=2,f=1;var p=i.slice.call(arguments,1);var d=Object.create(this.lexer);var y={yy:{}};for(var _ in this.yy){if(Object.prototype.hasOwnProperty.call(this.yy,_)){y.yy[_]=this.yy[_]}}d.setInput(e,y.yy);y.yy.lexer=d;y.yy.parser=this;if(typeof d.yylloc=="undefined"){d.yylloc={}}var v=d.yylloc;i.push(v);var E=d.options&&d.options.ranges;if(typeof y.yy.parseError==="function"){this.parseError=y.yy.parseError}else{this.parseError=Object.getPrototypeOf(this).parseError}e:var m=function(){var e;e=d.lex()||f;if(typeof e!=="number"){e=t.symbols_[e]||e}return e};var g,S,b,T,R,q,O={},w,k,N,I;while(true){b=r[r.length-1];if(this.defaultActions[b]){T=this.defaultActions[b]}else{if(g===null||typeof g=="undefined"){g=m()}T=o[b]&&o[b][g]}if(typeof T==="undefined"||!T.length||!T[0]){var P="";I=[];for(w in o[b]){if(this.terminals_[w]&&w>c){I.push("'"+this.terminals_[w]+"'")}}if(d.showPosition){P="Parse error on line "+(u+1)+":\n"+d.showPosition()+"\nExpecting "+I.join(", ")+", got '"+(this.terminals_[g]||g)+"'"}else{P="Parse error on line "+(u+1)+": Unexpected "+(g==f?"end of input":"'"+(this.terminals_[g]||g)+"'")}this.parseError(P,{text:d.match,token:this.terminals_[g]||g,line:d.yylineno,loc:v,expected:I})}if(T[0]instanceof Array&&T.length>1){throw new Error("Parse Error: multiple actions possible at state: "+b+", token: "+g)}switch(T[0]){case 1:r.push(g);n.push(d.yytext);i.push(d.yylloc);r.push(T[1]);g=null;if(!S){l=d.yyleng;a=d.yytext;u=d.yylineno;v=d.yylloc;if(h>0){h--}}else{g=S;S=null}break;case 2:k=this.productions_[T[1]][1];O.$=n[n.length-k];O._$={first_line:i[i.length-(k||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(k||1)].first_column,last_column:i[i.length-1].last_column};if(E){O._$.range=[i[i.length-(k||1)].range[0],i[i.length-1].range[1]]}q=this.performAction.apply(O,[a,l,u,y.yy,T[1],n,i].concat(p));if(typeof q!=="undefined"){return q}if(k){r=r.slice(0,-1*k*2);n=n.slice(0,-1*k);i=i.slice(0,-1*k)}r.push(this.productions_[T[1]][0]);n.push(O.$);i.push(O._$);N=o[r[r.length-2]][r[r.length-1]];r.push(N);break;case 3:return true}}return true}};var h=function(){var e={EOF:1,parseError:function t(e,r){if(this.yy.parser){this.yy.parser.parseError(e,r)}else{throw new Error(e)}},setInput:function(e,t){this.yy=t||this.yy||{};this._input=e;this._more=this._backtrack=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};if(this.options.ranges){this.yylloc.range=[0,0]}this.offset=0;return this},input:function(){var e=this._input[0];this.yytext+=e;this.yyleng++;this.offset++;this.match+=e;this.matched+=e;var t=e.match(/(?:\r\n?|\n).*/g);if(t){this.yylineno++;this.yylloc.last_line++}else{this.yylloc.last_column++}if(this.options.ranges){this.yylloc.range[1]++}this._input=this._input.slice(1);return e},unput:function(e){var t=e.length;var r=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-t);this.offset-=t;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);if(r.length-1){this.yylineno-=r.length-1}var n=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:r?(r.length===s.length?this.yylloc.first_column:0)+s[s.length-r.length].length-r[0].length:this.yylloc.first_column-t};if(this.options.ranges){this.yylloc.range=[n[0],n[0]+this.yyleng-t]}this.yyleng=this.yytext.length;return this},more:function(){this._more=true;return this},reject:function(){if(this.options.backtrack_lexer){this._backtrack=true}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}return this},less:function(e){this.unput(this.match.slice(e))},pastInput:function(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var e=this.match;if(e.length<20){e+=this._input.substr(0,20-e.length)}return(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var e=this.pastInput();var t=new Array(e.length+1).join("-");return e+this.upcomingInput()+"\n"+t+"^"},test_match:function(e,t){var r,s,n;if(this.options.backtrack_lexer){n={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done};if(this.options.ranges){n.yylloc.range=this.yylloc.range.slice(0)}}s=e[0].match(/(?:\r\n?|\n).*/g);if(s){this.yylineno+=s.length}this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length};this.yytext+=e[0];this.match+=e[0];this.matches=e;this.yyleng=this.yytext.length;if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng]}this._more=false;this._backtrack=false;this._input=this._input.slice(e[0].length);this.matched+=e[0];r=this.performAction.call(this,this.yy,this,t,this.conditionStack[this.conditionStack.length-1]);if(this.done&&this._input){this.done=false}if(r){return r}else if(this._backtrack){for(var i in n){this[i]=n[i]}return false}return false},next:function(){if(this.done){return this.EOF}if(!this._input){this.done=true}var e,t,r,s;if(!this._more){this.yytext="";this.match=""}var n=this._currentRules();for(var i=0;i<n.length;i++){r=this._input.match(this.rules[n[i]]);if(r&&(!t||r[0].length>t[0].length)){t=r;s=i;if(this.options.backtrack_lexer){e=this.test_match(r,n[i]);if(e!==false){return e}else if(this._backtrack){t=false;continue}else{return false}}else if(!this.options.flex){break}}}if(t){e=this.test_match(t,n[s]);if(e!==false){return e}return false}if(this._input===""){return this.EOF}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}},lex:function r(){var e=this.next();if(e){return e}else{return this.lex()}},begin:function s(e){this.conditionStack.push(e)},popState:function n(){var e=this.conditionStack.length-1;if(e>0){return this.conditionStack.pop()}else{return this.conditionStack[0]}},_currentRules:function i(){if(this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules}else{return this.conditions["INITIAL"].rules}},topState:function o(e){e=this.conditionStack.length-1-Math.abs(e||0);if(e>=0){return this.conditionStack[e]}else{return"INITIAL"}},pushState:function a(e){this.begin(e)},stateStackSize:function u(){return this.conditionStack.length},options:{},performAction:function l(e,t,r,s){var n=s;switch(r){case 0:return 10;break;case 1:return 14;break;case 2:return 12;break;case 3:return 18;break;case 4:return 13;break;case 5:return 9;break;case 6:return 8;break;case 7:return 5;break;case 8:return"INVALID";break}},rules:[/^(?:List\()/,/^(?:\()/,/^(?:\))/,/^(?::)/,/^(?:,)/,/^(?:'')/,/^(?:[^\)\:\,]+)/,/^(?:$)/,/^(?:.)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8],inclusive:true}}};return e}();l.lexer=h;function c(){this.yy={}}c.prototype=l;l.Parser=c;return c}();var n=new s;var i=/(%2C|%28|%29|%27|%3A)/g;var o=/(%2C|%28|%29|%27|%3A)/;function a(e,t){if(!t){return decodeURIComponent(e)}else{if(o.test(e)){return e.replace(i,unescape)}else{return e}}}n.yy.restliUnescape=a;n.yy.reduced=false;var u={paramDecode:function g(e){var t=this;return e.split("&").reduce(function(e,r){if(!r.length){return e}if(r.indexOf("=")===0){return e}var s=r.split("=");var n=s[0];var i=s[1];if(n==="''"){n=""}if(i===undefined||i===""){i="''"}e[decodeURIComponent(n)]=t.decode(i);return e},{})},decode:function S(e){return this._decode(e,false)},reducedDecode:function b(e){return this._decode(e,true)},_decode:function T(e,t){n.yy.reduced=t;return n.parse(e)}};var l=Object.freeze({S_100_CONTINUE:100,S_101_SWITCHING_PROTOCOLS:101,S_200_OK:200,S_201_CREATED:201,S_202_ACCEPTED:202,S_203_NON_AUTHORITATIVE_INFORMATION:203,S_204_NO_CONTENT:204,S_205_RESET_CONTENT:205,S_206_PARTIAL_CONTENT:206,S_207_MULTI_STATUS:207,S_300_MULTIPLE_CHOICES:300,S_301_MOVED_PERMANENTLY:301,S_302_FOUND:302,S_303_SEE_OTHER:303,S_304_NOT_MODIFIED:304,S_305_USE_PROXY:305,S_307_TEMPORARY_REDIRECT:307,S_400_BAD_REQUEST:400,S_401_UNAUTHORIZED:401,S_402_PAYMENT_REQUIRED:402,S_403_FORBIDDEN:403,S_404_NOT_FOUND:404,S_405_METHOD_NOT_ALLOWED:405,S_406_NOT_ACCEPTABLE:406,S_407_PROXY_AUTHENTICATION_REQUIRED:407,S_408_REQUEST_TIMEOUT:408,S_409_CONFLICT:409,S_410_GONE:410,S_411_LENGTH_REQUIRED:411,S_412_PRECONDITION_FAILED:412,S_413_REQUEST_ENTITY_TOO_LARGE:413,S_414_REQUEST_URI_TOO_LONG:414,S_415_UNSUPPORTED_MEDIA_TYPE:415,S_416_REQUESTED_RANGE_NOT_SATISFIABLE:416,S_417_EXPECTATION_FAILED:417,S_422_UNPROCESSABLE_ENTITY:422,S_423_LOCKED:423,S_424_FAILED_DEPENDENCY:424,S_428_PRECONDITION_REQUIRED:428,S_429_TOO_MANY_REQUESTS:429,S_500_INTERNAL_SERVER_ERROR:500,S_501_NOT_IMPLEMENTED:501,S_502_BAD_GATEWAY:502,S_503_SERVICE_UNAVAILABLE:503,S_504_GATEWAY_TIMEOUT:504,S_505_HTTP_VERSION_NOT_SUPPORTED:505});var h={encoder:r,decoder:u,httpStatus:l};return h});(function(e,t){if(typeof define==="function"&&define.amd){define(["exports","bower_components/FakeXMLHttpRequest/fake_xml_http_request"],t)}else if(typeof exports!=="undefined"){t(exports,require("bower_components/FakeXMLHttpRequest/fake_xml_http_request"))}else{var r={exports:{}};t(r.exports,e.FakeXMLHttpRequest);e.bigpipeConcat=r.exports}})(this,function(e,t){"use strict";var r=function(){function e(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||false;s.configurable=true;if("value"in s)s.writable=true;Object.defineProperty(e,s.key,s)}}return function(t,r,s){if(r)e(t.prototype,r);if(s)e(t,s);return t}}();var s=function _(e,t,r){var s=true;e:while(s){var n=e,i=t,o=r;s=false;if(n===null)n=Function.prototype;var a=Object.getOwnPropertyDescriptor(n,i);if(a===undefined){var u=Object.getPrototypeOf(n);if(u===null){return undefined}else{e=u;t=i;r=o;s=true;a=u=undefined;continue e}}else if("value"in a){return a.value}else{var l=a.get;if(l===undefined){return undefined}return l.call(o)}}};function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function o(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var a=n(t);var u=Number.MAX_VALUE;var l=function(e){o(t,e);function t(){i(this,t);s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this);this.chunkSize=u;a["default"].call(this)}r(t,[{key:"open",value:function n(){s(Object.getPrototypeOf(t.prototype),"open",this).apply(this,arguments);this.method=this.method&&this.method.toUpperCase()}},{key:"_createMarkerName",value:function l(e){return"mark_bigpipe_"+e}},{key:"_hasPerformanceApi",value:function h(){if(window&&window.performance&&window.performance.mark&&window.performance.measure){return true}return false}},{key:"fulfillPendingRequest",value:function c(e){var t=_bpr.requestSupervisor.responseTable[e];var r=t.responseData;var s=t.status;if(this._hasPerformanceApi()){var n=this._createMarkerName(e);window.performance.mark(n+"_end");window.performance.measure(n+"_phase",n+"_start",n+"_end")}this.respond(s,{"Content-Type":"application/json"},r)}},{key:"send",value:function f(e){var r=this.url;if(this._hasPerformanceApi()){var n=this._createMarkerName(r);window.performance.mark(n+"_start")}if(_bpr.isPresentInTable("response",r)){this.fulfillPendingRequest(r);_bpr.deleteJqueryRequest(r)}else{var i={xhr:this,url:this.url,method:this.method,async:this.async,username:this.username||"",password:this.password||"",requestHeaders:this.requestHeaders,postData:this.method==="POST"||this.method==="PUT"?e:null,timeout:this.timeout,isJqueryRequest:false,events:{onreadystatechange:this.onreadystatechange,onload:this.onload,onerror:this.onerror,onprogress:this.onprogress,onloadstart:this.onloadstart,onabort:this.onabort,onloadend:this.onloadend,ontimeout:this.ontimeout},uploadEvents:{onload:this.upload.onload,onerror:this.upload.onerror,onprogress:this.upload.onprogress,onloadstart:this.upload.onloadstart,onabort:this.upload.onabort,onloadend:this.upload.onloadend,ontimeout:this.upload.ontimeout}};if(this.responseType){i["responseType"]=this.responseType}var o=_bpr.isPresentInTable("jQuery",r);if(o){i["isJqueryRequest"]=true;i["jqueryOptions"]=o.slice(-1)[0]}if(_bpr.requestSupervisor.terminatorCalled||this.method!=="GET"||_bpr.isBlacklistedUrl(r)){_bpr.refireRequest(i);_bpr.deleteJqueryRequest(r);return}if(!_bpr.isPresentInTable("request",r)){_bpr.requestSupervisor.requestTable[r]=[]}_bpr.requestSupervisor.requestTable[r].push(i);s(Object.getPrototypeOf(t.prototype),"send",this).call(this,e)}}}]);return t}(a["default"]);function h(){return!(window&&window.appEnvironment==="node")}window._isBigPipeMode=function(){if(h()){var e=document.getElementsByName("renderingMode");if(e.length!==1){return false}return["BIGPIPE","SSRPIPE"].indexOf(e[0].getAttribute("data-mode"))>-1}else{return false}};function c(e,t){var r=document.querySelector('meta[name="'+e+'"]');if(r){return r.getAttribute("content")}else{return t}}var f=null;var p=c("bigpipeResponseTimeout",12e3);var d=c("bigpipeBlacklistUrls","");var y=function(){function e(){i(this,e);if(!f){var t=setTimeout(this._handleResponseTimeout.bind(this),p);var r=[];if(d!==""){r=JSON.parse(d).map(function(e){return new RegExp(e)})}this.requestSupervisor={requestTable:{},responseTable:{},jqueryRequests:{},originalXHR:null,originalJqueryAjax:null,terminatorCalled:false,pageRendered:false,isInitialPageLoaded:false,responseTimer:t,refiredRequestUrls:[],blacklistUrlsRegex:r,VERSION:1};this._injectFakeXHR();f=this;this._setupRequestSupervisorEventListener();return f}else{throw new Error("There can be only one instance of RequestManager.")}}r(e,[{key:"_replaceNavFragment",value:function t(e,r,s){var n=document.getElementById(s);var i=document.getElementById(e);var o=document.getElementById(r);i.removeChild(o);while(n.hasChildNodes()){i.appendChild(n.removeChild(n.firstChild))}}},{key:"_setupRequestSupervisorEventListener",value:function s(){var e="datalet-bpr-guid";var t=e.length;var r="terminatorlet";var s="navlet-header";var n="navlet-footer";var i=this;function o(a){var u=a.target;if(u.tagName==="IMG"){var l=u.getAttribute("class");l=l?l.split(" "):[];if(l.length===1&&l[0].substring(0,t)===e){var h=l[0];i.response(h)}if(l.length===1&&l[0]===r){i.done();document.removeEventListener("load",o,true)}if(l.length===1&&l[0]===s){i._replaceNavFragment("nav-head-container","nav-header",s)}if(l.length===1&&l[0]===n){i._replaceNavFragment("nav-foot-container","nav-footer",n)}}}document.addEventListener("load",o,true)}},{key:"isBlacklistedUrl",value:function n(e){var t=this.requestSupervisor.blacklistUrlsRegex.some(function(t){return t.test(e)},this);return t}},{key:"isPresentInTable",value:function o(e,t){var r=null;if(e==="request"){r=this.requestSupervisor.requestTable}else if(e==="response"){r=this.requestSupervisor.responseTable}else if(e==="jQuery"){r=this.requestSupervisor.jqueryRequests}else{throw new Error("Invalid table name.")}return r[t]}},{key:"deleteJqueryRequest",value:function a(e){if(this.isPresentInTable("jQuery",e)){delete this.requestSupervisor.jqueryRequests[e]}}},{key:"_deleteRequest",value:function u(e){delete this.requestSupervisor.requestTable[e];this.deleteJqueryRequest(e)}},{key:"_handleResponseTimeout",value:function h(){console.info("Terminator datalet is not seen within "+p+" ms.")}},{key:"_injectFakeXHR",value:function c(){this.requestSupervisor.originalXHR=XMLHttpRequest;window.XMLHttpRequest=l}},{key:"response",value:function y(e){var t=e;if(typeof e!=="object"){t=JSON.parse(this._getResponseData(e))}var r=t.request;var s=t.status;var n=this._getResponseData(t.body);var i={url:r,status:s,responseData:n};this.requestSupervisor.responseTable[r]=i;var o=this.requestSupervisor.requestTable[r];if(o){o.forEach(function(e){var t=e.xhr;t.fulfillPendingRequest(r)});this._deleteRequest(r)}}},{key:"_getResponseData",value:function _(e){var t=document.getElementById(e);var r={};if(t){t.normalize();r=t.firstChild.nodeValue}return r}},{key:"done",value:function v(){if(this.requestSupervisor.terminatorCalled){throw new Error("Terminator cannot be called multiple times.")}this.requestSupervisor.terminatorCalled=true;this._clearResponseTimer();this._fullFillPendingRequests();this._refirePendingRequests();if(this.requestSupervisor.pageRendered){this._reset()}}},{key:"_fullFillPendingRequests",value:function E(){var e=this;var t=this.requestSupervisor.requestTable;var r=Object.keys(t);r.forEach(function(t){if(e.isPresentInTable("response",t)){var r=e.requestSupervisor.requestTable[t];if(r){r.forEach(function(e){e.xhr.fulfillPendingRequest(t)});e._deleteRequest(t)}}})}},{key:"_refirePendingRequests",value:function m(){var e=this;var t=Object.keys(this.requestSupervisor.requestTable);t.forEach(function(t){var r=e.requestSupervisor.requestTable[t];r.forEach(function(t){e.refireRequest(t)},e)},this)}},{key:"refireRequest",value:function g(e){var t=this;var r=window.XMLHttpRequest;window.XMLHttpRequest=this.requestSupervisor.originalXHR;if(e.isJqueryRequest){(function(){var r=e["jqueryOptions"]["originalPromise"];t.requestSupervisor.originalJqueryAjax(e["jqueryOptions"]).then(function(e,t,s){r.resolve(e,t,s)},function(e,t,s){r.reject(e,t,s)})})()}else{(function(){var t=new XMLHttpRequest;t.open(e.method,e.url,e.async,e.username,e.password);var r=e.requestHeaders;for(var s in r){t.setRequestHeader(s,r[s])}if(e.timeout){t.timeout=e.timeout}if(e.responseType){t.responseType=e.responseType}var n=e.events;var i=Object.keys(n);i.forEach(function(e){if(typeof n[e]==="function"){t[e]=function(){n[e].call(t)}}});var o=e.uploadEvents;var a=Object.keys(o);a.forEach(function(e){if(typeof o[e]==="function"){t.upload[e]=function(){o[e].call(t)}}});if(e.postData){t.send(e.postData)}else{t.send()}})()}window.XMLHttpRequest=r}},{key:"_resetRequestSupervisor",value:function S(){this.requestSupervisor.responseTable={};this.requestSupervisor.requestTable={};this.requestSupervisor.jqueryRequests={}}},{key:"rendered",value:function b(){if(this.requestSupervisor.pageRendered){throw new Error("Initial page render cannot be called multiple times.")}this.requestSupervisor.pageRendered=true;if(this.requestSupervisor.terminatorCalled){this._reset()}}},{key:"_reset",value:function T(){if(this.requestSupervisor.isInitialPageLoaded){throw new Error("Request manager cannot be reset multiple times.")}this._resetRequestSupervisor();this.requestSupervisor.isInitialPageLoaded=true;window.XMLHttpRequest=this.requestSupervisor.originalXHR;jQuery.ajax=this.requestSupervisor.originalJqueryAjax}},{key:"_clearResponseTimer",value:function R(){var e=this.requestSupervisor.responseTimer;if(e){clearTimeout(e);this.requestSupervisor.responseTimer=null}}}]);return e}();window._bpr=new y});