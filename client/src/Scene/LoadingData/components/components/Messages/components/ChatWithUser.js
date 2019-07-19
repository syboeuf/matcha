import React from "react"

import ReceiveMessage from "./components/ReceiveMessage"
import SendMessage from "./components/SendMessage"

const ChatWithUser = ({ userName, profilMatchName }) => (
    <div>
        <ReceiveMessage
            userName={ userName }
            profilMatchName={ profilMatchName }
        />
        <SendMessage
            userName={ userName }
            profilMatchName={ profilMatchName }
        />
    </div>
)

export default ChatWithUser