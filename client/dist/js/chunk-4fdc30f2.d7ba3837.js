(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fdc30f2"],{"17a4":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"share"}},[r("div",{attrs:{id:"share-container"}},[e.recipe._id?r("div",{staticClass:"actions"},[e.importedRecipeID?r("div",{staticClass:"added-block"},[r("icon",{attrs:{name:"checkCircle"}}),r("span",{staticClass:"recipe-added"},[e._v("Recipe added to your collection!")]),r("router-link",{staticClass:"recipe-added-link",attrs:{to:{path:"/recipes/all?id="+e.importedRecipeID}}},[e._v("Go to recipe")])],1):r("div",{staticClass:"add",on:{click:function(t){return e.addToMyRecipes()}}},[e._v("Add To My Recipes")]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.errorMessage,expression:"errorMessage"}],staticClass:"error-message"},[r("icon",{attrs:{name:"info"}}),r("router-link",{staticClass:"error-message-text",attrs:{to:{path:"/login"}}},[e._v("\n          Please login to save this recipe\n        ")])],1)]):e._e(),r("div",{staticClass:"panel"},[r("div",{staticClass:"title"},[e._v(e._s(e.recipe.title))]),r("div",{staticClass:"url"},[r("a",{attrs:{href:e.recipe.url,target:"_blank"}},[e._v(e._s(e.recipe.url))])]),r("div",{staticClass:"description",domProps:{innerHTML:e._s(e.recipe.description)}}),r("img",{directives:[{name:"show",rawName:"v-show",value:e.recipe.image,expression:"recipe.image"}],staticClass:"image",attrs:{src:e.getRecipeImage()}})])])])},a=[],s=(r("96cf"),r("3b8d")),n=r("c5a6"),c=r("0a6d"),o={components:{Icon:n["a"]},data:function(){return{recipe:{},errorMessage:null,importedRecipeID:null}},computed:{},methods:{retrieveRecipe:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=encodeURIComponent(this.$route.params.recipe),e.next=3,c["a"].retrieveSharedRecipe(t);case 3:r=e.sent,this.recipe=r.data,console.log(r),r.data||(console.log("No recipe"),this.recipe={title:"Recipe Not Found",description:"The recipe you requested may have been deleted by it's owner."});case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getRecipeImage:function(){return this.recipe.image},addToMyRecipes:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.errorMessage=null,t=encodeURIComponent(this.$route.params.recipe),e.next=4,c["a"].addSharedRecipe(t);case 4:if(r=e.sent,"User not logged in"!==r.data.error){e.next=7;break}return e.abrupt("return",this.errorMessage="Please login to save this recipe");case 7:this.importedRecipeID=r.data.recipeID;case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},created:function(){this.retrieveRecipe()},beforeCreate:function(){document.body.className="share"}},d=o,p=(r("84e2"),r("2877")),u=Object(p["a"])(d,i,a,!1,null,null,null);t["default"]=u.exports},"84e2":function(e,t,r){"use strict";var i=r("de43"),a=r.n(i);a.a},de43:function(e,t,r){}}]);
//# sourceMappingURL=chunk-4fdc30f2.d7ba3837.js.map