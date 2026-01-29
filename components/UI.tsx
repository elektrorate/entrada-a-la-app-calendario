
import React from 'react';

// Iconos minimalistas basados en la imagen de referencia
export const Icon = {
  ArrowUpRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  ),
  Filter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  ),
  Target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Plus: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`premium-card p-8 ${className}`}>
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'circular' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className, ...props }) => {
  const base = "circular-btn font-bold transition-all focus:outline-none disabled:opacity-50 inline-flex items-center justify-center tracking-tight";
  
  const variants = {
    primary: "bg-[#F4D000] text-[#111111] hover:brightness-105 active:scale-95 shadow-sm",
    dark: "bg-[#1A1A1A] text-white hover:bg-black active:scale-95",
    outline: "border border-[#E6E6E6] bg-white text-[#111111] hover:border-[#111111] active:scale-95",
    ghost: "bg-transparent text-[#6B6B6B] hover:text-[#111111]",
    circular: "bg-white border border-[#E6E6E6] text-[#111111] hover:border-black p-0 aspect-square shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95"
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-10 py-5 text-base"
  };

  const isCircular = variant === 'circular';
  const sizeClass = isCircular ? "w-12 h-12" : sizes[size];

  return (
    <button className={`${base} ${variants[variant]} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const KpiCard: React.FC<{ 
  title: string; 
  value: string; 
  subtitle: string; 
  subValue: string;
  onAction?: () => void;
}> = ({ title, value, subtitle, subValue, onAction }) => (
  <div className="premium-card overflow-hidden !p-0 flex flex-col h-[360px] relative group">
    {/* Contenedor Superior Amarillo */}
    <div className="bg-[#F4D000] p-10 flex-1 relative wave-container z-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#111111]/50 mb-3">{title}</p>
      <h3 className="text-5xl font-extrabold text-[#111111] tracking-tighter">{value}</h3>
      
      {/* Wave SVG Divider Suave */}
      <div className="absolute left-0 bottom-[-1px] w-full h-20 overflow-visible z-10 pointer-events-none">
          <svg className="w-full h-full fill-[#1A1A1A]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,256L80,224C160,192,320,128,480,128C640,128,800,192,960,208C1120,224,1280,192,1360,176L1440,160V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
      </div>
      
      {/* Botón Flotante Centralizado */}
      <button 
        onClick={onAction}
        className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center text-[#F4D000] shadow-[0_15px_30px_rgba(0,0,0,0.4)] z-30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] active:scale-90"
      >
        <Icon.ArrowUpRight />
      </button>
    </div>

    {/* Contenedor Inferior Oscuro */}
    <div className="bg-[#1A1A1A] p-10 pt-16 z-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">{subtitle}</p>
      <h3 className="text-4xl font-extrabold text-white tracking-tighter">{subValue}</h3>
    </div>
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'yellow' | 'dark' | 'outline' | 'success' | 'info' | 'error' | 'warning' | 'neutral' }> = ({ children, variant = 'yellow' }) => {
  const styles = {
    yellow: "bg-[#F4D000] text-[#111111]",
    dark: "bg-[#1A1A1A] text-white",
    outline: "border border-[#E6E6E6] text-[#6B6B6B]",
    success: "bg-green-100 text-green-700",
    info: "bg-blue-100 text-blue-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-orange-100 text-orange-700",
    neutral: "bg-gray-100 text-gray-600"
  };
  return (
    <span className={`px-5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${styles[variant]}`}>
      {children}
    </span>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-4">{label}</label>}
    <input 
      className={`w-full h-14 px-6 rounded-[20px] bg-gray-50 border border-[#E6E6E6] focus:bg-white focus:border-[#F4D000] focus:ring-4 focus:ring-[#F4D000]/10 outline-none transition-all font-medium text-sm ${className}`}
      {...props}
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-4">{label}</label>}
    <div className="relative">
      <select 
        className={`w-full h-14 px-6 rounded-[20px] bg-gray-50 border border-[#E6E6E6] focus:bg-white focus:border-[#F4D000] focus:ring-4 focus:ring-[#F4D000]/10 outline-none transition-all font-medium text-sm appearance-none ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl relative z-10 animate-fade-in-up overflow-hidden">
        <div className="p-10 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-10 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="p-8 bg-gray-50 flex justify-end gap-4 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const SearchPill: React.FC<{ value: string; onChange: (e: any) => void; placeholder?: string }> = ({ value, onChange, placeholder }) => (
  <div className="relative flex items-center w-full max-w-xl group">
    <div className="absolute left-6 text-gray-400 group-focus-within:text-[#111111] transition-colors">
      <Icon.Search />
    </div>
    <input 
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-16 pl-16 pr-20 bg-[#E6E6E6]/40 border-none rounded-full text-sm font-semibold focus:bg-white focus:ring-[6px] focus:ring-[#F4D000]/15 outline-none transition-all placeholder:text-gray-400"
    />
    <button className="absolute right-3 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#111111] hover:bg-[#F4D000] transition-colors">
      <Icon.Filter />
    </button>
  </div>
);

export const FilterChipsRow: React.FC<{ items: string[]; activeItem: string; onSelect: (item: string) => void }> = ({ items, activeItem, onSelect }) => (
  <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
    {items.map(item => (
      <button 
        key={item}
        onClick={() => onSelect(item)}
        className={`px-7 py-3 rounded-full text-[11px] font-bold transition-all whitespace-nowrap tracking-wider ${activeItem === item ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-white text-[#6B6B6B] border border-[#E6E6E6] hover:border-gray-400'}`}
      >
        {item.toUpperCase()}
      </button>
    ))}
  </div>
);

export const ListCard: React.FC<{
  title: string;
  subtitle: string;
  info: string;
  badge?: string;
  onView: () => void;
  onEdit?: () => void;
}> = ({ title, subtitle, info, badge, onView, onEdit }) => (
  <Card className="group hover:border-[#F4D000] !p-6">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-[#F2F2F2] flex items-center justify-center text-2xl group-hover:bg-[#F4D000] transition-colors font-bold">
        {title.charAt(0)}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
          {badge && <Badge variant="yellow">{badge}</Badge>}
        </div>
        <p className="text-sm font-bold text-[#6B6B6B]">{subtitle}</p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{info}</p>
      </div>
      <div className="flex items-center gap-3">
        {onEdit && <Button variant="outline" size="sm" className="!rounded-full" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Editar</Button>}
        <Button variant="dark" size="sm" className="!w-12 !h-12 !p-0" onClick={onView}>
          <Icon.ArrowUpRight />
        </Button>
      </div>
    </div>
  </Card>
);

export const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info' }> = ({ message, type }) => (
  <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up">
    <div className={`px-10 py-5 rounded-full shadow-2xl text-white font-bold tracking-tight flex items-center gap-4 ${type === 'error' ? 'bg-red-600' : 'bg-[#1A1A1A]'}`}>
      <span className="text-lg">{type === 'success' ? '✓' : 'ℹ'}</span>
      <span>{message}</span>
    </div>
  </div>
);

export const EmptyState: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="py-24 flex flex-col items-center text-center px-10">
    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-sm mb-8">
      <Icon.Target />
    </div>
    <h3 className="text-2xl font-extrabold mb-3 tracking-tight">{title}</h3>
    <p className="text-base text-gray-500 max-w-sm font-medium">{subtitle}</p>
  </div>
);
