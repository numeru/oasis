import React from "react";
import styled from "styled-components";

export const LoadingIndicatorContainer = styled.div`
	position: sticky;
	top: 0;
	width: 55%;
	height: 100vh;
	padding-left: 4%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const LoadingIndicator = styled.img`
	height: 30px;
	width: 30px;
	animation: spin 800ms infinite linear;
	@keyframes "spin" {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
`;
