# İçerik Şablonları

Bu klasör, blog yazıları ve projeler için şablon dosyaları içerir.

## 🚀 Yeni Proje Ekleme

1. `new-project-template.ts` dosyasını inceleyin
2. Şablonu doldurun:
   ```typescript
   const yeniProjem: Project = {
     id: 'proje-adi',
     title: 'Proje Başlığı',
     description: 'Kısa açıklama...',
     technologies: ['React', 'GSAP'],
     demoUrl: 'https://demo.com',
     githubUrl: 'https://github.com/user/repo',
     date: '2024-03-20',
     featured: true
   };
   ```
3. `src/pages/projects.ts` dosyasını açın
4. `projects` dizisine yeni projenizi ekleyin
5. Proje görseli varsa `public/projects/` klasörüne ekleyin

## 📝 Yeni Blog Yazısı Ekleme

1. `new-article-template.ts` dosyasını inceleyin
2. Şablonu doldurun:
   ```typescript
   const yeniMakalem: Article = {
     id: 'makale-adi',
     title: 'Makale Başlığı',
     description: 'Kısa açıklama...',
     category: 'Web Development',
     tags: ['JavaScript', 'Tutorial'],
     date: '2024-03-20',
     readTime: 8,
     featured: true
   };
   ```
3. `src/pages/articles.ts` dosyasını açın
4. `articles` dizisine yeni makalenizi ekleyin
5. Makale görseli varsa `public/articles/` klasörüne ekleyin

## 📁 Dosya Yapısı

```
public/
├── projects/          # Proje görselleri
│   ├── proje1.jpg
│   └── proje2.png
├── articles/          # Makale görselleri
│   ├── makale1.jpg
│   └── makale2.png
└── ...

src/pages/
├── projects.ts        # Proje listesi ve sayfa
├── articles.ts        # Makale listesi ve sayfa
└── ...

templates/
├── new-project-template.ts    # Proje şablonu
├── new-article-template.ts    # Makale şablonu
└── README.md                  # Bu dosya
```

## ✨ Özellikler

### Projeler için:
- ✅ Teknoloji filtreleme (React, GSAP, Three.js, vb.)
- ✅ Demo ve GitHub linkleri
- ✅ Öne çıkan projeler
- ✅ Hover animasyonları
- ✅ Responsive tasarım

### Blog Yazıları için:
- ✅ Kategori filtreleme (Web Development, Frontend, Career)
- ✅ Etiket sistemi (#tag)
- ✅ Okuma süresi gösterimi
- ✅ Öne çıkan yazılar
- ✅ Paylaşım özelliği
- ✅ Responsive tasarım

## 🎨 Animasyonlar

Tüm sayfalar GSAP animasyonları ile:
- Sayfa girişi (stagger animasyonları)
- Filtre değişimi (smooth scale/opacity)
- Hover efektleri
- Responsive mobile menü

## 📱 Responsive

Tüm sayfalar mobil-first yaklaşımla tasarlanmıştır:
- Desktop: Grid layout
- Tablet: 2 kolon
- Mobile: 1 kolon
- Touch-friendly butonlar