---
# Makale Meta Verileri (Frontmatter)
title: Makale Başlığı
description: Makalenin kısa özeti (SEO için önemli, 1-2 cümle)
date: 2024-01-15  # YYYY-MM-DD formatında
category: Web Development  # Web Development, Frontend, Career, Tutorial, Tips
tags:
  - JavaScript
  - React
  - Tutorial
  - Performance
readTime: 8  # Tahmini okuma süresi (dakika)
featured: true  # Ana sayfada gösterilsin mi?
image: /articles/makale-gorseli.jpg  # İsteğe bağlı, kapak görseli
draft: false  # Taslak mı? true ise listelenmez
---

# Makale Başlığı

Giriş paragrafı. Okuyucunun dikkatini çekecek ve konuya giriş yapacak birkaç cümle.

## İçindekiler

- [Bölüm 1](#bölüm-1)
- [Bölüm 2](#bölüm-2)
- [Sonuç](#sonuç)

## Bölüm 1

Makale içeriği buraya gelecek. Markdown'ın tüm özelliklerini kullanabilirsiniz.

### Alt Başlık

Normal paragraf metni. **Kalın metin** ve *italic metin* kullanabilirsiniz.

#### Kod Örneği

```javascript
// JavaScript kod örneği
function greet(name) {
  console.log(`Merhaba, ${name}!`);
}

greet('Dünya');
```

### Liste Örneği

- Madde 1
- Madde 2
  - Alt madde 2.1
  - Alt madde 2.2
- Madde 3

### Numaralı Liste

1. Birinci adım
2. İkinci adım
3. Üçüncü adım

## Bölüm 2

### Tablo Örneği

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|-----------|
| React | 18.2.0 | UI Library |
| TypeScript | 5.0 | Type Safety |
| GSAP | 3.12 | Animasyon |

### Alıntı

> "The best way to predict the future is to invent it." - Alan Kay

### Link Örnekleri

- [React Dokümantasyonu](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)

### Görsel Ekleme

![Alt text](/articles/images/example.jpg)

## Kod Bloğu Örnekleri

### React Component

```tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
```

### CSS

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

## İpuçları

💡 **İpucu**: Önemli bilgiler için emoji kullanabilirsiniz.

⚠️ **Uyarı**: Dikkat edilmesi gereken noktalar.

✅ **Başarılı**: Doğru kullanım örnekleri.

## Sonuç

Makalenin özeti ve ana çıkarımlar. Okuyucuya ne öğrendiğini hatırlatın ve bir sonraki adımları önerin.

## Kaynaklar

1. [Kaynak 1](https://example.com)
2. [Kaynak 2](https://example.com)
3. [Kaynak 3](https://example.com)

---

*Bu makaleyi beğendiyseniz, sosyal medyada paylaşmayı unutmayın! 🚀*