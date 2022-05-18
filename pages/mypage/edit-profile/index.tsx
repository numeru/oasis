import { useState } from 'react';
import EditCancelAlertModal from 'components/features/edit-profile/cancel-alert-modal';
import EditProfileForm from 'components/features/edit-profile/edit-profile-form';
import Modal from 'components/shared/modal';
import useCustomPrompt from 'hooks/useCostomPrompt';
import { MyPageContainer } from '..';
import WithAuth from 'utils/HOC/withAuth';

const EditProfile = () => {
	const [showAlertModal, setShowAlertModal] = useState(false);

	const [handlePrompt, setLeavePage, isEdited, setIsEdited] = useCustomPrompt(setShowAlertModal);

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	return (
		<MyPageContainer>
			<EditProfileForm setIsEdited={setIsEdited} isFormSubmitted={isFormSubmitted} />
			{/* <Prompt when={isEdited} message={handlePrompt} /> */}
			{showAlertModal && (
				<Modal>
					<EditCancelAlertModal
						setShowAlertModal={setShowAlertModal}
						setLeavePage={setLeavePage}
						setIsFormSubmitted={setIsFormSubmitted}
					/>
				</Modal>
			)}
		</MyPageContainer>
	);
};

export default WithAuth(EditProfile, true);
