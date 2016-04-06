import React, { PropTypes } from "react";

const styles = {
	appContainer: {
		display: "flex",
		minHeight: "100vh",
		flexDirection: "column"
	},
	contentContainer: {
		flex: 1
	}
};

function App({ children }) {
	return (
		<div style={styles.appContainer}>
			<div style={styles.contentContainer}>
				{children}
			</div>
		</div>
	);
}

App.displayName = "App";
App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;
