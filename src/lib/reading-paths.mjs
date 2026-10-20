// Editorial reading order, independent of publication dates.
// Add each new article after its prerequisites; coverage is checked at build time.
export const PHYSICS_READING_SECTIONS = [
  {
    id: 'hareket-ve-kuvvet',
    title: 'Ölçüm, hareket ve kuvvet',
    description:
      'Birimlerden başlayıp hareketi, kuvvetleri ve korunum yasalarını kur.',
    postIds: [
      'fizikte-olcme-birimler-ve-modeller',
      'hareket-konum-hiz-ve-ivme',
      'newton-yasalari-ve-kuvvetler',
      'is-enerji-ve-korunum',
      'momentum-itme-ve-carpismalar',
      'donme-tork-ve-acisal-momentum',
      'kutlecekim-ve-yorungeler',
      'salinim-sonum-ve-rezonans',
    ],
  },
  {
    id: 'dalgalar-ve-isi',
    title: 'Dalgalar ve ısıl fizik',
    description:
      'Salınımların yayılmasını, sıcaklığı ve enerjinin aktarılmasını öğren.',
    postIds: [
      'dalgalar-ve-dalga-denklemi',
      'fourier-serileri-ve-dalga-paketleri',
      'sicaklik-isi-ve-termodinamigin-ilk-yasasi',
      'entropi-ve-termodinamigin-ikinci-yasasi',
    ],
  },
  {
    id: 'alanlar-ve-isik',
    title: 'Alanlar, ışık ve görelilik',
    description:
      'Elektrik ve manyetik alanlardan ışığın davranışına ve özel göreliliğe geç.',
    postIds: [
      'elektrik-yuku-alan-ve-potansiyel',
      'kondansatorler-ve-elektrik-devreleri',
      'manyetizma-ve-elektromanyetik-induksiyon',
      'maxwell-denklemleri-ve-elektromanyetik-dalgalar',
      'isik-girisim-kirinim-ve-kutuplanma',
      'ozel-gorelilik-uzay-zaman-ve-enerji',
    ],
  },
  {
    id: 'analitik-mekanik',
    title: 'Lagrange, Hamilton ve korunum yasaları',
    description:
      'Klasik fiziğin enerji ve alan bilgisini varyasyonla birleştir; faz uzayını ve Noether teoremini kur.',
    postIds: [
      'lagrange-mekanigi',
      'klasik-hamilton-mekanigi',
      'noether-teoremi',
    ],
  },
  {
    id: 'kuantuma-giris',
    title: 'Kuantuma ilk adımlar',
    description:
      'Klasik fiziğin sınırlarını gör; spin, kuantum durumu, ölçüm ve zaman evrimini tanı.',
    postIds: [
      'kuantuma-gecis-isil-isinim-ve-fotoelektrik',
      'atom-tayflari-ve-madde-dalgalari',
      'stern-gerlach-deneyi-ve-spin',
      'kuantum-durumu-superpozisyon-ve-born-kurali',
      'kuantum-gozlenebilirleri-ve-beklenen-deger',
      'hamiltonyen-ve-kuantum-zaman-evrimi',
    ],
  },
  {
    id: 'dalga-mekanigi',
    title: 'Dalga mekaniği',
    description:
      'Dalga fonksiyonunu kullanarak kuyuları, tünellemeyi ve belirsizliği hesapla.',
    postIds: [
      'dalga-fonksiyonu-konum-ve-momentum',
      'schrodinger-denklemi-ve-olasilik-akimi',
      'sonsuz-potansiyel-kuyusu',
      'potansiyel-basamagi-ve-tunelleme',
      'komutatorler-ve-belirsizlik-iliskisi',
      'kuantum-harmonik-osilatoru',
    ],
  },
  {
    id: 'birlesik-sistemler',
    title: 'Birden fazla sistem',
    description:
      'Dolanıklığı, karışık durumları ve Bell korelasyonlarını sırayla incele.',
    postIds: [
      'tensor-carpimi-ve-dolaniklik',
      'yogunluk-matrisleri-ve-karisik-durumlar',
      'bell-esitsizligi-ve-kuantum-korelasyonlari',
    ],
  },
  {
    id: 'simetri-ve-atom',
    title: 'Simetri ve atomun yapısı',
    description:
      'Sonlu kuyudan simetriye, açısal momentuma, hidrojene ve özdeş parçacıklara ilerle.',
    postIds: [
      'sonlu-potansiyel-kuyusu',
      'kuantumda-simetri-ve-parite',
      'kuantumda-acisal-momentum',
      'merkezi-potansiyel-ve-hidrojen-atomi',
      'acisal-momentumlarin-toplanmasi',
      'ozdes-parcaciklar-bozonlar-ve-fermiyonlar',
    ],
  },
  {
    id: 'yaklasik-cozumler',
    title: 'Yaklaşık çözümler ve geçişler',
    description:
      'Tam çözülemeyen sistemler için pertürbasyon, varyasyon, WKB ve saçılma araçlarını kur.',
    postIds: [
      'zamandan-bagimsiz-perturbasyon-teorisi',
      'dejenerasyon-ve-zeeman-etkisi',
      'varyasyon-yontemi',
      'wkb-yaklasimi',
      'zamana-bagli-perturbasyon-ve-rabi-salinimlari',
      'kuantum-sacilmasi-ve-tesir-kesiti',
    ],
  },
  {
    id: 'adyabatik-degisim-ve-kuantum-fazi',
    title: 'Adyabatik değişim ve kuantum fazı',
    description:
      'Zamana bağlı sistemlerde adyabatik koşulu, Landau–Zener geçişini ve Aharonov–Bohm etkisini incele.',
    postIds: [
      'adyabatik-evrim-ve-landau-zener',
      'aharonov-bohm-etkisi',
    ],
  },
  {
    id: 'olcum-ve-cevre',
    title: 'Ölçüm, çevre ve entropi',
    description:
      'Genel ölçümleri ve çevreyle etkileşimin kuantum durumuna etkisini incele.',
    postIds: [
      'genellestirilmis-kuantum-olcumleri',
      'kuantum-kanallari-ve-dekoherens',
      'kuantum-entropisi-ve-bilgi',
    ],
  },
  {
    id: 'atomlardan-katilara',
    title: 'Klasik sınır, atom ve ışık',
    description:
      'Ehrenfest teoreminden spin–yörünge etkileşimine, geçiş oranlarına ve atom–ışık etkileşimine ilerle.',
    postIds: [
      'ehrenfest-teoremi-ve-klasik-sinir',
      'spin-yorunge-etkilesimi',
      'ferminin-altin-kurali',
      'atom-isik-etkilesimi-ve-secim-kurallari',
    ],
  },
  {
    id: 'fock-uzayi-ve-kuantum-isik',
    title: 'Çok parçacıklı dil ve kuantum ışık',
    description:
      'İşgal sayılarından fotonlara, koherent durumlara ve nicemlenmiş atom–ışık etkileşimine ilerle.',
    postIds: [
      'ikinci-kuantizasyon',
      'elektromanyetik-alanin-kuantumlastirilmasi',
      'kuantum-optigi-ve-koherent-durumlar',
    ],
  },
  {
    id: 'cok-parcacikli-madde',
    title: 'Çok elektronlu atomlardan katılara',
    description:
      'Elektron etkileşimlerinden moleküllere, kuantum istatistiğine ve enerji bantlarına ilerle.',
    postIds: [
      'helyum-ve-elektron-etkilesimi',
      'cok-elektronlu-atomlar-ve-periyodik-tablo',
      'molekuller-ve-kuantum-baglari',
      'boltzmann-dagilimi-ve-bolusum-fonksiyonu',
      'bose-einstein-ve-fermi-dirac-dagilimlari',
      'kristaller-ve-enerji-bantlari',
    ],
  },
  {
    id: 'kristalde-elektronlar',
    title: 'Kristalde elektronlar ve yarı iletkenler',
    description:
      'Ters örgüden durum sayımına, etkin kütleden akıma, katkılama ve ışıkla etkileşime ilerle.',
    postIds: [
      'ters-orgu-ve-bragg-kirinimi',
      'durum-yogunlugu-ve-fermi-yuzeyi',
      'etkin-kutle-ve-delikler',
      'elektriksel-iletkenlik-ve-drude-modeli',
      'yari-iletkenler-ve-katkilama',
      'pn-eklemi-ve-diyot',
      'katilarda-isik-ve-eksitonlar',
    ],
  },
  {
    id: 'fononlar-ve-isi',
    title: 'Örgü titreşimleri ve ısı',
    description:
      'Normal modları fononlarla anlat; katıların ısı sığasını ve ısı iletimini hesapla.',
    postIds: [
      'orgu-titresimleri-ve-fononlar',
      'katilarin-isi-sigasi-ve-debye-modeli',
      'fononlar-ve-isi-iletimi',
    ],
  },
  {
    id: 'manyetizma-ve-duzen',
    title: 'Manyetizma ve ortak düzen',
    description:
      'Tek bir manyetik momentin yanıtından değiş tokuşa, düzenlenmeye ve faz geçişlerine geç.',
    postIds: [
      'diyamanyetizma-ve-paramanyetizma',
      'degis-tokus-etkilesimi-ve-manyetik-duzen',
      'ising-modeli-ve-faz-gecisleri',
    ],
  },
  {
    id: 'kuantum-gazlari-ve-akis',
    title: 'Kuantum gazları, süperakışkanlık ve süperiletkenlik',
    description:
      'Fermi basıncını ve Bose yoğuşmasını kur; ortak kuantum fazının akışa ve elektrik akımına etkisini incele.',
    postIds: [
      'fermi-gazi-ve-dejenerasyon-basinci',
      'bose-einstein-yogusmasi',
      'superakiskanlik-ve-kuantum-girdaplari',
      'cooper-ciftleri-ve-bcs-kurami',
      'josephson-etkisi-ve-aki-kuantumlanmasi',
    ],
  },
  {
    id: 'hall-ve-geometrik-faz',
    title: 'Hall etkisi ve geometrik faz',
    description:
      'Landau düzeylerinden kuantum Hall etkisine, Berry fazına ve topolojik bantlara ulaş.',
    postIds: [
      'landau-duzeyleri-ve-kuantum-hall-etkisi',
      'berry-fazi-ve-topolojik-bantlar',
    ],
  },
  {
    id: 'topolojik-sinir-durumlari',
    title: 'Topolojik modeller ve sınır durumları',
    description:
      'Berry fazı ve bant geometrisini SSH zincirinde ve topolojik yalıtkanların sınırlarında somutlaştır.',
    postIds: [
      'ssh-modeli-ve-uc-durumlari',
      'topolojik-yalitkanlar-ve-sinir-durumlari',
    ],
  },
  {
    id: 'ileri-okuma',
    title: 'İleri okuma: Planck ölçeği',
    description:
      'Genel görelilik ve kuantum kütleçekimine uzanan kavramsal bir ek okuma.',
    postIds: ['the-planck-length-fundamental-limit-of-spacetime'],
  },
]

export const MATH_READING_SECTIONS = [
  {
    id: 'sayilar-ve-islemler',
    title: 'Sayılar ve işlemler',
    description:
      'Sayı doğrusundan başlayıp kesirleri, oranları, işlem sırasını ve üsleri öğren.',
    postIds: [
      'sayi-dogrusu-yon-ve-uzaklik',
      'carpma-ve-bolme-es-gruplar',
      'kesirler-bir-butunu-bolmek',
      'ondalik-gosterim-ve-yaklasik-degerler',
      'oran-oranti-ve-yuzde',
      'islemlerin-duzeni',
      'usler-ve-kokler',
    ],
  },
  {
    id: 'cebir-ve-ispat',
    title: 'Cebir ve ispat',
    description:
      'Harflerle işlem yapmayı, denklemleri, eşitsizlikleri ve matematiksel gerekçelendirmeyi kur.',
    postIds: [
      'harfler-esitlikler-ve-denklemler',
      'ozdeslikler-ve-carpanlara-ayirma',
      'esitsizlikler-kumeler-ve-mutlak-deger',
      'iki-bilinmeyenli-denklem-sistemleri',
      'ikinci-derece-denklemler',
      'ornek-karsi-ornek-ve-ispat',
    ],
  },
  {
    id: 'geometri',
    title: 'Geometri ve koordinatlar',
    description:
      'Şekiller, benzerlik, alan ve hacimden Pisagor teoremine ve koordinatlara ilerle.',
    postIds: [
      'noktalar-dogrular-acilar-ve-ucgenler',
      'eslik-benzerlik-ve-olcek',
      'cevre-alan-ve-hacim',
      'pisagor-teoremi',
      'koordinatlar-uzaklik-ve-egim',
    ],
  },
  {
    id: 'fonksiyonlar',
    title: 'Fonksiyonlar ve grafikler',
    description:
      'Değişkenler arasındaki ilişkileri grafiklerle, üstel fonksiyonlarla ve logaritmayla anlat.',
    postIds: [
      'fonksiyonlar-ve-grafikler',
      'dogrusal-ve-ikinci-derece-fonksiyonlar',
      'fonksiyonlarda-bileske-ters-ve-donusum',
      'ustel-fonksiyonlar-ve-logaritma',
    ],
  },
  {
    id: 'trigonometri',
    title: 'Trigonometri',
    description:
      'Dik üçgenden birim çembere, trigonometrik bağıntılara ve üçgen çözümüne geç.',
    postIds: [
      'dik-ucgende-trigonometri',
      'birim-cember-radyan-ve-trigonometrik-grafikler',
      'trigonometrik-ozdeslikler-ve-denklemler',
      'pisagorun-otesi-kosinus-teoremi',
      'ucgen-cozumu-ve-ters-trigonometri',
    ],
  },
  {
    id: 'vektorler-ve-matrisler',
    title: 'Vektörler, matrisler ve simetri',
    description:
      'Bileşenleri, baz kavramını, doğrusal dönüşümleri ve sonlu simetri gruplarını tanı.',
    postIds: [
      'vektorler-ve-bilesenleri',
      'skaler-carpim-aci-ve-izdusum',
      'dogrusal-birlesim-baz-ve-boyut',
      'matrisler-ve-dogrusal-donusumler',
      'determinant-ters-matris-ve-sistemler',
      'grup-kurami-ve-simetriler',
    ],
  },
  {
    id: 'limit-turev-integral',
    title: 'Limit, türev ve integral',
    description:
      'Değişim hızını ve birikimi anlamak için limitten başlayıp serilere kadar ilerle.',
    postIds: [
      'diziler-limit-ve-sureklilik',
      'turevin-anlami-ve-temel-kurallari',
      'trigonometrik-ve-ters-fonksiyonlarda-turev',
      'turev-teoremleri-ve-uygulamalari',
      'belirli-integral-ve-temel-teorem',
      'integral-alma-yontemleri',
      'integralin-uygulamalari-ve-uygunsuz-integraller',
      'sonsuz-seriler-ve-taylor-yaklasimi',
    ],
  },
  {
    id: 'cok-degiskenli-analiz',
    title: 'Karmaşık sayılar, alanlar ve tensörler',
    description:
      'Karmaşık sayılardan çok değişkenli analize, alan integrallerine ve tensör dönüşümlerine geç.',
    postIds: [
      'karmasik-sayilar-ve-euler-bagintisi',
      'uc-boyutta-vektorel-carpim',
      'cok-degiskenli-fonksiyonlar-ve-turev',
      'cok-katli-integraller-ve-koordinatlar',
      'vektor-alanlari-ve-integral-teoremleri',
      'tensorler-ve-indis-hesabi',
    ],
  },
  {
    id: 'denklemler-ve-ileri-cebir',
    title: 'Diferansiyel denklemler ve sürekli simetri',
    description:
      'Diferansiyel denklemleri, özdeğerleri ve üniter matrisleri kur; Lie gruplarıyla sürekli simetriye geç.',
    postIds: [
      'birinci-derece-diferansiyel-denklemler',
      'ikinci-derece-diferansiyel-denklemler',
      'ozdegerler-ozvektorler-ve-kosegenlestirme',
      'karmasik-vektorler-hermit-ve-uniter-matrisler',
      'lie-gruplari-ve-lie-cebirleri',
    ],
  },
  {
    id: 'ileri-analiz-ve-cozum-yontemleri',
    title: 'Varyasyon ve ileri çözüm yöntemleri',
    description:
      'Varyasyon, kısmi diferansiyel denklemler, özel fonksiyonlar, karmaşık analiz ve Green fonksiyonlarını adımlarıyla kur.',
    postIds: [
      'varyasyon-hesabi-ve-euler-lagrange',
      'kismi-diferansiyel-denklemler',
      'sturm-liouville-ve-ozfonksiyonlar',
      'ozel-fonksiyonlar-legendre-hermite-bessel',
      'karmasik-analiz-ve-reziduler',
      'green-fonksiyonlari',
    ],
  },
  {
    id: 'sureklilik-ve-topoloji',
    title: 'Süreklilik ve topoloji',
    description:
      'Açık kümelerden sürekli dönüşümlere, kapalı yollara ve sarım sayısına ilerle.',
    postIds: [
      'topoloji-ve-sarim-sayisi',
    ],
  },
  {
    id: 'olasilik',
    title: 'Olasılık ve dağılımlar',
    description:
      'Sayma ve koşullu olasılıktan rastgele değişkenlere ve dağılımlara ilerle.',
    postIds: [
      'olasilik-sayma-ve-kosullu-bilgi',
      'rastgele-degiskenler-ve-dagilimlar',
    ],
  },
]
export const SOFTWARE_READING_SECTIONS = [
  {
    id: 'kotlin',
    title: 'Kotlin ve dil özellikleri',
    description:
      'Null güvenliği ve reflection ile Kotlin kodunun davranışını incele.',
    postIds: ['kotlin-nullable', 'kotlin-reflection'],
  },
  {
    id: 'eszamanlilik',
    title: 'Eşzamanlılık ve veri akışları',
    description:
      'Üretici-tüketici modelinden Kotlin akışlarının yönetimine ilerle.',
    postIds: ['consumer-producer-model', 'kotlin-flat-map-latest'],
  },
  {
    id: 'android',
    title: 'Android ve donanımla iletişim',
    description:
      'NFC verisinin donanımdan uygulamaya nasıl ulaştığını takip et.',
    postIds: ['android-nfc-and-intent-struct'],
  },
  {
    id: 'guvenlik',
    title: 'Rastgelelik ve kriptografi',
    description: 'Entropi kaynaklarından Android kriptografi araçlarına uzan.',
    postIds: ['sources-of-technological-entropy', 'android-bouncy-castle'],
  },
]

const PHYSICS_POST_IDS = PHYSICS_READING_SECTIONS.flatMap(
  (section) => section.postIds,
)
const MATH_POST_IDS = MATH_READING_SECTIONS.flatMap(
  (section) => section.postIds,
)
const SOFTWARE_POST_IDS = SOFTWARE_READING_SECTIONS.flatMap(
  (section) => section.postIds,
)
const physicsTags = new Set(['physics', 'quantum', 'quantum-mechanics'])
const softwareTags = new Set([
  'software',
  'kotlin',
  'android',
  'cryptography',
  'security',
])

/** @param {{ data: { tags?: string[] } }} post */
export function isPhysicsPost(post) {
  return post.data.tags?.some((tag) => physicsTags.has(tag)) ?? false
}

/** @param {{ data: { tags?: string[] } }} post */
export function isMathPost(post) {
  return post.data.tags?.includes('mathematics') ?? false
}

/** @param {{ data: { tags?: string[] } }} post */
export function isSoftwarePost(post) {
  return post.data.tags?.some((tag) => softwareTags.has(tag)) ?? false
}

/**
 * @template {{ id: string, data: { draft?: boolean, tags?: string[] } }} T
 * @param {string[]} ids
 * @param {T[]} posts
 * @returns {T[]}
 */
function resolvePosts(ids, posts) {
  if (new Set(ids).size !== ids.length)
    throw new Error('Okuma yolunda yinelenen yazı var.')
  const available = new Map(
    posts.filter((post) => !post.data.draft).map((post) => [post.id, post]),
  )
  return ids.map((id) => {
    const post = available.get(id)
    if (!post)
      throw new Error(`Okuma yolundaki yazı bulunamadı veya taslak: ${id}`)
    return post
  })
}

/**
 * @template {{ id: string, data: { draft?: boolean, tags?: string[] } }} T
 * @param {T[]} posts
 * @param {typeof PHYSICS_READING_SECTIONS} sections
 * @param {(post: T) => boolean} matches
 * @param {string} label
 */
function getSections(posts, sections, matches, label) {
  const postIds = sections.flatMap((section) => section.postIds)
  const ordered = resolvePosts(postIds, posts)
  const ids = new Set(postIds)
  const unplaced = posts.filter(
    (post) => !post.data.draft && matches(post) && !ids.has(post.id),
  )
  if (unplaced.length)
    throw new Error(
      `${label} okuma yoluna sıra eklenmeli: ${unplaced.map((p) => p.id).join(', ')}`,
    )
  let offset = 0
  return sections.map((section) => {
    const start = offset + 1
    const entries = ordered
      .slice(offset, offset + section.postIds.length)
      .map((post, index) => ({ post, number: start + index }))
    offset += entries.length
    return { ...section, start, entries }
  })
}

/**
 * @template {{ id: string, data: { draft?: boolean, tags?: string[] } }} T
 * @param {T[]} posts
 */
export function getPhysicsReadingSections(posts) {
  return getSections(posts, PHYSICS_READING_SECTIONS, isPhysicsPost, 'Fizik')
}

/**
 * @template {{ id: string, data: { draft?: boolean, tags?: string[] } }} T
 * @param {T[]} posts
 */
export function getMathReadingSections(posts) {
  return getSections(posts, MATH_READING_SECTIONS, isMathPost, 'Matematik')
}

/**
 * @template {{ id: string, data: { draft?: boolean, tags?: string[] } }} T
 * @param {T[]} posts
 */
export function getSoftwareReadingSections(posts) {
  return getSections(
    posts,
    SOFTWARE_READING_SECTIONS,
    isSoftwarePost,
    'Bilgisayar ve Yazılım',
  )
}

/** @param {string} id */
export function getPhysicsReadingStep(id) {
  return getStep(id, PHYSICS_POST_IDS)
}

/** @param {string} id @param {string[]} ids */
function getStep(id, ids) {
  const index = ids.indexOf(id)
  if (index === -1) return null
  return {
    id,
    number: index + 1,
    total: ids.length,
    previousId: ids[index - 1] ?? null,
    nextId: ids[index + 1] ?? null,
  }
}

/** @param {string} id */
export function getReadingStep(id) {
  const paths = [
    { key: 'physics', path: '/fizik/', label: 'Fizik', ids: PHYSICS_POST_IDS },
    {
      key: 'math',
      path: '/matematik/',
      label: 'Matematik',
      ids: MATH_POST_IDS,
    },
    {
      key: 'software',
      path: '/yazilim/',
      label: 'Bilgisayar ve Yazılım',
      ids: SOFTWARE_POST_IDS,
    },
  ]
  for (const { ids, ...path } of paths) {
    const step = getStep(id, ids)
    if (step) return { ...step, ...path }
  }
  return null
}

/**
 * @template {{ id: string, data: { draft?: boolean, tags?: string[] } }} T
 * @param {T[]} posts
 */
export function getMathReadingPosts(posts) {
  return resolvePosts(MATH_POST_IDS, posts)
}
