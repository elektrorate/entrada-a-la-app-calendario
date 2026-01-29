
import React from 'react';

export const Icon = {
  // Navegación
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  Workshop: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V5a2 2 0 0 1 2-2z" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M12 22v-5" />
    </svg>
  ),
  Message: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  // Acciones y UI
  ArrowUpRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  ),
  Filter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="10" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Plus: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16" y2="16" />
    </svg>
  ),
  Refresh: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Maximize: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
};

export const ActivityPill: React.FC<{
  label: string;
  value: string;
  status: string;
  percentage: string;
  iconBg: string;
}> = ({ label, value, status, percentage, iconBg }) => (
  <div className="pill-card">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mr-6 shrink-0`} style={{ backgroundColor: iconBg }}>
      <Icon.ArrowUpRight />
    </div>
    <div className="flex-1">
      <p className="text-[12px] font-semibold text-[#8A8481] uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-[18px] font-bold text-[#312A2C] leading-none">{value}</p>
    </div>
    <div className="text-right">
      <p className="text-[14px] font-semibold text-[#8A8481]">{status}</p>
      <p className="text-[14px] font-bold text-[#312A2C]">{percentage}</p>
    </div>
  </div>
);

export const DaySelector: React.FC<{ days: {num: string, name: string}[], activeDay: string }> = ({ days, activeDay }) => (
  <div className="flex justify-between items-center px-4 mb-10 overflow-x-auto gap-2 no-scrollbar">
    {days.map(day => (
      <div 
        key={day.num} 
        className={`flex flex-col items-center justify-center w-16 h-24 rounded-full transition-all cursor-pointer ${day.num === activeDay ? 'day-selector-active' : 'text-[#8A8481]'}`}
      >
        <div className={`text-[20px] font-bold mb-1 ${day.num === activeDay ? 'text-white' : 'text-[#312A2C]'}`}>{day.num}</div>
        <div className="text-[12px] font-semibold uppercase tracking-widest">{day.name}</div>
      </div>
    ))}
  </div>
);

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
  const base = "circular-btn font-bold transition-all focus:outline-none disabled:opacity-50 inline-flex items-center justify-center tracking-wider uppercase text-[14px]";
  
  const variants = {
    primary: "bg-[#C17D5C] text-white hover:brightness-105 shadow-sm",
    dark: "bg-[#312A2C] text-white hover:bg-[#251F21]",
    outline: "border border-[#F1E9E2] bg-white text-[#312A2C] hover:border-[#C17D5C] hover:text-[#C17D5C]",
    ghost: "bg-transparent text-[#8A8481] hover:text-[#312A2C]",
    circular: "bg-white border border-[#F1E9E2] text-[#312A2C] hover:border-[#C17D5C] p-0 aspect-square",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100"
  };

  const sizes = {
    sm: "px-6 py-3.5",
    md: "px-8 py-4.5",
    lg: "px-12 py-6 text-[16px] tracking-[0.15em]"
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
  <div className="premium-card overflow-hidden !p-0 flex flex-col h-[340px] border-none group">
    <div className="bg-[#FFFFFF] p-10 flex-1 relative z-20">
      <p className="eyebrow mb-3">{title}</p>
      <h3 className="text-5xl font-extrabold text-[#312A2C] tracking-tighter">
        {value.includes('€') ? value.split('€')[0] : value}
        {value.includes('€') && <span className="text-[#C17D5C]">€</span>}
        {value.includes('k') && 'k'}
      </h3>
      
      <button 
        onClick={onAction}
        className="absolute bottom-[-28px] right-10 w-14 h-14 bg-[#C17D5C] rounded-full flex items-center justify-center text-white shadow-lg z-50 transition-all duration-300 group-hover:scale-110 hover:brightness-110 active:scale-95"
      >
        <Icon.ArrowUpRight />
      </button>
    </div>

    {/* Actualizado: Color de fondo cambiado a #e4ddd6 como se solicitó para mayor fidelidad visual */}
    <div className="bg-[#e4ddd6] p-10 pt-14 z-10 relative">
      <div className="accent-line mb-4"></div>
      <p className="eyebrow mb-2">{subtitle}</p>
      <h3 className="text-2xl font-bold text-[#312A2C] tracking-tighter">{subValue}</h3>
    </div>
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'yellow' | 'dark' | 'outline' | 'success' | 'info' | 'error' | 'warning' | 'neutral' }> = ({ children, variant = 'yellow' }) => {
  const styles = {
    yellow: "bg-[#C17D5C]/10 text-[#C17D5C]",
    dark: "bg-[#312A2C] text-white",
    outline: "border border-[#F1E9E2] text-[#8A8481]",
    success: "bg-emerald-50 text-emerald-700",
    info: "bg-sky-50 text-sky-700",
    error: "bg-rose-50 text-rose-700",
    warning: "bg-amber-50 text-amber-700",
    neutral: "bg-slate-50 text-slate-600"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full eyebrow !text-[10px] ${styles[variant]}`}>
      {children}
    </span>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className="w-full">
    {label && <label className="eyebrow block mb-2 ml-4">{label}</label>}
    <input 
      className={`w-full h-14 px-6 rounded-[24px] bg-[#F4EEE8] border border-transparent focus:bg-white focus:border-[#C17D5C] outline-none transition-all font-semibold text-sm text-[#312A2C] placeholder:text-[#8A8481] ${className}`}
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
    {label && <label className="eyebrow block mb-2 ml-4">{label}</label>}
    <div className="relative">
      <select 
        className={`w-full h-14 px-6 rounded-[24px] bg-[#F4EEE8] border border-transparent focus:bg-white focus:border-[#C17D5C] outline-none transition-all font-semibold text-sm text-[#312A2C] appearance-none ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8481]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>
  </div>
);

export const SearchPill: React.FC<{ value: string; onChange: (e: any) => void; placeholder?: string }> = ({ value, onChange, placeholder }) => (
  <div className="relative flex items-center w-full max-w-xl group">
    <div className="absolute left-7 text-[#8A8481] group-focus-within:text-[#C17D5C] transition-colors">
      <Icon.Search />
    </div>
    <input 
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-16 pl-16 pr-20 bg-white border border-[#F1E9E2] rounded-full text-sm font-semibold focus:border-[#C17D5C] focus:ring-4 focus:ring-[#C17D5C]/5 outline-none transition-all placeholder:text-[#8A8481] shadow-sm"
    />
    <button className="absolute right-3 w-12 h-12 rounded-full bg-[#312A2C] flex items-center justify-center text-white hover:bg-[#251F21] transition-colors shadow-md">
      <Icon.Filter />
    </button>
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
  <Card className="group hover:border-[#C17D5C] !p-6 border-transparent bg-white shadow-sm">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="w-16 h-16 rounded-[28px] bg-[#F9F6F2] flex items-center justify-center text-2xl group-hover:bg-[#C17D5C] group-hover:text-white transition-all font-bold text-[#312A2C]">
        {title.charAt(0)}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold tracking-tight text-[#312A2C]">{title}</h3>
          {badge && <Badge variant="yellow">{badge}</Badge>}
        </div>
        <p className="text-sm font-semibold text-[#8A8481]">{subtitle}</p>
        <p className="eyebrow !text-[11px] mt-1">{info}</p>
      </div>
      <div className="flex items-center gap-3">
        {onEdit && <Button variant="outline" size="sm" className="!rounded-full border-none bg-[#F9F6F2] hover:bg-[#F1E9E2]" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Editar</Button>}
        <Button variant="dark" size="sm" className="!w-12 !h-12 !p-0 shadow-md" onClick={onView}>
          <Icon.ArrowUpRight />
        </Button>
      </div>
    </div>
  </Card>
);

export const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info' }> = ({ message, type }) => (
  <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
    <div className={`px-10 py-5 rounded-full shadow-2xl text-white font-bold tracking-tight flex items-center gap-4 ${type === 'error' ? 'bg-rose-600' : 'bg-[#312A2C]'}`}>
      <span className="text-lg">{type === 'success' ? '✓' : 'ℹ'}</span>
      <span className="text-[13px] uppercase tracking-widest">{message}</span>
    </div>
  </div>
);

export const EmptyState: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="py-24 flex flex-col items-center text-center px-10">
    <div className="w-24 h-24 bg-white rounded-[40px] border border-[#F1E9E2] flex items-center justify-center shadow-sm mb-8 text-[#C17D5C]">
      <Icon.Target />
    </div>
    <h3 className="text-2xl font-bold mb-3 tracking-tighter text-[#312A2C] uppercase">{title}</h3>
    <p className="text-sm text-[#8A8481] max-w-sm font-semibold leading-relaxed">{subtitle}</p>
  </div>
);

// Fix: Added missing FilterChipsRow component
export const FilterChipsRow: React.FC<{ 
  items: string[]; 
  activeItem: string; 
  onSelect: (item: string) => void 
}> = ({ items, activeItem, onSelect }) => (
  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
    {items.map(item => (
      <button
        key={item}
        onClick={() => onSelect(item)}
        className={`px-8 py-3.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
          activeItem === item 
          ? 'bg-[#312A2C] text-white shadow-lg' 
          : 'bg-white border border-[#F1E9E2] text-[#8A8481] hover:border-[#C17D5C] hover:text-[#C17D5C]'
        }`}
      >
        {item}
      </button>
    ))}
  </div>
);

// Fix: Added missing Modal component
export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#312A2C]/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
        <div className="p-10 border-b border-[#F1E9E2] flex justify-between items-center bg-[#FDF8F3]/50">
          <h2 className="text-2xl font-extrabold tracking-tighter text-[#312A2C] uppercase">{title}</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-[#8A8481] hover:bg-white hover:text-[#312A2C] transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
        {footer && (
          <div className="p-10 border-t border-[#F1E9E2] flex justify-end gap-4 bg-[#FDF8F3]/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
