/* global mode, current, utils, defaults */
'use strict';

function change(element, value = ' ') {
  try {
    const o = {
      code: value === ' ' ? 'Space' : value.toUpperCase(),
      key: value,
      keyCode: value.charCodeAt(0),
      which: value.charCodeAt(0)
    };

    element.dispatchEvent(new KeyboardEvent('keydown', o));
    element.dispatchEvent(new KeyboardEvent('keyup', o));
    ['change', 'input'].forEach(name => {
      element.dispatchEvent(new Event(name, {bubbles: true}));
    });
  }
  catch (e) {}
}

function inspect(node) {
  let results = [];

  function one(node) {
    results = results.concat([
      node.value,
      node.placeholder,
      node.tagName === 'SELECT' || node.querySelector('select') ? '' : node.textContent
    ]);
  }
  one(node);
  [...node.parentElement.children].forEach(node => one(node));
  results = results
    .map(s => (s || '').trim())
    .filter((s, i, l) => s && s.length > 3 && l.indexOf(s) === i);

  return results;
}

// body element, regex type
function grab(target, types) {
  const es = new Set();
  utils.inputs(target, es, types);
  // 140 from utlis.js get response from utlis.js
  return [...es];
}

// 1
chrome.storage.local.get({
  current: 'default',
  rules: '{}',
  users: '',
  detect: defaults.detect, // 'forms', 'body'
  types: defaults.types
}, prefs => {
  prefs.rules = utils.getRules(prefs.rules);

  const types = new RegExp(prefs.types);
  let inputs = [];
  const matrix = new WeakMap();
  const founds = new WeakMap();

  if (prefs.detect === 'forms') {
    const forms = [...document.forms];
    // grab all input elements that are supported by prefs.types
    forms.forEach((form, index) => {
      matrix.set(form, index);
      grab(form, types).forEach((input, index) => {
        inputs.push(input);
        matrix.set(input, index);
      });
    });
  }

  // Get body element
  if (inputs.length === 0 || prefs.detect === 'body') {
    grab(document.body, types).forEach((input, index) => {
      //get input element from querySelector
      inputs.push(input);
      matrix.set(input, index);
    });
  }

  // append a new rule name to findings
  const append = (input, name, regexp, certainty = 1) => {
    const a = founds.get(input);
    if (a) {
      a.push({
        name,
        regexp,
        certainty
      });
    }
    else {
      founds.set(input, [{
        name,
        regexp,
        certainty
      }]);
    }
  };
  // decide the best matching name for a finding
  const decide = input => {
    const a = founds.get(input);
    const max = Math.max(...a.map(o => o.certainty));
    const b = a.filter(o => o.certainty === max);

    const name = utils.id(input);

    b.sort((m, n) => {
      try {
        return n.regexp.exec(name)[0].length - m.regexp.exec(name)[0].length;
      }
      catch (e) {
        return 0;
      }
    });

    return b[0].name;
  };

  // send response to worker
  if (inputs.length) {
    chrome.runtime.sendMessage({
      cmd: 'get-url'
    }, response => {
      utils.getProfile(prefs.current, profile => {
        // preparing rule list
        const rules = Object.keys(prefs.rules).filter(name => {// filter rules that match this domain eg: name ="gender"
          // get site-rule for all fields types
          const r = new RegExp(prefs.rules[name]['site-rule'], 'i');
          return r.test(response);
        }).reverse() // prioritizing user-defined rules
          .map(name => Object.assign(prefs.rules[name], {name}));

        // inputs find rules part 1
        inputs.forEach(input => {
          for (const rule of rules) {
            const exp = rule['field-rule'];
              const r = (new RegExp(exp, 'i'));
              const name = utils.id(input);
              // what if we have multiple matches
              if (r.test(name)) {
                console.info('found stage 1', exp, input);
                append(input, rule.name, r, 0.5);
              }
          }
        });
        // inputs find rules part 2
        inputs.forEach(input => {
          for (const rule of rules) {
            const exp = rule['field-rule'];
            if (!exp.startsWith('position:')) {
              const r = new RegExp(exp, 'i');
              const bol = inspect(input).reduce((p, c) => p || r.test(c), false);
              if (bol) {
                console.info('found stage 2', exp, input);
                append(input, rule.name, r, 0.25);
              }
            }
          }
        });
        // inputs find rules part 3
        inputs.forEach(input => {
          for (const rule of rules) {
            const exp = rule['field-rule'];
            if (!exp.startsWith('position:')) {
              const r = (new RegExp(exp, 'i'));
              const bol = inspect(input.parentElement).reduce((p, c) => p || r.test(c), false);
              if (bol) {
                console.info('found stage 3', exp, input);
                append(input, rule.name, r, 0.15);
              }
            }
          }
        });

        // fill values
        if (mode === 'insert') {
          inputs.filter(input => founds.has(input)).forEach(element => {
            let value = profile[decide(element)] || '';
              // replacing keywords
              const {href, hostname} = new URL(response);
              value = value.
                replace(/_url_/g, href).
                replace(/_host_/g, hostname);
              // value = utils.format(value);

              element.value = value;
              // supporting multi-line input boxes
              try {
                element.selectionStart = element.selectionEnd = value.length;
              }
              catch (e) {}
              change(element, value.slice(-1));
          });
        }
      });
    });
  }
});
