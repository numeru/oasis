import React, { useState } from "react";
import UploadWorkForm from "@components/features/upload-work/upload-work-form";
import useCustomPrompt from "@hooks/useCostomPrompt";
import AlertModal from "@components/shared/alert-modal";
import { Prompt } from "react-router-dom";

const UploadWork = () => {
	const [showAlertModal, setShowAlertModal] = useState(false);

	const [handlePrompt, setLeavePage, isEdited, setIsEdited] = useCustomPrompt(setShowAlertModal);

	const handleClickConfirmButton = () => {
		setLeavePage(true);
	};

	const handleClickCancelButton = () => {
		setShowAlertModal(false);
	};

	return (
		<>
			<UploadWorkForm setIsEdited={setIsEdited} />
			<Prompt when={isEdited} message={handlePrompt} />
			{showAlertModal && (
				<AlertModal
					content="정말로 페이지를 나가시겠어요?"
					subContent="지금 아트로그로 돌아가면 작성 중인 내용이 사라져요"
					confirmName="나가기"
					cancelName="남아있기"
					onConfirm={handleClickConfirmButton}
					onCancel={handleClickCancelButton}
					reverse
				/>
			)}
		</>
	);
};

export default UploadWork;
