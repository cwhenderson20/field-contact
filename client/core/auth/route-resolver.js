export function authRouteResolver(getState) {
	return (nextState, replace) => {
		const { auth } = getState();
		const { pathname } = nextState.location;

		if (!auth.isAuthenticated && pathname !== "/login") {
			replace({ pathname: "/login" });
		} else if (auth.isAuthenticated && pathname === "/login") {
			replace({ pathname: "/dashboard" });
		} else if (auth.isAuthenticated && pathname === "/") {
			replace({ pathname: "/dashboard" });
		}
	};
}
