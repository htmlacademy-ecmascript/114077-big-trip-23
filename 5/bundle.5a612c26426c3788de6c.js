(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",d="quarter",u="year",c="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},y={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+v(s,2,"0")+":"+v(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,o=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:c,h:r,m:i,s,ms:n,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",g={};g[_]=m;var $=function(t){return t instanceof D},b=function t(e,n,s){var i;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(i=r),n&&(g[r]=n,i=r);var o=e.split("-");if(!i&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,i=a}return!s&&i&&(_=i),i||!s&&_},w=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},M=y;M.l=b,M.i=$,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return M},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return w(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<w(t)},v.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,d=!!M.u(e)||e,h=M.p(t),f=function(t,e){var s=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return d?s:s.endOf(o)},p=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,y=this.$D,_="set"+(this.$u?"UTC":"");switch(h){case u:return d?f(1,0):f(31,11);case l:return d?f(1,v):f(0,v+1);case a:var g=this.$locale().weekStart||0,$=(m<g?m+7:m)-g;return f(d?y-$:y+(6-$),v);case o:case c:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case i:return p(_+"Seconds",2);case s:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,d=M.p(t),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[c]=h+"Date",a[l]=h+"Month",a[u]=h+"FullYear",a[r]=h+"Hours",a[i]=h+"Minutes",a[s]=h+"Seconds",a[n]=h+"Milliseconds",a)[d],p=d===o?this.$D+(e-this.$W):e;if(d===l||d===u){var m=this.clone().set(c,1);m.$d[f](p),m.init(),this.$d=m.set(c,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[M.p(t)]()},v.add=function(n,d){var c,h=this;n=Number(n);var f=M.p(d),p=function(t){var e=w(h);return M.w(e.date(e.date()+Math.round(t*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var m=(c={},c[i]=t,c[r]=e,c[s]=1e3,c)[f]||1,v=this.$d.getTime()+n*m;return M.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,d=n.months,u=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},c=function(t){return M.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:u(n.monthsShort,a,d,3),MMMM:u(d,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:c(1),hh:c(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return s.replace(p,(function(t,e){return e||m[t]||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,c,h){var f,p=M.p(c),m=w(n),v=(m.utcOffset()-this.utcOffset())*t,y=this-m,_=M.m(this,m);return _=(f={},f[u]=_/12,f[l]=_,f[d]=_/3,f[a]=(y-v)/6048e5,f[o]=(y-v)/864e5,f[r]=y/e,f[i]=y/t,f[s]=y/1e3,f)[p]||y,h?_:M.a(_)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return g[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=b(t,e,!0);return s&&(n.$L=s),n},v.clone=function(){return M.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),k=D.prototype;return w.prototype=k,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",u],["$D",c]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,D,w),t.$i=!0),w},w.locale=b,w.isDayjs=$,w.unix=function(t){return w(1e3*t)},w.en=g[_],w.Ls=g,w.p={},w}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,d=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof _},h=function(t,e,n){return new _(t,n,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},y=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function p(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*u[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(d);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/i),t%=i,this.$d.minutes=m(t/s),t%=s,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=y(this.$d.years,"Y"),e=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=y(n,"D"),i=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=y(o,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||a.negative,d=i.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+s.format+d+i.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(s[t])}))},v.as=function(t){return this.$ms/u[f(t)]},v.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/u[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var s;return s=e?t*u[f(e)]:c(t)?t.$ms:h(t,this).$ms,h(this.$ms+s*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return h(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return h(t,{$l:n},e)},i.isDuration=c;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(t,e){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return c(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},110:function(t){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var s=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function r(t,e,n,i){return s.fromToBase(t,e,n,i)}n.en.relativeTime=i,s.fromToBase=function(e,s,r,o,a){for(var l,d,u,c=r.$locale().relativeTime||i,h=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],f=h.length,p=0;p<f;p+=1){var m=h[p];m.d&&(l=o?n(e).diff(r,m.d,!0):r.diff(e,m.d,!0));var v=(t.rounding||Math.round)(Math.abs(l));if(u=l>0,v<=m.r||!m.r){v<=1&&p>0&&(m=h[p-1]);var y=c[m.l];a&&(v=a(""+v)),d="string"==typeof y?y.replace("%d",v):y(v,s,m.l,u);break}}if(s)return d;var _=u?c.future:c.past;return"function"==typeof _?_(d):_.replace("%s",d)},s.to=function(t,e){return r(t,e,this,!0)},s.from=function(t,e){return r(t,e,this)};var o=function(t){return t.$u?n.utc():n()};s.toNow=function(t){return this.to(o(this),t)},s.fromNow=function(t){return this.from(o(this),t)}}}()}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t,e,n="beforeend"){e.insertAdjacentElement(n,t.element)}class e{#t=null;get element(){return this.#t??=function(t){const e=document.createElement("template");return e.innerHTML=t,e.content.firstElementChild}(this.template),this.#t}removeElement(){this.#t=null}}class s extends e{get template(){return'<ul class="trip-events__list"></ul>'}}class i extends e{get template(){return'<li class="trip-events__item"></li>'}}var r=n(484),o=n.n(r);const a=t=>`\n  <li class="event__offer">\n    <span class="event__offer-title">${t.title}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${t.price}</span>\n  </li>\n`;class l extends e{#e;#n;constructor(t){super(),this.#e=t,this.#n=this.#e.onEditClick,this.element?.querySelector(".event__rollup-btn").addEventListener("click",this.#s.bind(this))}get template(){return(({wayPoint:t,destination:e,offer:n})=>`\n  <div class="event">\n    <time class="event__date" datetime="2019-03-18">${t.dateFrom.format("MMM DD")}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${t.type}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${t.type} ${e.name}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="2019-03-18T10:30">${t.dateFrom.format("HH:MM")}</time>\n        &mdash;\n        <time class="event__end-time" datetime="2019-03-18T11:00">${t.dateTo.format("HH:MM")}</time>\n      </p>\n      <p class="event__duration">${o().duration(t.dateTo.diff(t.dateFrom)).asMinutes()}M</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">${n.offers.reduce(((t,e)=>t+e.price),0)}</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n      ${n.offers.map(a).join("")}\n    </ul>\n    <button class="event__favorite-btn ${t.isFavorite?"event__favorite-btn--active":""}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n`)(this.#e)}#s(t){t.preventDefault(),this.#n()}}const d=t=>`<option value="${t.name}"></option>`,u=t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`;class c extends e{#e;#i;#r;constructor(t){super(),this.#e=t,this.#i=this.#e.onFormSubmit,this.element.addEventListener("submit",this.#o.bind(this)),this.#r=this.#e.onCloseButtonClick,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#a.bind(this))}get template(){return(({wayPoint:t,destinations:e,offers:n,destination:s,offer:i})=>`\n  <form class="event event--edit" action="#" method="post" id="form-edit">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${t.type}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n\n            ${n.map((e=>((t,e)=>{return`\n  <div class="event__type-item">\n    <input id="event-type-${t.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t.type}" ${t.type===e&&"checked"} >\n    <label class="event__type-label  event__type-label--${t.type}" for="event-type-${t.type}-1">${n=t.type,n.charAt(0).toUpperCase()+n.slice(1)}</label>\n  </div>\n`;var n})(e,t.type))).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">${t.type}</label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${s.name}" list="destination-list-1">\n        <datalist id="destination-list-1">\n          ${e.map(d).join("")}\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${t.dateFrom.format("DD/MM/YY HH:MM")}">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${t.dateTo.format("DD/MM/YY HH:MM")}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${i.offers.reduce(((t,e)=>t+e.price),0)}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n\n    <section class="event__details">\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          ${((t,e)=>t.find((t=>t.type===e.type))?.offers.map((t=>((t,e)=>`\n  <div class="event__offer-selector">\n    <input\n      class="event__offer-checkbox  visually-hidden"\n      id="event-offer-${t.id}-1"\n      type="checkbox"\n      name="event-offer-${t.id}"\n      ${e.some((e=>e===t.id))&&"checked"}\n    >\n    <label class="event__offer-label" for="event-offer-${t.id}-1">\n      <span class="event__offer-title">${t.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${t.price}</span>\n    </label>\n  </div>\n`)(t,e.offers))).join(""))(n,t)}\n        </div>\n      </section>\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${s.description}</p>\n\n        <div class="event__photos-container">\n          <div class="event__photos-tape">\n            ${s.pictures.map(u).join("")}\n          </div>\n        </div>\n      </section>\n    </section>\n  </form>\n`)(this.#e)}#a(t){t.preventDefault(),this.#r()}#o(t){t.preventDefault(),this.#i()}}let h;class f{#l=null;#d=null;#u=null;#c=null;#h=null;#f=new i;#p=null;constructor({container:e,wayPoint:n,...s}){this.#h=e,this.#c=n,this.#l=s.wayPointsModel,this.#d=s.destinationsModel,this.#u=s.offersModel,this.#m(),t(this.#f,this.#h)}#v(){const t=this.#p;t.element.remove(),t.removeElement()}#y=t=>{"Escape"===t.key&&(t.preventDefault(),this.#_(),document.removeEventListener("keydown",h))};#m(){const e=this.#c,n=this.#d.getById(e.destination),s=this.#u.getByType(e.type);this.#p=new l({wayPoint:e,destination:n,offer:s,onEditClick:()=>{this.#g(),document.addEventListener("keydown",h)}}),t(this.#p,this.#f.element)}#$(){const e=this.#c,n=this.#d.destinations,s=this.#u.offers,i=this.#d.getById(e.destination),r=this.#u.getByType(e.type);this.#p=new c({wayPoint:e,destinations:n,offers:s,destination:i,offer:r,onFormSubmit:()=>{this.#_(),document.removeEventListener("keydown",this.#y)},onCloseButtonClick:()=>{this.#_(),document.removeEventListener("keydown",this.#y)}}),t(this.#p,this.#f.element)}#g(){h=this.#y,this.#v(),this.#$()}#_(){this.#v(),this.#m()}}const p=(t,e)=>t-e;class m{static getInteger(t=0,e=100){return[t,e]=[t,e].sort(p),t=Math.ceil(t),e=Math.ceil(e),Math.floor(Math.random()*(e-t+1)+t)}static get boolean(){const t=this.getInteger(0,1);return Boolean(t)}static getElement(t){return t[this.getInteger(0,t.length-1)]}}const v=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];var y=n(646),_=n.n(y),g=n(110),$=n.n(g);o().extend(_()),o().extend($());const b=o(),w=()=>m.getInteger(0,7),M=()=>m.getInteger(0,23),D=()=>m.getInteger(0,59),k=()=>{const t=b().subtract(w(),"day").subtract(M(),"hour").subtract(D(),"minute");return{dateTo:t.add(w(),"day").add(M(),"hour").add(D(),"minute"),dateFrom:t}},S=["Bustling city streets with towering skyscrapers","Peaceful countryside with rolling hills and farmland","Tropical beaches with clear blue water and swaying palm trees","Historic districts with cobblestone streets and old-world charm","Vibrant nightlife with clubs, bars, and live music","Snow-capped mountains with scenic hiking trails and ski resorts","Ancient ruins with crumbling stone structures and fascinating history","Lush rainforests with exotic wildlife and unique plant life","Arid deserts with sand dunes, cacti, and stunning rock formations","Quaint seaside towns with fresh seafood and picturesque harbors","Modern metropolises with cutting-edge architecture and technology","Tranquil lakes with crystal-clear water and scenic views","Cultural centers with museums, art galleries, and theaters","Vineyards and wineries with tastings and tours","Adventure parks with zip-lining, rock climbing, and other thrilling activities","Spiritual sites with temples, shrines, and other sacred places","Wildlife reserves with safaris and animal encounters","Isolated islands with pristine beaches and unique ecosystems","Relaxing spas with massages, facials, and other rejuvenating treatments","Bustling markets with local goods, food, and souvenirs"],P=["Paris","London","New York","Rio de Janeiro","Tokyo","Sydney","Barcelona","Rome","Bangkok","Istanbul"],T=["Visit a famous landmark","Try local cuisine","Take a walking tour","Learn some basic phrases in the local language","Attend a cultural event","Shop for souvenirs","Explore a local market","Visit a museum or art gallery","Take a day trip to a nearby town or attraction","Relax in a local park or garden"],H=()=>Array.from({length:m.getInteger(1,5)},(()=>m.getElement(S))).join(" "),E=t=>({id:crypto.randomUUID(),description:H(),name:t,pictures:Array.from({length:m.getInteger(1,5)},(()=>(t=>({src:`https://loremflickr.com/248/152/${t}?random=${m.getInteger()}`,description:H()}))(t)))}),O=()=>({id:crypto.randomUUID(),title:m.getElement(T),price:m.getInteger(10,10)}),x=t=>({type:t,offers:Array.from({length:m.getInteger(0,5)},O)}),Y=new class{#b=(()=>P.map(E))();#w=(()=>v.map(x))();#M=[];constructor(){this.#M=this.#D()}#k(){const{id:t}=m.getElement(this.destinations),e=m.getElement(v);return n={destination:t,offers:this.offers.find((t=>t.type===e)).offers.map((({id:t})=>t)),type:e},{id:crypto.randomUUID(),basePrice:m.getInteger(10,5e3),...k(),destination:n.destination,isFavorite:m.boolean,offers:n.offers.slice(0,m.getInteger(1,n.offers.length)),type:n.type};var n}#D(){return Array.from({length:10},(()=>this.#k()))}get destinations(){return this.#b}get offers(){return this.#w}get wayPoints(){return this.#M}},C={wayPointsModel:new class{#S=null;#M=[];constructor(t){this.#S=t,this.#M=this.#S.wayPoints}get wayPoints(){return this.#M}}(Y),offersModel:new class{#S=null;#w=[];constructor(t){this.#S=t,this.#w=this.#S.offers}get offers(){return this.#w}getByType(t){return this.#w.find((e=>e.type===t))}}(Y),destinationsModel:new class{#S=null;#b=[];constructor(t){this.#S=t,this.#b=this.#S.destinations}get destinations(){return this.#b}getById(t){return this.#b.find((e=>e.id===t))}}(Y)},I=document.querySelector("header.page-header"),F=document.querySelector("main.page-main"),L=I.querySelector(".trip-controls__filters"),W=F.querySelector(".trip-events");t(new class extends e{get template(){return'\n  <form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n      <label class="trip-filters__filter-label" for="filter-future">Future</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n      <label class="trip-filters__filter-label" for="filter-present">Present</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n      <label class="trip-filters__filter-label" for="filter-past">Past</label>\n    </div>\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n'}},L),t(new class extends e{get template(){return'\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>\n'}},W),new class{#h;#P=new s;#M;#T;#l;#u;#d;constructor({container:t,...e}){this.#h=t,this.#T=e,this.#l=e.wayPointsModel,this.#d=e.destinationsModel,this.#u=e.offersModel,this.renderWaypointList()}renderWaypointList(){const e=this.#l.wayPoints;this.#M=e.map(this.#H.bind(this)),t(this.#P,this.#h)}#H(t){return new f({container:this.#P.element,wayPoint:t,...this.#T})}}({container:W,...C})})()})();
//# sourceMappingURL=bundle.5a612c26426c3788de6c.js.map