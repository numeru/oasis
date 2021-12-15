import React, { useEffect, useState } from "react";
import UserInfo from "@components/features/user/user-info";
import UserWorks from "@components/features/user/user-works";
import { Redirect, useParams } from "react-router";
import styled from "styled-components";
import UserService from "@apis/user/user-service";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";

const UserPageContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 4.7% 3.8%;
`;

type Params = {
	id: string;
};

type Props = {
	userService: UserService;
};

const User = ({ userService }: Props) => {
	const params = useParams<Params>();
	const [userId, setUserId] = useState(params.id);

	useEffect(() => {
		setUserId(params.id);
	}, [params]);

	const userSelector = useSelector(selectUser);
	const { uuid } = userSelector;

	if (userId === uuid) {
		return <Redirect to="/mypage" />;
	}

	return (
		<UserPageContainer>
			<UserInfo userId={userId} userService={userService} />
			<UserWorks userId={userId} />
		</UserPageContainer>
	);
};

export default User;
