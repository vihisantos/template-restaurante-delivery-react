import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { MapPin, Clock, Phone, Truck, Menu, X, Sun, Moon, ArrowRight, ShoppingBag, UtensilsCrossed, Salad, Beef, Cherry, Wine, Star } from 'lucide-react'

const WHATSAPP = 'https://wa.me/5511999999999?text=Olá, gostaria de fazer um pedido!'

const menu = [
    {
        label: 'Entradas',
        items: [
            { icon: Salad, name: 'Bruschetta Clássica', desc: 'Pão italiano com tomate, manjericão e azeite extra virgem', price: 'R$ 28,90' },
            { icon: Cherry, name: 'Carpaccio de Carne', desc: 'Fatias finas com rúcula, parmesão e molho de alcaparras', price: 'R$ 38,90' },
        ],
    },
    {
        label: 'Pratos Principais',
        items: [
            { icon: Beef, name: 'Filé Mignon ao Molho', desc: 'Filé grelhado com molho madeira e batatas rústicas', price: 'R$ 89,90' },
            { icon: UtensilsCrossed, name: 'Risoto de Camarão', desc: 'Risoto cremoso com camarões grelhados e açafrão', price: 'R$ 78,90' },
            { icon: Wine, name: 'Salmão Grelhado', desc: 'Salmão com legumes assados e molho de maracujá', price: 'R$ 82,90' },
        ],
    },
    {
        label: 'Sobremesas',
        items: [
            { Cherry, name: 'Petit Gâteau', desc: 'Bolo de chocolate com sorvete de baunilha', price: 'R$ 32,90' },
            { icon: Cherry, name: 'Tiramisù', desc: 'Camadas de biscoito champagne com café e mascarpone', price: 'R$ 28,90' },
        ],
    },
]

const gallery = [
    { label: 'Ambiente', color: 'from-amber-500/20 to-orange-500/20' },
    { label: 'Pratos', color: 'from-red-500/20 to-rose-500/20' },
    { label: 'Chef', color: 'from-yellow-500/20 to-amber-500/20' },
    { label: 'Ingredientes', color: 'from-green-500/20 to-emerald-500/20' },
    { label: 'Experiência', color: 'from-purple-500/20 to-violet-500/20' },
    { label: 'Espaço', color: 'from-blue-500/20 to-indigo-500/20' },
]

function useTheme() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    return { dark, toggle: () => setDark(d => !d) }
}

export default function App() {
    const { dark, toggle } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(0)
    const [scrolled, setScrolled] = useState(false)

    const { scrollYProgress } = useScroll()
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--card)]/90 backdrop-blur-xl shadow-lg border-b border-[var(--border)]' : 'bg-transparent'}`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <a href="#" className="font-display font-bold text-xl text-[var(--text)]">
                        Sabor <span className="text-[var(--color-brand)]">&</span> Arte
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#cardapio" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors">Cardápio</a>
                        <a href="#galeria" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors">Galeria</a>
                        <a href="#localizacao" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors">Localização</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggle} className="p-2 rounded-lg hover:bg-[var(--bg-alt)] transition-colors text-[var(--text-muted)]">
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-brand)] text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-brand-dark)] transition-all">
                            <ShoppingBag size={16} /> Pedir
                        </a>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-[var(--text)]">
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[var(--card)] border-t border-[var(--border)]"
                        >
                            <div className="px-6 py-6 space-y-4">
                                <a href="#cardapio" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-[var(--text)] hover:text-[var(--color-brand)]">Cardápio</a>
                                <a href="#galeria" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-[var(--text)] hover:text-[var(--color-brand)]">Galeria</a>
                                <a href="#localizacao" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-[var(--text)] hover:text-[var(--color-brand)]">Localização</a>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block px-6 py-3 bg-[var(--color-brand)] text-white rounded-lg font-bold text-sm text-center uppercase tracking-wider">
                                    Pedir pelo WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-dark)]">
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/20 to-transparent" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(194, 65, 12, 0.15) 0%, transparent 50%)' }} />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-white/60 text-xs font-bold uppercase tracking-widest mb-6 bg-white/5">
                                <MapPin size={14} /> Entrega em São Paulo
                            </span>
                            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                                O sabor que você<br /><em className="text-[var(--color-brand)]">não esquece.</em>
                            </h1>
                            <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                                Pratos preparados com ingredientes frescos e muito carinho. Da cozinha para a sua mesa, com a qualidade que você merece.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-brand)] text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-brand-dark)] transition-all hover:-translate-y-1">
                                    <ShoppingBag size={18} /> Fazer Pedido
                                </a>
                                <a href="#cardapio" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all">
                                    Ver Cardápio
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-[var(--color-brand)]/30 to-[var(--color-brand)]/10 rounded-full flex items-center justify-center">
                                <div className="w-64 h-64 bg-gradient-to-br from-[var(--color-brand)]/40 to-transparent rounded-full flex items-center justify-center">
                                    <UtensilsCrossed className="text-white/80" size={80} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Cardápio */}
            <section id="cardapio" className="py-24 bg-[var(--bg-alt)]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Cardápio</span>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--text)]">
                            Nosso <em className="text-[var(--color-brand)]">Cardápio</em>
                        </h2>
                    </motion.div>

                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        {menu.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(i)}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeCategory === i ? 'bg-[var(--color-brand)] text-white shadow-lg' : 'bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--color-brand)]/50'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menu[activeCategory].items.map((item, i) => (
                            <motion.div
                                key={`${activeCategory}-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--color-brand)]/50 transition-all group"
                            >
                                <div className="w-14 h-14 bg-[var(--color-brand)]/10 rounded-xl flex items-center justify-center mb-4 text-[var(--color-brand)] group-hover:bg-[var(--color-brand)] group-hover:text-white transition-all">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-display text-lg font-bold text-[var(--text)] mb-2">{item.name}</h3>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{item.desc}</p>
                                <span className="text-[var(--color-brand)] font-bold text-lg">{item.price}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Galeria */}
            <section id="galeria" className="py-24 bg-[var(--bg-dark)]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Galeria</span>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white">
                            Nossa <em className="text-[var(--color-brand)]">Experiência</em>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className={`aspect-square rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10 cursor-pointer`}
                            >
                                <span className="text-white font-display text-xl font-bold">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Localização */}
            <section id="localizacao" className="py-24 bg-[var(--bg-alt)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Onde Estamos</span>
                            <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--text)] mb-8">
                                Como nos <em className="text-[var(--color-brand)]">encontrar</em>
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-[var(--color-brand)]/10 rounded-xl flex items-center justify-center text-[var(--color-brand)] shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-sm text-[var(--color-brand)] uppercase tracking-wider">Endereço</strong>
                                        <p className="text-[var(--text-muted)] text-sm mt-1">Av. Paulista, 1000 - Bela Vista, São Paulo</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-[var(--color-brand)]/10 rounded-xl flex items-center justify-center text-[var(--color-brand)] shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-sm text-[var(--color-brand)] uppercase tracking-wider">Funcionamento</strong>
                                        <p className="text-[var(--text-muted)] text-sm mt-1">Seg a Sex: 11h – 23h<br />Sáb e Dom: 11h – 00h</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-[var(--color-brand)]/10 rounded-xl flex items-center justify-center text-[var(--color-brand)] shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-sm text-[var(--color-brand)] uppercase tracking-wider">WhatsApp</strong>
                                        <p className="text-[var(--text-muted)] text-sm mt-1">+55 (11) 99999-9999</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-[var(--color-brand)]/10 rounded-xl flex items-center justify-center text-[var(--color-brand)] shrink-0">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-sm text-[var(--color-brand)] uppercase tracking-wider">Delivery</strong>
                                        <p className="text-[var(--text-muted)] text-sm mt-1">Raio de 5km · Grátis acima de R$ 50</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197503928898!2d-46.65429812376897!3d-23.56338886151578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1709900000000!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[var(--bg-dark)] text-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="font-display text-2xl font-bold mb-4 block">
                        Sabor <span className="text-[var(--color-brand)]">&</span> Arte
                    </span>
                    <p className="text-white/50 text-sm mb-6">O sabor que você não esquece.</p>
                    <div className="flex justify-center gap-6 text-white/40 text-xs">
                        <span>© {new Date().getFullYear()} Sabor & Arte</span>
                        <span>CNPJ: 00.000.000/0001-00</span>
                    </div>
                    <p className="text-white/30 text-xs mt-4">Desenvolvido por <a href="https://capybaraholding.com.br" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] font-semibold">Capybara Holding</a></p>
                </div>
            </footer>

            {/* WhatsApp FAB */}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.025-1.379l-.36-.213-3.757.981 1.001-3.651-.234-.374A9.796 9.796 0 012.182 12c0-5.413 4.41-9.818 9.818-9.818s9.818 4.405 9.818 9.818c0 5.413-4.41 9.818-9.818 9.818z"/>
                </svg>
            </a>
        </div>
    )
}
