


var inputs=document.getElementsByTagName("input");

id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };

for(var i=0;i<inputs.length;i++){ 
var input=inputs[i];
  if(input.type=="password"){
    {input.value="Demo@123"}
    keydownupFunc(input.value)
  }
  if(input.type=="text" || input.type =="email" || input.type =="number"){
    {input.value="ranjithkumar.nadanamani@chargebackgurus.com"}
    keydownupFunc(input.value);
  }
  }
  if(input.type  && input.type == "submit"){
    input.click();
  };

var btnElement = document.getElementsByTagName("button");
if(btnElement[0].name === 'login'){
  btnElement[0].click();
}
//  for(const ele of btnElement){
//    var expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');              
//    const name = id(ele);
//    switch (expVal.test(name)) {
//     case true:
//       ele.click();
//       break;
//     default:
//       break;
//    }
//   //  if(expVal.test(name)){
//   //    ele.click();
//   //  }else{
//   //   return;
//   //  }

//  }
  // for(var i = 0;i < btnElement.length; i++){
  //   if(btnElement[i].type =="submit" | btnElement[i].textContent == "Sign In" | btnElement[i].textContent == "Login In"){
  //     console.info(btnElement[i]);
  //     btnElement[i].click();      
  //     console.log("clicked")
  //   }
// }
    // var expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');
    //         if(btnElement.length != 0){
    //           for (var i = 0; i < btnElement.length; i++){
    //             const name = id(btnElement[i]);
    //             if(expVal.test(name)){
    //               btnElement[i].click();
    //               console.info('Found login btn tag :', btnElement[i]);
    //             }
    //           }
    //         }
              function keydownupFunc(value) {
                try {
                  const o = {
                    code: value === ' ' ? 'Space' : value.toUpperCase(),
                    key: value,
                    keyCode: value.charCodeAt(0),
                    which: value.charCodeAt(0)
                  };
              
                  element.dispatchEvent(new KeyboardEvent('keydown', o));
                  element.dispatchEvent(new KeyboardEvent('keyup', o));
                ['input'].forEach(name => {
                  console.log("name of dispatch event"+ name)
                  input.dispatchEvent(new Event(name, { bubbles: true }));
                });
            }
            catch (e) {}
          }
            
            
      //       current ={
      //         'password': {
      //           'field-rule': '(?:password)|(?:Password)',
      //           'site-rule': '(?:)'
      //         },          
      
      //         'email': {
      //           'field-rule': '(?:mail)|(?:userName)|(?:login)',
      //           'site-rule': '(?:)'
      //         }
      //         };
      
      //         id = e => {
      //           return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_');
      //         };
      //         var contentscript = {};
      //         self.contentscript = contentscript;
      
      //         var formTag = document.getElementsByTagName('form');
      //         var btnElement = document.getElementsByTagName('input');
      //         console.log(btnElement);
      //         // auto-button click
      //         const expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');
      //         if(btnElement.length != 0){
      //           for (var i = 0; i < btnElement.length; i++){
      //             const name = id(btnElement[i]);
      //             if(expVal.test(name)){
      //               btnElement[i].click();
      //               console.info('Found login btn tag :', btnElement[i]);
      //             }
      //           }
      //         } else{
      //           for (var i = 0; i < formTag[0].length; i++){            
      //             const name = id(formTag[0][i]);
      //             if(expVal.test(name)){
      //               formTag[0][i].click();
      //               console.info('Found login ipt tag :', formTag[0][i]);
      //             }
      //           } 
      //         }       
      
      //   var types = new RegExp('^(?:(?:text(?:area)?)|(?:password)|(?:select-(?:(?:one)|(?:multiple)))|(?:checkbox)|(?:radio)|(?:email)|(?:url)|(?:number)|(?:month)|(?:week)|(?:tel)|(?:file)|(?:textarea))$');
      //   var matrix = new WeakMap();
      //   var founds = new WeakMap();
      //     var rules = [];
      //     var inputs = [];
      //     var inputs = document.getElementsByTagName('input');
      //       rules = Object.keys(current).filter(name => {
      //       // get site-rule for all fields types
      //       const r = new RegExp(current[name]['site-rule'], 'i');
      //       return r;
      //       }).reverse() // prioritizing user-defined rules
      //       .map(name => Object.assign(current[name], {name}));
      //       // inputs find rules part 1
      
      //     const append = (input, name, regexp, certainty = 1) => {
      //       const a = founds.get(input);
      //       if (a) {
      //         a.push({
      //           name,
      //           regexp,
      //           certainty
      //         });
      //       }
      //       else {
      //         founds.set(input, [{
      //           name,
      //           regexp,
      //           certainty
      //         }]);
      //       }
      //     };
      
      //     for(let i = 0; i < inputs.length; i++){        
      //       for (let rule of  rules) {
      //         const exp = rule['field-rule'];
      //           const r = (new RegExp(exp, 'i'));
      //           const name = id(inputs[i]);
      //           // what if we have multiple matches
      //           if (r.test(name)) {
      //             // console.info('found stage 1', exp, input);
      //             append(inputs[i], rule.name, r, 0.5);
      //           }
      //       }
      //     }
      
      //     const decide = input => {
      //       const a = founds.get(input);
      //       const max = Math.max(...a.map(o => o.certainty));
      //       const b = a.filter(o => o.certainty === max);
          
      //       const name = id(input);
          
      //       b.sort((m, n) => {
      //         try {
      //           console.log(b[0].name +"name 1")
      //           return n.regexp.exec(name)[0].length - m.regexp.exec(name)[0].length;
      //         }
      //         catch (e) {
      //           console.log(b[0].name +"name 0")
      //           return 0;
      //         }
      //       });
      //       console.log(b[0].name +"name")
      //       return b[0].name;
      //     };
      
      // // fill values
      // // if (mode === 'insert') {
      //   console.log(founds)
      //   let profile = {};
      //   profile = JSON.parse('{"user-name": "my-user-name","email": "anu","password":"Password@123"}');
      // // inputs.filter(input => founds.has(input)).forEach(element => {
      //   for(let i =0 ; i < inputs.length; i++){
      //     console.log(inputs[i]);
      //     let value = profile[decide(inputs[i])] || '';
      //     console.log(value+" userName")
      //     // replacing keywords
      //     const {href, hostname} = new URL("http://3.139.138.221:8080/jenkins/login");
      //     console.log(hostname +" "+href);
      //     value = value.
      //       replace(/_url_/g, href).
      //       replace(/_host_/g, hostname);
      //     // value = utils.format(value);
      //     inputs[i].value = value;
      //     console.log(inputs[i].value);
      //     // supporting multi-line input boxes
      //     try {
      //       element.selectionStart = element.selectionEnd = value.length;
      //     }
      //     catch (e) {}
      //     change(inputs[i], value.slice(-1));
      // };
      
      // function change(element, value = ' ') {
      //   try {
      //     const o = {
      //       code: value === ' ' ? 'Space' : value.toUpperCase(),
      //       key: value,
      //       keyCode: value.charCodeAt(0),
      //       which: value.charCodeAt(0)
      //     };
      
      //     element.dispatchEvent(new KeyboardEvent('keydown', o));
      //     element.dispatchEvent(new KeyboardEvent('keyup', o));
      //     ['change', 'input'].forEach(name => {
      //       element.dispatchEvent(new Event(name, {bubbles: true}));
      //     });
      //   }
      //   catch (e) {}
      // }

