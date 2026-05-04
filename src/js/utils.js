export function splitWords(el) {
  el.innerHTML = el.innerHTML
    .replace(/<br\s*\/?>/gi, ' __BR__ ')
    .replace(/(<[^>]+>)/g, '|||$1|||');

  const parts = el.innerHTML.split('|||');
  el.innerHTML = parts.map(p => {
    if (p.startsWith('<')) return p;
    return p.split(' ').map(w => {
      if (w === '__BR__') return '<br>';
      if (!w.trim()) return '';
      return `<span class="word"><span class="inner">${w}</span></span>`;
    }).join(' ');
  }).join('');
}
