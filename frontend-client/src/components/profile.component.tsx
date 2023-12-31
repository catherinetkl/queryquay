import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import { t } from "i18next";

type Props = {};

type State = {
    redirect: string | null,
    userReady: boolean,
    currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { accessToken: "" }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <div className="container">
            {(this.state.userReady) ?
                <div>
                    <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> {t("profile.profile")}
                    </h3>
                    </header>
                    <p>
                    <strong>{t("profile.token")}:</strong>{" "}
        {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
        </p>
        <p>
        <strong>{t("profile.id")}:</strong>{" "}
        {currentUser.id}
        </p>
        <p>
        <strong>{t("profile.name")}:</strong>{" "}
        {currentUser.name}
        </p>
        <p>
        <strong>{t("profile.email")}:</strong>{" "}
        {currentUser.email}
        </p>
        <strong>{t("profile.authorities")}</strong>
        <ul>
        {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                    </div> : null}
                    </div>
                );
        }
    }