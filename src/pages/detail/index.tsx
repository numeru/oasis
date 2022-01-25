import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import WorkDetailContent from "@components/features/detail/work-detail-content";

const DetailContainer = styled.main`
	width: 100%;
	padding: 5.7% 1.9% 30% 1.9%;
`;
type Params = {
	id: string;
};

const WorkDetail = () => {
	const params = useParams<Params>();
	const [workId, setWorkId] = useState(params.id);

	useEffect(() => {
		setWorkId(params.id);
	}, [params]);

	return (
		<DetailContainer>
			<WorkDetailContent workId={workId} />
		</DetailContainer>
	);
};

export default WorkDetail;
