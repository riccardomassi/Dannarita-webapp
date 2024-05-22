import { AuthProvider } from "@/components/AuthContext/AuthContext";

export default function AdminLayout({ children }) {

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
