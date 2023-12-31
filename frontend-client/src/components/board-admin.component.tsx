import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {t} from "i18next";

type Props = {};

type State = {
    content: string;
}

export default class BoardAdmin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
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
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{t('adminBoard')}</h3>
                    {/*<h3>{this.state.content}</h3>*/}
                </header>
            </div>
        );
    }
}