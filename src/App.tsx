import { useState } from 'react'

const WHATSAPP = 'https://wa.me/55XXXXXXXXXXX?text=Olá, gostaria de fazer um pedido!'

interface MenuItem { name: string; desc: string; price: string; emoji: string }
interface Category { label: string; items: MenuItem[] }

const menu: Category[] = [
    {
        label: '[Categoria 1 — ex: Entradas]',
        items: [
            { emoji: '🥗', name: '[Nome do Prato 1]', desc: '[Ingredientes ou descrição apetitosa]', price: 'R$ [XX,XX]' },
            { emoji: '🥙', name: '[Nome do Prato 2]', desc: '[Ingredientes ou descrição apetitosa]', price: 'R$ [XX,XX]' },
        ],
    },
    {
        label: '[Categoria 2 — ex: Pratos Principais]',
        items: [
            { emoji: '🍖', name: '[Nome do Prato 3]', desc: '[Ingredientes ou descrição apetitosa]', price: 'R$ [XX,XX]' },
            { emoji: '🍗', name: '[Nome do Prato 4]', desc: '[Ingredientes ou descrição apetitosa]', price: 'R$ [XX,XX]' },
            { emoji: '🥩', name: '[Nome do Prato 5]', desc: '[Ingredientes ou descrição apetitosa]', price: 'R$ [XX,XX]' },
        ],
    },
]

export default function App() {
    const [activeCategory, setActiveCategory] = useState(0)

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar--dark-red">
                <div className="nav-logo logo-display">[Nome do Restaurante]</div>
                <a href={WHATSAPP} className="nav-cta nav-cta--red" target="_blank" rel="noopener noreferrer">
                    🛵 Pedir pelo WhatsApp
                </a>
            </nav>

            {/* Hero */}
            <section className="hero hero--food">
                <div className="hero-overlay" />
                <div className="container">
                    <div className="hero-tag-food">✦ [Entrega em [cidade]]</div>
                    <h1 className="hero-title display">O sabor que você<br /><em className="highlight-food">não esquece.</em></h1>
                    <p className="hero-sub opacity-80">[Descrição curta e apetitosa do restaurante. Destaque o tipo de culinária ou especialidade da casa.]</p>
                    <a href={WHATSAPP} className="btn-food" target="_blank" rel="noopener noreferrer">
                        🛵 Fazer Pedido pelo WhatsApp
                    </a>
                </div>
            </section>

            {/* Cardápio */}
            <section className="section" id="cardapio">
                <div className="container">
                    <h2 className="section-title display">Nosso Cardápio</h2>
                    <p className="section-sub muted">Pratos preparados com ingredientes frescos e muito carinho.</p>

                    {/* Category tabs */}
                    <div className="menu-tabs">
                        {menu.map((cat, i) => (
                            <button
                                key={i}
                                className={`menu-tab ${activeCategory === i ? 'active' : ''}`}
                                onClick={() => setActiveCategory(i)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Active category items */}
                    <div className="menu-grid">
                        {menu[activeCategory].items.map((item, i) => (
                            <div key={i} className="menu-card">
                                <div className="menu-emoji">{item.emoji}</div>
                                <div className="menu-info">
                                    <strong>{item.name}</strong>
                                    <p className="muted small">{item.desc}</p>
                                    <span className="menu-price">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Galeria */}
            <section className="section section--dark" id="galeria">
                <div className="container">
                    <h2 className="section-title display white">Nossa Galeria</h2>
                    <div className="gallery-grid">
                        {['🍲', '🥗', '🍰', '🍷', '🤌', '🏡'].map((em, i) => (
                            <div key={i} className="gallery-cell">{em}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Localização */}
            <section className="section" id="localizacao">
                <div className="container">
                    <div className="location-grid">
                        <div>
                            <h2 className="section-title display">Como nos <span className="highlight-food">encontrar</span></h2>
                            <div className="info-list">
                                <div className="info-row"><span>📍</span><div><strong>Endereço</strong><br /><span className="muted">[Rua, Nº — Bairro, Cidade/UF]</span></div></div>
                                <div className="info-row"><span>🕐</span><div><strong>Funcionamento</strong><br /><span className="muted">Seg a Sex: [XX:XX – XX:XX]<br />Sáb e Dom: [XX:XX – XX:XX]</span></div></div>
                                <div className="info-row"><span>📞</span><div><strong>WhatsApp</strong><br /><a href="tel:+55XXXXXXXXXXX">[+55 (XX) XXXXX-XXXX]</a></div></div>
                                <div className="info-row"><span>🛵</span><div><strong>Delivery</strong><br /><span className="muted">[Raio de entrega ou bairros atendidos]</span></div></div>
                            </div>
                        </div>
                        <div className="map-placeholder">📍 Substitua por iframe Google Maps</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer footer--dark">
                <p>© {new Date().getFullYear()} [Nome do Restaurante]. Todos os direitos reservados.</p>
            </footer>

            {/* WhatsApp FAB */}
            <a href={WHATSAPP} className="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon />
            </a>
        </>
    )
}

function WhatsAppIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.025-1.379l-.36-.213-3.757.981 1.001-3.651-.234-.374A9.796 9.796 0 012.182 12c0-5.413 4.41-9.818 9.818-9.818s9.818 4.405 9.818 9.818c0 5.413-4.41 9.818-9.818 9.818z" />
        </svg>
    )
}
