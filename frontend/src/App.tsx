import React, { useState } from "react";
import { AppRouter } from "./routes/app-router";
export type UserRole = "admin" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppRouter currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} />
    </div>
  );
};

export default App;
