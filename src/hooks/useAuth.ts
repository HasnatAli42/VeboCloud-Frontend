import { useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  group?: {
    role_id: number;
  };
}
// added comment for deployment again, 2, 3
const useAuth = () => {
  // const [user, setUser] = useState<User | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true);
  const user: User | null = null;
  const isAuthenticated = false;
  const loading = true;

  useEffect(() => {
    // Mocked user data
    // const mockUser: User = {
    //   id: '123',
    //   name: 'John Doe',
    //   email: 'john.doe@example.com',
    //   group: {
    //     role_id: Number(import.meta.env.VITE_DEFAULT_USER_GROUP), // Assuming this value is set in your .env
    //   },
    // };
    // Simulating an async operation
    // setTimeout(() => {
    //   setUser(mockUser);
    //   setIsAuthenticated(true); // Set to true for testing purposes
    //   setLoading(false);
    // }, 1000); // Simulate a network delay
  }, []);

  return { user, isAuthenticated, loading };
};

export default useAuth;
