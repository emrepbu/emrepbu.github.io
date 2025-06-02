// YENİ BLOG YAZISI ŞABLONU
// Bu dosyayı kullanarak yeni blog yazıları ekleyebilirsiniz

import { Article } from '../src/pages/articles.js';

/*
KULLANIM:
1. Aşağıdaki şablonu doldurun
2. articles.ts dosyasında articles dizisine ekleyin
3. Gerekli görsel dosyalarını public/ klasörüne ekleyin
*/

export const newArticleTemplate: Article = {
  // Benzersiz ID (URL-friendly, küçük harf, tire ile ayırılmış)
  id: 'makale-adi',
  
  // Makale başlığı
  title: 'Makale Başlığı',
  
  // Makale açıklaması (özet, 1-2 cümle)
  description: 'Makalenin kısa açıklaması. Ne hakkında olduğunu ve hangi konuları kapsadığını açıklayın.',
  
  // Kategori (mevcut: Web Development, Frontend, Career)
  category: 'Web Development',
  
  // Etiketler (arama ve filtreleme için)
  tags: ['JavaScript', 'React', 'Tutorial'],
  
  // Makale tarihi (YYYY-MM-DD formatında)
  date: '2024-01-15',
  
  // Tahmini okuma süresi (dakika)
  readTime: 5,
  
  // Öne çıkan makale mi? (ana sayfada gösterilir)
  featured: true,
  
  // Makale görseli (isteğe bağlı, public/ klasöründeki dosya yolu)
  image: 'articles/makale-adi.jpg',
  
  // Makale içeriği (isteğe bağlı, gelecekte detay sayfası için)
  content: `
    <h2>Giriş</h2>
    <p>Makale içeriğiniz buraya gelecek...</p>
    
    <h2>Ana Konu</h2>
    <p>Detaylı açıklamalar...</p>
    
    <h2>Sonuç</h2>
    <p>Özet ve kapanış...</p>
  `
};

/*
KATEGORİ REHBERİ:
- "Web Development": Genel web geliştirme konuları
- "Frontend": Frontend teknolojileri ve framework'ler
- "Career": Kariyer, deneyim, öğrenme süreçleri
- "Tutorial": Adım adım rehberler
- "Tips": İpuçları ve trick'ler

ÖRNEK KULLANIM:

1. Bu template'i doldurun:
const yeniMakalem: Article = {
  id: 'react-hooks-rehberi',
  title: 'React Hooks Kapsamlı Rehberi',
  description: 'React Hooks kullanımı, best practice\'ler ve pratik örneklerle detaylı rehber.',
  category: 'Frontend',
  tags: ['React', 'Hooks', 'JavaScript', 'Tutorial'],
  date: '2024-03-15',
  readTime: 12,
  featured: true
};

2. src/pages/articles.ts dosyasını açın
3. articles dizisine yeni makalenizi ekleyin:
export const articles: Article[] = [
  // Mevcut makaleler...
  yeniMakalem, // Yeni makalenizi buraya ekleyin
];

4. Makale görseli eklemek için:
   - Görseli public/articles/ klasörüne ekleyin
   - image özelliğini 'articles/dosya-adi.jpg' olarak ayarlayın

5. Kategori filtreleri otomatik olarak çalışacaktır
6. Etiketler (#tag) şeklinde gösterilecektir
*/

/*
OKUMA SÜRESİ HESAPLAMA:
- Ortalama okuma hızı: 200 kelime/dakika
- Örnek hesaplama: 1000 kelimelik makale ≈ 5 dakika
- Kod örnekleri varsa +1-2 dakika ekleyin
*/