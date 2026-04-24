import { useState } from 'react';
import { config } from './data/config';
import { AudioTrack } from './components/AudioTrack';
import confetti from 'canvas-confetti';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#1DB954', '#DE0541', '#FFB3B5']
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nossa Sintonia',
        text: 'Nossa retrospectiva de 3 anos.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Copie a URL da página para compartilhar com as pessoas que você ama!");
    }
  };

  const playFirstTrack = () => {
    document.getElementById('playlist')?.scrollIntoView({ behavior: 'smooth' });
    const trackButton = document.getElementById('btn-track-1');
    if (trackButton) {
      // Pequeno delay para permitir o scroll iniciar
      setTimeout(() => trackButton.click(), 500);
    }
  };

  const smoothScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-surface-dim text-on-background font-body-md overflow-x-hidden selection:bg-primary-container selection:text-white min-h-screen">
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out opacity-100 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Imagem ampliada" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(29,185,84,0.3)] animate-pulse" 
            style={{ animationDuration: '3s' }}
          />
          <span className="absolute top-8 right-8 material-symbols-outlined text-white text-4xl hover:text-primary transition-colors">
            close
          </span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black/20 backdrop-blur-xl border-b border-white/10 z-50">
        <div 
          className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#1DB954] drop-shadow-[0_0_10px_rgba(29,185,84,0.5)] tracking-tight cursor-pointer"
          onClick={() => smoothScrollTo('inicio')}
        >
          Nossa Sintonia
        </div>
        <nav className="hidden md:flex gap-md">
          <button className="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-white hover:opacity-80 transition-opacity" onClick={() => smoothScrollTo('playlist')}>Reproduzindo</button>
          <button className="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-white/60 hover:opacity-80 transition-opacity" onClick={() => smoothScrollTo('sintonia')}>Sintonia</button>
          <button className="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-white/60 hover:opacity-80 transition-opacity" onClick={() => smoothScrollTo('memorias')}>Memórias</button>
        </nav>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-[#1DB954] cursor-pointer hover:opacity-80 transition-opacity hover:scale-110 active:scale-95" data-icon="favorite" onClick={triggerConfetti}>favorite</span>
          <span className="material-symbols-outlined text-[#1DB954] cursor-pointer hover:opacity-80 transition-opacity hover:scale-110 active:scale-95" data-icon="share" onClick={handleShare}>share</span>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex flex-col items-center justify-center text-center px-container-margin overflow-hidden">
        <div className="absolute inset-0 glow-green blur-[100px] -z-10 translate-y-[-20%]"></div>
        <div className="absolute inset-0 glow-pink blur-[100px] -z-10 translate-y-[20%]"></div>
        <div className="space-y-6 max-w-4xl">
          <div className="flex justify-center mb-base">
            <span className="material-symbols-outlined text-[#1DB954] text-5xl drop-shadow-[0_0_15px_rgba(29,185,84,0.6)]" data-icon="favorite" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <h1 className="font-display-lg text-white">
            Algumas conexões começam como um sussurro...
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            E hoje, transformaram-se em nossa canção favorita. Três anos de uma melodia que só nós dois sabemos cantar.
          </p>
          <div className="pt-lg">
            <button className="bg-primary-container text-on-primary font-label-caps px-lg py-md rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(29,185,84,0.3)] cursor-pointer" onClick={() => smoothScrollTo('sintonia')}>
              RECAPITULAR NOSSA HISTÓRIA
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 pointer-events-none">
          <span className="material-symbols-outlined text-white" data-icon="keyboard_double_arrow_down">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* The Beginning Section */}
      <section id="sintonia" className="py-xl px-container-margin max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-xl items-center">
          <div className="relative group cursor-pointer" onClick={() => setSelectedImage("/image4.jpeg")}>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
            <div className="relative aspect-square rounded-xl overflow-hidden glass-card hover:scale-[1.02] transition-transform duration-300">
              <img className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" src="/image4.jpeg" alt="The Beginning" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
              </div>
            </div>
          </div>
          <div className="space-y-md">
            <span className="font-label-caps text-primary tracking-[0.3em]">O INÍCIO DE TUDO</span>
            <h2 className="font-headline-md text-white">Onde os compassos se alinharam</h2>
            <p className="font-body-lg text-on-surface-variant">
              Há três anos, nossas rotas se cruzaram de forma inesperada. O que parecia ser apenas mais um dia comum tornou-se o marco zero da nossa maior aventura. Desde o primeiro café até o silêncio confortável, cada segundo foi um passo em direção ao que somos hoje.
            </p>
            <div className="flex items-center gap-base text-secondary">
              <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
              <span className="font-label-caps">ESTABELECIDO EM 2021</span>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Counter */}
      <section className="py-xl bg-surface-container-lowest/50">
        <div className="max-w-7xl mx-auto px-container-margin">
          <div className="text-center mb-lg">
            <h3 className="font-headline-sm text-white mb-xs">Cada batida importa</h3>
            <p className="font-body-md text-on-surface-variant">Nossa jornada em números absolutos</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="glass-card p-lg rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="font-display-lg text-primary mb-xs">36</div>
              <div className="font-label-caps text-white/60">Meses</div>
            </div>
            <div className="glass-card p-lg rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="font-display-lg text-primary mb-xs">1.095</div>
              <div className="font-label-caps text-white/60">Dias</div>
            </div>
            <div className="glass-card p-lg rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="font-display-lg text-primary mb-xs">26.280</div>
              <div className="font-label-caps text-white/60">Horas</div>
            </div>
            <div className="glass-card p-lg rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="font-display-lg text-primary mb-xs">1.576.800</div>
              <div className="font-label-caps text-white/60">Minutos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Moments Bento Grid */}
      <section id="memorias" className="py-xl px-container-margin max-w-7xl mx-auto">
        <div className="mb-lg">
          <h2 className="font-headline-md text-white mb-xs">Instantâneos de Nós</h2>
          <p className="font-body-md text-on-surface-variant">Fragmentos de tempo que definiram nossa história.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-md h-auto md:h-[800px]">
          {/* Big Feature Card */}
          <div 
            className="md:col-span-2 md:row-span-2 relative glass-card rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
            onClick={() => setSelectedImage("/image1.jpeg")}
          >
            <img className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" src="/image1.jpeg" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-lg">
              <span className="font-label-caps text-primary mb-xs">O MOMENTO</span>
              <h3 className="font-headline-sm text-white">Ano novo juntos</h3>
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
            </div>
          </div>
          {/* Smaller Cards */}
          <div 
            className="relative glass-card rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            onClick={() => setSelectedImage("/image3.jpeg")}
          >
            <img className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" src="/image3.jpeg" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
              <h4 className="font-headline-sm text-[20px] text-white">Amor desde a infância</h4>
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
            </div>
          </div>
          <div 
            className="relative glass-card rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            onClick={() => setSelectedImage("/image2.jpeg")}
          >
            <img className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" src="/image2.jpeg" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
              <h4 className="font-headline-sm text-[20px] text-white">Primeira Viagem Juntos</h4>
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist Section */}
      <section id="playlist" className="py-xl bg-[#1DB954]/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1DB954] blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-container-margin relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
            <div className="max-w-xl">
              <span className="font-label-caps text-[#1DB954] tracking-widest">WRAPPED 2021-2024</span>
              <h2 className="font-display-lg text-white mt-xs">Nossa Trilha Sonora</h2>
            </div>
            <button 
              className="bg-white text-black font-label-caps px-md py-sm rounded-full flex items-center gap-base hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(29,185,84,0.3)]"
              onClick={playFirstTrack}
            >
              <span className="material-symbols-outlined" data-icon="play_arrow" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              OUVIR AGORA
            </button>
          </div>
          <div className="grid gap-sm">
            <AudioTrack 
              buttonId="btn-track-1"
              number="01"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ku7rQhxf0DDh-EdpneZhAf74Ba_jPIdlHX1yOecqsz7urQ1omEiyVlacdBu2AxQqKN-poYbzNmEYQuw2ngSIMKZgFilWXoV06q6P9MDihhPr3gJtyn-aILXzcgQx7oplokC_ZiT14lYTgUSnUdXHMg0j7qmtd94g0LJeOVAHKarSY-_65Dy1eWHapYDYnD5Z_GiiYIWVz_LvzRjgQ3LvOfSD0YMF1MEt_5xm1pr2J_MSTn8JeRsee-oJCuVS2P_YrB4cx5fsvlu1"
              title="SEE YOU AGAIN"
              subtitle="Tyler, The Creator"
              duration="3:00"
              isFavorite={true}
              url="/See_You_Again.mp3"
              id="track1"
            />
            <AudioTrack 
              buttonId="btn-track-2"
              number="02"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBPVvkcHmIQzjublOCiotRN8Ye5s7bQc4Gyi-JBj_gAwvUyx2E0dpStNbtjbwNIMl1TGPUckZatuTVmrITzrUcRRoMkIMePTSf1HM6Rxj6T80EEsSw0FB0K2PiPHndfDDDOBsMnvVpNYWlibcSOHmdQQ0rN-4u9uvsclNrBldl8w5tQTeYZ7pJerR5yhAuupOI71M715ZeAUljVn2KqLz0E5wKQKxbQ7CvAgTd9QMi7Y1T1IUbFjy8_hsnLzBbVRPFJkt9dphWaiKz5"
              title="DEFEITO MEU"
              subtitle="SILVANNO SALLES"
              duration="3:39"
              isFavorite={false}
              url="/Defeito_Meu.mp3"
              id="track2"
            />
            <AudioTrack 
              buttonId="btn-track-3"
              number="03"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAMHOfY-xCpXODeAgs7KzEgCLrFI9LmMGcXsUcxWCtrhRDBv707pEJr0wqxjtWZive59b_fhDPiCZFJk-QiVpX_b-FUlb5RlqMAZBl9eYWyRVlo_YffICWbBx533IPaN09DVAU8LIHUVUyTg5tchxu-3BgQWgdtWoWUq8joHlN_zNcqD-BdGSYo4ZrE_MJiv1khtmGQdBrFHTRukd0xc8CHM3qoFE3hHIy8IIw7pR7opDNGWcyPJgiaNXKEdthcC5c6thbol2eFfH7c"
              title="AGORA ESTOU SOFRENDO"
              subtitle="RAQUEL DOS TECLADOS"
              duration="2:58"
              isFavorite={false}
              url="/Agora_Estou_Sofrendo.mp3"
              id="track3"
            />
          </div>
        </div>
      </section>

      {/* Final Message & Future */}
      <section className="py-xl px-container-margin text-center relative">
        <div className="absolute inset-0 glow-pink opacity-30 -z-10"></div>
        <div className="max-w-3xl mx-auto space-y-md">
          <span className="material-symbols-outlined text-secondary text-5xl" data-icon="auto_awesome">auto_awesome</span>
          <h2 className="font-display-lg text-white">
            "E se esses 3 anos me ensinaram algo, é que eu escolheria você todas as vezes."
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            O futuro é um álbum em branco, e mal posso esperar para compor os próximos capítulos ao seu lado. Feliz 3 anos de nós.
          </p>
          <div className="flex flex-col md:flex-row gap-base justify-center pt-md">
            <button 
              className="bg-secondary-container text-white font-label-caps px-lg py-md rounded-full shadow-[0_0_20px_rgba(222,5,65,0.3)] hover:scale-105 transition-transform active:scale-95 cursor-pointer"
              onClick={triggerConfetti}
            >
              COM AMOR, SEMPRE
            </button>
            <button 
              className="glass-card text-white font-label-caps px-lg py-md rounded-full hover:bg-white/10 transition-colors active:scale-95 cursor-pointer"
              onClick={triggerConfetti}
            >
              NOSSO PRÓXIMO PASSO
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-black/40 backdrop-blur-2xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer active:scale-110 duration-300 ease-out" onClick={() => smoothScrollTo('inicio')}>
          <span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest mt-1">Início</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.6)] hover:text-white transition-colors cursor-pointer active:scale-110 duration-300 ease-out" onClick={() => smoothScrollTo('sintonia')}>
          <span className="material-symbols-outlined" data-icon="favorite" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest mt-1">Sintonia</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer active:scale-110 duration-300 ease-out" onClick={() => smoothScrollTo('memorias')}>
          <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest mt-1">Memórias</span>
        </div>
      </nav>

      {/* Footer */}
      <footer className="pt-xl pb-32 text-center text-white/20 font-label-caps text-[10px]">
        © 2024 NOSSA SINTONIA • PRODUZIDO COM AMOR
      </footer>
    </div>
  );
}

export default App;
