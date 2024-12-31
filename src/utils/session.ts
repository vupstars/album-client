/* token */
const tokenKey = "token";
export const tokenSession = {
	get: () => localStorage.getItem( tokenKey ) || "",
	set: ( token: string ) => localStorage.setItem( tokenKey, token ),
	remove: () => localStorage.removeItem( tokenKey )
}