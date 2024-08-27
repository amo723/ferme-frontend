import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, logoutUser, registerUser } from "../service/authService";
import { User } from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface pour le contexte de l'authentification
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement de l'utilisateur depuis AsyncStorage au démarrage de l'application
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Fonction de connexion
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const loggedInUser = await loginUser(username, password);
      setIsAuthenticated(true);
      setUser(loggedInUser);
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (name: string, username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const registeredUser = await registerUser(name, username, password);
      setIsAuthenticated(true);
      setUser(registeredUser);
      await AsyncStorage.setItem("user", JSON.stringify(registeredUser));
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      await AsyncStorage.removeItem("user");
      setIsAuthenticated(false);
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
