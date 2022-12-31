(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(31)},22:function(e,t,a){},23:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(5),l=a.n(i),o=(a(22),a(6)),s=a(11),r=a(7),p=a(2),m=a(12),u=(a(23),a(8)),f=a.n(u),d=a(1),h=a.n(d),v=a(9),b=a.n(v),E=a(10),g=a.n(E),y=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(s.a)(this,Object(r.a)(t).call(this))).handleDifficultyChange=function(t){e.setState({selectedDifficulties:t})},e.handleAcceptanceChange=function(t){e.setState({selectedAcceptance:t})},e.handleTopicChange=function(t){e.setState({selectedTopics:t})},e.state={difficultyOptions:["Easy","Medium","Hard"],acceptanceOptions:e.range(10,90,10),topicOptions:[],selectedDifficulties:[],selectedAcceptance:[],selectedTopics:[],response:"",problemTitle:"Title",problemDifficulty:"Difficulty",problemAcceptance:"Acceptance",problemLink:"Link",premium:!1},e}return Object(m.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){document.title="Random LC",this.readTags()}}]),Object(p.a)(t,[{key:"getMeta",value:function(){return{title:"Random LC",description:"Get a Random Leetcode with a filter!",meta:{charset:"utf-8",name:{keywords:"random, leetcode"}}}}},{key:"getRandomLeetcode",value:function(){var e=this,t={method:"GET",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"X-Requested-With","Content-Type":"application/json",difficulties:this.state.selectedDifficulties,acceptance:this.state.selectedAcceptance,topics:this.state.selectedTopics,premium:this.state.premium}};fetch("http://137.184.34.153:3001/problem",t).then(function(e){return e.json()}).then(function(t){console.log(t),e.setState({problemTitle:t.title,problemDifficulty:t.difficulty,problemAcceptance:t.acceptance,problemLink:t.link})})}},{key:"range",value:function(e,t,a){for(var n=[],c=t;c>=e;c-=a)n.push(c);return n}},{key:"readTags",value:function(){var e=this;fetch(b.a).then(function(e){return e.text()}).then(function(e){return e.split("\n")}).then(function(t){e.setState({topicOptions:t})})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"App"},c.a.createElement(g.a,this.getMeta()),c.a.createElement("div",{className:"ImageWrapper"},c.a.createElement("img",{className:"Image",src:f.a,alt:"img"})),c.a.createElement("div",{className:"TitleWrapper"},c.a.createElement("h1",null,"Random LC")),c.a.createElement("div",{className:"ConfigureProblemWrapper"},c.a.createElement("div",{className:"Configure"},c.a.createElement("div",{className:"DifficultyWrapper"},c.a.createElement(h.a,{className:"Difficulty",placeholder:"Difficulty",isObject:!1,onKeyPressFn:function(){},onRemove:function(){},onSearch:function(){},onSelect:this.handleDifficultyChange,options:this.state.difficultyOptions,autosize:!1})),c.a.createElement("div",{className:"AcceptanceWrapper"},c.a.createElement(h.a,{className:"Acceptance",placeholder:"Minimum Acceptance",selectionLimit:"1",isObject:!1,onKeyPressFn:function(){},onRemove:function(){},onSearch:function(){},onSelect:this.handleAcceptanceChange,options:this.state.acceptanceOptions,autosize:!1})),c.a.createElement("div",{className:"TopicsWrapper"},c.a.createElement(h.a,{className:"Topics",placeholder:"Topics",isObject:!1,onKeyPressFn:function(){},onRemove:function(){},onSearch:function(){},onSelect:this.handleTopicChange,options:this.state.topicOptions,autosize:!0})),c.a.createElement("div",{className:"CheckboxWrapper"},c.a.createElement("label",null,c.a.createElement("input",{className:"Checkbox",type:"checkbox",value:"premium",onChange:function(){return e.state.premium=!e.state.premium}}),"Allow Premium")),c.a.createElement("div",{className:"ButtonRandomLCWrapper"},c.a.createElement("button",{margin:"auto",className:"ButtonRandomLC",onClick:function(){return e.getRandomLeetcode()}},"Get Random Leetcode"))),c.a.createElement("div",{className:"Space"}),c.a.createElement("div",{className:"Problem"},c.a.createElement("form",null,c.a.createElement("div",{className:"textTitleWrapper"},c.a.createElement("input",{className:"textTitle",type:"text",value:this.state.problemTitle})),c.a.createElement("div",{className:"textDiffAccWrapper"},c.a.createElement("div",{className:"textDifficultyWrapper"},c.a.createElement("input",{className:"textDifficulty",type:"text",value:this.state.problemDifficulty})),c.a.createElement("div",{className:"textAcceptanceWrapper"},c.a.createElement("input",{className:"textAcceptance",type:"text",value:this.state.problemAcceptance}))),c.a.createElement("div",{className:"ButtonLaunchWrapper"},c.a.createElement("button",{className:"buttonLaunch",onClick:function(t){window.open(e.state.problemLink,"_blank"),t.preventDefault()}},"Launch"))))))}}]),t}(n.Component),N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,32)).then(function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,l=t.getTTFB;a(e),n(e),c(e),i(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(y,null))),N()},8:function(e,t,a){e.exports=a.p+"static/media/guy_on_pc.44435ff0.jpg"},9:function(e,t,a){e.exports=a.p+"static/media/tags.b3e9f64f.txt"}},[[13,1,2]]]);
//# sourceMappingURL=main.4ad8a954.chunk.js.map