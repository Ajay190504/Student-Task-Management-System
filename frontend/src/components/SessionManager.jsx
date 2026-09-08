import React, { useEffect, useState } from 'react';
import { ShieldCheck, Laptop, Smartphone, Globe, LogOut } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { CardSkeleton } from './ui/Skeleton';

const SessionManager = () => {
  const { addToast } = useToast();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

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
      addToast('Session revoked successfully', 'info');
      fetchSessions();
    } catch (err) {
      addToast('Failed to revoke session', 'error');
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
      addToast('All other active sessions terminated', 'success');
      fetchSessions();
    } catch (err) {
      addToast('Failed to terminate other sessions', 'error');
      console.error('Failed to revoke other sessions:', err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Security & Active Sessions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Hybrid JWT + Stateful Active Device Session Manager. Remote revoke compromised tokens.
          </p>
        </div>

        <Button variant="danger" size="sm" icon={LogOut} onClick={handleRevokeOtherSessions}>
          Terminate All Other Sessions
        </Button>
      </div>

      <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400">
                  {sess.deviceInfo?.toLowerCase().includes('mobile') ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Laptop className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {sess.deviceInfo || 'Browser Session'}
                    </span>
                    {sess.isCurrentSession && (
                      <Badge variant="success">This Device</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" /> IP: {sess.ipAddress}
                    </span>
                    <span>Last active: {new Date(sess.lastActive).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {!sess.isCurrentSession && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevokeSession(sess.sessionId)}
                  className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              No active sessions recorded.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SessionManager;
