import React, { useEffect, useState } from 'react';
import { ShieldCheck, Laptop, Smartphone, Globe, LogOut, AlertOctagon } from 'lucide-react';
import api from '../services/api';

const SessionManager = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchSessions = async () => {
    try {
      const currentSessionId = localStorage.getItem('sessionId');
      const res = await api.get('/auth/sessions', {
        headers: { 'X-Session-ID': currentSessionId }
      });
      setSessions(res.data);
    } catch (err) {
      console.error('Failed to fetch user active sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevokeSession = async (sessionId) => {
    try {
      await api.post(`/auth/sessions/revoke/${sessionId}`);
      setMessage('Session terminated successfully');
      fetchSessions();
    } catch (err) {
      console.error('Failed to revoke session:', err);
    }
  };

  const handleRevokeOtherSessions = async () => {
    const currentSessionId = localStorage.getItem('sessionId');
    if (!currentSessionId) return;

    try {
      await api.post('/auth/sessions/revoke-others', {}, {
        headers: { 'X-Session-ID': currentSessionId }
      });
      setMessage('All other sessions terminated successfully');
      fetchSessions();
    } catch (err) {
      console.error('Failed to revoke other sessions:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            Active Login Devices & Security Sessions
          </h2>
          <p className="text-xs text-slate-400">
            Hybrid JWT + Stateful Active Session Management. You can view all logged-in devices and revoke compromised tokens remotely.
          </p>
        </div>

        <button
          onClick={handleRevokeOtherSessions}
          className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" /> Terminate All Other Sessions
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          {message}
        </div>
      )}

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-800">
          {sessions.map((sess) => (
            <div key={sess.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
                  {sess.deviceInfo?.toLowerCase().includes('mobile') ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Laptop className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{sess.deviceInfo || 'Browser Session'}</span>
                    {sess.isCurrentSession && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        This Device
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-500" /> IP: {sess.ipAddress}
                    </span>
                    <span>Last active: {new Date(sess.lastActive).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {!sess.isCurrentSession && (
                <button
                  onClick={() => handleRevokeSession(sess.sessionId)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                >
                  Revoke Access
                </button>
              )}
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-xs">
              No active sessions recorded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionManager;
