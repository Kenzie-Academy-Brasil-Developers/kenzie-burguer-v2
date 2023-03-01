import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Services/api';

interface IDefaultProviderProps {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  name: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

interface IUserContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  userRegister: (formData: IRegisterFormValues) => Promise<void>;
  userLogin: (formData: ILoginFormValues) => Promise<void>;
  userLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      console.log(response.data.user);
      navigate('/shop');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      console.log(response.data.user);
      navigate('/shop');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  useEffect(() => {
    const userToken = localStorage.getItem('@TOKEN');
    const userId = localStorage.getItem('@USERID');
    console.log(userId);

    if (userToken) {
      const autoLogin = async () => {
        try {
          const response = await api.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          setUser(response.data);
          navigate('/shop');
        } catch (error) {
          console.log(error);
        }
      };
      autoLogin();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        userRegister,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
