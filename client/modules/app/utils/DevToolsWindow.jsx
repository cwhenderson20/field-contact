import React from "react";
import { createDevTools } from "react-redux";
import LogMonitor from "redux-devtools-log-monitor";

export default createDevTools(
	<LogMonitor />
);
