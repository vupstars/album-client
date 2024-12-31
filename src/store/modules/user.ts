import { defineStore } from "pinia";
import { tokenSession } from "@/utils/session";

export const useUserStore = defineStore( "user", () => {
	const USER_LOGIN = async ( username: string, password: string ) => {
		if ( username?.length === 0 || password?.length === 0 ) {
			throw new Error( "账号或密码不可为空" );
		}
		try {
			const res = await new Promise( resolve => {
				setTimeout( () => {
					resolve( { data: "token114514" } );
				}, 3000 )
			} );
			tokenSession.set( res.data );
			return res;
		} catch {
		}
	}
	
	const USER_LOGOUT = async () => {
		tokenSession.remove();
	}
	
	return { USER_LOGIN, USER_LOGOUT }
} );