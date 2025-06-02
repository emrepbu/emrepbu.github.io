// YENİ PROJE ŞABLONU
// Bu dosyayı kullanarak yeni projeler ekleyebilirsiniz

import { Project } from '../src/pages/projects.js';

/*
KULLANIM:
1. Aşağıdaki şablonu doldurun
2. projects.ts dosyasında projects dizisine ekleyin
3. Gerekli görsel dosyalarını public/ klasörüne ekleyin
*/

export const newProjectTemplate: Project = {
  // Benzersiz ID (URL-friendly, küçük harf, tire ile ayırılmış)
  id: 'proje-adi',
  
  // Proje başlığı
  title: 'Proje Başlığı',
  
  // Proje açıklaması (kısa, 1-2 cümle)
  description: 'Projenin kısa açıklaması. Ne yaptığını ve hangi teknolojileri kullandığını açıklayın.',
  
  // Kullanılan teknolojiler (filtre için önemli)
  technologies: ['React', 'Node.js', 'GSAP', 'MongoDB'],
  
  // Demo URL (isteğe bağlı)
  demoUrl: 'https://demo-url.com',
  
  // GitHub URL (isteğe bağlı)
  githubUrl: 'https://github.com/kullanici/repo',
  
  // Proje tarihi (YYYY-MM-DD formatında)
  date: '2024-01-15',
  
  // Öne çıkan proje mi? (ana sayfada gösterilir)
  featured: true,
  
  // Proje görseli (isteğe bağlı, public/ klasöründeki dosya yolu)
  image: 'projects/proje-adi.jpg'
};

/*
ÖRNEK KULLANIM:

1. Bu template'i doldurun:
const yeniProjem: Project = {
  id: 'portfolio-website',
  title: 'Kişisel Portfolio Website',
  description: 'GSAP animasyonları ile geliştirilmiş modern portfolio sitesi.',
  technologies: ['TypeScript', 'GSAP', 'Vite'],
  demoUrl: 'https://emreargana.dev',
  githubUrl: 'https://github.com/emrepbu/portfolio',
  date: '2024-03-20',
  featured: true
};

2. src/pages/projects.ts dosyasını açın
3. projects dizisine yeni projenizi ekleyin:
export const projects: Project[] = [
  // Mevcut projeler...
  yeniProjem, // Yeni projenizi buraya ekleyin
];

4. Proje görseli eklemek için:
   - Görseli public/projects/ klasörüne ekleyin
   - image özelliğini 'projects/dosya-adi.jpg' olarak ayarlayın

5. Teknoloji filtreleri otomatik olarak çalışacaktır
*/