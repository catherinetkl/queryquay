import { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import i18n from "i18next"; // Import i18next or your localization library

type Props = {};

type State = {
    content: string;
}

export default class BoardUser extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {
        let translatedContent;

        if (this.state.content === "You are a User.") {
            translatedContent = 'youAre.user';
        } else if (this.state.content === "You are an Admin.") {
            translatedContent = 'youAre.admin';
        } else if (this.state.content === "You are a Manager.") {
            translatedContent = 'youAre.manager';
        } else {
            translatedContent = this.state.content;
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{i18n.t(translatedContent)}</h3>
                </header>
            </div>
        );
    }
}
