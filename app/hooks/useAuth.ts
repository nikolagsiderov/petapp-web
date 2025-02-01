const useAuth = () => {
  const signOut = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  const setJwt = (jwt: string | null) => {
    document.cookie = `jwt=${jwt}; Path=/; Secure; SameSite=Strict`;
  };

  return { signOut, setJwt };
};

export default useAuth;
