import Head from "next/head";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	Email,
	Lock,
	Phone,
} from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/account/HeroSectionBasic";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { sweetMixinErrorAlert } from "../../libs/sweetAlert";
import { logIn, signUp } from "../../libs/auth";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
	},
});

const AccountPage = () => {
	const router = useRouter();
	const device = useDeviceDetect();
	const [showPassword, setShowPassword] = useState(false);
	const [input, setInput] = useState({
		nick: "",
		password: "",
		phone: "",
		type: "USER",
	});
	const [loginView, setLoginView] = useState<boolean>(true);

	/** Handlers */

	const viewChangeHandler = (state: boolean) => {
		setLoginView(state);
	};

	const checkUserTypeHandler = (e: any) => {
		const checked = e.target.checked;
		if (checked) {
			const value = e.target.name;
			handleInput("type", value);
		} else {
			handleInput("type", "USER");
		}
	};

	const handleInput = useCallback((name: any, value: any) => {
		setInput((prev) => {
			return { ...prev, [name]: value };
		});
	}, []);

	const doLogin = useCallback(async () => {
		console.warn(input);
		try {
			await logIn(input.nick, input.password);
			await router.push(`${router.query.referrer ?? "/"}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);
	console.log(doLogin);

	const doSignUp = useCallback(async () => {
		console.warn(input);
		try {
			await signUp(input.nick, input.password, input.phone, input.type);
			await router.push(`${router.query.referrer ?? "/"}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	if (device === "mobile") {
		return (
			<Stack className="loginSection">
				<Stack className="container">
					<Stack className="rightBox">
						<h2 className="loginTitle">
							{loginView ? "Login to your account" : "Create your account"}
						</h2>

						<Button
							className={"socialBtn"}
							startIcon={<GoogleIcon sx={{ width: "30px", height: "29px" }} />}>
							<span className="socialTitle">Login with google</span>
						</Button>
						<Divider className={"divider"}>Or</Divider>

						<TextField
							fullWidth
							size="small"
							placeholder="Enter Your Email Id"
							type="email"
							variant="outlined"
							value={input.nick}
							onKeyDown={(event) => {
								if (event.key == "Enter" && loginView) doLogin();
								if (event.key == "Enter" && !loginView) doSignUp();
							}}
							onChange={(e) => handleInput("nick", e.target.value)}
							sx={{
								width: "571.2px",
								height: "56.938px",
								borderRadius: "50px",
								border: "1px solid black",
								marginBottom: "18px",
								"& .MuiOutlinedInput-root": {
									borderRadius: "50px",
									height: "100%",
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start" sx={{ marginLeft: "10px" }}>
										<Email />
									</InputAdornment>
								),
							}}
						/>
						{!loginView ? (
							<TextField
								fullWidth
								size="small"
								placeholder="Enter Your Phone"
								type="phone"
								variant="outlined"
								value={input.phone}
								onKeyDown={(event) => {
									if (event.key == "Enter" && loginView) doLogin();
									if (event.key == "Enter" && !loginView) doSignUp();
								}}
								onChange={(e) => handleInput("phone", e.target.value)}
								sx={{
									width: "571.2px",
									height: "56.938px",
									borderRadius: "50px",
									border: "1px solid black",
									"& .MuiOutlinedInput-root": {
										borderRadius: "50px",
										height: "100%",
									},
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ marginLeft: "10px" }}>
											<Phone />
										</InputAdornment>
									),
								}}
							/>
						) : null}

						<TextField
							fullWidth
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							variant="outlined"
							margin="normal"
							value={input.password}
							onKeyDown={(event) => {
								if (event.key == "Enter" && loginView) doLogin();
								if (event.key == "Enter" && !loginView) doSignUp();
							}}
							onChange={(e) => handleInput("password", e.target.value)}
							sx={{
								width: "571.2px",
								height: "56.938px",
								borderRadius: "50px",
								border: "1px solid black",
								"& .MuiOutlinedInput-root": {
									borderRadius: "50px",
									height: "100%",
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start" sx={{ marginLeft: "10px" }}>
										<Lock />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge="end"
											sx={{ marginRight: "10px" }}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Box className={"options"}>
							{!loginView && (
								<div className={"type-option"}>
									<span className={"text"}>I want to be registered as:</span>
									<div className="typeGroup">
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name={"USER"}
														onChange={checkUserTypeHandler}
														checked={input?.type == "USER"}
													/>
												}
												label="User"
											/>
										</FormGroup>
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name={"VENDOR"}
														onChange={checkUserTypeHandler}
														checked={input?.type == "VENDOR"}
													/>
												}
												label="Vendor"
											/>
										</FormGroup>
									</div>
								</div>
							)}
							{loginView ? (
								<div className="rememberInfo">
									{" "}
									<FormControlLabel
										control={<Checkbox />}
										label="Remember Me"
									/>
									<Typography variant="body2" className={"forgot"}>
										Forgot Password?
									</Typography>
								</div>
							) : null}
						</Box>

						<Button
							variant="contained"
							className={"loginBtn"}
							disabled={input.nick == "" || input.password == ""}
							onClick={loginView ? doLogin : doSignUp}>
							{loginView ? "Login" : "Sign Up"}
						</Button>

						<Divider className={"divider"}>Or</Divider>

						<Button
							className={"socialBtnFacebook"}
							startIcon={
								<FacebookIcon sx={{ width: "30px", height: "29px" }} />
							}>
							<span className="socialTitle">Login With Facebook</span>
						</Button>

						<Typography variant="body2" className={"footer2"}>
							{loginView
								? "Don’t Have An Account?"
								: "Already Have An Account?"}
							<Link
								href="#"
								className={"createLink"}
								onClick={() => viewChangeHandler(!loginView)}>
								{loginView ? " Create An Account" : " Login"}
							</Link>
						</Typography>
					</Stack>

					<Stack className="leftBox">
						<img src="/img/account/account1.jpg" className="leftImg" />
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className="loginSection">
				<HeroSectionBasic />
				<Stack className="container">
					<Stack className="rightBox">
						<h2 className="loginTitle">
							{loginView ? "Login to your account" : "Create your account"}
						</h2>

						<Button
							className={"socialBtn"}
							startIcon={<GoogleIcon sx={{ width: "30px", height: "29px" }} />}>
							<span className="socialTitle">Login with google</span>
						</Button>
						<Divider className={"divider"}>Or</Divider>

						<TextField
							fullWidth
							size="small"
							placeholder="Enter Your Email Id"
							type="email"
							variant="outlined"
							value={input.nick}
							onKeyDown={(event) => {
								if (event.key == "Enter" && loginView) doLogin();
								if (event.key == "Enter" && !loginView) doSignUp();
							}}
							onChange={(e) => handleInput("nick", e.target.value)}
							sx={{
								width: "571.2px",
								height: "56.938px",
								borderRadius: "50px",
								border: "1px solid black",
								marginBottom: "18px",
								"& .MuiOutlinedInput-root": {
									borderRadius: "50px",
									height: "100%",
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start" sx={{ marginLeft: "10px" }}>
										<Email />
									</InputAdornment>
								),
							}}
						/>
						{!loginView ? (
							<TextField
								fullWidth
								size="small"
								placeholder="Enter Your Phone"
								type="phone"
								variant="outlined"
								value={input.phone}
								onKeyDown={(event) => {
									if (event.key == "Enter" && loginView) doLogin();
									if (event.key == "Enter" && !loginView) doSignUp();
								}}
								onChange={(e) => handleInput("phone", e.target.value)}
								sx={{
									width: "571.2px",
									height: "56.938px",
									borderRadius: "50px",
									border: "1px solid black",
									"& .MuiOutlinedInput-root": {
										borderRadius: "50px",
										height: "100%",
									},
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ marginLeft: "10px" }}>
											<Phone />
										</InputAdornment>
									),
								}}
							/>
						) : null}

						<TextField
							fullWidth
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							variant="outlined"
							margin="normal"
							value={input.password}
							onKeyDown={(event) => {
								if (event.key == "Enter" && loginView) doLogin();
								if (event.key == "Enter" && !loginView) doSignUp();
							}}
							onChange={(e) => handleInput("password", e.target.value)}
							sx={{
								width: "571.2px",
								height: "56.938px",
								borderRadius: "50px",
								border: "1px solid black",
								"& .MuiOutlinedInput-root": {
									borderRadius: "50px",
									height: "100%",
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start" sx={{ marginLeft: "10px" }}>
										<Lock />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge="end"
											sx={{ marginRight: "10px" }}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Box className={"options"}>
							{!loginView && (
								<div className={"type-option"}>
									<span className={"text"}>I want to be registered as:</span>
									<div className="typeGroup">
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name={"USER"}
														onChange={checkUserTypeHandler}
														checked={input?.type == "USER"}
													/>
												}
												label="User"
											/>
										</FormGroup>
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name={"VENDOR"}
														onChange={checkUserTypeHandler}
														checked={input?.type == "VENDOR"}
													/>
												}
												label="Vendor"
											/>
										</FormGroup>
									</div>
								</div>
							)}
							{loginView ? (
								<div className="rememberInfo">
									{" "}
									<FormControlLabel
										control={<Checkbox />}
										label="Remember Me"
									/>
									<Typography variant="body2" className={"forgot"}>
										Forgot Password?
									</Typography>
								</div>
							) : null}
						</Box>

						<Button
							variant="contained"
							className={"loginBtn"}
							disabled={input.nick == "" || input.password == ""}
							onClick={loginView ? doLogin : doSignUp}>
							{loginView ? "Login" : "Sign Up"}
						</Button>

						<Divider className={"divider"}>Or</Divider>

						<Button
							className={"socialBtnFacebook"}
							startIcon={
								<FacebookIcon sx={{ width: "30px", height: "29px" }} />
							}>
							<span className="socialTitle">Login With Facebook</span>
						</Button>

						<Typography variant="body2" className={"footer2"}>
							{loginView
								? "Don’t Have An Account?"
								: "Already Have An Account?"}
							<Link
								href="#"
								className={"createLink"}
								onClick={() => viewChangeHandler(!loginView)}>
								{loginView ? " Create An Account" : " Login"}
							</Link>
						</Typography>
					</Stack>

					<Stack className="leftBox">
						<img src="/img/account/account1.jpg" className="leftImg" />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(AccountPage);
