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
  EyeOff
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blog' | 'content'>('dashboard');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // Estado del formulario
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
              className="w-full bg-[#c9a84c] hover:bg-[#b39540] text-black font-bold h-12 rounded-xl transition-all"
            >
              Acceder al Panel
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
                    className={`flex items-center gap-2 text-xs font-bold ${item.is_active ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.is_active ? 'ACTIVO' : 'OCULTO'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-[#c9a84c]/10 text-[#c9a84c] rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => item.id && deleteItem(item.id)}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
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
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 p-6 hidden md:flex flex-col">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#f1d584] bg-clip-text text-transparent">CVitae Admin</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#c9a84c] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blog' ? 'bg-[#c9a84c] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <FileText size={20} /> Posts de Blog
          </button>
          <button 
            onClick={() => { setActiveTab('content'); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-[#c9a84c] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Plus size={20} /> Nuevo Contenido
          </button>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-all mt-auto"
        >
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-h-screen">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">
              {activeTab === 'dashboard' ? 'Panel General' : activeTab === 'blog' ? 'Gestión de Blog' : isEditing ? 'Editar Contenido' : 'Crear Contenido'}
            </h2>
            <p className="text-gray-500 mt-1">Gestiona las vacantes y el blog de CVitae</p>
          </div>
        </header>

        {activeTab === 'dashboard' && renderDashboard('oportunidad')}
        {activeTab === 'blog' && renderDashboard('blog')}

        {activeTab === 'content' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl bg-[#0a0a0a] border border-white/5 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Título de la Publicación</label>
                  <Input 
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    placeholder="Ej: Senior Frontend Developer"
                    className="bg-black/50 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">URL Slug (automático)</label>
                  <Input 
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="senior-frontend-developer"
                    className="bg-black/50 border-white/10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Tipo de Contenido</label>
                  <select 
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md bg-black/50 border border-white/10 text-sm"
                  >
                    <option value="oportunidad">Oportunidad / Vacante</option>
                    <option value="blog">Post de Blog</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Categoría</label>
                  <select 
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md bg-black/50 border border-white/10 text-sm"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Fecha de Vencimiento</label>
                  <Input 
                    type="date"
                    name="fecha_vencimiento"
                    value={formData.fecha_vencimiento}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Ubicación</label>
                  <Input 
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                    placeholder="Ej: Asunción / Remoto"
                    className="bg-black/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Imagen URL (Opcional)</label>
                  <Input 
                    name="imagen_url"
                    value={formData.imagen_url}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-black/50 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Cuerpo del Contenido (Markdown Soportado)</label>
                <Textarea 
                  name="cuerpo"
                  value={formData.cuerpo}
                  onChange={handleInputChange}
                  placeholder="Describe la vacante o escribe el post aquí..."
                  className="bg-black/50 border-white/10 min-h-[300px]"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#c9a84c] text-black font-bold px-8"
                >
                  {loading ? 'Guardando...' : isEditing ? 'Actualizar Publicación' : 'Publicar Ahora'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => { setActiveTab('dashboard'); resetForm(); }}
                  className="border-white/10 text-gray-400"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}
