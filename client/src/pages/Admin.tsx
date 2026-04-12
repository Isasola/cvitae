'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut, 
  Save, 
  X, 
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle2,
  Lock,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Ticket,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Tipos
interface ContentItem {
  id?: string;
  titulo: string;
  slug: string;
  cuerpo: string;
  categoria: string;
  imagen_url: string;
  fecha_vencimiento: string;
  tipo: 'blog' | 'oportunidad';
  ubicacion: string;
  is_active: boolean;
}

interface RecruiterToken {
  id: string;
  email: string;
  token_balance: number;
  access_token: string;
  plan_type: string;
  created_at: string;
}

const CATEGORIES = [
  'Tecnología',
  'Administración',
  'Ventas',
  'Marketing',
  'Salud',
  'Educación',
  'Logística',
  'Otros'
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blog' | 'content' | 'tokens'>('dashboard');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [tokens, setTokens] = useState<RecruiterToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // Estado del formulario de tokens
  const [tokenEmail, setTokenEmail] = useState('');
  const [tokenBalance, setTokenBalance] = useState(10);
  const [tokenPlan, setTokenPlan] = useState('starter');

  // Estado del formulario de contenido
  const [formData, setFormData] = useState<ContentItem>({
    titulo: '',
    slug: '',
    cuerpo: '',
    categoria: 'Tecnología',
    imagen_url: '',
    fecha_vencimiento: new Date().toISOString().split('T')[0],
    tipo: 'oportunidad',
    ubicacion: 'Asunción, Paraguay',
    is_active: true
  });

  // Login Gate
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.authenticated) {
        setIsAuthenticated(true);
        setNotification({ type: 'success', message: 'Bienvenido al panel de administración' });
      } else {
        setNotification({ type: 'error', message: data.error || 'Contraseña incorrecta' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error de conexión con el servidor' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
      fetchTokens();
    }
  }, [isAuthenticated]);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('content_hub')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setItems(data);
    setLoading(false);
  };

  const fetchTokens = async () => {
    const { data, error } = await supabase
      .from('recruiter_tokens')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setTokens(data);
  };

  const generateRecruiterToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const newToken = `REC-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${new Date().getFullYear()}`;
    
    try {
      const { error } = await supabase
        .from('recruiter_tokens')
        .insert([{
          email: tokenEmail,
          token_balance: tokenBalance,
          access_token: newToken,
          plan_type: tokenPlan,
          is_active: true
        }]);

      if (error) throw error;

      setNotification({ type: 'success', message: 'Token generado con éxito' });
      setTokenEmail('');
      fetchTokens();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'titulo' && !isEditing) {
        newData.slug = generateSlug(value);
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEditing) {
        const { data: existing } = await supabase
          .from('content_hub')
          .select('id')
          .eq('slug', formData.slug)
          .single();
        
        if (existing) {
          throw new Error('Ya existe una publicación con este slug. Por favor cambia el título.');
        }
      }

      const normalizedDate = `${formData.fecha_vencimiento}T23:59:59Z`;

      const dataToSave = {
        ...formData,
        fecha_vencimiento: normalizedDate
      };

      let error;
      if (isEditing && formData.id) {
        const { error: updateError } = await supabase
          .from('content_hub')
          .update(dataToSave)
          .eq('id', formData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('content_hub')
          .insert([dataToSave]);
        error = insertError;
      }

      if (error) throw error;

      setNotification({ 
        type: 'success', 
        message: isEditing ? 'Actualizado correctamente' : 'Creado correctamente' 
      });
      
      resetForm();
      fetchItems();
      setActiveTab('dashboard');
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      slug: '',
      cuerpo: '',
      categoria: 'Tecnología',
      imagen_url: '',
      fecha_vencimiento: new Date().toISOString().split('T')[0],
      tipo: 'oportunidad',
      ubicacion: 'Asunción, Paraguay',
      is_active: true
    });
    setIsEditing(false);
  };

  const handleEdit = (item: ContentItem) => {
    setFormData({
      ...item,
      fecha_vencimiento: item.fecha_vencimiento.split('T')[0]
    });
    setIsEditing(true);
    setActiveTab('content');
  };

  const toggleStatus = async (item: ContentItem) => {
    const { error } = await supabase
      .from('content_hub')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);
    
    if (!error) fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este contenido?')) return;
    const { error } = await supabase
      .from('content_hub')
      .delete()
      .eq('id', id);
    
    if (!error) fetchItems();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#c9a84c]/10 rounded-2xl flex items-center justify-center mb-4 border border-[#c9a84c]/20">
              <Lock className="w-8 h-8 text-[#c9a84c]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
            <p className="text-gray-500 text-sm mt-2 text-center">Ingresa la contraseña maestra para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#c9a84c] focus:border-[#c9a84c]"
            />
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a84c] hover:bg-[#b39540] text-black font-bold h-12 rounded-xl transition-all"
            >
              {loading ? 'Accediendo...' : 'Acceder al Panel'}
            </Button>
          </form>

          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
                  notification.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}
              >
                {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  const renderTokens = () => (
    <div className="space-y-8">
      <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Ticket className="text-[#c9a84c]" /> Generar Token de Reclutador
        </h3>
        <form onSubmit={generateRecruiterToken} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Email Reclutador</label>
            <Input 
              type="email" 
              required 
              value={tokenEmail} 
              onChange={e => setTokenEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white" 
              placeholder="empresa@ejemplo.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Balance de Tokens</label>
            <Input 
              type="number" 
              required 
              value={tokenBalance} 
              onChange={e => setTokenBalance(parseInt(e.target.value))}
              className="bg-white/5 border-white/10 text-white" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Plan</label>
            <select 
              value={tokenPlan}
              onChange={e => setTokenPlan(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white h-10 rounded-md px-3 text-sm"
            >
              <option value="starter">Starter (10)</option>
              <option value="pro">Pro (100)</option>
              <option value="enterprise">Enterprise (Inf)</option>
            </select>
          </div>
          <Button type="submit" disabled={loading} className="bg-[#c9a84c] text-black font-bold h-10">
            Generar Token
          </Button>
        </form>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h4 className="font-bold">Tokens Activos</h4>
          <Button variant="ghost" size="sm" onClick={fetchTokens}><RefreshCw size={14} /></Button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-xs font-bold uppercase text-gray-400">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Token</th>
              <th className="px-6 py-4">Balance</th>
              <th className="px-6 py-4">Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tokens.map((token) => (
              <tr key={token.id} className="text-sm">
                <td className="px-6 py-4 text-white">{token.email}</td>
                <td className="px-6 py-4 font-mono text-[#c9a84c] flex items-center gap-2">
                  {token.access_token}
                  <button onClick={() => navigator.clipboard.writeText(token.access_token)} className="hover:text-white transition-colors">
                    <Copy size={12} />
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-400">{token.token_balance}</td>
                <td className="px-6 py-4 uppercase text-xs font-bold text-gray-500">{token.plan_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDashboard = (filterType?: 'blog' | 'oportunidad') => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">{filterType === 'blog' ? 'Posts de Blog' : 'Dashboard de Vacantes'}</h3>
        <Button 
          onClick={() => {
            resetForm();
            setFormData(prev => ({ ...prev, tipo: filterType || 'oportunidad' }));
            setActiveTab('content');
          }}
          className="bg-[#c9a84c] text-black font-bold"
        >
          <Plus size={18} className="mr-2" /> {filterType === 'blog' ? 'Nuevo Post' : 'Nueva Vacante'}
        </Button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Título</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Categoría</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Estado</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items
              .filter(item => !filterType || item.tipo === filterType)
              .map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{item.titulo}</div>
                  <div className="text-xs text-gray-500 mt-1">/{item.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-400 border border-white/10">
                    {item.categoria}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(item)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      item.is_active 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}
                  >
                    {item.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.is_active ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteItem(item.id!)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col p-6 fixed h-full">
        <div className="mb-12">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#c9a84c' }}>
            <span style={{ fontWeight: 900 }}>CV</span>
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>itae</span>
          </span>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Admin Panel V3</p>
        </div>

        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#c9a84c] text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blog' ? 'bg-[#c9a84c] text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <FileText size={18} /> Blog Hub
          </button>
          <button 
            onClick={() => setActiveTab('tokens')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tokens' ? 'bg-[#c9a84c] text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Ticket size={18} /> Tokens B2B
          </button>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-12 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard('oportunidad')}
            {activeTab === 'blog' && renderDashboard('blog')}
            {activeTab === 'tokens' && renderTokens()}
            {activeTab === 'content' && (
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">{isEditing ? 'Editar Contenido' : 'Nuevo Contenido'}</h3>
                  <Button variant="ghost" onClick={() => setActiveTab('dashboard')}><X className="mr-2" /> Cancelar</Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                      <Input 
                        name="titulo" 
                        value={formData.titulo} 
                        onChange={handleInputChange} 
                        required 
                        className="bg-white/5 border-white/10 text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Slug (URL)</label>
                      <Input 
                        name="slug" 
                        value={formData.slug} 
                        onChange={handleInputChange} 
                        required 
                        className="bg-white/5 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Tipo</label>
                      <select 
                        name="tipo" 
                        value={formData.tipo} 
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 text-white h-10 rounded-md px-3 text-sm"
                      >
                        <option value="oportunidad">Oportunidad</option>
                        <option value="blog">Blog</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
                      <select 
                        name="categoria" 
                        value={formData.categoria} 
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 text-white h-10 rounded-md px-3 text-sm"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Ubicación</label>
                      <Input 
                        name="ubicacion" 
                        value={formData.ubicacion} 
                        onChange={handleInputChange} 
                        className="bg-white/5 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Cuerpo (Markdown)</label>
                    <Textarea 
                      name="cuerpo" 
                      value={formData.cuerpo} 
                      onChange={handleInputChange} 
                      required 
                      className="bg-white/5 border-white/10 text-white min-h-[300px]" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Imagen URL</label>
                      <Input 
                        name="imagen_url" 
                        value={formData.imagen_url} 
                        onChange={handleInputChange} 
                        className="bg-white/5 border-white/10 text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Fecha Vencimiento</label>
                      <Input 
                        type="date" 
                        name="fecha_vencimiento" 
                        value={formData.fecha_vencimiento} 
                        onChange={handleInputChange} 
                        className="bg-white/5 border-white/10 text-white" 
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#c9a84c] text-black font-bold py-6 rounded-xl"
                  >
                    <Save className="mr-2" /> {isEditing ? 'Guardar Cambios' : 'Publicar Ahora'}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed bottom-8 right-8 p-4 rounded-xl flex items-center gap-3 text-sm shadow-2xl z-50 ${
              notification.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-4 opacity-50 hover:opacity-100"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
