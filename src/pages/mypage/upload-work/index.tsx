import React, { useState } from "react";
import UploadWorkForm from "@components/features/upload-work/upload-work-form";
import useCustomPrompt from "@hooks/useCostomPrompt";
import Modal from "@components/shared/modal";
import UploadCancelAlertModal from "@components/features/upload-work/cancel-alert-modal";
import WorkService from "@apis/work/work-service";

type Props = {
	workService: WorkService;
};

const UploadWork = ({ workService }: Props) => {
	const [showAlertModal, setShowAlertModal] = useState(false);

	const [showPrompt, setLeavePage, setIsEdited] = useCustomPrompt(setShowAlertModal);

	return (
		<>
			<UploadWorkForm setIsEdited={setIsEdited} workService={workService} />
			{showPrompt()}
			{showAlertModal && (
				<Modal>
					<UploadCancelAlertModal setShowAlertModal={setShowAlertModal} setLeavePage={setLeavePage} />
				</Modal>
			)}
		</>
	);
};

export default UploadWork;
