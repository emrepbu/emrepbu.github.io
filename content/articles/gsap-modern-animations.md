---
title: Modern JavaScript ile GSAP Animasyonları
description: GSAP kullanarak web sitelerinize profesyonel animasyonlar eklemenin modern yolları ve best practice'ler.
date: 2024-12-15
category: Web Development
tags:
  - GSAP
  - JavaScript
  - Animation
  - Frontend
readTime: 8
featured: true
---

# Modern JavaScript ile GSAP Animasyonları

GSAP (GreenSock Animation Platform), web'de animasyon oluşturmak için en güçlü ve performanslı kütüphanelerden biridir. Bu yazıda, modern JavaScript ve ES6+ özellikleri ile GSAP kullanımını inceleyeceğiz.

## Neden GSAP?

- **Performans**: 60fps animasyonlar
- **Cross-browser**: Tüm modern tarayıcılarda sorunsuz çalışır
- **Zengin API**: Timeline, ScrollTrigger, MorphSVG gibi güçlü eklentiler
- **Developer-friendly**: Kolay öğrenilebilir ve kullanılabilir syntax

## Temel Kullanım

```javascript
// Modern import syntax
import { gsap } from 'gsap';

// Basit bir animasyon
gsap.to('.box', {
  x: 100,
  rotation: 360,
  duration: 2,
  ease: 'power2.inOut'
});
```

## Timeline ile Kompleks Animasyonlar

```javascript
const tl = gsap.timeline();

tl.to('.header', { y: -100, opacity: 0, duration: 0.5 })
  .to('.hero', { scale: 1.1, duration: 1 }, '-=0.3')
  .from('.content', { y: 50, opacity: 0, stagger: 0.2 });
```

## ScrollTrigger ile Scroll Animasyonları

```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.parallax-bg', {
  yPercent: -50,
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

## Best Practices

1. **Performance**: `will-change` CSS özelliğini kullanın
2. **Cleanup**: Component unmount'ta animasyonları temizleyin
3. **Responsive**: Breakpoint'lere göre animasyonları ayarlayın
4. **Accessibility**: `prefers-reduced-motion` tercihine saygı gösterin

## Sonuç

GSAP, modern web geliştirmede animasyon ihtiyaçlarınız için güçlü bir araçtır. Doğru kullanıldığında, kullanıcı deneyimini büyük ölçüde iyileştirebilir.