// Basic interactions: nav toggle, smooth scroll, contact mailto fallback
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
  });

  // Smooth scroll for supported browsers
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close nav on small screens
        if(window.innerWidth < 900) nav.style.display = 'none';
      }
    });
  });
});

// Contact handling: sends via mailto (client) and shows friendly notice
function contactMailto(){
  const name = document.getElementById('name').value || 'Visitor';
  const email = document.getElementById('email').value || 'no-reply';
  const message = document.getElementById('message').value || '';
  const subject = encodeURIComponent('Contact from moreStrikey.lv — ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:info@morestrikey.lv?subject=${subject}&body=${body}`;
}

function handleContact(e){
  e.preventDefault();
  // Attempt to open mailto; if popup blocked or no client configured, show fallback alert
  contactMailto();
  setTimeout(()=> {
    alert('If your email client did not open, you can email us directly at info@morestrikey.lv or configure a form service (I can help set that up).');
  }, 500);
}
