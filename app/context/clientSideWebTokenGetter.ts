const clientSideWebTokenGetter = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; jwt=`);
  if (parts.length === 2) return parts?.pop()?.split(";").shift() ?? null;
  return null;
};

export default clientSideWebTokenGetter;
