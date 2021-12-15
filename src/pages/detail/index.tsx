import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import WorkDetailContent from "@components/features/detail/work-detail-content";
import WorkService from "@apis/work/work-service";

const DetailContainer = styled.main`
	width: 100%;
	padding: 5.7% 1.9% 30% 1.9%;
`;
type Params = {
	id: string;
};

type Props = {
	workService: WorkService;
};

const WorkDetail = ({ workService }: Props) => {
	const params = useParams<Params>();
	const [workId, setWorkId] = useState(params.id);

	useEffect(() => {
		setWorkId(params.id);
	}, [params]);

	return (
		<DetailContainer>
			<WorkDetailContent workId={workId} workService={workService} />
		</DetailContainer>
	);
};

export default WorkDetail;
