import { useState } from "react";
import { Lock, Unlock, Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface TokenStatus {
  isValid: boolean;
  isPro: boolean;
  token?: string;
  expiresAt?: string;
}

export function TokenSystem() {
  const [token, setToken] = useState("");
  const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null);
  const [copied, setCopied] = useState(false);

  // Generar token único (simulado - en producción sería desde backend)
  const generateToken = () => {
    const newToken = `CVT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setToken(newToken);
    setTokenStatus({
      isValid: true,
      isPro: true,
      token: newToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  const validateToken = (inputToken: string) => {
    // Simulación: tokens que empiezan con CVT- son válidos
    if (inputToken.startsWith("CVT-")) {
      setTokenStatus({
        isValid: true,
        isPro: true,
        token: inputToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } else {
      setTokenStatus({
        isValid: false,
        isPro: false,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Demo Mode */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-start gap-4">
          <Lock className="h-6 w-6 text-yellow-500 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Modo Demo (Gratuito)</h3>
            <p className="text-slate-400 text-sm mb-4">
              Acceso limitado a 5 CVs con datos ofuscados. Ranking básico sin análisis avanzado.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>✓ Ver 5 CVs máximo</p>
              <p>✓ Datos básicos (sin nombres reales)</p>
              <p>✓ Ranking simple</p>
              <p>✗ Análisis ATS avanzado</p>
              <p>✗ Export de datos</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Pro Mode */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-600/50 p-6">
        <div className="flex items-start gap-4">
          <Unlock className="h-6 w-6 text-blue-400 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Modo Pro ($50 USD/mes)</h3>
            <p className="text-slate-400 text-sm mb-4">
              Acceso completo con análisis avanzado de compatibilidad ATS.
            </p>
            <div className="space-y-2 text-sm text-slate-300 mb-4">
              <p>✓ 100+ CVs sin límite</p>
              <p>✓ Datos reales completos</p>
              <p>✓ Ranking avanzado con IA</p>
              <p>✓ Análisis ATS detallado</p>
              <p>✓ Export en múltiples formatos</p>
              <p>✓ API access</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Token Input */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Ingresá tu Token</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Token de Acceso Pro
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="CVT-XXXXXXXXXXXX"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  validateToken(e.target.value);
                }}
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Button
                onClick={generateToken}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generar
              </Button>
            </div>
          </div>

          {/* Token Status */}
          {tokenStatus && (
            <div
              className={`p-4 rounded-lg border ${
                tokenStatus.isValid
                  ? "bg-green-900/20 border-green-600/50"
                  : "bg-red-900/20 border-red-600/50"
              }`}
            >
              <div className="flex items-start gap-2">
                {tokenStatus.isValid ? (
                  <Check className="h-5 w-5 text-green-400 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                )}
                <div>
                  <p
                    className={`font-semibold ${
                      tokenStatus.isValid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tokenStatus.isValid ? "Token Válido ✓" : "Token Inválido ✗"}
                  </p>
                  {tokenStatus.isValid && (
                    <>
                      <p className="text-sm text-slate-300 mt-1">
                        Modo: <span className="font-semibold">PRO</span>
                      </p>
                      <p className="text-sm text-slate-400">
                        Expira: {new Date(tokenStatus.expiresAt!).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Copy Token */}
          {token && tokenStatus?.isValid && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
              <p className="text-sm text-slate-400 mb-2">Tu Token (cópialo y guárdalo):</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-blue-400 break-all">{token}</code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-slate-800 rounded transition"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Instructions */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Instrucciones</h3>
        <ol className="space-y-3 text-sm text-slate-400">
          <li className="flex gap-3">
            <span className="font-semibold text-blue-400">1.</span>
            <span>Haz clic en "Generar" para crear tu token único</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-blue-400">2.</span>
            <span>Copia el token y guárdalo en un lugar seguro</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-blue-400">3.</span>
            <span>Ingresa el token en el campo anterior para validar</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-blue-400">4.</span>
            <span>¡Acceso PRO desbloqueado! Analiza CVs sin límites</span>
          </li>
        </ol>
      </Card>

      {/* Pricing */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-600/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Planes de Acceso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="font-semibold text-white mb-2">Demo</p>
            <p className="text-2xl font-bold text-white mb-2">Gratis</p>
            <p className="text-sm text-slate-400">5 CVs, datos básicos</p>
          </div>
          <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-600/50">
            <p className="font-semibold text-white mb-2">Pro</p>
            <p className="text-2xl font-bold text-blue-400 mb-2">$50/mes</p>
            <p className="text-sm text-slate-300">100+ CVs, análisis completo</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
