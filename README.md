# emrepbu
Kişisel blog

## Her yazıya özel animasyonlu kapak

Open Radiant'taki **HTML5 (Blog)** düğmesiyle indirdiğin ZIP'in dosyalarını,
ilgili yazının `cover/` klasörüne koy:

```text
src/content/blog/yazi-adi/
├── index.mdx
└── cover/
    ├── index.html
    └── scene.js
```

Oynatıcı, gömülü JetBrains Mono fontları, CSS ve lisanslar
`public/open-radiant/v1/` altında bir kez tutulur. Bütün blog kapakları aynı
adresleri kullanır; tarayıcı bu dosyaları önbellekten tekrar kullanabilir.
Logo kapalıysa logo SVG'si istenmez. Özel başlık veya alt başlık kullanıldığında
ürün başlığı SVG'si de istenmez. Logo veya ürün başlığı açıksa yalnızca
kullanılan SVG dosyaları ZIP'in `assets/` klasörüne eklenir; bunları da
yazının `cover/` klasörüne kopyala. SVG'ler ortak klasörde tutulmaz.

**HTML5** düğmesi bağımsız, tam paket indirmeye devam eder. Bu paketler de
desteklenir: ZIP'teki tüm dosyaları klasör yapısını koruyarak `cover/` içine koy.
Blog için küçük paket tek başına çevrimdışı çalışmaz; sitenin ortak dosyalarına
ihtiyaç duyar. Mevcut beş kapak küçük paket biçimine taşınmıştır.

Open Radiant oynatıcısını güncelledikten sonra orada `build:player` ve `build`
komutlarını çalıştır; ardından bu blog projesinde ortak dosyaları güncelle:

```sh
npm run covers:sync -- ../open-radiant
```

Güncellenen `public/open-radiant/v1/` klasörünü de blog ile birlikte commit et.
`v1` ortak dosya biçiminin sürümüdür; ileride yeni bir biçime geçilirse eski
kapakların kullandığı sürüm klasörünü koru. Yeni kapak eklerken ortak dosyaları
tekrar kopyalamana gerek yoktur.

`cover/index.html` varsa yazının detay sayfasında ve yazı kartlarında otomatik
olarak HTML5 kapak gösterilir. Bu kartlar ana sayfa, blog arşivi, etiket ve
yazar sayfalarında kullanılır. HTML5 kapak yoksa `image` alanındaki kapak
görseli kullanılır.

HTML5 çıktısını `cover/` altında farklı bir alt klasörde tutmak istersen,
yazının `index.mdx` dosyasının başındaki YAML alanında yolunu belirtebilirsin:

```yaml
image: './kapak.png'
coverAnimation: './cover/animasyon/index.html'
```

`coverAnimation` isteğe bağlıdır ve tanımlandığında otomatik bulunan kapağın
yerine belirtilen HTML5 çıktısı kullanılır. Her yazının kendi `cover/` klasörü
olduğundan aynı dosya isimlerini tekrar kullanabilirsin.

`image` alanı isteğe bağlıdır: RSS ve sosyal paylaşım önizlemeleri varsa bu
resmi kullanır. HTML5 kapak yüklenirken veya
JavaScript kapalıyken de bu resim görünür. HTML5 kapak için yedek resim
tanımlanmamışsa sitenin genel kapak resmi kullanılır.

Animasyonun ölçüleri `scene.js` içindeki `size.v1` ve `size.v2` değerlerinden
otomatik okunur; masaüstünde ve mobilde özgün en-boy oranı korunur. HTML5
çıktısındaki fare hareketi ve tıklama etkileşimleri kapakta da çalışır. Animasyonun
üzerindeyken kaydırma blog sayfasında devam eder; kapak köşeleri yuvarlatılmıştır.
Listelerdeki küçük animasyonlar görsel önizlemedir: kapağa veya kartın başka
bir yerine tıklamak yazıyı açar. Fareyle animasyon etkileşimi yazının detay
sayfasında kullanılabilir.
Mevcut kapaklarla tutarlı bir oran için **1200 × 630 px** export önerilir.
Küçük kartlar en fazla 512 piksel genişliğinde çizilir; 256 piksel kartlarda
yüksek yoğunluklu ekranlar için de yeterli çözünürlük korunur. Yazı içindeki
büyük kapak, export çözünürlüğünü kullanmaya devam eder.

Kapak ekran dışındayken veya sekme arka plandayken çizim döngüleri duraklatılır.
30 saniye içinde tekrar görünürse aynı oynatıcı kaldığı yerden devam eder;
daha uzun süre kullanılmazsa GPU kaynaklarını serbest bırakmak için kaldırılır.
Hızlı kaydırmada kısa süre görünen kartlar için oynatıcı başlatılmaz.
Kapak görünürken otomatik oynar; oynat/durdur düğmesi yoktur.

Örnek kapak `src/content/blog/android-nfc-and-intent-struct/cover/` klasöründedir.
Ortak oynatıcı Open Radiant çıktısıdır; kaynak ve font lisansları
`public/open-radiant/v1/` altında korunur.
Proje: https://github.com/JetBrains/open-radiant

## Yerel kontrol ve yayın

```sh
npm run dev
```

Yayın öncesinde:

```sh
npm run build
npm run preview
```

Derleme, tanımlanmış kapakların HTML, JavaScript, CSS ve diğer dosyalarını
`dist/blog-covers/yazi-adi/` içine, ortak dosyaları ise `dist/open-radiant/v1/`
altına kopyalar. Böylece GitHub Pages üzerinde
Open Radiant sunucusunun ayrıca çalışması gerekmez. `cover/` içindeki lisans
dosyaları blog yazısı olarak alınmaz; üretilmiş oynatıcı kodu tip kontrolünün
dışında tutulur. Yayınlanan `index.html` içine iç kaydırmayı engelleyen küçük
bir stil eklenir; kaynak export dosyalarını elle değiştirmen gerekmez.
