import React, { useEffect, useMemo, useRef, useState } from "react";
import { InvisibleFileInput } from "@components/shared/invisible-file-input/styled";
import { UserUploadFile, WorkImage } from "@utils/types";
import { CountLetters } from "@components/shared/count-letters/styled";
import useInput from "@hooks/useInput";
import useTextLimit from "@hooks/useTextLimit";
import {
	FillBlankInstructions,
	RemoveUploadedImageButton,
	UploadedCoverImage,
	UploadedWorkImages,
	UploadForm,
	UploadGuide,
	UploadImageBox,
	UploadInputField,
	UploadSaveButton,
	WorkDescriptionInput,
	WorkTitleInput,
} from "./styled";
import Modal from "@components/shared/modal";
import DeleteImageAlertModal from "../delete-alert-modal";
import UploadLimitAlertModal from "../limit-alert-modal";
import { FormCancelButton } from "@components/shared/form-buttons/styled";
import WorkService from "@apis/work/work-service";
import { useHistory } from "react-router";
import { responseErrorWarning, throwTokenError } from "@stores/slices/user-slice";
import { useDispatch } from "react-redux";
import WorkCategories from "@components/shared/work-categories";
import { TOKEN_ERROR } from "@apis/errors";

type BlankUploadFormInputs = {
	selectedCategory: boolean;
	coverImage: boolean;
	title: boolean;
	description: boolean;
	workImages: boolean;
};

type Props = {
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
	workService: WorkService;
};

const UploadWorkForm = ({ setIsEdited, workService }: Props) => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [coverImage, setCoverImage] = useState<UserUploadFile | null>(null);
	const [title, handleTitle, setTitle] = useInput("");
	const [description, handleDescription, setDescription] = useInput("");
	const [workImages, setWorkImages] = useState<WorkImage[]>([]);

	const numberOfTitleLetters = useTextLimit(title, setTitle, 25);

	const numberOfDescriptionLetters = useTextLimit(description, setDescription, 400);

	const [blankInputs, setBlankInputs] = useState<BlankUploadFormInputs>({
		selectedCategory: false,
		coverImage: false,
		title: false,
		description: false,
		workImages: false,
	});

	const isThereBlankInput = useMemo(
		() =>
			selectedCategory === "" ||
			numberOfTitleLetters === 0 ||
			numberOfDescriptionLetters === 0 ||
			workImages.length === 0 ||
			coverImage === null,

		[selectedCategory, numberOfTitleLetters, numberOfDescriptionLetters, workImages, coverImage],
	);

	useEffect(() => {
		setIsEdited(
			selectedCategory !== "" ||
				numberOfTitleLetters > 0 ||
				numberOfDescriptionLetters > 0 ||
				workImages.length > 0 ||
				coverImage !== null,
		);
	}, [selectedCategory, numberOfTitleLetters, numberOfDescriptionLetters, workImages, coverImage]);

	const [workImageToBeDeleted, setWorkImageToBeDeleted] = useState<number | null>(null);
	const [coverImageToBeDeleted, setCoverImageToBeDeleted] = useState<boolean>(false);

	const clickRemoveButton = (type: "cover" | "work", id?: number) => {
		if (type === "work" && id) {
			setWorkImageToBeDeleted(id);
		} else {
			setCoverImageToBeDeleted(true);
		}
	};

	const uploadCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);
			setCoverImage({
				file: fileList[0],
				thumbnail: url,
				type: fileList[0].type.slice(0, 5),
			});

			if (coverImageRef.current) coverImageRef.current.value = "";
		}
	};

	const showCoverImage = useMemo(() => {
		if (!coverImage) {
			return (
				<UploadImageBox type="button" onClick={() => coverImageRef.current?.click()}>
					커버 이미지 추가
				</UploadImageBox>
			);
		}
		return (
			<>
				<RemoveUploadedImageButton type="button" onClick={() => clickRemoveButton("cover")}>
					삭제하기
				</RemoveUploadedImageButton>
				<UploadedCoverImage
					src={coverImage.thumbnail}
					alt="cover_image"
					onClick={() => coverImageRef.current?.click()}
				/>
			</>
		);
	}, [coverImage]);

	const [showImageLimitModal, setShowImageLimitModal] = useState(false);

	const uploadWorkImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (workImages.length >= 10) return;

		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);

			const newWorkImage = {
				id: Math.floor(Math.random() * 1000),
				file: fileList[0],
				thumbnail: url,
				type: fileList[0].type.slice(0, 5),
			};
			setWorkImages((prev) => {
				return [...prev, newWorkImage];
			});

			if (workImagesRef.current) workImagesRef.current.value = "";
		}
	};

	const showWorkImages = useMemo(() => {
		if (workImages.length === 0) {
			return (
				<UploadImageBox type="button" onClick={() => workImagesRef.current?.click()}>
					이미지 추가
				</UploadImageBox>
			);
		}
		return (
			<>
				<UploadedWorkImages>
					{workImages.map((img) => (
						<li key={img.id}>
							<img src={img.thumbnail} alt="work_image" />
							<RemoveUploadedImageButton type="button" onClick={() => clickRemoveButton("work", img.id)}>
								삭제하기
							</RemoveUploadedImageButton>
						</li>
					))}
				</UploadedWorkImages>
				<UploadImageBox
					type="button"
					onClick={() => {
						if (workImages.length >= 10) {
							setShowImageLimitModal(true);
							return;
						}
						workImagesRef.current?.click();
					}}
				>
					이미지 추가
				</UploadImageBox>
			</>
		);
	}, [workImages]);

	const numberOfWorkImages = useMemo(() => workImages.length, [workImages]);

	const coverImageRef = useRef<HTMLInputElement>(null);
	const workImagesRef = useRef<HTMLInputElement>(null);

	const findBlanklInputs = () => {
		setBlankInputs({
			selectedCategory: selectedCategory === "",
			coverImage: coverImage === null,
			title: numberOfTitleLetters === 0,
			description: numberOfDescriptionLetters === 0,
			workImages: workImages.length === 0,
		});
	};

	const history = useHistory();
	const dispatch = useDispatch();

	const submitUploadWorkForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		findBlanklInputs();

		if (isThereBlankInput) return;

		try {
			const data = {
				title,
				description,
				category: selectedCategory,
				coverFile: coverImage!.file,
				artFiles: workImages,
			};

			const {
				statusCode,
				data: { message },
			} = await workService.uploadWork(data);

			if (statusCode >= 400) {
				dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
			}

			if (statusCode == 200) {
				setIsEdited(false);
				history.replace("/mypage");
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning("잠시 후 다시 시도해주세요"));
		}
	};

	return (
		<>
			<UploadForm onSubmit={submitUploadWorkForm}>
				<h2>새 작업물 등록</h2>

				<ul>
					<UploadInputField>
						<label htmlFor="">카테고리</label>
						{blankInputs.selectedCategory && <FillBlankInstructions>카테고리를 1개 선택해주세요</FillBlankInstructions>}
						<UploadGuide>작업물에 해당하는 카테고리를 1개 선택해주세요</UploadGuide>
						<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_cover_image">커버 이미지</label>
						{blankInputs.coverImage && <FillBlankInstructions>커버 이미지를 추가해주세요</FillBlankInstructions>}
						<UploadGuide>파일은 jpg, jpeg, png 형식만 가능해요</UploadGuide>
						<InvisibleFileInput
							type="file"
							id="upload_cover_image"
							accept="image/jpg, image/jpeg, image/png"
							ref={coverImageRef}
							onChange={uploadCoverImage}
						/>
						{showCoverImage}
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_title">제목</label>
						{blankInputs.title && <FillBlankInstructions>제목을 입력해주세요</FillBlankInstructions>}
						<CountLetters>{numberOfTitleLetters} / 25</CountLetters>
						<WorkTitleInput
							id="upload_title"
							placeholder="25글자 이내로 입력해주세요"
							value={title}
							onChange={handleTitle}
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_description">작품 소개</label>
						{blankInputs.description && <FillBlankInstructions>작품 소개를 입력해주세요</FillBlankInstructions>}
						<CountLetters>{numberOfDescriptionLetters} / 400</CountLetters>
						<WorkDescriptionInput
							id="upload_description"
							placeholder="사람들에게 소개하고 싶은 작품의 하이라이트를 설명해주세요
최대 400글자까지 가능해요"
							value={description}
							onChange={handleDescription}
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_work_image">작품 내용</label>
						{blankInputs.workImages && (
							<FillBlankInstructions>작품 내용 이미지를 1장 이상 추가해주세요</FillBlankInstructions>
						)}

						<UploadGuide>
							파일은 jpg, jpeg, png 형식만 가능해요
							<br />한 번에 1개 씩, 최대 10개 파일을 추가할 수 있어요
						</UploadGuide>
						<CountLetters>{numberOfWorkImages} / 10</CountLetters>
						<InvisibleFileInput
							type="file"
							id="upload_work_image"
							accept="image/jpg, image/jpeg, image/png"
							ref={workImagesRef}
							onChange={uploadWorkImages}
						/>
						{showWorkImages}
					</UploadInputField>
				</ul>

				<UploadSaveButton type="submit">저장하기</UploadSaveButton>

				<FormCancelButton to="/mypage">돌아가기</FormCancelButton>
			</UploadForm>

			{(workImageToBeDeleted !== null || coverImageToBeDeleted) && (
				<Modal>
					<DeleteImageAlertModal
						workImageToBeDeleted={workImageToBeDeleted}
						setWorkImageToBeDeleted={setWorkImageToBeDeleted}
						setCoverImageToBeDeleted={setCoverImageToBeDeleted}
						setWorkImages={setWorkImages}
						setCoverImage={setCoverImage}
					/>
				</Modal>
			)}
			{showImageLimitModal && (
				<Modal>
					<UploadLimitAlertModal setShowImageLimitModal={setShowImageLimitModal} />
				</Modal>
			)}
		</>
	);
};

export default UploadWorkForm;
