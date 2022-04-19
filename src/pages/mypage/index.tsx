import React from "react";
import styled from "styled-components";
import MyInfo from "components/features/mypage/my-info";
import MyWorks from "components/features/mypage/my-works";
import { Redirect, Route, Switch } from "react-router-dom";
import EditProfile from "pages/mypage/edit-profile";
import UploadWork from "pages/mypage/upload-work";
import Likes from "./likes";

const MyPageContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 4.7% 3.8%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MyPage = () => {
	return (
		<MyPageContainer>
			<Switch>
				<Route exact path="/mypage">
					<MyInfo />
					<MyWorks />
				</Route>

				<Route exact path="/mypage/edit-profile" component={EditProfile} />

				<Route exact path="/mypage/upload" component={UploadWork} />

				<Route exact path="/mypage/likes" component={Likes} />

				<Redirect path="/mypage/*" to="/" />
			</Switch>
		</MyPageContainer>
	);
};

export default MyPage;
