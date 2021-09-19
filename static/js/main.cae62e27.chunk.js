(this.webpackJsonpmate=this.webpackJsonpmate||[]).push([[0],{16:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var i,r,s=n(0),o=n.n(s),c=n(9),u=n.n(c),a=(n(16),n(4)),l=n(5),d=n(8),h=n(7),j=n(11);function f(t){return null===t||"undefined"===typeof t}function b(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Unexpected nil";if(f(t))throw new Error(e);return t}function p(t,e,n){if(!t){if(f(n))throw new Error(e);throw new Error("".concat(e,": ").concat(n))}return!0}function v(t,e){return Math.floor(Math.random()*(e-t)+t)}!function(t){t.presented="presented",t.solving="solving",t.solved="solved",t.skipped="skipped"}(i||(i={})),function(t){t.timeout="timeout",t.skip="skip"}(r||(r={}));var x=function(){function t(){var e=this;Object(a.a)(this,t),this.history=[],this.currentQuiz=null,this.nextAlarm=void 0,this.timedOutQuizzes=0,this.onInput=function(t){var n=b(e.currentQuiz),r=parseInt(t.target.value,10);switch(n.status){case i.presented:e.startsSolving(n,r);break;case i.solving:e.updatesSolution(n,r);break;default:!function(t,e){throw new Error("Unreachable: ".concat(t,": ").concat(e))}("Unexpected quiz status",n.status)}},this.onSubmit=function(t){e.commitSolution(e.currentQuiz),t.preventDefault()}}return Object(l.a)(t,[{key:"startAsking",value:function(){this.ask()}},{key:"ask",value:function(){var t;p(f(this.currentQuiz)||this.currentQuiz.status!==i.solving,"Already on a quiz",null===(t=this.currentQuiz)||void 0===t?void 0:t.status),console.log("asking"),this.currentQuiz=this.genNewQuiz(),this.scheduleTimeout()}},{key:"genNewQuiz",value:function(){return{status:i.presented,presentedAt:new Date,question:{op1:v(2,10),op2:v(2,10)}}}},{key:"updatesSolution",value:function(t,e){t.answer=e}},{key:"startsSolving",value:function(t,e){console.log("starts solving"),this.currentQuiz={status:i.solving,question:t.question,answer:e,presentedAt:t.presentedAt,startedAnswering:new Date}}},{key:"commitSolution",value:function(t){console.log("commits solution");var e={status:i.solved,question:t.question,answer:t.answer,isCorrect:this.isCorrect(t.question,t.answer),startedAnswering:t.startedAnswering,submittedAnswer:new Date};this.history.push(e),this.currentQuiz=e,this.resetSkips(),this.scheduleNextAsk()}},{key:"isCorrect",value:function(t,e){return t.op1*t.op2===e}},{key:"cancelNextAlarm",value:function(){f(this.nextAlarm)||window.clearTimeout(this.nextAlarm)}},{key:"scheduleNextAsk",value:function(){var t=this;this.cancelNextAlarm(),this.nextAlarm=window.setTimeout((function(){return t.ask()}),2e3)}},{key:"timeoutQuiz",value:function(){this.skipQuiz(r.timeout),this.timedOutQuizzes<100&&this.scheduleNextAsk()}},{key:"skipQuiz",value:function(t){t===r.timeout&&(this.timedOutQuizzes+=1);var e=b(this.currentQuiz);p(e.status===i.presented||e.status===i.solving,"Invalid quiz status for skipping",e.status);var n={status:i.skipped,reason:t,question:e.question};this.history.push(n),this.currentQuiz=n}},{key:"resetSkips",value:function(){this.timedOutQuizzes=0}},{key:"scheduleTimeout",value:function(){var t=this;this.nextAlarm=window.setTimeout((function(){return t.timeoutQuiz()}),2e4)}},{key:"stats",value:function(){var t,e=0,n=0,r=Object(j.a)(this.history);try{for(r.s();!(t=r.n()).done;){var s=t.value;s.status===i.solved&&(s.isCorrect?e+=1:n+=1)}}catch(u){r.e(u)}finally{r.f()}var o=e+n,c=0===o?0:e/o;return{correct:e,incorrect:n,correctRatio:c,incorrectRatio:1-c}}}]),t}(),m=n(3),O=n(1);function g(t){var e=Object(m.a)({display:"flex",flexDirection:"column",alignItems:"flex-start"},t.style);return Object(O.jsx)("div",{style:e,children:t.children})}function k(t){var e=Object(m.a)({flexDirection:"row"},t.style);return Object(O.jsx)(g,{style:e,children:t.children})}function y(t){var e=Object(m.a)({flexDirection:"column"},t.style);return Object(O.jsx)(g,{style:e,children:t.children})}function w(t){var e=Object(m.a)({width:"".concat(t.width,"px")},t.style);return Object(O.jsx)("div",{style:e})}function z(t){var e=Object(m.a)({fontSize:"64px"},t.style);return Object(O.jsx)("div",{style:e,children:t.children})}function A(t){var e={fontSize:"".concat(t.size,"px")};return Object(O.jsx)("span",{className:"material-icons",style:e,children:t.icon})}var Q={bad:"#ef476f",warning:"#ffd166",good:"#06d6a0",info:"#118ab2",background:"#073b4c",stroke:"#d8f2fb"},q={bad:"#f7a4b7",warning:"#ffe8b3",good:"#71fbd7",info:"#6ed1f2",background:"#0b5872",stroke:"#1295c0"};function S(t){var e={alignItems:"center",justifyContent:"center",height:"100%",background:Q.background,color:Q.stroke};return Object(O.jsx)(y,{style:e,children:t.children})}var C,I,R=n(6);function D(t){return Object(O.jsxs)(S,{children:[Object(O.jsx)(E,{model:t.model}),Object(O.jsx)(N,{model:t.model})]})}var N=Object(R.a)(C=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props.model.stats(),e={backgroundColor:q.bad,borderRadius:"4px 0 0 4px",flex:"".concat(t.incorrectRatio," 1 auto"),textAlign:"right",justifyContent:"flex-end",alignItems:"center",paddingRight:"20px",height:"30px",color:Q.background},n={backgroundColor:q.good,borderRadius:"0 4px 4px 0",flex:"".concat(t.correctRatio," 1 auto"),justifyContent:"flex-start",alignItems:"center",paddingLeft:"20px",height:"30px",color:Q.background},i={fontSize:"24px",fontWeight:700,color:t.correctRatio>.5?q.good:q.bad};return Object(O.jsxs)(y,{style:{position:"absolute",marginLeft:"auto",marginRight:"auto",width:"400px",bottom:"50px",alignItems:"center",justifyItems:"center"},children:[Object(O.jsxs)("div",{style:i,children:[(100*t.correctRatio).toFixed(0),"%"]}),Object(O.jsxs)(k,{style:{width:"100%"},children:[Object(O.jsx)(k,{style:e,children:t.incorrect}),Object(O.jsx)(k,{style:n,children:t.correct})]})]})}}]),n}(s.Component))||C,E=Object(R.a)(I=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t={fontSize:"64px",border:"none",outlineWidth:0,width:"200px",background:Q.background,color:Q.info},e=this.props.model,n=e.currentQuiz;if(f(n))return Object(O.jsx)("div",{children:"Start!"});switch(n.status){case i.solving:case i.presented:return Object(O.jsx)("form",{onSubmit:e.onSubmit,children:Object(O.jsx)(T,{question:n.question,children:Object(O.jsx)("input",{autoFocus:!0,style:t,type:"text",onInput:e.onInput})})});case i.solved:var r={color:n.isCorrect?Q.good:Q.bad,width:"200px",textAlign:"left"};return Object(O.jsx)(T,{question:n.question,children:Object(O.jsxs)(z,{style:r,children:[" ",n.answer]})});case i.skipped:Q.bad;return Object(O.jsx)(T,{question:n.question,children:Object(O.jsx)(A,{icon:"alarm",size:64})});default:return Object(O.jsx)("div",{children:"don't know what to do"})}}}]),n}(s.Component))||I;function T(t){return Object(O.jsxs)(k,{children:[Object(O.jsx)(M,{question:t.question}),Object(O.jsx)(w,{width:20}),Object(O.jsx)(k,{style:{width:"200px",display:"flex",alignItems:"stretch"},children:t.children})]})}function M(t){return Object(O.jsxs)(k,{children:[Object(O.jsx)(z,{children:t.question.op1}),Object(O.jsx)(w,{width:20}),Object(O.jsx)(z,{children:"x"}),Object(O.jsx)(w,{width:20}),Object(O.jsx)(z,{children:t.question.op2}),Object(O.jsx)(w,{width:20}),Object(O.jsx)(z,{children:" = "})]})}var U=n(2),F=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(a.a)(this,n),(i=e.call(this,t)).model=void 0,i.view=void 0,i.model=Object(U.l)(new x),i.view=Object(R.a)(D),i}return Object(l.a)(n,[{key:"componentDidMount",value:function(){console.log("mounted!"),this.model.startAsking()}},{key:"render",value:function(){return s.createElement(this.view,{model:this.model})}}]),n}(s.Component);var J=function(){return Object(O.jsx)(F,{})};u.a.render(Object(O.jsx)(o.a.StrictMode,{children:Object(O.jsx)(J,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.cae62e27.chunk.js.map