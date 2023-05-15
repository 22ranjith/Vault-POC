const post = cmd => chrome.runtime.sendMessage({
    cmd,
    profile: profile.textContent
  }, () => {
    window.close();
    chrome.runtime.lastError;
    console.log(profile);
  });
  
  
  // Fill Forms
  document.getElementById('checkPage').addEventListener('click', e => {
    e.preventDefault();
    post('fill-forms');
  });