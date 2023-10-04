import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import { userTest } from "../tests/user.test";

interface AuthContextProps {
    children: React.ReactNode;
}

export type UserProps = {
    name: string;
    email: string;
};

interface AuthContextValue {
    user?: UserProps;
    signIn: () => Promise<void>;
    signUp: () => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: AuthContextProps) {
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
        setUser(userTest);
    }, []);

    const signIn = useCallback(async () => {
        //
    }, []);

    const signUp = useCallback(async () => {
        //
    }, []);

    const signOut = useCallback(() => {
        //
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
