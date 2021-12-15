import React, { useState } from "react";
import EditCancelAlertModal from "@components/features/edit-profile/cancel-alert-modal";
import EditProfileForm from "@components/features/edit-profile/edit-profile-form";
import Modal from "@components/shared/modal";
import useCustomPrompt from "@hooks/useCostomPrompt";
import UserService from "@apis/user/user-service";

type Props = {
	userService: UserService;
};

const EditProfile = ({ userService }: Props) => {
	const [showAlertModal, setShowAlertModal] = useState(false);

	const [showPrompt, setLeavePage, setIsEdited] = useCustomPrompt(setShowAlertModal);

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	return (
		<>
			<EditProfileForm userService={userService} setIsEdited={setIsEdited} isFormSubmitted={isFormSubmitted} />
			{showPrompt()}
			{showAlertModal && (
				<Modal>
					<EditCancelAlertModal
						setShowAlertModal={setShowAlertModal}
						setLeavePage={setLeavePage}
						setIsFormSubmitted={setIsFormSubmitted}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditProfile;
