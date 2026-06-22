import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { MapPin, Clock, Phone, Truck, Menu, X, Sun, Moon, ArrowRight, ShoppingBag, UtensilsCrossed, Salad, Beef, Cherry, Wine, Star, ChevronDown } from 'lucide-react'

const WHATSAPP = 'https://wa.me/5511999999999?text=Olá, gostaria de fazer um pedido!'

const menu = [
    {
        label: 'Entradas',
        emoji: '🥗',
        items: [
            { icon: Salad, name: 'Bruschetta Clássica', desc: 'Pão italiano com tomate, manjericão fresco e azeite extra virgem', price: 'R$ 28,90', tag: 'Popular' },
            { icon: Cherry, name: 'Carpaccio de Carne', desc: 'Fatias finas com rúcula, parmesão e molho de alcaparras', price: 'R$ 38,90', tag: '' },
        ],
    },
    {
        label: 'Pratos Principais',
        emoji: '🍽️',
        items: [
            { icon: Beef, name: 'Filé Mignon ao Molho', desc: 'Filé grelhado com molho madeira e batatas rústicas', price: 'R$ 89,90', tag: 'Chef Recomenda' },
            { icon: UtensilsCrossed, name: 'Risoto de Camarão', desc: 'Risoto cremoso com camarões grelhados e açafrão', price: 'R$ 78,90', tag: '' },
            { icon: Wine, name: 'Salmão Grelhado', desc: 'Salmão com legumes assados e molho de maracujá', price: 'R$ 82,90', tag: 'Novo' },
        ],
    },
    {
        label: 'Sobremesas',
        emoji: '🍰',
        items: [
            { icon: Cherry, name: 'Petit Gâteau', desc: 'Bolo de chocolate quente com sorvete de baunilha artesanal', price: 'R$ 32,90', tag: 'Mais Vendido' },
            { icon: Cherry, name: 'Tiramisù', desc: 'Camadas de biscoito champagne com café e creme mascarpone', price: 'R$ 28,90', tag: '' },
        ],
    },
    {
        label: 'Bebidas',
        emoji: '🍷',
        items: [
            { icon: Wine, name: 'Vinho Tinto Reserva', desc: 'Rubi escuro com notas de frutas vermelhas e especiarias', price: 'R$ 45,00', tag: '' },
            { icon: Wine, name: 'Suco Natural', desc: 'Laranja, maracujá ou limão — feito na hora', price: 'R$ 12,00', tag: '' },
        ],
    },
]

const gallery = [
    { label: 'Ambiente', emoji: '🪑', gradient: 'from-amber-600/30 via-orange-500/20 to-yellow-500/30' },
    { label: 'Pratos', emoji: '🍝', gradient: 'from-red-600/30 via-rose-500/20 to-pink-500/30' },
    { label: 'Chef', emoji: '👨‍🍳', gradient: 'from-yellow-600/30 via-amber-500/20 to-orange-500/30' },
    { label: 'Ingredientes', emoji: '🌿', gradient: 'from-green-600/30 via-emerald-500/20 to-teal-500/30' },
    { label: 'Experiência', emoji: '✨', gradient: 'from-purple-600/30 via-violet-500/20 to-indigo-500/30' },
    { label: 'Espaço', emoji: '🏠', gradient: 'from-rose-600/30 via-pink-500/20 to-fuchsia-500/30' },
]

const stats = [
    { value: '15+', label: 'Anos de Experiência' },
    { value: '4.9', label: 'Avaliação Google' },
    { value: '50k+', label: 'Clientes Felizes' },
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
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--card)]/95 backdrop-blur-2xl shadow-2xl border-b border-[var(--border)]' : 'bg-transparent'}`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <a href="#" className="font-display text-2xl italic text-[var(--text)]">
                        Sabor <span className="text-[var(--color-brand)]">&</span> Arte
                    </a>

                    <div className="hidden md:flex items-center gap-10">
                        <a href="#cardapio" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors relative group">
                            Cardápio
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-brand)] transition-all group-hover:w-full" />
                        </a>
                        <a href="#galeria" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors relative group">
                            Galeria
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-brand)] transition-all group-hover:w-full" />
                        </a>
                        <a href="#localizacao" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors relative group">
                            Localização
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-brand)] transition-all group-hover:w-full" />
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggle} className="p-2.5 rounded-xl hover:bg-[var(--bg-alt)] transition-colors text-[var(--text-muted)]">
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-brand)] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-brand-dark)] transition-all hover:shadow-lg hover:shadow-[var(--color-brand)]/30">
                            <ShoppingBag size={16} /> Pedir Agora
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
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block px-6 py-3 bg-[var(--color-brand)] text-white rounded-xl font-bold text-sm text-center uppercase tracking-wider">
                                    Pedir pelo WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-dark)]">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/20 via-[var(--color-brand)]/5 to-transparent" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(194, 65, 12, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)' }} />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-full text-white/60 text-xs font-bold uppercase tracking-widest mb-8 bg-white/5 backdrop-blur-sm"
                            >
                                <MapPin size={14} /> Entrega em São Paulo
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="font-display text-5xl md:text-7xl lg:text-8xl italic text-white leading-[0.95] mb-8"
                            >
                                O sabor que<br />
                                <span className="text-[var(--color-brand)]">você não</span><br />
                                esquece.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg text-white/60 mb-12 leading-relaxed max-w-md"
                            >
                                Pratos preparados com ingredientes frescos e muito carinho. Da cozinha para a sua mesa, com a qualidade que você merece.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-4 mb-12"
                            >
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--color-brand)] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-brand-dark)] transition-all hover:shadow-xl hover:shadow-[var(--color-brand)]/30 hover:-translate-y-1">
                                    <ShoppingBag size={18} /> Fazer Pedido
                                </a>
                                <a href="#cardapio" className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all backdrop-blur-sm">
                                    Ver Cardápio
                                </a>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex gap-10"
                            >
                                {stats.map((s, i) => (
                                    <div key={i}>
                                        <div className="text-2xl md:text-3xl font-bold text-white font-display">{s.value}</div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative hidden lg:flex justify-center"
                        >
                            <div className="relative">
                                {/* Glow rings */}
                                <div className="absolute inset-0 rounded-full bg-[var(--color-brand)]/10 blur-3xl scale-150" />
                                <div className="absolute -inset-10 rounded-full border border-[var(--color-brand)]/20" />
                                <div className="absolute -inset-20 rounded-full border border-[var(--color-brand)]/10" />

                                {/* Main icon */}
                                <div className="relative w-72 h-72 bg-gradient-to-br from-[var(--color-brand)]/20 to-[var(--color-brand)]/5 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
                                    <div className="w-52 h-52 bg-gradient-to-br from-[var(--color-brand)]/30 to-transparent rounded-full flex items-center justify-center">
                                        <UtensilsCrossed className="text-white/70" size={80} strokeWidth={1} />
                                    </div>
                                </div>

                                {/* Floating elements */}
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="absolute -top-4 -right-4 w-16 h-16 bg-[var(--color-brand)]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10"
                                >
                                    <span className="text-2xl">🍷</span>
                                </motion.div>
                                <motion.div
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute -bottom-4 -left-4 w-14 h-14 bg-[var(--color-brand)]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10"
                                >
                                    <span className="text-2xl">🍕</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="flex flex-col items-center gap-2 text-white/30"
                        >
                            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                            <ChevronDown size={16} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Cardápio */}
            <section id="cardapio" className="py-28 bg-[var(--bg-alt)]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Cardápio</span>
                        <h2 className="font-display text-4xl md:text-6xl italic text-[var(--text)]">
                            Nosso <span className="text-[var(--color-brand)]">Cardápio</span>
                        </h2>
                    </motion.div>

                    {/* Category tabs */}
                    <div className="flex justify-center gap-3 mb-14 flex-wrap">
                        {menu.map((cat, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(i)}
                                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${activeCategory === i ? 'bg-[var(--color-brand)] text-white shadow-xl shadow-[var(--color-brand)]/20' : 'bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--color-brand)]/30 hover:shadow-md'}`}
                            >
                                <span>{cat.emoji}</span>
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Menu items */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {menu[activeCategory].items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="bg-[var(--card)] p-7 rounded-2xl border border-[var(--border)] hover:border-[var(--color-brand)]/30 transition-all group relative overflow-hidden"
                                >
                                    {/* Tag */}
                                    {item.tag && (
                                        <span className="absolute top-4 right-4 px-3 py-1 bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-[10px] font-bold uppercase tracking-wider rounded-full">
                                            {item.tag}
                                        </span>
                                    )}

                                    {/* Icon */}
                                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-brand)]/10 to-[var(--color-brand)]/5 rounded-2xl flex items-center justify-center mb-5 text-[var(--color-brand)] group-hover:from-[var(--color-brand)] group-hover:to-[var(--color-brand-dark)] group-hover:text-white transition-all duration-300">
                                        <item.icon size={24} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display text-xl font-bold text-[var(--text)] mb-2">{item.name}</h3>
                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{item.desc}</p>

                                    {/* Price + CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                        <span className="text-[var(--color-brand)] font-bold text-xl">{item.price}</span>
                                        <button className="w-10 h-10 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white transition-all">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Galeria */}
            <section id="galeria" className="py-28 bg-[var(--bg-dark)] relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(194, 65, 12, 0.08) 0%, transparent 50%)' }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Galeria</span>
                        <h2 className="font-display text-4xl md:text-6xl italic text-white">
                            Nossa <span className="text-[var(--color-brand)]">Experiência</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-3 border border-white/10 cursor-pointer backdrop-blur-sm hover:border-[var(--color-brand)]/30 transition-all`}
                            >
                                <span className="text-4xl">{item.emoji}</span>
                                <span className="text-white font-display text-lg font-bold">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Localização */}
            <section id="localizacao" className="py-28 bg-[var(--bg-alt)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Onde Estamos</span>
                            <h2 className="font-display text-4xl md:text-5xl italic text-[var(--text)] mb-8">
                                Como nos <span className="text-[var(--color-brand)]">encontrar</span>
                            </h2>

                            <div className="space-y-5">
                                {[
                                    { icon: MapPin, label: 'Endereço', value: 'Av. Paulista, 1000 - Bela Vista, São Paulo' },
                                    { icon: Clock, label: 'Funcionamento', value: 'Seg a Sex: 11h – 23h\nSáb e Dom: 11h – 00h' },
                                    { icon: Phone, label: 'WhatsApp', value: '+55 (11) 99999-9999' },
                                    { icon: Truck, label: 'Delivery', value: 'Raio de 5km · Grátis acima de R$ 50' },
                                ].map((info, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-12 h-12 bg-[var(--color-brand)]/10 rounded-xl flex items-center justify-center text-[var(--color-brand)] shrink-0 group-hover:bg-[var(--color-brand)] group-hover:text-white transition-all">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <strong className="text-sm text-[var(--color-brand)] uppercase tracking-wider">{info.label}</strong>
                                            <p className="text-[var(--text-muted)] text-sm mt-1 whitespace-pre-line">{info.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)]"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197503928898!2d-46.65429812376897!3d-23.56338886151578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1709900000000!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="400"
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
            <footer className="bg-[var(--bg-dark)] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(194, 65, 12, 0.08) 0%, transparent 50%)' }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <span className="font-display text-2xl italic mb-4 block">
                                Sabor <span className="text-[var(--color-brand)]">&</span> Arte
                            </span>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                O sabor que você não esquece. Ingredientes frescos, receitas únicas e atendimento excepcional.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-widest mb-4">Horários</h4>
                            <ul className="space-y-2 text-white/50 text-sm">
                                <li>Seg a Sex: 11h – 23h</li>
                                <li>Sáb e Dom: 11h – 00h</li>
                                <li>Feriados: 11h – 15h</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-widest mb-4">Contato</h4>
                            <ul className="space-y-2 text-white/50 text-sm">
                                <li className="flex items-center gap-2"><Phone size={14} /> +55 (11) 99999-9999</li>
                                <li className="flex items-center gap-2"><MapPin size={14} /> Av. Paulista, 1000</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/30 text-xs">© {new Date().getFullYear()} Sabor & Arte. Todos os direitos reservados.</p>
                        <p className="text-white/30 text-xs">CNPJ: 00.000.000/0001-00 · Desenvolvido por <a href="https://capybaraholding.com.br" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] font-semibold">Capybara Holding</a></p>
                    </div>
                </div>
            </footer>

            {/* WhatsApp FAB */}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.025-1.379l-.36-.213-3.757.981 1.001-3.651-.234-.374A9.796 9.796 0 012.182 12c0-5.413 4.41-9.818 9.818-9.818s9.818 4.405 9.818 9.818c0 5.413-4.41 9.818-9.818 9.818z"/></svg>
            </a>
        </div>
    )
}
