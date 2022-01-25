class SignUpFormService {
	private email;
	private password;
	private passwordConfirm;
	private name;
	private privacy;
	private terms;
	private marketing;

	constructor() {
		this.email = "";
		this.password = "";
		this.passwordConfirm = "";
		this.name = "";
		this.privacy = false;
		this.terms = false;
		this.marketing = false;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}

	getPasswordConfirm() {
		return this.passwordConfirm;
	}

	getName() {
		return this.name;
	}

	getPrivacy() {
		return this.privacy;
	}

	getTerms() {
		return this.terms;
	}

	getMarketing() {
		return this.marketing;
	}

	setEmail(newEmail: string, update: React.Dispatch<React.SetStateAction<string>>) {
		this.email = newEmail;
		update(newEmail);
	}

	setPassword(newPassword: string, update: React.Dispatch<React.SetStateAction<string>>) {
		this.password = newPassword;
		update(newPassword);
	}

	setPasswordConfirm(newPasswordConfirm: string, update: React.Dispatch<React.SetStateAction<string>>) {
		this.passwordConfirm = newPasswordConfirm;
		update(newPasswordConfirm);
	}

	setName(newName: string, update: React.Dispatch<React.SetStateAction<string>>) {
		this.name = newName;
		update(newName);
	}

	setPrivacy(isChecked: boolean, update: React.Dispatch<React.SetStateAction<boolean>>) {
		this.privacy = isChecked;
		update(isChecked);
	}

	setTerms(isChecked: boolean, update: React.Dispatch<React.SetStateAction<boolean>>) {
		this.terms = isChecked;
		update(isChecked);
	}

	setMarketing(isChecked: boolean, update: React.Dispatch<React.SetStateAction<boolean>>) {
		this.marketing = isChecked;
		update(isChecked);
	}

	resetAllInputs() {
		this.email = "";
		this.password = "";
		this.passwordConfirm = "";
		this.name = "";
		this.privacy = false;
		this.terms = false;
		this.marketing = false;
	}
}

export default SignUpFormService;
