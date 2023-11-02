import React from "react";
import Avatar from "./Avatar";
import Chip from "./Chip";

const Ticket = ({ ticket, groupBy }) => (
    <div className="ticket">
      {groupBy === "userId" ? "" : <Avatar name = {ticket.username} online = {ticket.available} />}
  
      <div className='ticket_id'>{ticket.id}</div>
      <div className='ticket_title'>{ticket.title}</div>
      <div className="ticket_tags">
  
          {ticket.tag.map((tag, index) => (

           <Chip key={index} title={tag} />
          ))}
      </div>
    </div>
  );

  export default Ticket;