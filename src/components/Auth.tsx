import React, { ReactElement, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useSnackbar } from "notistack";
import Instance from "../helpers/axios";
import { getAuthURL, getFullName } from "../helpers/auth";
import LoadingScreen from "./LoadingScreen";

export function Login(): ReactElement {
	const { search } = useLocation();
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();

	const auth_code = new URLSearchParams(search).get("code");

	useEffect(() => {
		if (auth_code) {
			Instance
				.get(`/auth/token?code=${auth_code}`)
				.then(res => {
					localStorage.setItem("access", res.data.token);
					Instance.defaults.headers["Authorization"] = "Bearer " + res.data.token;

					enqueueSnackbar("Logged in as " + getFullName(), {
						variant: "success",
						autoHideDuration: 3000,
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "right",
						},
					});
				})
				.catch(err => {
					enqueueSnackbar(err.toString(), {
						variant: "error",
						autoHideDuration: 3000,
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "right",
						},
					});
				})
				.finally(() => {
					history.push(localStorage.getItem("login-referrer") || "/");
					localStorage.removeItem("login-referrer");
				});
		} else {
			window.location.href = getAuthURL();
		}
	});
	return <LoadingScreen />;
}

export function Logout(): ReactElement {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
		delete Instance.defaults.headers["Authorization"];

		enqueueSnackbar("You have been logged out", {
			variant: "success",
			autoHideDuration: 3000,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right",
			},
		});

		history.push("/");
	});
	return <LoadingScreen />;
}