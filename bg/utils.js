/* global defaults, regtools */
{
  
  const utils = {};
  self.utils = utils;

  utils.getProfile = (name, callback) => {
    if (name) {
      const pname = 'profile-' + name;
      const ename = 'profile-' + name + '-exceptions';
      chrome.storage.local.get({
        [pname]: '{}',
        [ename]: '[]'
      }, apfs => {
        let profile = JSON.parse(apfs[pname]);
        const exceptions = JSON.parse(apfs[ename]);
        console.log(defaults.profile);
        console.log(profile);
        profile = Object.assign({}, defaults.profile, profile);
        exceptions.forEach(name => delete profile[name]);

        callback(profile);

        // auto-button click
        var formTag = document.getElementsByTagName('form');
        var btnElement = document.getElementsByTagName('button');
        const expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');
        // click for submit button(button tag)
        if(btnElement.length != 0){
          for (var i = 0; i < btnElement.length; i++){
            console.info(btnElement[i]);
            const name = utils.id(btnElement[i]);
            if(expVal.test(name)){
              btnElement[i].click();
              console.info('Found login btn tag :', btnElement[i]);
            }
          }
          // document.getElementsByTagName('button')[0].click();
        } else{
          // click submit button (input tag)
          for (var i = 0; i < formTag[0].length; i++){
            console.info(formTag[0][i]);
            const name = utils.id(formTag[0][i]);
            if(expVal.test(name)){
              formTag[0][i].click();
              console.info('Found login ipt tag :', formTag[0][i]);
            }
          }
        }
      });
    }
    else {
      chrome.storage.local.get({
        current: 'default'
      }, prefs => utils.getProfile(prefs.current, callback));
    }
  };

  // Assign default rule to rules
  utils.getRules = sRules => {
    const rules = JSON.parse(sRules);
    return Object.assign({}, defaults.rules, rules);
  };

  //verify input element replaces
  utils.id = e => {
    return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_');
  };
  // get field by query selector
  utils.inputs = (target, inputs, types) => {
    for (const e of target.querySelectorAll('[name]')) {
      if (types.test(e.type)) {
        inputs.add(e);
      }
    }
    // get field by query selector(tag, input type)
    for (const e of target.querySelectorAll('input, textarea')) {
      if (utils.id(e) && types.test(e.type)) {
        inputs.add(e);
        console.log(e + e.type);
      }
    }
  };
}
