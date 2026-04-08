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
  Lock
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content'>('dashboard');
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
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === adminPass) {
      setIsAuthenticated(true);
      setNotification({ type: 'success', message: 'Bienvenido al panel de administración' });
    } else {
      setNotification({ type: 'error', message: 'Contraseña incorrecta' });
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
      // Validar slug duplicado si es nuevo
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

      // Normalizar fecha para que venza al final del día (23:59:59)
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

  // Render Login
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
            <h2 className="text-3xl font-bold">{activeTab === 'dashboard' ? 'Panel General' : isEditing ? 'Editar Contenido' : 'Crear Contenido'}</h2>
            <p className="text-gray-500 mt-1">Gestiona las vacantes y el blog de CVitae</p>
          </div>
          
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-2xl flex items-center gap-3 shadow-xl ${
                  notification.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}
              >
                {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-medium">{notification.message}</span>
                <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-70"><X size={16}/></button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
                <p className="text-gray-500 text-sm font-medium">Total Contenidos</p>
                <p className="text-4xl font-bold mt-2 text-white">{items.length}</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
                <p className="text-gray-500 text-sm font-medium">Oportunidades Activas</p>
                <p className="text-4xl font-bold mt-2 text-green-500">{items.filter(i => i.tipo === 'oportunidad' && i.is_active).length}</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
                <p className="text-gray-500 text-sm font-medium">Posts de Blog</p>
                <p className="text-4xl font-bold mt-2 text-[#c9a84c]">{items.filter(i => i.tipo === 'blog').length}</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-xl">Lista de Contenidos</h3>
                <div className="flex gap-2">
                   {/* Filtros rápidos podrían ir aquí */}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Título</th>
                      <th className="px-6 py-4 font-semibold">Tipo</th>
                      <th className="px-6 py-4 font-semibold">Categoría</th>
                      <th className="px-6 py-4 font-semibold">Estado</th>
                      <th className="px-6 py-4 font-semibold">Vencimiento</th>
                      <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {item.imagen_url ? (
                              <img src={item.imagen_url} className="w-10 h-10 rounded-lg object-cover border border-white/10" alt=""/>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                <ImageIcon size={16} className="text-gray-500"/>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-white line-clamp-1">{item.titulo}</p>
                              <p className="text-xs text-gray-500">/{item.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.tipo === 'blog' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                            {item.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{item.categoria}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleStatus(item)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${item.is_active ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
                          >
                            {item.is_active ? 'Activo' : 'Inactivo'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(item.fecha_vencimiento).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="hover:bg-white/10 text-gray-400 hover:text-white">
                              Editar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {items.length === 0 && !loading && (
                  <div className="p-20 text-center text-gray-500">
                    No hay contenidos cargados aún.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <FileText size={14} className="text-[#c9a84c]"/> Título de la Publicación
                    </label>
                    <Input 
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleInputChange}
                      placeholder="Ej: Desarrollador Frontend Senior"
                      required
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#c9a84c]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Settings size={14} className="text-[#c9a84c]"/> URL Slug (automático)
                    </label>
                    <Input 
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="url-amigable-aqui"
                      required
                      className="bg-white/5 border-white/10 text-gray-400 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Tag size={14} className="text-[#c9a84c]"/> Tipo
                    </label>
                    <select 
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                    >
                      <option value="oportunidad">Oportunidad Laboral</option>
                      <option value="blog">Post de Blog</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <LayoutDashboard size={14} className="text-[#c9a84c]"/> Categoría
                    </label>
                    <select 
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Calendar size={14} className="text-[#c9a84c]"/> Fecha Vencimiento
                    </label>
                    <Input 
                      type="date"
                      name="fecha_vencimiento"
                      value={formData.fecha_vencimiento}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#c9a84c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <MapPin size={14} className="text-[#c9a84c]"/> Ubicación
                    </label>
                    <Input 
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleInputChange}
                      placeholder="Asunción, Paraguay"
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#c9a84c]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <ImageIcon size={14} className="text-[#c9a84c]"/> URL de Imagen
                    </label>
                    <Input 
                      name="imagen_url"
                      value={formData.imagen_url}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#c9a84c]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Briefcase size={14} className="text-[#c9a84c]"/> Contenido (Markdown)
                  </label>
                  <Textarea 
                    name="cuerpo"
                    value={formData.cuerpo}
                    onChange={handleInputChange}
                    placeholder="Escribe el contenido aquí... (Soporta Markdown)"
                    className="bg-white/5 border-white/10 text-white min-h-[300px] rounded-2xl p-6 focus:ring-[#c9a84c]"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-[#c9a84c] hover:bg-[#b39540] text-black font-bold h-14 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20}/>
                  {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Publicar Contenido'}
                </Button>
                <Button 
                  type="button" 
                  onClick={() => { setActiveTab('dashboard'); resetForm(); }}
                  variant="outline"
                  className="px-8 border-white/10 text-gray-400 hover:bg-white/5 h-14 rounded-2xl"
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
