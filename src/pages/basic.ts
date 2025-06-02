export function createBasicPage(): string {
  return `
    <div class="page-container basic-page">
      <div class="page-header">
        <h1>Temel GSAP Animasyonları</h1>
        <p>GSAP'in temel yapı taşlarını öğrenin</p>
      </div>

      <div class="content-grid">
        <section class="demo-section">
          <h2><i class="fas fa-bullseye"></i> Temel Tween</h2>
          <div class="demo-container">
            <div class="demo-area">
              <div class="animated-box basic-box" id="basic-tween-box"></div>
            </div>
            <div class="demo-controls">
              <button class="demo-btn" id="basic-tween-btn">Animasyonu Başlat</button>
              <div class="demo-info">
                <h4>Özellikler:</h4>
                <ul>
                  <li>X hareket: 200px</li>
                  <li>Döndürme: 360°</li>
                  <li>Ölçek: 1.5x</li>
                  <li>Süre: 2 saniye</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="code-example">
            <h4>Kod:</h4>
            <pre><code class="language-javascript">gsap.to(".box", {
  x: 200,
  rotation: 360,
  scale: 1.5,
  duration: 2,
  ease: "power2.inOut"
});</code></pre>
          </div>
        </section>

        <section class="demo-section">
          <h2><i class="fas fa-clock"></i> Timeline</h2>
          <div class="demo-container">
            <div class="demo-area">
              <div class="animated-box timeline-box" id="timeline-box"></div>
            </div>
            <div class="demo-controls">
              <button class="demo-btn" id="timeline-btn">Timeline Başlat</button>
              <div class="demo-info">
                <h4>Sıra:</h4>
                <ul>
                  <li>1. Sağa hareket</li>
                  <li>2. Aşağı hareket</li>
                  <li>3. Döndürme</li>
                  <li>4. Başa dönüş</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="code-example">
            <h4>Kod:</h4>
            <pre><code class="language-javascript">const tl = gsap.timeline();
tl.to(".box", { x: 100, duration: 1 })
  .to(".box", { y: 50, duration: 0.5 })
  .to(".box", { rotation: 360, duration: 1 })
  .to(".box", { x: 0, y: 0, rotation: 0, duration: 1.5 });</code></pre>
          </div>
        </section>

        <section class="demo-section">
          <h2><i class="fas fa-layer-group"></i> Stagger</h2>
          <div class="demo-container">
            <div class="demo-area">
              <div class="stagger-container">
                <div class="stagger-box" data-index="1"></div>
                <div class="stagger-box" data-index="2"></div>
                <div class="stagger-box" data-index="3"></div>
                <div class="stagger-box" data-index="4"></div>
                <div class="stagger-box" data-index="5"></div>
              </div>
            </div>
            <div class="demo-controls">
              <button class="demo-btn" id="stagger-btn">Stagger Başlat</button>
              <div class="demo-info">
                <h4>Ayarlar:</h4>
                <ul>
                  <li>Gecikme: 0.2s</li>
                  <li>Y hareket: -100px</li>
                  <li>Ölçek: 1.3x</li>
                  <li>Döndürme: 360°</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="code-example">
            <h4>Kod:</h4>
            <pre><code class="language-javascript">gsap.fromTo(".stagger-box", 
  { y: 0, scale: 1, rotation: 0 },
  { 
    y: -100, 
    scale: 1.3, 
    rotation: 360, 
    duration: 0.8, 
    stagger: 0.2,
    ease: "back.out(1.7)"
  }
);</code></pre>
          </div>
        </section>

        <section class="demo-section">
          <h2><i class="fas fa-arrows-rotate"></i> From/FromTo Animasyonları</h2>
          <div class="demo-container">
            <div class="demo-area">
              <div class="animated-box fromto-box" id="fromto-box"></div>
            </div>
            <div class="demo-controls">
              <button class="demo-btn" id="from-btn">From Animasyonu</button>
              <button class="demo-btn" id="fromto-btn">FromTo Animasyonu</button>
              <div class="demo-info">
                <h4>From vs FromTo:</h4>
                <ul>
                  <li>From: Başlangıç değeri belirler</li>
                  <li>FromTo: Hem başlangıç hem bitiş</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="code-example">
            <h4>Kod:</h4>
            <pre><code class="language-javascript">// From
gsap.from(".box", { x: -200, opacity: 0, duration: 1 });

// FromTo
gsap.fromTo(".box", 
  { x: -200, opacity: 0 },
  { x: 200, opacity: 1, duration: 2 }
);</code></pre>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function initBasicPage() {
  const { gsap } = window as any;

  // Basic Tween Demo
  const basicBtn = document.getElementById('basic-tween-btn');
  const basicBox = document.getElementById('basic-tween-box');
  
  basicBtn?.addEventListener('click', () => {
    gsap.fromTo(basicBox, 
      { x: 0, rotation: 0, scale: 1 },
      { 
        x: 200, 
        rotation: 360, 
        scale: 1.5, 
        duration: 2, 
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      }
    );
  });

  // Timeline Demo
  const timelineBtn = document.getElementById('timeline-btn');
  const timelineBox = document.getElementById('timeline-box');
  
  timelineBtn?.addEventListener('click', () => {
    const tl = gsap.timeline();
    tl.to(timelineBox, { x: 150, duration: 1, ease: "power2.out" })
      .to(timelineBox, { y: 80, duration: 0.5, ease: "bounce.out" })
      .to(timelineBox, { rotation: 360, duration: 1, ease: "power2.inOut" })
      .to(timelineBox, { x: 0, y: 0, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
  });

  // Stagger Demo
  const staggerBtn = document.getElementById('stagger-btn');
  const staggerBoxes = document.querySelectorAll('.stagger-box');
  
  staggerBtn?.addEventListener('click', () => {
    gsap.fromTo(staggerBoxes, 
      { y: 0, scale: 1, rotation: 0 },
      { 
        y: -100, 
        scale: 1.3, 
        rotation: 360, 
        duration: 0.8, 
        ease: "back.out(1.7)", 
        stagger: 0.2,
        yoyo: true,
        repeat: 1
      }
    );
  });

  // From/FromTo Demo
  const fromBtn = document.getElementById('from-btn');
  const fromtoBtn = document.getElementById('fromto-btn');
  const fromtoBox = document.getElementById('fromto-box');
  
  fromBtn?.addEventListener('click', () => {
    gsap.set(fromtoBox, { x: 0, opacity: 1 }); // Reset
    gsap.from(fromtoBox, { x: -200, opacity: 0, duration: 1.5, ease: "power3.out" });
  });
  
  fromtoBtn?.addEventListener('click', () => {
    gsap.fromTo(fromtoBox, 
      { x: -200, opacity: 0, scale: 0.5 },
      { x: 200, opacity: 1, scale: 1, duration: 2, ease: "elastic.out(1, 0.3)" }
    );
  });

  // Highlight code blocks
  if ((window as any).Prism) {
    (window as any).Prism.highlightAll();
  }

  // Page entrance animation
  const tl = gsap.timeline();
  tl.from('.page-header h1', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from('.page-header p', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .from('.demo-section', { y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' }, '-=0.3');
}