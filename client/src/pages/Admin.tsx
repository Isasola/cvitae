import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Lock, LogOut, Eye, EyeOff, Trash2, CheckCircle, Clock, AlertCircle, Copy, Check } from "lucide-react";

interface Order {
  id: string;
  name: string;
  email: string;
  plan: string;
  job?: string;
  status: string;
  createdAt: string;
  type: "candidato" | "reclutador";
  token?: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = 'CVitae | Administración';
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "candidato" | "reclutador">("all");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Simular login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "cvitae2026admin") {
      setIsLoggedIn(true);
      setPassword("");
      loadOrders();
    } else {
      alert("Contraseña incorrecta");
      setPassword("");
    }
  };

  // Simular carga de pedidos desde Supabase
  const loadOrders = async () => {
    setLoading(true);
    // Simular delay de API
    await new Promise((r) => setTimeout(r, 1000));

    const mockOrders: Order[] = [
      {
        id: "ord-001",
        name: "Lucía Fernández",
        email: "lucia@email.com",
        plan: "Perfil Digital",
        job: "Analista Contable",
        status: "pending",
        createdAt: "2026-03-26",
        type: "candidato",
      },
      {
        id: "ord-002",
        name: "Carlos González",
        email: "carlos@empresa.com",
        plan: "Pro",
        status: "approved",
        createdAt: "2026-03-25",
        type: "reclutador",
        token: "REC-PRO-2026-001",
      },
      {
        id: "ord-003",
        name: "Rodrigo Martínez",
        email: "rodrigo@dev.com",
        plan: "Portafolio Web",
        job: "Desarrollador Full Stack",
        status: "sent",
        createdAt: "2026-03-24",
        type: "candidato",
      },
      {
        id: "ord-004",
        name: "Grupo Financiero Asunción",
        email: "rrhh@grupofinanciero.com",
        plan: "Enterprise",
        status: "pending",
        createdAt: "2026-03-26",
        type: "reclutador",
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  };

  const handleApprove = async (orderId: string, type: string) => {
    if (type === "candidato") {
      // Aprobar candidato: generar extras + enviar email
      alert(`✅ Candidato aprobado. Email enviado a ${orders.find((o) => o.id === orderId)?.email}`);
    } else if (type === "reclutador") {
      // Habilitar B2B: generar token en Supabase
      try {
        const response = await fetch('/.netlify/functions/generate-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recruiterId: orderId, plan: 'pro' }),
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(
            orders.map((o) =>
              o.id === orderId ? { ...o, status: "approved", token: data.token } : o
            )
          );
          alert(`✅ B2B habilitado. Token: ${data.token}\nEmail enviado a ${orders.find((o) => o.id === orderId)?.email}`);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        alert(`Error generando token: ${error}`);
      }
    }
  };

  const handleDelete = (orderId: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este pedido?")) {
      setOrders(orders.filter((o) => o.id !== orderId));
      alert("✅ Pedido eliminado");
    }
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "sent":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "approved":
        return "Aprobado";
      case "sent":
        return "Entregado";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "sent":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter((o) => (filter === "all" ? true : o.type === filter));

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sidebar to-sidebar-accent flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 md:p-8 border-border">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-sidebar rounded flex items-center justify-center text-accent font-bold text-lg md:text-2xl mx-auto mb-4">
              CV
            </div>
            <h1 className="text-2xl md:text-3xl font-black mb-2">Panel Admin</h1>
            <p className="text-xs md:text-sm text-muted">CVitae - Gestión de pedidos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-bold mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresá la contraseña"
                  className="w-full bg-card border border-border rounded px-3 md:px-4 py-2 md:py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm md:text-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base">
              <Lock className="w-4 h-4 mr-2" />
              Acceder
            </Button>
          </form>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border text-center">
            <p className="text-xs text-muted mb-2">¿Olvidaste la contraseña?</p>
            <a href="https://wa.me/595992954169" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent hover:underline">
              Contactá por WhatsApp
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-sidebar rounded flex items-center justify-center text-accent font-bold text-xs md:text-sm">CV</div>
            <span className="font-bold text-sm md:text-lg"><span className="italic">itae</span> Admin</span>
          </div>
          <Button
            onClick={() => setIsLoggedIn(false)}
            variant="outline"
            size="sm"
            className="border-destructive text-destructive hover:bg-destructive/10 text-xs md:text-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </nav>

      <div className="pt-20 md:pt-24 pb-12 md:pb-20">
        <div className="container max-w-6xl px-4">
          {/* HEADER */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-black mb-2">Gestión de Pedidos</h1>
            <p className="text-sm md:text-base text-muted">Aprobá candidatos, habilita B2B y gestiona accesos</p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-6 md:mb-8">
            <div className="flex gap-1 md:gap-2 flex-wrap">
              {(["all", "candidato", "reclutador"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded border text-xs md:text-sm font-medium transition ${
                    filter === f
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border hover:border-accent"
                  }`}
                >
                  {f === "all" ? "Todos" : f === "candidato" ? "Candidatos" : "Reclutadores"}
                </button>
              ))}
            </div>
            <div className="text-xs md:text-sm text-muted ml-auto">
              Total: <strong>{filteredOrders.length}</strong>
            </div>
          </div>

          {/* ORDERS LIST */}
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted">Cargando pedidos...</p>
            </Card>
          ) : filteredOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted">No hay pedidos</p>
            </Card>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="p-4 md:p-6 border-border overflow-hidden">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base md:text-lg font-black">{order.name}</h3>
                        <span className={`px-2 py-0.5 rounded border text-xs font-bold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-secondary/10 border border-secondary/20 text-xs font-bold text-secondary">
                          {order.type === "candidato" ? "👤 Candidato" : "🏢 Reclutador"}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted mb-1">{order.email}</p>
                      <div className="text-xs md:text-sm text-muted space-y-0.5">
                        <div>
                          <strong>Plan:</strong> {order.plan}
                        </div>
                        {order.job && (
                          <div>
                            <strong>Puesto:</strong> {order.job}
                          </div>
                        )}
                        <div>
                          <strong>Fecha:</strong> {order.createdAt}
                        </div>
                      </div>
                    </div>

                    {/* TOKEN DISPLAY FOR RECRUITERS */}
                    {order.type === "reclutador" && order.token && (
                      <div className="w-full md:w-auto bg-accent/10 border border-accent/20 rounded p-3 md:p-4">
                        <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Token de acceso</div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-foreground">{order.token}</code>
                          <button
                            onClick={() => copyToken(order.token!)}
                            className="p-1.5 hover:bg-accent/20 rounded transition"
                          >
                            {copiedToken === order.token ? (
                              <Check className="w-4 h-4 text-secondary" />
                            ) : (
                              <Copy className="w-4 h-4 text-accent" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col md:flex-row gap-2 pt-4 border-t border-border">
                    {order.status === "pending" && (
                      <Button
                        onClick={() => handleApprove(order.id, order.type)}
                        className="flex-1 bg-secondary text-sidebar-foreground hover:bg-secondary/90 text-xs md:text-sm"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {order.type === "candidato" ? "Aprobar" : "Habilitar B2B"}
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(order.id)}
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10 text-xs md:text-sm"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
