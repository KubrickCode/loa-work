import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  user?: {
    displayName: string;
    imageUrl?: string;
  } | null;
};

export const AuthContext = createContext<AuthState>(null as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    logout: async () => {
      await fetch(
        import.meta.env.PROD
          ? import.meta.env.VITE_API_URL + "/auth/logout"
          : "/auth/logout",
        { method: "POST" }
      );
      window.location.href = "/";
    },
  });

  useEffect(() => {
    fetch(
      import.meta.env.PROD
        ? import.meta.env.VITE_API_URL + "/auth/check"
        : "/auth/check"
    ).then(async (response) => {
      const user = await response.json();
      setState((state) => ({
        ...state,
        isAuthenticated: Boolean(user),
        isLoading: false,
        user,
      }));
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
