# İçerik Şablonları - Markdown Sistemi

Bu klasör, blog yazıları ve projeler için **Markdown** şablonları içerir.

## 📝 Markdown Sistemi

Artık tüm içerikler Markdown formatında yazılır ve otomatik olarak HTML'e dönüştürülür.

## 🚀 Yeni Proje Ekleme

1. `content/projects/` klasörüne yeni bir `.md` dosyası oluşturun
2. Dosya adı URL'de kullanılacak (örn: `my-project.md` → `/projects/my-project`)
3. `project-template.md` şablonunu kullanın:

```markdown
---
title: Proje Başlığı
description: Kısa açıklama
date: 2024-03-20
technologies:
  - React
  - GSAP
  - TypeScript
demoUrl: https://demo.com
githubUrl: https://github.com/user/repo
featured: true
image: /projects/proje-gorseli.jpg
---

# Proje İçeriği

Markdown formatında detaylı açıklama...
```

## 📰 Yeni Blog Yazısı Ekleme

1. `content/articles/` klasörüne yeni bir `.md` dosyası oluşturun
2. Dosya adı URL'de kullanılacak (örn: `my-article.md` → `/articles/my-article`)
3. `article-template.md` şablonunu kullanın:

```markdown
---
title: Makale Başlığı
description: Kısa özet
date: 2024-03-20
category: Web Development
tags:
  - JavaScript
  - Tutorial
readTime: 8
featured: true
image: /articles/kapak-gorseli.jpg
---

# Makale İçeriği

Markdown formatında makale...
```

## 📁 Dosya Yapısı

```
content/
├── projects/          # Proje markdown dosyaları
│   ├── ecommerce-platform.md
│   ├── portfolio-dashboard.md
│   └── data-visualization.md
├── articles/          # Makale markdown dosyaları
│   ├── gsap-modern-animations.md
│   ├── react-typescript-performance.md
│   └── frontend-journey-3-years.md

public/
├── projects/          # Proje görselleri
│   └── screenshots/
├── articles/          # Makale görselleri
│   └── images/

templates/
├── project-template.md    # Proje şablonu
├── article-template.md    # Makale şablonu
└── README.md             # Bu dosya
```

## ✨ Markdown Özellikleri

### Desteklenen Özellikler:
- ✅ Başlıklar (H1-H6)
- ✅ Kalın, italic, strikethrough
- ✅ Listeler (sıralı/sırasız)
- ✅ Kod blokları (syntax highlighting)
- ✅ Tablolar
- ✅ Linkler ve görseller
- ✅ Alıntılar (blockquote)
- ✅ Horizontal rule
- ✅ HTML (inline)

### Frontmatter Alanları:

#### Projeler için:
- `title` (zorunlu): Proje başlığı
- `description` (zorunlu): Kısa açıklama
- `date` (zorunlu): YYYY-MM-DD formatında
- `technologies` (zorunlu): Teknoloji listesi
- `demoUrl`: Demo linki
- `githubUrl`: GitHub linki
- `featured`: Ana sayfada göster
- `image`: Kapak görseli
- `draft`: Taslak (listelenmez)

#### Makaleler için:
- `title` (zorunlu): Makale başlığı
- `description` (zorunlu): Kısa özet
- `date` (zorunlu): YYYY-MM-DD formatında
- `category` (zorunlu): Kategori
- `tags` (zorunlu): Etiket listesi
- `readTime` (zorunlu): Okuma süresi (dk)
- `featured`: Ana sayfada göster
- `image`: Kapak görseli
- `draft`: Taslak (listelenmez)

## 🎨 Görsel Ekleme

1. Görselleri `public/projects/` veya `public/articles/` klasörüne ekleyin
2. Markdown'da relative path kullanın:
   ```markdown
   ![Açıklama](/projects/my-image.jpg)
   ```

## 📱 Responsive Görseller

Görseller otomatik olarak responsive olur. CSS'te `object-fit: cover` kullanılır.

## 🔍 SEO

- `title` ve `description` meta taglar için kullanılır
- URL-friendly dosya adları kullanın (küçük harf, tire ile ayrılmış)
- Anlamlı `alt` text'ler kullanın

## 💡 İpuçları

1. **Dosya Adlandırma**: URL'de görünecek şekilde adlandırın
   - ✅ `react-performance-tips.md`
   - ❌ `React Performance Tips.md`

2. **Tarih Formatı**: ISO 8601 formatı kullanın (YYYY-MM-DD)

3. **Görseller**: Optimize edilmiş görseller kullanın (WebP tercih edilir)

4. **Draft**: Yayınlanmaya hazır olmayan içerikler için `draft: true` kullanın

5. **Featured**: Maksimum 3 içerik featured olarak işaretlenebilir