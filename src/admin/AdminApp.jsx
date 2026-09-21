import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useIsAuthed } from '../stores/authStore';
import { useLogout, useMe } from './hooks/useAuth';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/AdminLayout';
import ModulePage from './components/ModulePage';
import { getModule, modules } from './modules';

function ModuleRoute() {
  const { moduleKey } = useParams();
  const module = getModule(moduleKey);
  if (!module) return <Navigate to={`/admin/${modules[0].key}`} replace />;
  // Keyed so switching modules starts from a fresh draft.
  return <ModulePage key={module.key} module={module} />;
}

function AdminSession() {
  // Confirms the stored token with the server; a 401 clears the session.
  useMe();
  const logoutMutation = useLogout();

  return (
    <>
      <title>Admin — Yali Labs</title>
      <meta name="robots" content="noindex, nofollow" />
      <AdminLayout onLogout={() => logoutMutation.mutate()} signingOut={logoutMutation.isPending}>
        <Routes>
          <Route index element={<Navigate to={modules[0].key} replace />} />
          <Route path=":moduleKey" element={<ModuleRoute />} />
          <Route path="*" element={<Navigate to={`/admin/${modules[0].key}`} replace />} />
        </Routes>
      </AdminLayout>
    </>
  );
}

/**
 * AdminApp — mounted at /admin/*. Not linked from anywhere on the public site.
 * Shows the login screen until the auth store holds a session token.
 */
export default function AdminApp() {
  const authed = useIsAuthed();
  if (!authed) return <LoginPage />;
  return <AdminSession />;
}
