export const texts = {
  // Navbar
  'nav.portfolio': 'Portfolio',
  'nav.projects': 'Projelerim',
  'nav.skills': 'Yeteneklerim',
  'nav.blog': 'Blog',
  'nav.articles': 'Yazılarım',
  'nav.tutorials': 'Eğitimler',
  'nav.gsapLab': 'GSAP Lab',
  'nav.basicAnimations': 'Temel Animasyonlar',
  'nav.advanced': 'İleri Seviye',
  'nav.experiments': 'Deneyimler',
  'nav.contact': 'İletişim',
  'nav.about': 'Hakkımda',
  'nav.contactMe': 'İletişim',

  // Home Page Hero
  'hero.greeting': 'Merhaba, Ben Emre!',
  'hero.subtitle': 'Native iOS & Android Developer',
  'hero.description': 'Backend ve mobil uygulama geliştirme konularında uzmanlaşan bir geliştiriciyim. Bu blog ve portfolyo sitesinde projelerimi, deneyimlerimi ve öğrendiklerimi paylaşıyorum.',
  'hero.experience': 'Yıl Deneyim',
  'hero.projects': 'Proje',
  'hero.learning': 'Öğrenme',

  // Projects Section
  'projects.title': 'Son Projelerim',
  'projects.ecommerce.title': 'E-Ticaret Platformu',
  'projects.ecommerce.description': 'React ve Node.js kullanarak geliştirdiğim modern e-ticaret uygulaması. Responsive tasarım ve smooth animasyonlar.',
  'projects.portfolio.title': 'Portfolio Dashboard',
  'projects.portfolio.description': 'Kişisel projelerimi sergilediğim interaktif dashboard. Three.js ile 3D elementler ve mikro animasyonlar.',
  'projects.dataviz.title': 'Data Visualization Tool',
  'projects.dataviz.description': 'D3.js kullanarak oluşturduğum veri görselleştirme aracı. Gerçek zamanlı grafikler ve interaktif dashboard.',
  'projects.demo': 'Demo',
  'projects.viewAll': 'Tüm Projeleri Gör',

  // Blog Section
  'blog.title': 'Son Blog Yazılarım',
  'blog.post1.title': 'Modern JavaScript ile GSAP Animasyonları',
  'blog.post1.description': 'GSAP kullanarak web sitelerinize profesyonel animasyonlar eklemenin modern yolları ve best practice\'ler...',
  'blog.post2.title': 'TypeScript ile React Performance Optimizasyonu',
  'blog.post2.description': 'React uygulamalarında performansı artırmak için TypeScript\'ten nasıl faydalanabiliriz? Pratik örnekler...',
  'blog.post3.title': 'Frontend Developer Olarak 3 Yıllık Deneyimim',
  'blog.post3.description': 'Frontend geliştirme alanında edindiğim deneyimler, karşılaştığım zorluklar ve öğrendiğim dersler...',
  'blog.readMore': 'Devamını Oku',
  'blog.viewAll': 'Tüm Yazıları Gör',

  // Categories
  'category.webDevelopment': 'Web Development',
  'category.frontend': 'Frontend',
  'category.career': 'Career',

  // Footer
  'footer.copyright': '© 2024 Emre Argana | Blog & Portfolio',
  'footer.subtitle': 'Backend & Mobile Developer',

  // Page Headers
  'page.projects.title': 'Projelerim',
  'page.projects.desc': 'Geliştirdiğim projeler ve çalışmalarım...',
  'page.skills.title': 'Yeteneklerim',
  'page.skills.desc': 'Kullandığım teknolojiler ve araçlar...',
  'page.articles.title': 'Blog Yazılarım',
  'page.articles.desc': 'Web geliştirme ve teknoloji üzerine yazılarım...',
  'page.tutorials.title': 'Eğitimler',
  'page.tutorials.desc': 'Frontend geliştirme rehberleri ve öğretici içerikler...',
  'page.advanced.title': 'İleri Seviye GSAP',
  'page.advanced.desc': 'Kompleks animasyonlar ve ileri seviye teknikler...',
  'page.experiments.title': 'GSAP Deneyleri',
  'page.experiments.desc': 'Yaratıcı animasyon deneyleri ve keşifler...',
  'page.about.title': 'Hakkımda',
  'page.about.desc': 'Kim olduğum ve profesyonel hikayem...',
  'page.contact.title': 'İletişim',
  'page.contact.desc': 'Benimle iletişime geçin...',

  // Basic Animations Page
  'basic.title': 'Temel GSAP Animasyonları',
  'basic.subtitle': 'GSAP\'in temel yapı taşlarını öğrenin',
  'basic.tween.title': 'Temel Tween',
  'basic.timeline.title': 'Timeline',
  'basic.stagger.title': 'Stagger',
  'basic.fromto.title': 'From/FromTo Animasyonları',
  'basic.start': 'Başlat',
  'basic.activate': 'Aktif Et',
  'basic.code': 'Kod:'
};

export function getText(key: string): string {
  const text = texts[key as keyof typeof texts];
  if (!text) {
    console.warn(`Text not found for key: ${key}`);
    return key;
  }
  return text;
}