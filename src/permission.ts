import router from "@/router";
import config from "@/config";

/* 设置当前网站标题 */
function getPageTitle( pageTitle?: string ) {
	const defaultTitle = config.WEB_TITLE;
	if ( pageTitle ) {
		return `${ pageTitle } | ${ defaultTitle }`
	}
	return defaultTitle;
}

router.beforeEach( async ( to, _, next ) => {
	document.title = getPageTitle( to.meta.title );
	next();
} );