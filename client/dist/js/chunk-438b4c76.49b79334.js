(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-438b4c76"],{"64db":function(e,s,t){"use strict";var a=t("9da3"),r=t.n(a);r.a},"7b73":function(e,s,t){"use strict";var a=t("3f4a");s["a"]={uploadImage:function(e){var s=new FormData;return s.append("image-file",e),Object(a["a"])().post("account-image-upload",s,{headers:{"Content-Type":"multipart/form-data;"}})},getUserInfo:function(){return Object(a["a"])().get("user-info")},sendPasswordRecovery:function(e){return Object(a["a"])().post("send-password-recovery",e)},verifyToken:function(e){return Object(a["a"])().get("reset/".concat(e))},resetPassword:function(e){return Object(a["a"])().post("reset",e)}}},"9da3":function(e,s,t){},f138:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"login-register-box",attrs:{id:"password-recovery"}},[a("div",{staticClass:"main-box"},[a("div",{staticClass:"main-header"},[a("router-link",{staticClass:"logo-link",attrs:{to:{path:"/"}}},[a("img",{staticClass:"logo",attrs:{src:t("f44d")}})]),a("router-link",{staticClass:"logo-link",attrs:{to:{path:"/"}}},[a("div",{staticClass:"logo-text"},[e._v("Recipe Saver")])])],1),a("div",{staticClass:"main-body recovery-main-body"},[a("div",{staticClass:"success-message"},[e._v(e._s(e.successMessage))]),a("form",{directives:[{name:"show",rawName:"v-show",value:!e.successMessage,expression:"!successMessage"}],attrs:{id:"reset-form"},on:{submit:function(s){return s.preventDefault(),e.sendEmail()}}},[e._m(0),a("div",{staticClass:"instructions"},[e._v("Send password recovery email to:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"recovery-email-input",attrs:{type:"text",placeholder:"Your Email"},domProps:{value:e.email},on:{input:function(s){s.target.composing||(e.email=s.target.value)}}}),a("input",{attrs:{type:"submit",hidden:""}})]),a("div",{staticClass:"error-message"},[e._v(e._s(e.errorMessage))])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.successMessage,expression:"!successMessage"}],staticClass:"send-email-cta",on:{click:function(s){return e.sendEmail()}}},[e._v("Send")])])])},r=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"note"},[t("b",[e._v("Note:")]),e._v(" If you login to Recipe Saver with a "),t("b",[e._v("Gmail")]),e._v(' account then you may have used the "Log In With Google" method to create an account. If so, then please use that login method instead of using the "Log In with Email" form. \n        ')])}],n=(t("96cf"),t("3b8d")),i=t("7b73"),o={data:function(){return{email:"",errorMessage:"",successMessage:""}},methods:{sendEmail:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.errorMessage="",this.successMessage="",e.next=4,i["a"].sendPasswordRecovery({email:this.email.toLowerCase().trim()});case 4:s=e.sent,"Email sent"!==s.data.message?this.errorMessage=s.data.message:this.successMessage="An email with a password reset link has been sent. Please check your spam folder and allow up to 15 minutes for the email to be delivered.";case 6:case"end":return e.stop()}},e,this)}));function s(){return e.apply(this,arguments)}return s}()},beforeCreate:function(){document.body.className="password-recovery"}},c=o,u=(t("64db"),t("2877")),l=Object(u["a"])(c,a,r,!1,null,null,null);s["default"]=l.exports},f44d:function(e,s,t){e.exports=t.p+"img/logo-255x255.2ed04cf9.png"}}]);
//# sourceMappingURL=chunk-438b4c76.49b79334.js.map