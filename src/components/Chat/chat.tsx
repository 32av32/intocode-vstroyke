import React from "react";
import './chat.css'
const  MainChat = () => {
    return (

<div className="container">

<div className="page-title">
    <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <h5 className="title"></h5>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
    </div>
</div>

<div className="content-wrapper">

    <div className="row gutters">

        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

            <div className="card m-0">

                <div className="row no-gutters">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                        <div className="users-container">
                            <div className="chat-search-box">
                                <div className="input-group">
                                    <input className="form-control" placeholder="Search" />
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-info">
                                            <i className="fa fa-search"></i>search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul className="users">
                                <li className="person" data-chat="person1">
                                    <div className="user">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar4.png" alt="Retail Admin" />
                                        <span className="status online"></span>
                                    </div>
                                    <p className="name-time">
                                        <span className="name">1иса</span>
                                        <span className="time">15/02/2019</span>
                                    </p>
                                </li>
                                <li className="person" data-chat="person1">
                                    <div className="user">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar5.png" alt="Retail Admin" />
                                        <span className="status offline"></span>
                                    </div>
                                    <p className="name-time">
                                        <span className="name">Дэни</span>
                                        <span className="time">15/02/2019</span>
                                    </p>
                                </li>
                                <li className="person active-user" data-chat="person2">
                                    <div className="user">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="Retail Admin" />
                                        <span className="status away"></span>
                                    </div>
                                    <p className="name-time">
                                        <span className="name">1имран</span>
                                        <span className="time">12/02/2019</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                        <div className="selected-user">
                            <span>To: <span className="name">Developerш</span></span>
                        </div>
                        <div className="chat-container">
                            <ul className="chat-box chatContainerScroll">
                                <li className="chat-left">
                                    <div className="chat-avatar">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="Retail Admin" />
                                        <div className="chat-name">1имран</div>
                                    </div>
                                    <div className="chat-text">Hello, I'm Russell.
                                        <br />How can I help you today?</div>
                                    <div className="chat-hour">08:55 <span className="fa fa-check-circle"></span></div>
                                </li>
                                <li className="chat-right">
                                    <div className="chat-hour">08:56 <span className="fa fa-check-circle"></span></div>
                                    <div className="chat-text">Hi, Russell
                                        <br /> I need more information about Developer Plan.</div>
                                    <div className="chat-avatar">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar5.png" alt="Retail Admin" />
                                        <div className="chat-name">Дэни</div>
                                    </div>
                                </li>
                                <li className="chat-left">
                                    <div className="chat-avatar">
                                        <img src="https://www.bootdey.com/img/Content/avatar/avatar4.png" alt="Retail Admin" />
                                        <div className="chat-name">1иса</div>
                                    </div>
                                    <div className="chat-text">Are we meeting today?
                                        <br /> Project has been already finished and I have results to show you.</div>
                                    <div className="chat-hour">08:57 <span className="fa fa-check-circle"></span></div>
                                </li>

                            </ul>
                            <div className="form-group mt-3 mb-0">
                                <input className="form-control" placeholder="Напишите сообщение..." /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>

</div>
    ) 

}

export default MainChat;