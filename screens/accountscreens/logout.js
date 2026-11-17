import React, { useContext }from "react";
import { userContext } from "../../functions/context/userContext";
import { useNavigation, CommonActions } from "@react-navigation/native";

export default function logoutScreen() {
    const navigation = useNavigation()
    const {logout} = useContext(userContext)

        logout();
		const rootNavigation = navigation.getParent();
		rootNavigation?.dispatch(CommonActions.reset({
			index: 0,
		routes: [{name: 'login'}],
	 }));
}