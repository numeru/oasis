import React from "react";
import styled from "styled-components";
import MyInfo from "@components/features/mypage/my-info";
import MyWorks from "@components/features/mypage/my-works";
import { Redirect, Route, Switch } from "react-router";
import EditProfile from "@pages/mypage/edit-profile";
import UploadWork from "@pages/mypage/upload-work";
import WorkService from "@apis/work/work-service";
import Likes from "./likes";
import UserService from "@apis/user/user-service";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";

const MyPageContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 4.7% 3.8%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

type Props = {
	workService: WorkService;
	userService: UserService;
};

const MyPage = ({ workService, userService }: Props) => {
	const userSelector = useSelector(selectUser);
	const { checkUserComplete, isLogin } = userSelector;

	if (checkUserComplete && !isLogin) {
		return <Redirect to="/login" />;
	}

	return (
		<MyPageContainer>
			<Switch>
				<Route exact path="/mypage">
					<MyInfo />
					<MyWorks />
				</Route>

				<Route exact path="/mypage/edit-profile">
					<EditProfile userService={userService} />
				</Route>
				<Route exact path="/mypage/upload" render={(props) => <UploadWork {...props} workService={workService} />} />

				<Route exact path="/mypage/likes" component={Likes} />

				<Redirect path="/mypage/*" to="/" />
			</Switch>
		</MyPageContainer>
	);
};

export default MyPage;
