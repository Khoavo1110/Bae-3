// Hành vi mở phong bì và hiển thị nội dung thư
const envelope = document.getElementById('envelope');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

const letterText = `gửi Khanh,

hông có gì hết á tạo màu mè cho vui thôi buổi sáng vui vẻ thi đậu nhá :))) `;

let typingTimer = null;

function openEnvelope() {
    if (envelope.classList.contains('open')) return;
    
    // Thêm class open để kích hoạt animation
    envelope.classList.add('open');
    
    // Hiệu ứng nhẹ khi mở
    envelope.style.transform = 'scale(1.02)';
    setTimeout(() => envelope.style.transform = '', 400);
    
    // Animation các trái tim nền
    document.querySelectorAll('.hearts span').forEach(h => {
        h.style.opacity = '1';
        h.style.animation = 'float 12s linear infinite';
    });
    
    // Hiệu ứng gõ chữ với độ trễ để đợi animation phong bì
    setTimeout(() => {
        typeText(letterText, messageEl, 40);
        messageEl.style.opacity = '1';
    }, 1000);
}

function closeEnvelope() {
    envelope.classList.remove('open');
    
    // Xóa text và reset opacity
    if (typingTimer) clearTimeout(typingTimer);
    messageEl.textContent = '';
    messageEl.style.opacity = '0';
    
    // Reset các animation trái tim
    document.querySelectorAll('.hearts span').forEach(h => {
        h.style.opacity = '0.6';
    });
}

function typeText(text, node, speed=40){
  node.textContent = '';
  let i=0;
  function step(){
    if(i<=text.length){
      node.textContent = text.slice(0,i);
      i++;
      typingTimer = setTimeout(step, speed);
    }
  }
  step();
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') openEnvelope(); });
resetBtn.addEventListener('click', ()=>{ closeEnvelope(); setTimeout(()=>{ /* allow re-open */ },200); });

// small accessibility: prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--reduced-motion', '1');
}

