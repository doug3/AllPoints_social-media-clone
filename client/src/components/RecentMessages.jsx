import React, { useState, useEffect } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";
import moment from "moment";

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData);
  };

  useEffect(() => {
    fetchRecentMessages();
  }, []);

  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
      <h3 className="font-semibold mb-4 text-slate-8">Recent Messages</h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll scrollbar-hide">
        {messages.map((message, idx) => (
          <Link
            to={`/messages/${message.from_user_id._id}`}
            key={idx}
            className="flex items-start gap-2 py-2 hover:bg-slate-100"
          >
            <img
              src={message.from_user_id?.profile_picture}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <p className="font-semibold text-sm">
                  {message.from_user_id?.full_name}
                </p>
                <span className="text-xs text-slate-400">
                  {moment(message?.createdAt).fromNow()}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-indigo-800">
                  {message?.text ? message?.text : "Media"}
                </p>
                {!message?.seen && (
                  <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
